/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import gatewayService, { GatewayService } from './services/gateway.service.js';
import filedataService from './services/filedata.service.js';
import sessionService from './services/session.service.js';
import * as attention from './attention.js';
import * as Utils from './utils.js';

require('./favicon.ico');

// images references in the manifest
import "../../assets/icon-16.png";
import "../../assets/icon-32.png";
import "../../assets/icon-80_1.png";

/* global document, Office, Word */

let prodEnvironment;
let haveCamera;
let userIp;
let iter = 0;
let terms = [];
let customerFirstName;
let userFromOffice = false;
let userIsActive = false;
let isNewUser = false;
let counter = 0;
let outsideOffice = false;
const data = {
  email: "",
  password: "",
}

Office.onReady(info => {
  outsideOffice = (localStorage.getItem('outsideOffice') == 'true');
  //localStorage.setItem('userFromOffice', userFromOffice);
  if(userFromOffice){
    console.log("Comienzo");
  }
  
  console.log(localStorage.getItem('word-document-name1'));
  console.log(localStorage.getItem('word-document1')); 
  //console.log(info.document.Name);
  if (info.host === Office.HostType.Word || info.host === Office.HostType.Excel || info.host === Office.HostType.PowerPoint) {
    getEnvironment();
    Utils.detectWebcam().then((value) => {
      haveCamera = value;
    });
    filedataService.getIp().then((respuesta) => {      
      userIp = respuesta.ip;
      console.log('userIp');
      console.log(userIp);
    }).catch(() => {
      userIp = '127.0.0.1';
    }).then(() =>{
      localStorage.setItem('userIp', userIp);
      //Begin Auth
      if(localStorage.getItem('user') !== null && localStorage.getItem('noob') !== '0' && !outsideOffice) {
        data.email = localStorage.getItem('user');
        document.getElementById("email").value = localStorage.getItem('user');
        document.getElementById("firstName").value = localStorage.getItem('firstName');
        document.getElementById("lastName").value = localStorage.getItem('lastName');
        document.getElementById("customerMobile").value = localStorage.getItem('customerMobile');
        document.getElementById("header").style.paddingTop = '10px';
        document.getElementById('welcome-message').innerHTML = 'Verifica tu información:';
        for (let element of document.getElementsByClassName("secondScreen")){
          element.style.display="none";
       }
        moveTitles();

        onInput();
        submit();
      } 
      //End Auth
    });
   
    
    
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("email-field").oninput = onInput;
    document.getElementById("password-field").oninput = onInput;
    document.getElementById("login-form").onsubmit = onSubmit;
   
  }
});


function onInput(event) {
  if(event !== undefined){
    event.preventDefault();
    const { id, value } = event.target;
    data[id] = value;
  } 
  console.log("ON INPUT");
}

function onSubmit(event) {
  if(event !== undefined){
  event.preventDefault();
  }
  document.getElementById("load-banner").style.display ="block";

  if (localStorage.getItem('noob') === '1' && localStorage.getItem('authId') === '0') {
    //Start Create User
    console.log('Inicio Proceso Creacion');
    localStorage.setItem('authId', '1');
    data.email = localStorage.getItem('user');
    validateEmail();
    document.getElementById("load-banner").style.display ="none";
    return;
  }

  const passDOM = document.getElementById('password');
  if(passDOM.value !== ""){
    data.password = passDOM.value;
  }
  
  if (data.password === "") { 
    console.log("first val");
    validateEmail();
    //document.getElementById("load-banner").style.display = "none";
    return;
  }
  submit();
  //document.getElementById("load-banner").style.display = "none";
}

function getEnvironment() {
  prodEnvironment = window.location.href === 'https://app.mifirma.co/';
}

