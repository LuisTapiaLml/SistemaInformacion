import { conexion } from "./funciones/conexion.js";
import { validar_fomulario } from "./funciones/formulario.js";
import { mensaje } from "./funciones/mensaje.js";

const formulario = document.querySelector('#crear_cuenta_form');



const enviar_formulario = async (e) => {

    e.preventDefault()

    let data = validar_fomulario('#crear_cuenta_form');
    let pass, pass2;

    if (!data.valido) {

        mensaje({ 'mensaje': 'Valide los campos marcados', 'titulo': 'error', 'estado': 'warning' });

        return false;
    }

    pass = data.formulario.get('clave');
    pass2 = data.formulario.get('clave2');

    if (pass !== pass2) {

        mensaje({ 'mensaje': 'La contraseñas no son iguales', 'titulo': 'error', 'estado': 'error' });

        return false;

    }

    let respuesta = await conexion('/crear_usuario','post', data.formulario );

    console.log(respuesta);

}


formulario.addEventListener('submit', enviar_formulario);
