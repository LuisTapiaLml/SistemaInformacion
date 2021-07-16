import {conexion} from "./funciones/conexion.js"
import {mensaje} from "./funciones/mensaje.js"
import { render_comentario } from "./funciones/render_form_comentario.js";

let boton_accion_curso = document.querySelector('.accion_curso');

const evaluar_accion = ( e ) => {

    let accion = e.target.dataset.accion ;

    switch (accion) {
        case 'eliminar':
                eliminar_mensaje()
            break;
        
        case 'inscribirse':
            inscripcion_mensaje();
            break;

        case 'comentar':
            render_comentario();
            break;

        default:
            return false;
    }
};

const inscripcion_mensaje = () => {

    Swal.fire({
        title: 'Estas Seguro?',
        text: "Está a punto de inscribirse a este curso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Inscribirme!'
    }).then((result) => {
        if (result.isConfirmed) {
            inscribirse()
        }
    });

}

const inscribirse = async () => {
    
    try {

        const id = boton_accion_curso.dataset.id

        let formulario = new FormData();

        console.log(id,'id_curso');

        formulario.append('id_curso',id);

        let respuesta =  await conexion(`/inscribirse`,'post',formulario);

        if( !respuesta.estado ){
            mensaje({ 'mensaje': respuesta.mensaje , 'titulo': 'Error', 'estado': 'error' });
        }

        mensaje({ 'mensaje': respuesta.mensaje , 'titulo': 'Éxito', 'estado': 'success' });

        setTimeout(() => {
            window.location.reload();
        }, 3000);

    } catch (error) {
        console.log(error);
    }
};


const eliminar_mensaje =async () => {


    Swal.fire({
        title: 'Estas Seguro?',
        text: "Esta acción no se puede deshacer!",
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            eliminar()
        }
    });

}

const eliminar =async () => {
    const id = boton_accion_curso.dataset.id
    try {
        let respuesta =  await conexion(`/eliminar_curso/${id}`,'DELETE',null);

        
        if( !respuesta.estado ){
            mensaje({ 'mensaje': respuesta.mensaje , 'titulo': 'Error', 'estado': 'error' });
        }

        mensaje({ 'mensaje': respuesta.mensaje , 'titulo': 'Éxito', 'estado': 'success' });

        setTimeout(() => {
            window.location.href ='/mis_cursos';
        }, 3000);

    } catch (error) {
        console.log(error);
    }
}

 


if( boton_accion_curso ) {

    boton_accion_curso.addEventListener('click', evaluar_accion );

}