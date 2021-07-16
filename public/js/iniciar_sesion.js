import { conexion } from "./funciones/conexion.js";
import { validar_fomulario } from "./funciones/formulario.js";
import { mensaje } from "./funciones/mensaje.js";

const formulario = document.querySelector('#iniciar_sesion_form');


const iniciar_sesion = async (e) => {
    e.preventDefault();

    
    const validacion_formulario = validar_fomulario('#iniciar_sesion_form');

    if ( !validacion_formulario.valido ) {
        
        mensaje({ 'mensaje': 'Valíde los campos marcados', 
            'titulo': 'error',
            'estado': 'warning' 
        });
        
        return false;
    }

    let respuesta = await conexion('/iniciar_sesion','post',validacion_formulario.formulario);

    console.log(respuesta);

}



formulario.addEventListener('submit', iniciar_sesion);