function submit() {
  counter++;
  console.log(`Attempt # ${counter} to submit...`);
  document.getElementById("load-banner").style.display ="block";


  
  if (data.password === "") { 
    validateEmail();
    //document.getElementById("load-banner").style.display = "none";
    return;
  }
  if (data.email === "" && data.password === "") {    
    showInputInvalid();
    return;
  }

  if(isNewUser) {
    console.log(`autenticating this new user with ${sessionService.authId} and ${data.password}`);
  } else {
    console.log(`no authentication has been done, will be done with ${sessionService.authId}`);
  }

  gatewayService.validate(sessionService.authId, data.password)
    .then((respuesta) => {
      if (respuesta.data.hit) {
        var providedToken = respuesta.data.nextStep.properties.TOKEN;
        if(typeof providedToken !== 'undefined'){
          localStorage.setItem('token', providedToken);
          window.resizeTo(1200, 650);
          window.location.href = 'documentos.html'
          //window.location.href = 'https://olsrvpruwtce01:6242/dist/documentos.html'
        } else {
          document.getElementById("load-banner").style.display = "none";
          new attention.Alert({
            title: 'Error en el Backend',
            content: 'No se ha definido el Token de autorización'
        });
        }
        
        //
        //routerInstance.navigate('/firmador');
      } else {
        clearForm();
        document.getElementById("load-banner").style.display = "none";
        document.getElementById("password-error").style.display = "block";
        document.getElementById('password').style.borderColor = 'tomato';
        new attention.Alert({
          title: 'Error de autenticación',
          content: 'Contraseña Incorrecta'
      });
        //console.log('Contraseña Incorrecta');
      }
    }).catch((response) => {
      console.log(response);
      if (response.error && response.error.statusCode === 403) {
        document.getElementById("password-error").style.display = "block";
        document.getElementById('password-error').style.borderColor = 'tomato';
        document.getElementById('password-error').textContent= 'Superó el máximo de intentos de autenticación, su usuario ha sido bloqueado por medidas de seguridad';
        console.log('Superó el máximo de intentos de autenticación, su usuario ha sido bloqueado por medidas de seguridad');
        //this.router.navigateByUrl('');
      } else {
        //this.router.navigateByUrl('main/errorMifirma', { skipLocationChange: true });
      }
    });
}

function clearForm() {
  data.password = "";
}

/**
* Executes the login process
*/
function validateEmail() {
  data.email = document.getElementById("email").value;
  if (data.email === "") {
    showInputInvalid();
    return;
  }

  const isMobile = window.innerWidth <= 640;
  const isTablet = !isMobile && window.innerWidth <= 800;
  const isDesktop = !isMobile && !isTablet;

  const windowInfo = Utils.datosMaquina(window);

  console.log('Validating...');
  if(isNewUser){
    console.log('this is a new user');
  }
  gatewayService.validateUser(
    data.email,
    '',
    userIp,
    windowInfo.browser,
    '',
    windowInfo.os,
    isMobile,
    isTablet,
    isDesktop,
    haveCamera,
    false,
    false
  ).then((respuesta) => {
    if (respuesta.data.userExists) {
      console.log('Logeando user exist...');
      login(respuesta);
    } else {
      //User not found, lets create one
      const required1 = document.createAttribute("required");
      const required2 = document.createAttribute("required");
      const required3 = document.createAttribute("required");
      const required4 = document.createAttribute("required");
      document.getElementById("datos").attributes.setNamedItem(required1);
      document.getElementById("terms").attributes.setNamedItem(required2);
      document.getElementById("customerMobile").attributes.setNamedItem(required3);
      document.getElementById("firstName").attributes.setNamedItem(required4);
      localStorage.setItem('authId', respuesta.data.authId);
      iter++;
      console.log('Creando este nuevo usuario iter:');
      if (localStorage.getItem('userFromOffice') && userFromOffice){
        console.log('El usuario viene de office');
      } else {
        console.log('El usuario NO viene de office');
      }
      console.log(iter);
      //console.log(respuesta);
      for (let element of document.getElementsByClassName("thirdScreen")){
        element.style.display="block";
     }
      var contentFromLS;
      userFromOffice = (localStorage.getItem('userFromOffice') == 'true');
      if (userFromOffice && !outsideOffice){
        contentFromLS = getIdFromOffice();
        console.log('El usuario SI viene de office');
        RefreshLayout(); //To hide password and password confirm
      } else {
        console.log('El usuario NO viene de office');
        localStorage.setItem('user', data.email);
        document.getElementById("header").style.paddingTop = '10px';
        document.getElementById('welcome-message').innerHTML = 'Verifica tu información:';
        const req1 = document.createAttribute("required");
        const req2 = document.createAttribute("required");
        document.getElementById("password1").attributes.setNamedItem(req1);
        document.getElementById("password2").attributes.setNamedItem(req2);

        //return;
      }
      console.log(`fetched: ${contentFromLS}`);

      if(iter>1){
        
        console.log(`iteracion: ${iter}`);
        //Verificar contraseña
        var pass1 = document.getElementById('password1');
        var pass2 = document.getElementById('password2');
        var isValid = pass1.classList.contains('valid');
        console.log(`isvalid: ${isValid}`);
        if (!isValid && !userFromOffice){
          document.getElementById('load-banner').style.display = 'none';
          return;
        }
        if(userFromOffice && !isNewUser){
          createNewUser();
        } else if (outsideOffice && !isNewUser){
          createNewUser();
        }
      } 

      if(!userIsActive && iter>1){
        return;
      }

      //after SUCCESS:
      document.getElementById("load-banner").style.display = "none";
      
      document.getElementById("user-error").style.display = "block";
      
      //document.getElementById('email').style.borderColor = 'tomato';

      /*new attention.Alert({
        title: 'Usuario creado!...',
        content: `auth: ${respuesta.data.authId}`
    });   */
      //console.log("user does not exist")
    }
  }).catch((response) => {
    console.log("user error", response);
    if (response.error && response.error.statusCode === 403) {
      new attention.Alert({
        title: 'Error de autenticación',
        content: 'Su usuario ha sido bloqueado por medidas de seguridad, intente más tarde'
    });
      //this.toastr.error('Su usuario ha sido bloqueado por medidas de seguridad, intente más tarde');
    } else {
      //routerInstance.navigate('main/errorMifirma');
    }
  });
}

