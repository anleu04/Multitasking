let tareas = document.querySelector(".tareas");

tareas.innerHTML = `
    <header class="header">
        <button class="agregar">+</button>
    </header>
    <main class="cuerpo">
        <span class="nombre">Nombre de la tarea</span>
        <span class="asig">Asignado</span>
        <span class="fecha">Fecha entrega</span>
        <span class="prog">Progreso</span>
        <div class="asigtareas"></div>
        <div class="asigpersona"></div>
        <div class="asigfecha"></div>
        <div class="asigprog"></div>
    </main>

    <div class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Agregar Tarea</h2>
            <input type="text" placeholder="Nombre de la tarea">
            <input type="text" placeholder="Asignado a">
            <input type="date" placeholder="Fecha entrega">
            <select class="estate">
                <option value="0" selected disabled>Selecciona el Progreso</option>
                <option value="1">Sin Asignar</option>
                <option value="2">En Progreso</option>
                <option value="3">Completado</option>
                <option value="4">Completado con Retraso</option>
                <option value="5">No presentado</option>
            </select>
            <button class="guardar">Guardar</button>
        </div>
    </div>
    `;

let modal = document.querySelector(".modal");
let btn = document.querySelector(".agregar");
let span = document.querySelector(".close");

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

let btnGuardar = document.querySelector(".guardar");
let inputNombre = modal.querySelector("input[placeholder='Nombre de la tarea']");
let inputAsignado = modal.querySelector("input[placeholder='Asignado a']");
let inputFecha = modal.querySelector("input[placeholder='Fecha entrega']");
let selectEstado = modal.querySelector(".estate");
let asigTareas = document.querySelector(".asigtareas");
let asigPersona = document.querySelector(".asigpersona");
let asigFecha = document.querySelector(".asigfecha");
let asigProg = document.querySelector(".asigprog");


function obtenerAsignaciones() {
    let datos = localStorage.getItem("asignaciones");
    return datos ? JSON.parse(datos) : [];
}


function guardarAsignaciones(asignaciones) {
    localStorage.setItem("asignaciones", JSON.stringify(asignaciones));
}


function cargarAsignaciones() {
    let asignaciones = obtenerAsignaciones();

    asignaciones.forEach((asignacion, index) => {
       
        let tareaDiv = document.createElement("div");
        tareaDiv.classList.add("tareahecha");
        tareaDiv.innerHTML = `
            <span class="work">${asignacion.nombre}</span>
            <button class="eliminar" data-index="${index}">X</button>
        `;
        asigTareas.appendChild(tareaDiv);

        let personaDiv = document.createElement("div");
        personaDiv.classList.add("usuarioasignado");
        personaDiv.textContent = asignacion.persona;
        asigPersona.appendChild(personaDiv);

        let fechaDiv = document.createElement("div");
        fechaDiv.classList.add("fechalista");
        fechaDiv.textContent = asignacion.fechasignada;
        asigFecha.appendChild(fechaDiv);

        let progDiv = document.createElement("div");
        progDiv.classList.add("estadolisto");
        progDiv.textContent = asignacion.estateTexto;
        progDiv.style.color = asignacion.estateColor; 
        asigProg.appendChild(progDiv);
    });

    
    document.querySelectorAll(".eliminar").forEach(boton => {
        boton.addEventListener("click", function() {
            let index = this.getAttribute("data-index");
            eliminarAsignacion(index);
        });
    });
}


btnGuardar.addEventListener("click", function() {
    let nombreTarea = inputNombre.value;
    let asignado = inputAsignado.value;
    let fechaEntrega = inputFecha.value;
    let estado = selectEstado.options[selectEstado.selectedIndex];
    let estadoTexto = estado.text;

   
    let nuevaAsignacion = {
        nombre: nombreTarea,
        persona: asignado,
        fechasignada: fechaEntrega,
        estateTexto: estadoTexto,
    };

    
    let asignaciones = obtenerAsignaciones();

   
    asignaciones.push(nuevaAsignacion);

   
    guardarAsignaciones(asignaciones);

    
    let tareaDiv = document.createElement("div");
    tareaDiv.classList.add("tareahecha");
    tareaDiv.innerHTML = `
        <span class="work">${nombreTarea}</span>
        <button class="eliminar" data-index="${asignaciones.length - 1}">X</button>
    `;
    asigTareas.appendChild(tareaDiv);

    let personaDiv = document.createElement("div");
    personaDiv.classList.add("usuarioasignado");
    personaDiv.textContent = asignado;
    asigPersona.appendChild(personaDiv);

    let fechaDiv = document.createElement("div");
    fechaDiv.classList.add("fechalista");
    fechaDiv.textContent = fechaEntrega;
    asigFecha.appendChild(fechaDiv);

    let progDiv = document.createElement("div");
    progDiv.classList.add("estadolisto");
    progDiv.textContent = estadoTexto;
    asigProg.appendChild(progDiv);

    
    tareaDiv.querySelector(".eliminar").addEventListener("click", function() {
        let index = this.getAttribute("data-index");
        eliminarAsignacion(index);
    });

    
    modal.style.display = "none";

   
    inputNombre.value = "";
    inputAsignado.value = "";
    inputFecha.value = "";
    selectEstado.selectedIndex = 0; 
});


function eliminarAsignacion(index) {
    let asignaciones = obtenerAsignaciones();
    asignaciones.splice(index, 1);
    guardarAsignaciones(asignaciones);
    
    actualizarVista();
}


function actualizarVista() {
   
    asigTareas.innerHTML = '';
    asigPersona.innerHTML = '';
    asigFecha.innerHTML = '';
    asigProg.innerHTML = '';

   
    cargarAsignaciones();
}


cargarAsignaciones();
