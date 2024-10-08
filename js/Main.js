import { nombres } from "./Base.js"

let login = document.querySelector(".login")

login.innerHTML = `
    <div class="bnv">Bienvenido a Multitasking</div>
    <span class="titulo">Iniciar Sesion</span>
    <input type="email" class="email" placeholder="Usuario o Correo">
    <input type="password" name="" class="contra" placeholder="Contraseña">
    <button class="beta">Probar beta</button>
    <button class="iniciar">Iniciar</button>
    <button class="crear">Crear cuenta</button>
    <footer class="footer">
        <img src="../IMG/logo.png" alt="">
        <h1>Santa Catalina Laboure</h1>
        <h2>jbanleu@scl.edu.gt</h2>
    </footer>
`

let betapag = document.querySelector(".beta")
let inipag = document.querySelector(".iniciar")
let emailInput = document.querySelector(".email")
let contraInput = document.querySelector(".contra")

betapag.addEventListener("click", function() {
    window.location.href = "index_2.html"
})

inipag.addEventListener("click", function () {
    let email = emailInput.value
    let contra = contraInput.value
    
   
    let usuarioValido = nombres.some(user => user.correo === email && user.contra === contra)

    if (usuarioValido) {
       
        window.location.href = "index_2.html"
    } else {
       
        alert("Correo o contraseña incorrectos.")
    }
})