function RefreshLayout(){
  var pass1 = document.getElementById('pass1'),
    pass2 = document.getElementById('pass2'),
    password1 = document.getElementById('password1'),
    password2 = document.getElementById('password2');
    pass1.style.display = 'none';
    pass2.style.display = 'none';
    document.getElementById("email").disabled = true;
    password1.value = localStorage.getItem('homeAccountIdentifier');
    password2.value = password1.value;
}

function createNewUser(){
  document.getElementById('load-banner').style.display = 'block';
  console.log('pass:');
  console.log(document.getElementById('password1').value);
  document.getElementById("load-banner").style.display = "block";
  gatewayService.createCustomer(
    sessionService.firstName, 
    sessionService.lastName,  
    document.getElementById('password1').value, 
    sessionService.user, 
    sessionService.customerMobile, 
    sessionService.userIp
    ).then((Respuesta) => {
      if(Respuesta.status === 'Created' && Respuesta.statusCode === 201){
        console.log(Respuesta.message);
        localStorage.setItem('idCustomer', Respuesta.data.idCustomer);
        validateThisUser();
      } else {
        console.log("ERROR:");
        console.log(Respuesta);
        return;
      }
      
  });
//Process
//then
  
}

function validateThisUser() {
  document.getElementById("load-banner").style.display = "block";
  gatewayService.validate(
    sessionService.authId,
    ""
    ).then((Respuesta) =>{
      
      if (Respuesta.data.hit && Respuesta.data.nextStep.process === 'OTP') {
        askOTPfromUser();
      } else {
        console.log("ERROR:");
        console.log(Respuesta);
        return;
      }
  });
}

