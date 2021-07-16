export const modal = (clase) => {
    const background_modal =  document.createElement('div');
    const modal =  document.createElement('div');

    background_modal.classList.add('background_modal');
    modal.classList.add('modal',clase );

    
    background_modal.append(modal);

    background_modal.addEventListener('click',(e)=> {
        let elememnt =  e.target;

        if(elememnt.classList.contains('background_modal')){
            background_modal.remove();
        }

    });

    return {
        back : background_modal,
        modal 
    }
};


