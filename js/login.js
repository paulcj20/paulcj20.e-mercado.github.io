// Constantes Botones
const $btnSignIn = document.querySelector('.sign-in-btn'),
        $btnSingUp = document.querySelector('.sign-up-btn'),
        $signUp = document.querySelector('.sign-up'),
        $signIn = document.querySelector('.sign-in');
// Constantes Login
const emailLogin = document.querySelector('.emailLogin');
const passwdLogin = document.querySelector('.passwdLogin');
const btnIniciarSesion = document.querySelector('.btnIniciarSesion');
// Constantes Registro
const nombreApellido = document.querySelector('.nombreApellido');
const email = document.querySelector('.email');
const passwd = document.querySelector('.passwd');
const passwd2 = document.querySelector('.passwd2');
const btnRegistrar = document.querySelector('.btnRegistrar')
//Escuchador Login/Registro
document.addEventListener('click', e => {
    if (e.target === $btnSignIn || e.target === $btnSingUp) {
        $signIn.classList.toggle('active');
        $signUp.classList.toggle('active')
    }
})

btnIniciarSesion.addEventListener('click', validationLogin);
btnRegistrar.addEventListener('click', validationRegis)

function validationLogin(){
    if(emailLogin.value && passwd.value) {
          window.location = "index.html";
    }
}

function validationRegis() {
    
}