function askOTPfromUser(){
  timeDown();
  document.getElementById("load-banner").style.display = "none";
  const modal = document.getElementById("otp-modal");
  //modal.style.overflow = "hidden";
  document.querySelector(".MF-inner").style.overflow = "hidden";
  modal.style.display = "flex";
  const form = document.getElementById("otp-form");
  const phoneNumber = localStorage.getItem("phoneUser");
  const resendCode = document.getElementById('resend-code');
  resendCode.addEventListener('click', function (){
    document.getElementById('load-banner').style.display = 'block';
    const windowInfo = Utils.datosMaquina(window);
    const isMobile = window.innerWidth <= 640;
    const isTablet = !isMobile && window.innerWidth <= 800;
    const isDesktop = !isMobile && !isTablet;
    gatewayService.validateUser(
      data.email,
      '',
      userIp,
      windowInfo.browser,
      '',
      windowInfo.os,
      isMobile,
      isTablet,
      isDesktop,
      haveCamera,
      false,
      false,
      5,
      sessionService.authId
    ).then((respuesta) => {
      if(respuesta.statusCode == 200){
        timeDown();
        console.log('Resend code successfull');
        document.getElementById('load-banner').style.display = 'none';
      }
    });
    //validateThisUser();
  });
  document.getElementById("phoneUs").innerHTML = phoneNumber;
  
  form.addEventListener("submit", e => {
      e.preventDefault();
      const pin = document.getElementById("opt-input").value; 
      document.getElementById("load-banner").style.display = "block";
      console.log(`the pin: ${pin}`);
      gatewayService.validate(
        sessionService.authId, 
        pin
        ).then((Respuesta) => {
          if (Respuesta.data.hit) {
            console.log('Que falta?');
            console.log(Respuesta);
            gatewayService.acceptTerms(
              sessionService.userIp, 
              sessionService.idCustomer
              ).then((Resp) => {
                if (Resp.success){
                  addToMiFirma();
                }
            });            

          } else { //repeat OTP
            document.getElementById('otp-error').style.display = 'block';
            document.getElementById('otp-error').innerText='Código Incorrecto';
            console.log(Respuesta);
            askOTPfromUser();
          }
      });
  });


}

function addToMiFirma(){
  let auth_code;
  gatewayService.addToMiFirma(
    sessionService.firstName + ' ' + sessionService.lastName,
    sessionService.user,
    sessionService.customerMobile
    ).then((Resp) => {
      if(Resp.status_code === 201){
        gatewayService.getValidationParameter(
          sessionService.user
        ).then((Respuesta) => {
          if(Respuesta.statusCode == 200) {
            auth_code = Respuesta.message;
            const activationMessage = sessionService.user + '&&&' + auth_code;
            const activationBase64 = window.btoa(activationMessage);
            gatewayService.activateAccount(
              activationBase64
              ).then((Resp) => {
                if(Resp.statusCode == 200){
                  showSuccess();
                } else {
                  showProcessError();
                }
              });
          } else {
            showProcessError();
          }
        });     
      } else {
        showProcessError();
      }
    });
}

function showSuccess() {
  isNewUser = true;
  document.getElementById("load-banner").style.display = "none";
  document.querySelector(".MF-inner").style.overflow = "hidden";
  const modal = document.getElementById("otp-modal");
  //modal.style.overflow = "hidden";
  const modalContent = document.getElementById("modal-content");
  modal.style.display = "flex";
  modalContent.innerHTML = `
  <div class="success-animation">
<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
</div>
  <h2>Todo salió bien</h2>
  <p>Ya puedes comenzar a usar MiFirma</p>
    <div class="MF-center">
      <button class="MF-button3" id="end-process">Firmar ahora</button>
    </div>
  `;
  document.getElementById('end-process').addEventListener('click', function (){
    
    data.email = sessionService.user;
    if (userFromOffice){
      data.password = sessionService.authority;
    } else {
      data.password = document.getElementById('password1').value;
    }
    console.log(`Iniciando Sesion... con ${data.email} y ${data.password}`); 
    validateEmail(); //this should refresh authid
  }); 
}

function showProcessError() {
  isNewUser = false;
  document.getElementById("load-banner").style.display = "none";
  const modal = document.getElementById("otp-modal");
  const modalContent = document.getElementById("modal-content");
  modal.style.display = "flex";
  modalContent.innerHTML = `<h2>Algo salió mal</h2>
  <p>Por favor intente nuevamente mas tarde</p>`;
}

function login(respuesta) {
  localStorage.setItem('personaNombre',
    `${respuesta.data.user.customerFirstName} ${respuesta.data.user.customerLastName}`);
  localStorage.setItem('phoneUser', respuesta.data.user.customerMobile);
  localStorage.setItem('correo', data.email);
  localStorage.setItem('personaId', respuesta.data.user.idCustomer);
  localStorage.setItem('authId', respuesta.data.authId);

  nextStep(respuesta);
}

