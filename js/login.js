// Constantes Botones
const $btnSignIn = document.querySelector('.sign-in-btn'),
        $btnSingUp = document.querySelector('.sign-up-btn'),
        $signUp = document.querySelector('.sign-up'),
        $signIn = document.querySelector('.sign-in');
// Constantes Login
const emailLogin = document.querySelector('.emailLogin');
const passwdLogin = document.querySelector('.passwdLogin');
const btnIniciarSesion = document.querySelector('.btnIniciarSesion');
const btnGoogle = document.querySelector('g-signin2');
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

btnIniciarSesion.addEventListener("click", function(){
    const palert = document.querySelector('.login-alert');
    if(!emailLogin.value && !passwdLogin.value){
        palert.innerHTML = "Debes completar todos los campos."
    }else if(!emailLogin.value.includes('@')){
        palert.innerHTML = "El email ingresado no es válido."
    }else{
        sessionStorage.setItem('logued','true');  
        localStorage.setItem('email', emailLogin.value);
        window.location = "index.html";

    }
});
btnRegistrar.addEventListener("click", function() {

});

function validar(){
    sessionStorage.setItem('logued', 'true');
    window.location.href = "index.html";
}

function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

function handleCredentialResponse(response) {
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response
    const responsePayload = decodeJwtResponse(response.credential);
    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);
    localStorage.setItem('email', responsePayload.email)
    validar(); 
}

 


 




