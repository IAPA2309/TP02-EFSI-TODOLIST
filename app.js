const form = document.getElementById("formulario");
const tareaInput = document.getElementById("tarea");
const tareasDiv = document.getElementById("tareas-container");
const btn_add = document.getElementById("btn-add");
const btn_dlt_all = document.getElementById("btn-dlt-all");
const btn_show_fastest = document.getElementById("btn-show-fastest");
const alertDiv = document.getElementById("alert-div")

let tareas = [];

window.onload = () =>{
  actualizarHtml();
  btn_show_fastest.disabled = tareas.length === 0 ? true : false;
  btn_dlt_all.disabled = tareas.length === 0 ? true : false;

  actualizarHtml();
}

tareaInput.addEventListener('input', () => {
    btn_add.disabled = tareaInput.value.length === 0 ? true : false;
})


form.addEventListener("submit", (e) =>{
    e.preventDefault();
    btn_add.disabled = true;
    btn_show_fastest.disabled = false;
    btn_dlt_all.disabled = false;

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
  if (e.target.classList.contains("dlt-btn")) {
    // Consigo el id del objecto y lo guardo
    const tareaID = Number(e.target.getAttribute("data-id"));

    //Busco la tarea por id y la elimino
    tareas = tareas.filter((item) => item.id !== tareaID);

    // Actualizo la lista en el html
    actualizarHtml();
  }

  if (e.target.classList.contains("scs-btn")) {
    const tareaID = Number(e.target.getAttribute("data-id"));

    // Recorro la lista y cuando encuentro el objecto cambio su estado
    tareas.map((item) => {
      if (item.id === tareaID) {
        item.dateCompleted === null
          ? (item.dateCompleted = new Date())
          : (item.dateCompleted = null);
        item.estado = !item.estado;
        return;
      } else {
        return item;
      }
    });

    actualizarHtml();
  }
  
  if (tareas.length === 0) {
    btn_show_fastest.disabled = true;
    btn_dlt_all.disabled = true;
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
        itemTarea.setAttribute("data-id", `${item.id}`);

        if(item.estado){
            itemTarea.classList.add("scs-task-bg");
        }

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
            <button data-id="${item.id}" class="scs-btn">✅ Completar</button>
            <button data-id="${item.id}" class="dlt-btn">❌ Eliminar</button>
        </div>
        `;

        tareasDiv.append(itemTarea);
    })
}

function deleteArray(){
    btn_show_fastest.disabled = true;
    btn_dlt_all.disabled = true;
    tareas = [];
    actualizarHtml();
}

function findFastestDoneId(){
    let fastest = 999999999999999999;
    let timeCompleted = 0;
    let idFastest = 0;
    tareas.map(item => {
        if(item.dateCompleted === null) return;

        timeCompleted = item.dateCompleted.getTime() - item.date.getTime();

        if(timeCompleted < fastest) {
            fastest = timeCompleted;
            idFastest = item.id;
        }
    })

    const miDiv = document.querySelector(`[data-id="${idFastest}"]`);

    if(miDiv === null){

        alertDiv.classList.add("container");

        (alertDiv.innerHTML = `
        <p class="alert">ⓘ No hay ninguna tarea completada.</p>
        `);

        setTimeout(() => {
          alertDiv.innerHTML = "";
          alertDiv.classList.remove("container");
        }, 3000);

    }else{
        alertDiv.innerHTML = ``;
        alertDiv.classList.remove("container");
    }

    miDiv.classList.add("scs-task-fastest-bg");
}