function nextStep(respuesta) {
  console.log('Next step:')
  console.log(respuesta.data.nextStep.process);
  switch (respuesta.data.nextStep.process) {
    case 'Registro':
      console.log('Registrando Usuario...');//not active
      break;
    case 'Terminos':
      processTerms(respuesta);
      break;
    case 'Facial':
      routerInstance.navigate(['login/facial']);
      break;
    case 'OTP':
      routerInstance.navigate(['login']);
      break;
    case 'Password':
      const fromOffice = (localStorage.getItem('userFromOffice') == 'true');
      if(fromOffice) {
        var content = getIdFromOffice();
        console.log(content);
        document.getElementById("password").value = sessionService.authority;
        data.password = document.getElementById("password").value;
        console.log('key: ');
        console.log(data.password);
        submit();
      } else if(isNewUser) {
        document.getElementById("password").value = document.getElementById("password1").value;
        data.password = document.getElementById("password").value;
        console.log('key: ');
        console.log(data.password);
        submit();
      }
      else {
        const requiredField = document.createAttribute("required");
        document.getElementById("customerName").innerText = localStorage.getItem('personaNombre');
        document.getElementById("password").attributes.setNamedItem(requiredField);
        document.getElementById("submit-btn").textContent = "Ingresar";
        document.getElementById("load-banner").style.display = "none";
        for (let element of document.getElementsByClassName("firstScreen")){
          element.style.display="none";
        }
        for (let element of document.getElementsByClassName("secondScreen")){
          element.style.display="block";
        }
      }
    break;
  }
}

function processTerms(respuesta) {
  if (JSON.stringify(respuesta.data.nextStep.properties) == '{}') {
    gatewayService.validate(respuesta.data.authId, '').then((Respuesta) => {
      if (!respuesta.data.user.isActive) {
        //routerInstance.navigate(['registro/activar/cuenta']);
      } else {
        nextStep(Respuesta);
      }
    }).catch((response) => {
      console.log(response)
      if (response.error && response.error.statusCode === 403) {
        console.log('Su usuario ha sido bloqueado por medidas de seguridad, intente más tarde');
      } else {
        // routerInstance.navigate('main/errorMifirma');
      }
    });
  } else {
    console.log("Unhandled Terms! ");
    document.getElementById("load-banner").style.display = "none";
      new attention.Alert({
        title: 'Terminos y condiciones',
        content: 'Hemos actualizado nuestros términos y condiciones'
    });  
    for (let i in respuesta.data.nextStep.properties) {
      terms.push(+respuesta.data.nextStep.properties[i]);
    }
    console.log(terms);
    // this.fdService.terms(this.terms);
    if (!respuesta.data.user.isActive) {
      localStorage.setItem('noActive', 'false');
    }
    //routerInstance.navigate(['login/terminos']);
  }
}

function showInputInvalid() {
  document.getElementById("load-banner").style.display = "none";
  new attention.Alert({
        title: 'Error de autenticación',
        content: 'Correo o contraseña inválidos'
    }); 
  //console.log("invalid input")
}

var modalTerms = document.getElementById("terms-modal");

// Get the button that opens the modal
var btn1 = document.getElementById("list-terms");
var btn2 = document.getElementById("list-data");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn2.onclick = function() {
  document.getElementById("load-banner").style.display = "block";
  let HTMLContent = "Empty String 2";  
  gatewayService.getUserTerms().then((Respuesta) => {
    if(Respuesta.statusCode == 200){
      HTMLContent = Respuesta.data[0].template;
      document.getElementById("MF-cont").innerHTML = HTMLContent.toString();
      //console.log(HTMLContent);
      document.getElementById("load-banner").style.display ="none";
    }
  });
  modalTerms.style.display = "block";
  //document.getElementById("load-banner").style.display ="none";
}

