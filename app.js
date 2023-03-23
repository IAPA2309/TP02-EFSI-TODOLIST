const form = document.getElementById("formulario");
const tareaInput = document.getElementById("tarea");
const tareasDiv = document.getElementById("tareas-container");

let tareas = [];


form.addEventListener("submit", (e) =>{
    e.preventDefault();
    
    if(!tareaInput.value.trim()) return; // Eviro que el input se manda con puros espacios
    
    const objTarea = 
    {
        id: Date.now(),
        descripcion: tareaInput.value.trim(),
        estado: false,
        date: new Date('March 23, 2023 10:40:00')
    } // Creo el objecto tarea

    tareas = [...tareas, objTarea]; // Agrego los datos anteriores y el nuevo objeto tarea

    form.reset();

    console.log(tareas);

    actualizarHtml();
})

tareasDiv.addEventListener("click", (e) => {
    if(e.target.classList.contains("dlt-btn")){
        const tareaID = Number(e.target.getAttribute("data-id"));
        tareas = tareas.filter(item => item.id !== tareaID);
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
        <span>${item.descripcion}</span>
        <span>${item.date}</span>
        <div class="botones">
            <button data-id="${item.id}" class="scs-btn">✅</button>
            <button data-id="${item.id}" class="dlt-btn">❌</button>
        </div>
        `;

        tareasDiv.append(itemTarea);
    })
}