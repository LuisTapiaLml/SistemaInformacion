

export const Card = ( dataCard  ) => {

    let card = document.createElement('a');

    card.innerHTML = `
        <a href="/cursos/${dataCard.idcurso}"  class="card" >                 
            <div  class="img_container"> 
            <img src="/uploads/imagenes_cursos/${dataCard.imagen}"   alt="img curso" />
            </div>
            <footer> 
                <h3 class="nombre_curso" > ${dataCard.nombre} </h3>
                <div class="pre" >
                    <div class="rating">
                        <i class="fa fa-star checked"></i>
                        <i class="fa fa-star checked"></i>
                        <i class="fa fa-star checked"></i>
                        <i class="fa fa-star checked"></i>
                        <i class="fa fa-star "></i>
                    </div>
                    <span>30 comentarios</span> 
                </div>     
            </footer>                       
        </a>
    `;


    return card;
}