btn1.onclick = function() {
  document.getElementById("load-banner").style.display = "block";
  let HTMLContent = "Empty String 1";
  gatewayService.getUserTerms().then((Respuesta) => {
    if(Respuesta.statusCode == 200){
      HTMLContent = Respuesta.data[1].template;
      document.getElementById("MF-cont").innerHTML = HTMLContent.toString();
      //console.log(HTMLContent);
      document.getElementById("load-banner").style.display ="none";
    }
  });
  modalTerms.style.display = "block";
  //document.getElementById("load-banner").style.display ="none";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modalTerms.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalTerms ) {
    modalTerms.style.display = "none";
  }
}

/**Front Password Validation */
document.getElementById("password1").addEventListener("focus", validatePassword);
document.getElementById("password1").addEventListener("focusout", () =>{
    document.getElementById('float-validation').style.display = 'none';
});

function validatePassword(){
    document.getElementById('float-validation').style.display = 'block';
}


(function(){
  var password = document.getElementById('password1');
var passwordConfirm = document.getElementById('password2');
  
  var helperText = {
      charLength: document.querySelector('.helper-text .length'),
      lowercase: document.querySelector('.helper-text .lowercase'),
      uppercase: document.querySelector('.helper-text .uppercase'),
      special: document.querySelector('.helper-text .special'),
    match: document.querySelector('.helper-text .match')
  };
  
  var pattern = {
      charLength: function() {
          if( password.value.length >= 8 ) {
              return true;
          }
      },
      lowercase: function() {
          var regex = /^(?=.*[a-z]).+$/; // Lowercase character pattern

          if( regex.test(password.value) ) {
              return true;
          }
      },
      uppercase: function() {
          var regex = /^(?=.*[A-Z]).+$/; // Uppercase character pattern

          if( regex.test(password.value) ) {
              return true;
          }
      },
      special: function() {
          var regex = /^(?=.*[0-9_\W]).+$/; // Special character or number pattern

          if( regex.test(password.value) ) {
              return true;
          }
      }, 
    match: function() {
          if( password.value == passwordConfirm.value ) {
              return true;
          }
      }   
  };
  
  // Listen for keyup action on password field
password.addEventListener('keyup', function (){
      // Check that password is a minimum of 8 characters
      patternTest( pattern.charLength(), helperText.charLength );
      
      // Check that password contains a lowercase letter      
      patternTest( pattern.lowercase(), helperText.lowercase );
      
      // Check that password contains an uppercase letter
      patternTest( pattern.uppercase(), helperText.uppercase );
      
      // Check that password contains a number or special character
      patternTest( pattern.special(), helperText.special );
  // Check that passwords matches
      patternTest( pattern.match(), helperText.match );
  
  // Check that all requirements are fulfilled
  if( hasClass(helperText.charLength, 'valid') &&
            hasClass(helperText.lowercase, 'valid') && 
            hasClass(helperText.uppercase, 'valid') && 
            hasClass(helperText.special, 'valid') && 
            hasClass(helperText.match, 'valid')
      ) {
          addClass(password, 'valid');
          addClass(passwordConfirm, 'valid');
          removeClass(password, 'invalid');
          removeClass(passwordConfirm, 'invalid');
  }
  else {
    removeClass(password, 'valid');
    removeClass(passwordConfirm, 'valid');
    addClass(password, 'invalid');
    addClass(passwordConfirm, 'invalid');
  }
  });

passwordConfirm.addEventListener('keyup', function (){
      // Check that password is a minimum of 8 characters
      patternTest( pattern.charLength(), helperText.charLength );
      
      // Check that password contains a lowercase letter      
      patternTest( pattern.lowercase(), helperText.lowercase );
      
      // Check that password contains an uppercase letter
      patternTest( pattern.uppercase(), helperText.uppercase );
      
      // Check that password contains a number or special character
      patternTest( pattern.special(), helperText.special );
  // Check that passwords matches
      patternTest( pattern.match(), helperText.match );
  
  // Check that all requirements are fulfilled
  if( hasClass(helperText.charLength, 'valid') &&
            hasClass(helperText.lowercase, 'valid') && 
            hasClass(helperText.uppercase, 'valid') && 
            hasClass(helperText.special, 'valid') && 
            hasClass(helperText.match, 'valid')
      ) {
          addClass(password, 'valid');
          addClass(passwordConfirm, 'valid');
          removeClass(password, 'invalid');
          removeClass(passwordConfirm, 'invalid');
  }
  else {
    removeClass(password, 'valid');
    removeClass(passwordConfirm, 'valid');
    addClass(password, 'invalid');
    addClass(passwordConfirm, 'invalid');
  }
  });
  
  function patternTest(pattern, response) {
      if(pattern) {
    addClass(response, 'valid');
    removeClass(response, 'invalid');
  }
  else {
    removeClass(response, 'valid');
    addClass(response, 'invalid');
  }
  }
  
  function addClass(el, className) {
      if (el.classList) {
          el.classList.add(className);
      }
      else {
          el.className += ' ' + className;
      }
  }
  
  function removeClass(el, className) {
      if (el.classList)
              el.classList.remove(className);
          else
              el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
  
  function hasClass(el, className) {
      if (el.classList) {
          return el.classList.contains(className);    
      }
      else {
          new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className); 
      }
  }
  
})();
/**Front Password Validation */

