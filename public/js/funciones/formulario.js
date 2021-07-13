

export const  validar_fomulario = (elForm)  => {
    
    const form =  document.querySelector(elForm);

    let elementosForm =  form.elements ;

    let valido = true;

    let formulario = new FormData()

    for (let elemento of elementosForm) {
        
        if( elemento.required  ) {

            if(elemento.value == ''){
                elemento.parentElement.classList.add('campo_vacio');
                valido =  false;

            }else{
                
                elemento.parentElement.classList.remove('campo_vacio');

                if ( elemento.type ==='file' ) {
                    formulario.append( elemento.name  , elemento.files[0] )
                }else{
                    formulario.append( elemento.name  , elemento.value.trim() )
                }
            }
            
        }else{
        
            elemento.parentElement.classList.remove('campo_vacio');
            
            if ( elemento.type ==='file' ) {
                formulario.append( elemento.name  , elemento.files[0] )
            }else{
                formulario.append( elemento.name  , elemento.value.trim() )
            }
        }

    }

    return {
        valido,
        formulario 
    }

}

