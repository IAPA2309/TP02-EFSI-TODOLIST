const form = document.getElementById("formulario");
const tareaInput = document.getElementById("tarea");
const tareasDiv = document.getElementById("tareas-container");
const btn_add = document.getElementById("btn-add");

let tareas = [];

tareaInput.onkeyup = (e) =>{

    if(e.target.value.length > 0) btn_add.removeAttribute('disabled', '');

    if(e.target.value.length <= 0) btn_add.setAttribute("disabled", "");
}


form.addEventListener("submit", (e) =>{
    e.preventDefault();

    if(!tareaInput.value.trim()) return; // Eviro que el input se manda con puros espacios
    
    const objTarea = 
    {
        id: Date.now(),
        descripcion: tareaInput.value.trim(),
        estado: false,
        date: new Date(),
        dateCompleted: null,
    } // Creo el objecto tarea

    tareas = [...tareas, objTarea]; // Agrego los datos anteriores y el nuevo objeto tarea

    form.reset();

    actualizarHtml();
})

tareasDiv.addEventListener("click", (e) => {
    if(e.target.classList.contains("dlt-btn")){
        // Consigo el id del objecto y lo guardo
        const tareaID = Number(e.target.getAttribute("data-id"));

        //Busco la tarea por id y la elimino
        tareas = tareas.filter(item => item.id !== tareaID);

        // Actualizo la lista en el html
        actualizarHtml();
    }

    if(e.target.classList.contains("scs-btn")){
        const tareaID = Number(e.target.getAttribute("data-id"));

        // Recorro la lista y cuando encuentro el objecto cambio su estado
        tareas.map(item => {
            if(item.id === tareaID){
                item.dateCompleted === null ? item.dateCompleted = new Date() : item.dateCompleted = null;
                item.estado = !item.estado;
                return 
            }else{
                return item;
            }
        })

        actualizarHtml();
    }
})

function actualizarHtml(){
    tareasDiv.innerHTML = ''; // Reinicio el contenido del div, para que no se dupliquen las tareas

    if(tareas.length < 1){
        const msj = document.createElement("h5");
        msj.textContent = "~ No hay ningun objetivo agregado 🤔~";
    }

    tareas.forEach(item => {
        const itemTarea = document.createElement("div");
        
        itemTarea.classList.add("item-tarea");

        itemTarea.innerHTML = `
            ${
              item.estado
                ? `<p class="scs-task"> ${item.descripcion}</p>`
                : `<p> ${item.descripcion}</p>`
            }
        <p class="date">Agregado el: ${item.date.toLocaleDateString()} a las ${item.date.getHours()}:${item.date.getMinutes()}:${item.date.getSeconds()}</p>
        ${
          item.dateCompleted === null
            ? ""
            : `<p class="date">Completado el: ${item.dateCompleted.toLocaleDateString()} a las ${item.dateCompleted.getHours()}:${item.dateCompleted.getMinutes()}:${item.dateCompleted.getSeconds()}</p>`
        }
        <div class="botones">
            <button type="checkbox" data-id="${item.id}" class="scs-btn">✅</button>
            <button data-id="${item.id}" class="dlt-btn">❌</button>
        </div>
        `;

        tareasDiv.append(itemTarea);
    })
}