const userFirstName = document.querySelector('#firstName');
const userLastName = document.querySelector('#lastName');
const customerMobile = document.querySelector('#customerMobile');
const togglePassword = document.querySelector('#togglePassword');
const togglePassword1 = document.querySelector('#togglePassword1');
const togglePassword2 = document.querySelector('#togglePassword2');
const password = document.querySelector('#password');
const password1 = document.querySelector('#password1');
const password2 = document.querySelector('#password2');

userFirstName.addEventListener('keyup', function (){
  localStorage.setItem('firstName', userFirstName.value);
});

userLastName.addEventListener('keyup', function (){
  localStorage.setItem('lastName', userLastName.value);
});

customerMobile.addEventListener('keyup', function (){
  localStorage.setItem('customerMobile', customerMobile.value);
});

togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});
togglePassword1.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password1.getAttribute('type') === 'password' ? 'text' : 'password';
    password1.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});
togglePassword2.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password2.getAttribute('type') === 'password' ? 'text' : 'password';
    password2.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});
//new code for adding vanilla store (from main.js)

function getIdFromOffice() {
  var wantedId = 0;
  var keys = Object.keys(localStorage),
      i = keys.length;
  while ( i-- ) {
      var str = keys[i];
      if(str.startsWith("{")){
        var obj = JSON.parse(str);
        //console.log(obj);
        for (var [key, value] of Object.entries(obj)) {
          localStorage.setItem(key, value);
          if(key === 'homeAccountIdentifier'){
            console.log(`found: ${key}: ${value}`);
            wantedId = value;
            userFromOffice = true;
            localStorage.setItem('userFromOffice', userFromOffice);
          }      
        }
      }
      
      }
  return wantedId;
}


$( ".MF-input" ).keyup(function() {
  //console.log($( this ).val());
  if($( this ).val() == ""){
  $( this ).siblings("label").switchClass( "MF-small", "MF-big", 300, "easeInOutQuad" );
  } else {
  $( this ).siblings("label").switchClass( "MF-big", "MF-small", 300, "easeInOutQuad" );
  }
    
  });


    function moveTitles() {
      $( ".MF-input" ).each(function() {
        if($( this ).val() == ""){
          $( this ).siblings("label").switchClass( "MF-small", "MF-big", 300, "easeInOutQuad" );
          } else {
          $( this ).siblings("label").switchClass( "MF-big", "MF-small", 300, "easeInOutQuad" );
          }
      });
    }

function timeDown(){
  document.getElementById("resend-code").style.display = 'none';
  var seconds = 31;

  // Update the count down every 1 second
  var x = setInterval(function() {

  seconds -=1;

    document.getElementById("resend").innerHTML ="Reenviar código en " + seconds + "s ";

    // If the count down is over, write some text 
    if (seconds < 0) {
      clearInterval(x);
      document.getElementById("resend-code").style.display = 'block';
      document.getElementById("resend").innerHTML = "";
    }
  }, 1000);
}