export const conexion = async ( url , method , data ) => {

    let respuesta =  await fetch(url , {
    
        method : method ,
        body : method == 'post' ? data : '' 
    
    })
    .then( respuesta => respuesta.json())
    .catch( error => ({estado:false, mensaje : 'Hubo un error, intentelo mas tarde' }));

    return respuesta ;
} 