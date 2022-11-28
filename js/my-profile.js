const firstName = document.getElementById('first-name');
const secondName = document.getElementById('second-name');
const firstSurname = document.getElementById('first-surname');
const secondSurname = document.getElementById('second-surname');
const inputEmail = document.getElementById('email');
const inputTel = document.getElementById('tel');
const btnAccept = document.getElementById('btn-accept');
const modalInvalidFeedback = document.getElementById('modal-invalid-feedback');
const btnCloseAlert = document.getElementById('btnCloseAlert');
const inputImage = document.getElementById('inputImage');
const containerImage = document.getElementById('container-image');
let email = localStorage.getItem('email');

let appendUserData = () => {
    if(localStorage.getItem('dataUser') == undefined){
        inputEmail.value = email;
    }else {
        let dataUser = JSON.parse(localStorage.getItem('dataUser'));
        firstName.value = dataUser.name;
        secondName.value = dataUser.name2;
        firstSurname.value = dataUser.lastname;
        secondSurname.value = dataUser.lastname2;
        inputEmail.value = dataUser.email;
        inputTel.value = dataUser.tel;
        
        var fileReader = new FileReader();

        fileReader.onload = function(fileLoadedEvent){
            var srcData = fileLoadedEvent.target.result; // <--- data: base64
            var newImage = document.createElement('img');
            newImage.src = src;
            newImage.classList.add('image-profile')
            containerImage.innerHTML = newImage.outerHTML;
        }
        
        fileReader.readAsDataURL(dataUser.img);

    }
};

let encodeImageFileAsURL = () => {
    var filesSelected = document.getElementById("inputImage").files;
    console.log(filesSelected[0]);
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];
        console.log(fileToLoad);
      var fileReader = new FileReader();

      fileReader.onload = function(fileLoadedEvent) {
        var srcData = fileLoadedEvent.target.result; // <--- data: base64

        var newImage = document.createElement('img');
        newImage.src = srcData;
        newImage.classList.add('image-profile')
        containerImage.innerHTML = newImage.outerHTML;
        let user = JSON.parse(localStorage.getItem('dataUser'));
        user.img = toString(fileToLoad)
        localStorage.setItem('dataUser', JSON.stringify(user));
      }
      fileReader.readAsDataURL(fileToLoad);

    }
};

btnAccept.addEventListener('click', () => {
    if(firstName.value == "" || firstSurname.value == "" || inputTel == ""){
        modalInvalidFeedback.classList.add('d-flex');
        modalInvalidFeedback.classList.remove('d-none');
    }else {
        modalInvalidFeedback.classList.add('d-none');
        modalInvalidFeedback.classList.remove('d-flex');
        let user = {
            name: firstName.value,
            name2: secondName.value,
            lastname: firstSurname.value,
            lastname2: secondSurname.value,
            email: inputEmail.value,
            tel: inputTel.value,
            img: ''
        }
        localStorage.setItem('dataUser', JSON.stringify(user));
        encodeImageFileAsURL();
    }
});


document.addEventListener('DOMContentLoaded', () => {
    appendUserData();
});