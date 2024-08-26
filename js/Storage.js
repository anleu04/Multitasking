const LOCAL_STORAGE_KEY_ASSIGMENTS = 'lista_tareas';

function guardarAsignaciones(asignaciones) {
    localStorage.setItem(LOCAL_STORAGE_KEY_ASSIGMENTS, JSON.stringify(asignaciones))
}
function obtenerAsignaciones() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_ASSIGMENTS)) || [];
}

export {LOCAL_STORAGE_KEY_ASSIGMENTS, guardarAsignaciones, obtenerAsignaciones}