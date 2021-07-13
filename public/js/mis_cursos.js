import { conexion } from "./funciones/conexion.js";
import { validar_fomulario } from "./funciones/formulario.js";

import  { Card }  from "./elementos/cardCurso.js";

const boton_crear_curso =  document.querySelector('#crear_curso')


const render_form_crear = () => {
    
    const background_modal =  document.createElement('div');
    const modal =  document.createElement('div');

    background_modal.classList.add('background_modal');
    modal.classList.add('modal','crear_curso_form' );


    modal.innerHTML = `
    <h3 class="titulo"> Crear Curso </h3>
    <form method="post" id="crearCurso"  novalidate  enctype='multipart/form-data' >
         
        <label>
            <span> Nombre: </span>
            <input type="text" name="nombre" required placeholder="Nombre..."  value="" />
        </label>
        <label>
            <span> Descripción: </span> 
            <textarea cols="30"  rows="5"  required  name="descripcion"   placeholder="Descripción..."></textarea>
        </label>
        <label class="imagen vacio" >
            <span> Agregar Imagen: </span>
            <input type="file" name="imagen_curso" required placeholder="Imagen..."  accept="image/*" /> 
        </label>

        <footer id="footer_formulario"> 
            <button type="submit" id="guardar_formulario" class="guardar" > Guardar </button>    
        </footer>
    </form>
    `


    background_modal.append(modal);
    document.body.append(background_modal);

    const input_file =  document.querySelector('input[type="file"]')
    let formulario =  document.querySelector('#crearCurso');
    formulario.addEventListener('submit',enviar_formulario);
    input_file.addEventListener('change' , _input_file );
}

const enviar_formulario =   async (e) => {

    e.preventDefault()

    let respuesta = validar_fomulario('#crearCurso');


    if( ! respuesta.valido  ){
        console.log('no se pudo'); 
    }

    let respuestaFetch =  await conexion('/crear_curso','post',respuesta.formulario);

    console.log(respuestaFetch);

    if( respuestaFetch.estado ) {
        
        let contenedor_cards= document.querySelector('.cursos_container');

        let card;

        document.querySelector('.background_modal').remove();

        card = Card(  respuestaFetch.data );

        contenedor_cards.append( card );
    }
}


const _input_file = (e)=>{

    const label =  e.target.parentElement;
    const preview_img = label.querySelector('.preview_imagen');

    if( e.target.files && e.target.files[0] ) {

        const reader = new FileReader();

        let size = e.target.files[0].size;

        if ( preview_img ){
            preview_img.remove()
            label.classList.add('vacio')
        }

        reader.readAsDataURL( e.target.files[0] );

        reader.onload =  (e) =>{

            const contenedor =  document.createElement('div');
            const imagen = document.createElement('img');
            const boton_eliminar = document.createElement('button');
            
            contenedor.classList.add("preview_imagen");
            boton_eliminar.innerText="Quitar Imagen"
            boton_eliminar.classList.add("error")
            
            imagen.src = e.target.result;

            label.classList.remove('vacio')
            
            if ( size > 800000) {
                document.querySelector('#footer_formulario').querySelector('#guardar_formulario').disabled = true
                let mensaje  = document.createElement('span');
                mensaje.classList.add('mensaje','mensaje_error')
                mensaje.innerText='La imagen debe pesar menos de 800 kb'

                contenedor.append(mensaje)
            }else{
                document.querySelector('#footer_formulario').querySelector('#guardar_formulario').disabled = false
            }
            
            contenedor.append(imagen);
            contenedor.append(boton_eliminar);
            label.append(contenedor);

            boton_eliminar.addEventListener('click',()=>{
                contenedor.remove();
                label.classList.add('vacio');
            });
        }
        
    }else{
        if ( preview_img ){
            label.classList.add('vacio')
            preview_img.remove()
        }
        document.querySelector('#footer_formulario').querySelector('#guardar_formulario').disabled = false
    }


}

boton_crear_curso.addEventListener('click' , render_form_crear);