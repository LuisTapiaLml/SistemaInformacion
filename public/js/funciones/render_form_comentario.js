import { modal } from "../elementos/modal.js";
import { conexion } from "./conexion.js";
import { validar_fomulario } from "./formulario.js";
import { mensaje } from "./mensaje.js";

const render_comentario = () => {

    let modal_element =  modal('modal_comentario');

    modal_element.modal.innerHTML = `

    <h3 class="titulo"> Comentario </h3>
    <form method="post" id="formulario_comentar" action="/comentar" novalidate  >
         
        <label>
            <span> Calificacion: </span>
            <select name="calificacion" required value="0">
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
            </select>
            
        </label>
        <input type="hidden" name="id_curso" value="${document.querySelector('.accion_curso').dataset.id}" />
        <label>
            <span> Comentario: </span> 
            <textarea cols="30"  rows="5"  required  name="comentario"   placeholder="Descripción..."></textarea>
        </label>
        <footer id="footer_formulario"> 
            <button type="submit" id="guardar_formulario" class="guardar" > Enviar </button>    
        </footer>
    </form>

    `


    document.body.append(modal_element.back);

    let form = document.querySelector('#formulario_comentar');

    form.addEventListener('submit',enviar_comentario);
};

const enviar_comentario = async (e) => {

    e.preventDefault();

    let validacion_form = validar_fomulario('#formulario_comentar');

    if(validacion_form.valido){

        Swal.fire({
            title: 'Enviar Comentario?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Mandar Comentario!'
        }).then((result) => {
            if (result.isConfirmed) {
                document.querySelector('.modal_comentario').remove();
                enviar_comment(validacion_form.formulario);
            }
        });

    }


};

const enviar_comment = async (formulario ) => {

    try {
        let respuesta =  await conexion('/comentar','post',formulario);

        if( !respuesta.estado ){
            mensaje({ 'mensaje': respuesta.mensaje , 'titulo': 'Error', 'estado': 'error' });
        }

        mensaje({ 'mensaje': respuesta.mensaje , 'titulo': 'Éxito', 'estado': 'success' });

        setTimeout(() => {
            window.location.reload()
        }, 3000);

    } catch (error) {
        console.log(error);
    }

}

export { render_comentario };