/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/icon-16.png":
/*!****************************!*\
  !*** ./assets/icon-16.png ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/icon-16.png";

/***/ }),

/***/ "./assets/icon-32.png":
/*!****************************!*\
  !*** ./assets/icon-32.png ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/icon-32.png";

/***/ }),

/***/ "./assets/icon-80_1.png":
/*!******************************!*\
  !*** ./assets/icon-80_1.png ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/icon-80_1.png";

/***/ }),

/***/ "./src/app/app.js":
/*!************************!*\
  !*** ./src/app/app.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_gateway_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/gateway.service.js */ "./src/app/services/gateway.service.js");
/* harmony import */ var _services_filedata_service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/filedata.service.js */ "./src/app/services/filedata.service.js");
/* harmony import */ var _services_session_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/session.service.js */ "./src/app/services/session.service.js");
/* harmony import */ var _attention_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./attention.js */ "./src/app/attention.js");
/* harmony import */ var _attention_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_attention_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils.js */ "./src/app/utils.js");
/* harmony import */ var _assets_icon_16_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../assets/icon-16.png */ "./assets/icon-16.png");
/* harmony import */ var _assets_icon_16_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_assets_icon_16_png__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _assets_icon_32_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../assets/icon-32.png */ "./assets/icon-32.png");
/* harmony import */ var _assets_icon_32_png__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_assets_icon_32_png__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _assets_icon_80_1_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../assets/icon-80_1.png */ "./assets/icon-80_1.png");
/* harmony import */ var _assets_icon_80_1_png__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_assets_icon_80_1_png__WEBPACK_IMPORTED_MODULE_7__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */




 // images references in the manifest




/* global document, Office, Word */

var prodEnvironment;
var haveCamera;
var userIp;
var iter = 0;
var terms = [];
var customerFirstName;
var userFromOffice = false;
var userIsActive = false;
var isNewUser = false;
var counter = 0;
var outsideOffice = false;
var data = {
  email: "",
  password: ""
};
Office.onReady(function (info) {
  outsideOffice = localStorage.getItem('outsideOffice') == 'true'; //localStorage.setItem('userFromOffice', userFromOffice);

  if (userFromOffice) {
    console.log("Comienzo");
  }

  console.log(localStorage.getItem('word-document-name1'));
  console.log(localStorage.getItem('word-document1')); //console.log(info.document.Name);

  if (info.host === Office.HostType.Word) {
    getEnvironment();
    _utils_js__WEBPACK_IMPORTED_MODULE_4__["detectWebcam"]().then(function (value) {
      haveCamera = value;
    });
    _services_filedata_service_js__WEBPACK_IMPORTED_MODULE_1__["default"].getIp().then(function (respuesta) {
      userIp = respuesta.ip;
      console.log('userIp');
      console.log(userIp);
    })["catch"](function () {
      userIp = '127.0.0.1';
    }).then(function () {
      localStorage.setItem('userIp', userIp); //Begin Auth

      if (localStorage.getItem('user') !== null && localStorage.getItem('noob') !== '0' && !outsideOffice) {
        data.email = localStorage.getItem('user');
        document.getElementById("email").value = localStorage.getItem('user');
        document.getElementById("firstName").value = localStorage.getItem('firstName');
        document.getElementById("lastName").value = localStorage.getItem('lastName');
        document.getElementById("customerMobile").value = localStorage.getItem('customerMobile');
        document.getElementById("header").style.paddingTop = '10px';
        document.getElementById('welcome-message').innerHTML = 'Verifica tu información:';

        var _iterator = _createForOfIteratorHelper(document.getElementsByClassName("secondScreen")),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var element = _step.value;
            element.style.display = "none";
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        moveTitles();
        onInput();
        submit();
      } //End Auth

    });
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("email-field").oninput = onInput;
    document.getElementById("password-field").oninput = onInput;
    document.getElementById("login-form").onsubmit = onSubmit;
  }
});

function onInput(event) {
  if (event !== undefined) {
    event.preventDefault();
    var _event$target = event.target,
        id = _event$target.id,
        value = _event$target.value;
    data[id] = value;
  }

  console.log("ON INPUT");
}

function onSubmit(event) {
  if (event !== undefined) {
    event.preventDefault();
  }

  document.getElementById("load-banner").style.display = "block";

  if (localStorage.getItem('noob') === '1' && localStorage.getItem('authId') === '0') {
    //Start Create User
    console.log('Inicio Proceso Creacion');
    localStorage.setItem('authId', '1');
    data.email = localStorage.getItem('user');
    validateEmail();
    document.getElementById("load-banner").style.display = "none";
    return;
  }

  var passDOM = document.getElementById('password');

  if (passDOM.value !== "") {
    data.password = passDOM.value;
  }

  if (data.password === "") {
    console.log("first val");
    validateEmail(); //document.getElementById("load-banner").style.display = "none";

    return;
  }

  submit(); //document.getElementById("load-banner").style.display = "none";
}

function getEnvironment() {
  prodEnvironment = window.location.href === 'https://app.mifirma.co/';
}

function submit() {
  counter++;
  console.log("Attempt # ".concat(counter, " to submit..."));
  document.getElementById("load-banner").style.display = "block";

  if (data.password === "") {
    validateEmail(); //document.getElementById("load-banner").style.display = "none";

    return;
  }

  if (data.email === "" && data.password === "") {
    showInputInvalid();
    return;
  }

  if (isNewUser) {
    console.log("autenticating this new user with ".concat(_services_session_service_js__WEBPACK_IMPORTED_MODULE_2__["default"].authId, " and ").concat(data.password));
  } else {
    console.log("no authentication has been done, will be done with ".concat(_services_session_service_js__WEBPACK_IMPORTED_MODULE_2__["default"].authId));
  }

  _services_gateway_service_js__WEBPACK_IMPORTED_MODULE_0__["default"].validate(_services_session_service_js__WEBPACK_IMPORTED_MODULE_2__["default"].authId, data.password).then(function (respuesta) {
    if (respuesta.data.hit) {
      var providedToken = respuesta.data.nextStep.properties.TOKEN;

      if (typeof providedToken !== 'undefined') {
        localStorage.setItem('token', providedToken);
        window.resizeTo(1200, 650);
        window.location.href = 'documentos.html'; //window.location.href = 'https://olsrvpruwtce01:6242/dist/documentos.html'
      } else {
        document.getElementById("load-banner").style.display = "none";
        new _attention_js__WEBPACK_IMPORTED_MODULE_3__["Alert"]({
          title: 'Error en el Backend',
          content: 'No se ha definido el Token de autorización'
        });
      } //
      //routerInstance.navigate('/firmador');

    } else {
      clearForm();
      document.getElementById("load-banner").style.display = "none";
      document.getElementById("password-error").style.display = "block";
      document.getElementById('password').style.borderColor = 'tomato';
      new _attention_js__WEBPACK_IMPORTED_MODULE_3__["Alert"]({
        title: 'Error de autenticación',
        content: 'Contraseña Incorrecta'
      }); //console.log('Contraseña Incorrecta');
    }
  })["catch"](function (response) {
    console.log(response);

    if (response.error && response.error.statusCode === 403) {
      document.getElementById("password-error").style.display = "block";
      document.getElementById('password-error').style.borderColor = 'tomato';
      document.getElementById('password-error').textContent = 'Superó el máximo de intentos de autenticación, su usuario ha sido bloqueado por medidas de seguridad';
      console.log('Superó el máximo de intentos de autenticación, su usuario ha sido bloqueado por medidas de seguridad'); //this.router.navigateByUrl('');
    } else {//this.router.navigateByUrl('main/errorMifirma', { skipLocationChange: true });
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

  var isMobile = window.innerWidth <= 640;
  var isTablet = !isMobile && window.innerWidth <= 800;
  var isDesktop = !isMobile && !isTablet;
  var windowInfo = _utils_js__WEBPACK_IMPORTED_MODULE_4__["datosMaquina"](window);
  console.log('Validating...');

  if (isNewUser) {
    console.log('this is a new user');
  }

  _services_gateway_service_js__WEBPACK_IMPORTED_MODULE_0__["default"].validateUser(data.email, '', userIp, windowInfo.browser, '', windowInfo.os, isMobile, isTablet, isDesktop, haveCamera, false, false).then(function (respuesta) {
    if (respuesta.data.userExists) {
      console.log('Logeando user exist...');
      login(respuesta);
    } else {
      //User not found, lets create one
      var required1 = document.createAttribute("required");
      var required2 = document.createAttribute("required");
      var required3 = document.createAttribute("required");
      var required4 = document.createAttribute("required");
      document.getElementById("datos").attributes.setNamedItem(required1);
      document.getElementById("terms").attributes.setNamedItem(required2);
      document.getElementById("customerMobile").attributes.setNamedItem(required3);
      document.getElementById("firstName").attributes.setNamedItem(required4);
      localStorage.setItem('authId', respuesta.data.authId);
      iter++;
      console.log('Creando este nuevo usuario iter:');

      if (localStorage.getItem('userFromOffice') && userFromOffice) {
        console.log('El usuario viene de office');
      } else {
        console.log('El usuario NO viene de office');
      }

      console.log(iter); //console.log(respuesta);

      var _iterator2 = _createForOfIteratorHelper(document.getElementsByClassName("thirdScreen")),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var element = _step2.value;
          element.style.display = "block";
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      var contentFromLS;
      userFromOffice = localStorage.getItem('userFromOffice') == 'true';

      if (userFromOffice && !outsideOffice) {
        contentFromLS = getIdFromOffice();
        console.log('El usuario SI viene de office');
        RefreshLayout(); //To hide password and password confirm
      } else {
        console.log('El usuario NO viene de office');
        localStorage.setItem('user', data.email);
        document.getElementById("header").style.paddingTop = '10px';
        document.getElementById('welcome-message').innerHTML = 'Verifica tu información:';
        var req1 = document.createAttribute("required");
        var req2 = document.createAttribute("required");
        document.getElementById("password1").attributes.setNamedItem(req1);
        document.getElementById("password2").attributes.setNamedItem(req2); //return;
      }

      console.log("fetched: ".concat(contentFromLS));

      if (iter > 1) {
        console.log("iteracion: ".concat(iter)); //Verificar contraseña

        var pass1 = document.getElementById('password1');
        var pass2 = document.getElementById('password2');
        var isValid = pass1.classList.contains('valid');
        console.log("isvalid: ".concat(isValid));

        if (!isValid && !userFromOffice) {
          document.getElementById('load-banner').style.display = 'none';
          return;
        }

        if (userFromOffice && !isNewUser) {
          createNewUser();
        } else if (outsideOffice && !isNewUser) {
          createNewUser();
        }
      }

      if (!userIsActive && iter > 1) {
        return;
      } //after SUCCESS:


      document.getElementById("load-banner").style.display = "none";
      document.getElementById("user-error").style.display = "block"; //document.getElementById('email').style.borderColor = 'tomato';

      /*new attention.Alert({
        title: 'Usuario creado!...',
        content: `auth: ${respuesta.data.authId}`
      });   */
      //console.log("user does not exist")
    }
  })["catch"](function (response) {
    console.log("user error", response);

    if (response.error && response.error.statusCode === 403) {
      new _attention_js__WEBPACK_IMPORTED_MODULE_3__["Alert"]({
        title: 'Error de autenticación',
        content: 'Su usuario ha sido bloqueado por medidas de seguridad, intente más tarde'
      }); //this.toastr.error('Su usuario ha sido bloqueado por medidas de seguridad, intente más tarde');
    } else {//routerInstance.navigate('main/errorMifirma');
      }
  });
}

function RefreshLayout() {
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

function createNewUser() {
  document.getElementById('load-banner').style.display = 'block';
  console.log('pass:');
  console.log(document.getElementById('password1').value);
  document.getElementById("load-banner").style.display = "block";
  _services_gateway_service_js__WEBPACK_IMPORTED_MODULE_0__["default"].createCustomer(_services_session_service_js__WEBPACK_IMPORTED_MODULE_2__["default"].firstName, _services_session_service_js__WEBPACK_IMPORTED_MODULE_2__["default"].lastName, document.getElementById('password1').value, _services_session_service_js__WEBPACK_IMPORTED_MODULE_2__["default"].user, _services_session_service_js__WEBPACK_IMPORTED_MODULE_2__["default"].customerMobile, _services_session_service_js__WEBPACK_IMPORTED_MODULE_2__["default"].userIp).then(function (Respuesta) {
    if (Respuesta.status === 'Created' && Respuesta.statusCode === 201) {
      console.log(Respuesta.message);
      localStorage.setItem('idCustomer', Respuesta.data.idCustomer);
      validateThisUser();
    } else {
      console.log("ERROR:");
      console.log(Respuesta);
      return;
    }
  }); //Process
  //then
}

function validateThisUser() {
  document.getElementById("load-banner").style.display = "block";
  _services_gateway_service_js__WEBPACK_IMPORTED_MODULE_0__["default"].validate(_services_session_service_js__WEBPACK_IMPORTED_MODULE_2__["default"].authId, "").then(function (Respuesta) {
    if (Respuesta.data.hit && Respuesta.data.nextStep.process === 'OTP') {
      askOTPfromUser();
    } else {
      console.log("ERROR:");
      console.log(Respuesta);
      return;
    }
  });
}

function askOTPfromUser() {
  timeDown();
  document.getElementById("load-banner").style.display = "none";
  var modal = document.getElementById("otp-modal"); //modal.style.overflow = "hidden";

  document.querySelector(".MF-inner").style.overflow = "hidden";
  modal.style.display = "flex";
  var form = document.getElementById("otp-form");
  var phoneNumber = localStorage.getItem("phoneUser");
  var resendCode = document.getElementById('resend-code');
  resendCode.addEventListener('click', function () {
    document.getElementById('load-banner').style.display = 'block';
    var windowInfo = _utils_js__WEBPACK_IMPORTED_MODULE_4__["datosMaquina"](window);
    var isMobile = window.innerWidth <= 640;
    var isTablet = !isMobile && window.innerWidth <= 800;
    var isDesktop = !isMobile && !isTablet;
    _services_gateway_service_js__WEBPACK_IMPORTED_MODULE_0__["default"].validateUser(data.email, '', userIp, windowInfo.browser, '', windowInfo.os, isMobile, isTablet, isDesktop, haveCamera, false, false, 5, _services_session_service_js__WEBPACK_IMPORTED_MODULE_2__["default"].authId).then(function (respuesta) {
      if (respuesta.statusCode == 200) {
        timeDown();
        console.log('Resend code successfull');
        document.getElementById('load-banner').style.display = 'none';
      }
    }); //validateThisUser();
  });
  document.getElementById("phoneUs").innerHTML = phoneNumber;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var pin = document.getElementById("opt-input").value;
    document.getElementById("load-banner").style.display = "block";
    console.log("the pin: ".concat(pin));
    _services_gateway_service_js__WEBPACK_IMPORTED_MODULE_0__["default"].validate(_services_session_service_js__WEBPACK_IMPORTED_MODULE_2__["default"].authId, pin).then(function (Respuesta) {
      if (Respuesta.data.hit) {
        console.log('Que falta?');
        console.log(Respuesta);
        _services_gateway_service_js__WEBPACK_IMPORTED_MODULE_0__["default"].acceptTerms(_services_session_service_js__WEBPACK_IMPORTED_MODULE_2__["default"].userIp, _services_session_service_js__WEBPACK_IMPORTED_MODULE_2__["default"].idCustomer).then(function (Resp) {
          if (Resp.success) {
            addToMiFirma();
          }
        });
      } else {
        //repeat OTP
        document.getElementById('otp-error').style.display = 'block';
        document.getElementById('otp-error').innerText = 'Código Incorrecto';
        console.log(Respuesta);
        askOTPfromUser();
      }
    });
  });
}

function addToMiFirma() {
  var auth_code;
  _services_gateway_service_js__WEBPACK_IMPORTED_MODULE_0__["default"].addToMiFirma(_services_session_service_js__WEBPACK_IMPORTED_MODULE_2__["default"].firstName + ' ' + _services_session_service_js__WEBPACK_IMPORTED_MODULE_2__["default"].lastName, _services_session_service_js__WEBPACK_IMPORTED_MODULE_2__["default"].user, _services_session_service_js__WEBPACK_IMPORTED_MODULE_2__["default"].customerMobile).then(function (Resp) {
    if (Resp.status_code === 201) {
      _services_gateway_service_js__WEBPACK_IMPORTED_MODULE_0__["default"].getValidationParameter(_services_session_service_js__WEBPACK_IMPORTED_MODULE_2__["default"].user).then(function (Respuesta) {
        if (Respuesta.statusCode == 200) {
          auth_code = Respuesta.message;
          var activationMessage = _services_session_service_js__WEBPACK_IMPORTED_MODULE_2__["default"].user + '&&&' + auth_code;
          var activationBase64 = window.btoa(activationMessage);
          _services_gateway_service_js__WEBPACK_IMPORTED_MODULE_0__["default"].activateAccount(activationBase64).then(function (Resp) {
            if (Resp.statusCode == 200) {
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
  var modal = document.getElementById("otp-modal"); //modal.style.overflow = "hidden";

  var modalContent = document.getElementById("modal-content");
  modal.style.display = "flex";
  modalContent.innerHTML = "\n  <div class=\"success-animation\">\n<svg class=\"checkmark\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 52 52\"><circle class=\"checkmark__circle\" cx=\"26\" cy=\"26\" r=\"25\" fill=\"none\" /><path class=\"checkmark__check\" fill=\"none\" d=\"M14.1 27.2l7.1 7.2 16.7-16.8\" /></svg>\n</div>\n  <h2>Todo sali\xF3 bien</h2>\n  <p>Ya puedes comenzar a usar MiFirma</p>\n    <div class=\"MF-center\">\n      <button class=\"MF-button3\" id=\"end-process\">Firmar ahora</button>\n    </div>\n  ";
  document.getElementById('end-process').addEventListener('click', function () {
    data.email = _services_session_service_js__WEBPACK_IMPORTED_MODULE_2__["default"].user;

    if (userFromOffice) {
      data.password = _services_session_service_js__WEBPACK_IMPORTED_MODULE_2__["default"].authority;
    } else {
      data.password = document.getElementById('password1').value;
    }

    console.log("Iniciando Sesion... con ".concat(data.email, " y ").concat(data.password));
    validateEmail(); //this should refresh authid
  });
}

function showProcessError() {
  isNewUser = false;
  document.getElementById("load-banner").style.display = "none";
  var modal = document.getElementById("otp-modal");
  var modalContent = document.getElementById("modal-content");
  modal.style.display = "flex";
  modalContent.innerHTML = "<h2>Algo sali\xF3 mal</h2>\n  <p>Por favor intente nuevamente mas tarde</p>";
}

function login(respuesta) {
  localStorage.setItem('personaNombre', "".concat(respuesta.data.user.customerFirstName, " ").concat(respuesta.data.user.customerLastName));
  localStorage.setItem('phoneUser', respuesta.data.user.customerMobile);
  localStorage.setItem('correo', data.email);
  localStorage.setItem('personaId', respuesta.data.user.idCustomer);
  localStorage.setItem('authId', respuesta.data.authId);
  nextStep(respuesta);
}

function nextStep(respuesta) {
  console.log('Next step:');
  console.log(respuesta.data.nextStep.process);

  switch (respuesta.data.nextStep.process) {
    case 'Registro':
      console.log('Registrando Usuario...'); //not active

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
      var fromOffice = localStorage.getItem('userFromOffice') == 'true';

      if (fromOffice) {
        var content = getIdFromOffice();
        console.log(content);
        document.getElementById("password").value = _services_session_service_js__WEBPACK_IMPORTED_MODULE_2__["default"].authority;
        data.password = document.getElementById("password").value;
        console.log('key: ');
        console.log(data.password);
        submit();
      } else if (isNewUser) {
        document.getElementById("password").value = document.getElementById("password1").value;
        data.password = document.getElementById("password").value;
        console.log('key: ');
        console.log(data.password);
        submit();
      } else {
        var requiredField = document.createAttribute("required");
        document.getElementById("customerName").innerText = localStorage.getItem('personaNombre');
        document.getElementById("password").attributes.setNamedItem(requiredField);
        document.getElementById("submit-btn").textContent = "Ingresar";
        document.getElementById("load-banner").style.display = "none";

        var _iterator3 = _createForOfIteratorHelper(document.getElementsByClassName("firstScreen")),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var element = _step3.value;
            element.style.display = "none";
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        var _iterator4 = _createForOfIteratorHelper(document.getElementsByClassName("secondScreen")),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _element = _step4.value;
            _element.style.display = "block";
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      }

      break;
  }
}

function processTerms(respuesta) {
  if (JSON.stringify(respuesta.data.nextStep.properties) == '{}') {
    _services_gateway_service_js__WEBPACK_IMPORTED_MODULE_0__["default"].validate(respuesta.data.authId, '').then(function (Respuesta) {
      if (!respuesta.data.user.isActive) {//routerInstance.navigate(['registro/activar/cuenta']);
      } else {
        nextStep(Respuesta);
      }
    })["catch"](function (response) {
      console.log(response);

      if (response.error && response.error.statusCode === 403) {
        console.log('Su usuario ha sido bloqueado por medidas de seguridad, intente más tarde');
      } else {// routerInstance.navigate('main/errorMifirma');
      }
    });
  } else {
    console.log("Unhandled Terms! ");
    document.getElementById("load-banner").style.display = "none";
    new _attention_js__WEBPACK_IMPORTED_MODULE_3__["Alert"]({
      title: 'Terminos y condiciones',
      content: 'Hemos actualizado nuestros términos y condiciones'
    });

    for (var i in respuesta.data.nextStep.properties) {
      terms.push(+respuesta.data.nextStep.properties[i]);
    }

    console.log(terms); // this.fdService.terms(this.terms);

    if (!respuesta.data.user.isActive) {
      localStorage.setItem('noActive', 'false');
    } //routerInstance.navigate(['login/terminos']);

  }
}

function showInputInvalid() {
  document.getElementById("load-banner").style.display = "none";
  new _attention_js__WEBPACK_IMPORTED_MODULE_3__["Alert"]({
    title: 'Error de autenticación',
    content: 'Correo o contraseña inválidos'
  }); //console.log("invalid input")
}

var modalTerms = document.getElementById("terms-modal"); // Get the button that opens the modal

var btn1 = document.getElementById("list-terms");
var btn2 = document.getElementById("list-data"); // Get the <span> element that closes the modal

var span = document.getElementsByClassName("close")[0]; // When the user clicks the button, open the modal 

btn2.onclick = function () {
  document.getElementById("load-banner").style.display = "block";
  var HTMLContent = "Empty String 2";
  _services_gateway_service_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUserTerms().then(function (Respuesta) {
    if (Respuesta.statusCode == 200) {
      HTMLContent = Respuesta.data[0].template;
      document.getElementById("MF-cont").innerHTML = HTMLContent.toString(); //console.log(HTMLContent);

      document.getElementById("load-banner").style.display = "none";
    }
  });
  modalTerms.style.display = "block"; //document.getElementById("load-banner").style.display ="none";
};

btn1.onclick = function () {
  document.getElementById("load-banner").style.display = "block";
  var HTMLContent = "Empty String 1";
  _services_gateway_service_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUserTerms().then(function (Respuesta) {
    if (Respuesta.statusCode == 200) {
      HTMLContent = Respuesta.data[1].template;
      document.getElementById("MF-cont").innerHTML = HTMLContent.toString(); //console.log(HTMLContent);

      document.getElementById("load-banner").style.display = "none";
    }
  });
  modalTerms.style.display = "block"; //document.getElementById("load-banner").style.display ="none";
}; // When the user clicks on <span> (x), close the modal


span.onclick = function () {
  modalTerms.style.display = "none";
}; // When the user clicks anywhere outside of the modal, close it


window.onclick = function (event) {
  if (event.target == modalTerms) {
    modalTerms.style.display = "none";
  }
};
/**Front Password Validation */


document.getElementById("password1").addEventListener("focus", validatePassword);
document.getElementById("password1").addEventListener("focusout", function () {
  document.getElementById('float-validation').style.display = 'none';
});

function validatePassword() {
  document.getElementById('float-validation').style.display = 'block';
}

(function () {
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
    charLength: function charLength() {
      if (password.value.length >= 8) {
        return true;
      }
    },
    lowercase: function lowercase() {
      var regex = /^(?=.*[a-z]).+$/; // Lowercase character pattern

      if (regex.test(password.value)) {
        return true;
      }
    },
    uppercase: function uppercase() {
      var regex = /^(?=.*[A-Z]).+$/; // Uppercase character pattern

      if (regex.test(password.value)) {
        return true;
      }
    },
    special: function special() {
      var regex = /^(?=.*[0-9_\W]).+$/; // Special character or number pattern

      if (regex.test(password.value)) {
        return true;
      }
    },
    match: function match() {
      if (password.value == passwordConfirm.value) {
        return true;
      }
    }
  }; // Listen for keyup action on password field

  password.addEventListener('keyup', function () {
    // Check that password is a minimum of 8 characters
    patternTest(pattern.charLength(), helperText.charLength); // Check that password contains a lowercase letter      

    patternTest(pattern.lowercase(), helperText.lowercase); // Check that password contains an uppercase letter

    patternTest(pattern.uppercase(), helperText.uppercase); // Check that password contains a number or special character

    patternTest(pattern.special(), helperText.special); // Check that passwords matches

    patternTest(pattern.match(), helperText.match); // Check that all requirements are fulfilled

    if (hasClass(helperText.charLength, 'valid') && hasClass(helperText.lowercase, 'valid') && hasClass(helperText.uppercase, 'valid') && hasClass(helperText.special, 'valid') && hasClass(helperText.match, 'valid')) {
      addClass(password, 'valid');
      addClass(passwordConfirm, 'valid');
      removeClass(password, 'invalid');
      removeClass(passwordConfirm, 'invalid');
    } else {
      removeClass(password, 'valid');
      removeClass(passwordConfirm, 'valid');
      addClass(password, 'invalid');
      addClass(passwordConfirm, 'invalid');
    }
  });
  passwordConfirm.addEventListener('keyup', function () {
    // Check that password is a minimum of 8 characters
    patternTest(pattern.charLength(), helperText.charLength); // Check that password contains a lowercase letter      

    patternTest(pattern.lowercase(), helperText.lowercase); // Check that password contains an uppercase letter

    patternTest(pattern.uppercase(), helperText.uppercase); // Check that password contains a number or special character

    patternTest(pattern.special(), helperText.special); // Check that passwords matches

    patternTest(pattern.match(), helperText.match); // Check that all requirements are fulfilled

    if (hasClass(helperText.charLength, 'valid') && hasClass(helperText.lowercase, 'valid') && hasClass(helperText.uppercase, 'valid') && hasClass(helperText.special, 'valid') && hasClass(helperText.match, 'valid')) {
      addClass(password, 'valid');
      addClass(passwordConfirm, 'valid');
      removeClass(password, 'invalid');
      removeClass(passwordConfirm, 'invalid');
    } else {
      removeClass(password, 'valid');
      removeClass(passwordConfirm, 'valid');
      addClass(password, 'invalid');
      addClass(passwordConfirm, 'invalid');
    }
  });

  function patternTest(pattern, response) {
    if (pattern) {
      addClass(response, 'valid');
      removeClass(response, 'invalid');
    } else {
      removeClass(response, 'valid');
      addClass(response, 'invalid');
    }
  }

  function addClass(el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  }

  function removeClass(el, className) {
    if (el.classList) el.classList.remove(className);else el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }

  function hasClass(el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    } else {
      new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
  }
})();
/**Front Password Validation */


var userFirstName = document.querySelector('#firstName');
var userLastName = document.querySelector('#lastName');
var customerMobile = document.querySelector('#customerMobile');
var togglePassword = document.querySelector('#togglePassword');
var togglePassword1 = document.querySelector('#togglePassword1');
var togglePassword2 = document.querySelector('#togglePassword2');
var password = document.querySelector('#password');
var password1 = document.querySelector('#password1');
var password2 = document.querySelector('#password2');
userFirstName.addEventListener('keyup', function () {
  localStorage.setItem('firstName', userFirstName.value);
});
userLastName.addEventListener('keyup', function () {
  localStorage.setItem('lastName', userLastName.value);
});
customerMobile.addEventListener('keyup', function () {
  localStorage.setItem('customerMobile', customerMobile.value);
});
togglePassword.addEventListener('click', function (e) {
  // toggle the type attribute
  var type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type); // toggle the eye slash icon

  this.classList.toggle('fa-eye-slash');
});
togglePassword1.addEventListener('click', function (e) {
  // toggle the type attribute
  var type = password1.getAttribute('type') === 'password' ? 'text' : 'password';
  password1.setAttribute('type', type); // toggle the eye slash icon

  this.classList.toggle('fa-eye-slash');
});
togglePassword2.addEventListener('click', function (e) {
  // toggle the type attribute
  var type = password2.getAttribute('type') === 'password' ? 'text' : 'password';
  password2.setAttribute('type', type); // toggle the eye slash icon

  this.classList.toggle('fa-eye-slash');
}); //new code for adding vanilla store (from main.js)

function getIdFromOffice() {
  var wantedId = 0;
  var keys = Object.keys(localStorage),
      i = keys.length;

  while (i--) {
    var str = keys[i];

    if (str.startsWith("{")) {
      var obj = JSON.parse(str); //console.log(obj);

      for (var _i = 0, _Object$entries = Object.entries(obj); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        localStorage.setItem(key, value);

        if (key === 'homeAccountIdentifier') {
          console.log("found: ".concat(key, ": ").concat(value));
          wantedId = value;
          userFromOffice = true;
          localStorage.setItem('userFromOffice', userFromOffice);
        }
      }
    }
  }

  return wantedId;
}

$(".MF-input").keyup(function () {
  //console.log($( this ).val());
  if ($(this).val() == "") {
    $(this).siblings("label").switchClass("MF-small", "MF-big", 300, "easeInOutQuad");
  } else {
    $(this).siblings("label").switchClass("MF-big", "MF-small", 300, "easeInOutQuad");
  }
});

function moveTitles() {
  $(".MF-input").each(function () {
    if ($(this).val() == "") {
      $(this).siblings("label").switchClass("MF-small", "MF-big", 300, "easeInOutQuad");
    } else {
      $(this).siblings("label").switchClass("MF-big", "MF-small", 300, "easeInOutQuad");
    }
  });
}

function timeDown() {
  document.getElementById("resend-code").style.display = 'none';
  var seconds = 31; // Update the count down every 1 second

  var x = setInterval(function () {
    seconds -= 1;
    document.getElementById("resend").innerHTML = "Reenviar código en " + seconds + "s "; // If the count down is over, write some text 

    if (seconds < 0) {
      clearInterval(x);
      document.getElementById("resend-code").style.display = 'block';
      document.getElementById("resend").innerHTML = "";
    }
  }, 1000);
}

/***/ }),

/***/ "./src/app/attention.js":
/*!******************************!*\
  !*** ./src/app/attention.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (t, n) {
  "object" == ( false ? undefined : _typeof(exports)) && "undefined" != typeof module ? n(exports) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (n),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(this, function (t) {
  "use strict";

  function i(t, n) {
    if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
  }

  function o(t, n) {
    for (var e = 0; e < n.length; e++) {
      var i = n[e];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }

  function s(t, n, e) {
    return n && o(t.prototype, n), e && o(t, e), t;
  }

  function n(t, n) {
    if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(n && n.prototype, {
      constructor: {
        value: t,
        writable: !0,
        configurable: !0
      }
    }), n && e(t, n);
  }

  function r(t) {
    return (r = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    })(t);
  }

  function e(t, n) {
    return (e = Object.setPrototypeOf || function (t, n) {
      return t.__proto__ = n, t;
    })(t, n);
  }

  function a(t, n) {
    return !n || "object" != _typeof(n) && "function" != typeof n ? function (t) {
      if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return t;
    }(t) : n;
  }

  function c(t) {
    return "string" == typeof t;
  }

  function l(t, n, e) {
    var i = 0 < arguments.length && void 0 !== t ? t : "div",
        o = 1 < arguments.length && void 0 !== n ? n : null,
        s = 2 < arguments.length && void 0 !== e ? e : [],
        r = document.createElement(i);

    if (null !== o) {
      var a = function a(n) {
        var t;
        ((t = n).startsWith("on") ? t.toLowerCase() : "on".concat(t)) in window ? r.addEventListener(n, function (t) {
          o[n](t, r);
        }) : r.setAttribute(n, o[n]);
      };

      for (var c in o) {
        a(c);
      }
    }

    return 0 < s.length && s.forEach(function (t) {
      "string" == typeof t ? r.appendChild(document.createTextNode(t)) : r.appendChild(t);
    }), r;
  }

  var u = function () {
    function n(t) {
      i(this, n), this.options = t, c(t.title) && (this.title = t.title), this.useInnerHTML = !0 === t.useInnerHTML, c(t.content) && (this.content = t.content), t.animation && ("boolean" == typeof t.animation || c(t.animation)) ? this.animation = t.animation : this.animation = "fade", this.port = null, this.template = this.createBase();
    }

    return s(n, [{
      key: "createBase",
      value: function value() {
        var t,
            n = this,
            e = l("div", {
          "class": "close",
          click: function click() {
            n.close();
          }
        });
        return e.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>', this.port = l("div", {
          "class": "port"
        }), t = "fade" === this.animation ? "opacity:0;" : "", this.container = l("div", {
          "class": "attention-component",
          style: t
        }, [l("div", {
          "class": "inner"
        }, [l("div", {
          "class": "content"
        }, [e, this.port])])]), this.container;
      }
    }, {
      key: "render",
      value: function value(t) {
        var n,
            e,
            i,
            o = 0 < arguments.length && void 0 !== t ? t : document.body;
        this.options.beforeRender && this.options.beforeRender(this), o.appendChild(this.template), this.options.afterRender && this.options.afterRender(this), "fade" === this.animation && (n = this.template, i = 0, window.requestAnimationFrame(function t() {
          100 <= i ? (window.cancelAnimationFrame(t), e && e(n)) : (i += 10, n.style.opacity = (i / 100).toString(), window.requestAnimationFrame(t));
        }));
      }
    }, {
      key: "destroy",
      value: function value() {
        this.container.parentElement.removeChild(this.container), this.options.afterClose && this.options.afterClose(this);
      }
    }, {
      key: "close",
      value: function value() {
        var n,
            e,
            i,
            t = this;
        this.options.beforeClose && this.options.beforeClose(this), this.animation ? "fade" === this.animation && (n = this.container, e = function e() {
          t.destroy();
        }, i = 100, window.requestAnimationFrame(function t() {
          i <= 0 ? (window.cancelAnimationFrame(t), e && e(n)) : (i -= 10, n.style.opacity = (i / 100).toString(), window.requestAnimationFrame(t));
        })) : this.destroy();
      }
    }]), n;
  }(),
      h = function () {
    function e(t) {
      var n;
      return i(this, e), (n = a(this, r(e).call(this, t))).injectTemplate(), n.render(), n;
    }

    return n(e, u), s(e, [{
      key: "injectTemplate",
      value: function value() {
        var t,
            n = l("div", {
          "class": "head"
        }, [l("p", {
          "class": "title"
        }, [this.title])]);

        if (this.port.appendChild(n), this.useInnerHTML) {
          var e = l("div", {
            "class": "content"
          });
          e.innerHTML = this.content, t = l("div", {
            "class": "inner-container"
          }, [e]);
        } else t = l("div", {
          "class": "inner-container"
        }, [l("p", {
          "class": "content"
        }, [this.content])]);

        this.port.appendChild(n), this.port.appendChild(t);
      }
    }]), e;
  }(),
      p = function () {
    function e(t) {
      var n;
      return i(this, e), (n = a(this, r(e).call(this, t))).submitText = c(t.submitText) ? t.submitText : "Send", n.placeholderText = c(t.placeholderText) ? t.placeholderText : "Type", n.injectTemplate(), n.render(), n;
    }

    return n(e, u), s(e, [{
      key: "handleInput",
      value: function value(t) {
        "Enter" !== t.key && 13 !== t.keyCode || this.submit();
      }
    }, {
      key: "submit",
      value: function value() {
        var t = this.input.value;
        "" !== t && (this.close(), this.options.onSubmit && this.options.onSubmit(this, t));
      }
    }, {
      key: "injectTemplate",
      value: function value() {
        var e = this,
            t = l("div", {
          "class": "head"
        }, [l("p", {
          "class": "title"
        }, [this.title])]);
        this.port.appendChild(t), this.input = l("input", {
          type: "text",
          "class": "input",
          placeholder: this.placeholderText,
          keyup: function keyup(t, n) {
            e.handleInput(t, n);
          }
        });
        var n,
            i = l("div", {
          "class": "prompt-elements"
        }, [this.input, l("button", {
          "class": "button",
          click: function click() {
            e.submit();
          }
        }, [this.submitText])]);

        if (this.useInnerHTML) {
          var o = l("div", {
            "class": "content"
          });
          o.innerHTML = this.content, n = l("div", {
            "class": "inner-container"
          }, [o, i]);
        } else n = l("div", {
          "class": "inner-container"
        }, [l("p", {
          "class": "content"
        }, [this.content]), i]);

        this.port.appendChild(t), this.port.appendChild(n);
      }
    }]), e;
  }(),
      d = function () {
    function e(t) {
      var n;
      return i(this, e), (n = a(this, r(e).call(this, t))).buttonCancel = c(t.buttonCancel) ? t.buttonCancel : "No", n.buttonConfirm = c(t.buttonConfirm) ? t.buttonConfirm : "Agree", n.injectTemplate(), n.render(), n;
    }

    return n(e, u), s(e, [{
      key: "injectTemplate",
      value: function value() {
        var t,
            n = this,
            e = l("div", {
          "class": "head"
        }, [l("p", {
          "class": "title"
        }, [this.title])]);

        if (this.port.appendChild(e), this.useInnerHTML) {
          var i = l("div", {
            "class": "content"
          });
          i.innerHTML = this.content, t = l("div", {
            "class": "inner-container"
          }, [i]);
        } else t = l("div", {
          "class": "inner-container"
        }, [l("p", {
          "class": "content"
        }, [this.content])]);

        t.appendChild(l("div", {
          "class": "buttons"
        }, [l("button", {
          "class": "cancel",
          click: function click() {
            n.close(), n.options.onCancel && n.options.onCancel(n);
          }
        }, [this.buttonCancel]), l("button", {
          "class": "confirm",
          click: function click() {
            n.close(), n.options.onConfirm && n.options.onConfirm(n);
          }
        }, [this.buttonConfirm])])), this.port.appendChild(e), this.port.appendChild(t);
      }
    }]), e;
  }();

  t.Alert = h, t.Confirm = d, t.Prompt = p, t.version = "0.1.0", Object.defineProperty(t, "__esModule", {
    value: !0
  });
});

/***/ }),

/***/ "./src/app/services/filedata.service.js":
/*!**********************************************!*\
  !*** ./src/app/services/filedata.service.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FiledataService = /*#__PURE__*/function () {
  function FiledataService() {
    _classCallCheck(this, FiledataService);
  }

  _createClass(FiledataService, [{
    key: "getIp",
    value: function getIp() {
      return fetch('https://jsonip.com').then(function (response) {
        return response.json();
      });
    }
  }]);

  return FiledataService;
}();

var filedataService = new FiledataService();
/* harmony default export */ __webpack_exports__["default"] = (filedataService);

/***/ }),

/***/ "./src/app/services/gateway.service.js":
/*!*********************************************!*\
  !*** ./src/app/services/gateway.service.js ***!
  \*********************************************/
/*! exports provided: GatewayService, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GatewayService", function() { return GatewayService; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var httpOptions = {
  'Content-Type': 'application/json',
  'ChannelAuthorization': 'Basic MDJDQ0VFQkEtMTE1Mi00MkY3LThEMUEtREYxREJDRjRBRjA2OjAyMzEyRkU3LTQ5MDUtNEQ1Qy1BQ0I1LTUyQTQ2QzYxMzE5NQ=='
};
var httpOptions3 = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + localStorage.getItem("token")
};

var httpOptions2 = function httpOptions2() {
  return {
    'Content-Type': 'application/json',
    'ChannelAuthorization': 'Basic MDJDQ0VFQkEtMTE1Mi00MkY3LThEMUEtREYxREJDRjRBRjA2OjAyMzEyRkU3LTQ5MDUtNEQ1Qy1BQ0I1LTUyQTQ2QzYxMzE5NQ==',
    'Authorization': 'Bearer ' + localStorage.getItem("token")
  };
};

var url = "https://olsrvpruwbce01:6595/";
var GatewayMiFirma = "https://olsrvpruwbce01:6741/";
var GatewayService = /*#__PURE__*/function () {
  function GatewayService() {
    _classCallCheck(this, GatewayService);
  }

  _createClass(GatewayService, [{
    key: "acceptTerms",
    value: function acceptTerms(userIp, idCustomer) {
      var data = {
        publicIP: userIp,
        customerId: parseInt(idCustomer),
        termsId: [7, 8]
      };
      console.log('DATA ACC:');
      console.log(data);
      return fetch("".concat(url, "Gateway/api/v2_0/terms/acceptance"), {
        method: "POST",
        body: JSON.stringify(data),
        headers: httpOptions
      }).then(function (response) {
        return response.json();
      });
    }
  }, {
    key: "createCustomer",
    value: function createCustomer(name, lastname, password, user, mobile, ip) {
      var data = {
        firstName: name,
        lastName: lastname,
        password: password,
        user: user,
        customerMobile: mobile,
        publicIP: ip
      };
      return fetch("".concat(url, "Gateway/api/v2_0/createCustomer"), {
        method: "POST",
        body: JSON.stringify(data),
        headers: httpOptions
      }).then(function (response) {
        return response.json();
      });
    }
  }, {
    key: "validateUser",
    value: function validateUser(user, phonenumber, ip, browser, userAgent, os, mobile, tablet, desktop, camera, secondcamera, fingerprint, processCode, authId) {
      var data = {
        user: user,
        phoneNumber: phonenumber,
        deviceInfo: {
          publicIp: ip,
          browser: browser,
          os: os,
          isMobile: mobile,
          isTablet: tablet,
          isDesktop: desktop,
          hasCamera: camera,
          hasSecondaryCamera: secondcamera,
          hasFingerprintReader: fingerprint
        }
      };
      if (processCode !== "" || processCode !== undefined) data.processCode = processCode;
      if (authId !== "" || authId !== undefined) data.authId = authId;
      console.log("processCode: ".concat(processCode));
      console.log("authId: ".concat(processCode));
      console.log(data);
      return fetch("".concat(url, "Gateway/api/v2_0/validate/user"), {
        method: "POST",
        body: JSON.stringify(data),
        headers: httpOptions
      }).then(function (response) {
        return response.json();
      });
    }
  }, {
    key: "validate",
    value: function validate(guid, data) {
      var val = {
        guid: guid,
        data: data
      };
      console.log(val);
      return fetch("".concat(url, "Gateway/api/v2_0/validate"), {
        method: "POST",
        body: JSON.stringify(val),
        headers: httpOptions
      }).then(function (response) {
        return response.json();
      });
    }
  }, {
    key: "getTerms",
    value: function getTerms() {
      return fetch("".concat(url, "Gateway/Terms")).then(function (response) {
        return response.json();
      });
    }
  }, {
    key: "getEspecificTerms",
    value: function getEspecificTerms(ids) {
      var id = "";

      for (var i = 0; i < ids.length; i++) {
        id += "ids=" + ids[i] + "&";
      }

      id = id.slice(0, -1);
      return fetch("".concat(url, "Gateway/EspecificTerms/").concat(id)).then(function (response) {
        return response.json();
      });
    }
  }, {
    key: "resetPassword",
    value: function resetPassword(pass) {
      var data = {
        newPassword: pass
      };
      return fetch("".concat(url, "Gateway/ResetPassword"), {
        method: "POST",
        body: JSON.stringify(data),
        headers: httpOptions2()
      }).then(function (response) {
        return response.json();
      });
    }
  }, {
    key: "addToMiFirma",
    value: function addToMiFirma(name, email, phoneNumber) {
      var data = {
        name: name,
        email: email,
        phoneNumber: parseInt(phoneNumber)
      };
      return fetch("".concat(GatewayMiFirma, "Gateway/api/v1_0/user/create"), {
        method: "POST",
        body: JSON.stringify(data),
        headers: httpOptions
      }).then(function (response) {
        return response.json();
      });
    }
  }, {
    key: "uploadSignature",
    value: function uploadSignature(file, fileName, fileExtension) {
      console.log(httpOptions3);
      var data = {
        file: file,
        fileName: fileName,
        fileExtension: fileExtension
      };
      var path = "".concat(GatewayMiFirma, "Gateway/api/v1_0/graph/save"); //console.log(path);
      //console.log(data);

      return fetch(path, {
        method: "POST",
        body: JSON.stringify(data),
        headers: httpOptions3
      }).then(function (response) {
        return response.json();
      });
    }
  }, {
    key: "getValidationParameter",
    value: function getValidationParameter(user) {
      var path = "".concat(url, "Gateway/api/v2_0/customers/getValidationParameter/").concat(user);
      return fetch(path, {
        method: "GET",
        headers: httpOptions
      }).then(function (response) {
        return response.json();
      });
    }
  }, {
    key: "getUserTerms",
    value: function getUserTerms() {
      var path = "".concat(url, "Gateway/api/v3_0/terms/enabled");
      return fetch(path, {
        method: "GET",
        headers: httpOptions
      }).then(function (response) {
        return response.json();
      });
    }
  }, {
    key: "activateAccount",
    value: function activateAccount(activator) {
      var data = {
        activator: activator
      };
      return fetch("".concat(url, "Gateway/api/v2_0/customers/activateAccount"), {
        method: "POST",
        body: JSON.stringify(data),
        headers: httpOptions
      }).then(function (response) {
        return response.json();
      });
    }
  }]);

  return GatewayService;
}();
var gatewayService = new GatewayService();
/* harmony default export */ __webpack_exports__["default"] = (gatewayService);

/***/ }),

/***/ "./src/app/services/session.service.js":
/*!*********************************************!*\
  !*** ./src/app/services/session.service.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SessionService = /*#__PURE__*/function () {
  function SessionService() {
    _classCallCheck(this, SessionService);
  }

  _createClass(SessionService, [{
    key: "logout",
    value: function logout() {
      var noob = localStorage.getItem('noob');

      if (noob == null) {
        noob = '1';
      }

      localStorage.clear();
      localStorage.setItem('noob', noob);
    }
  }, {
    key: "authority",
    get: function get() {
      return localStorage.getItem('homeAccountIdentifier');
    }
  }, {
    key: "idCustomer",
    get: function get() {
      return localStorage.getItem('idCustomer');
    }
  }, {
    key: "userId",
    get: function get() {
      return localStorage.getItem('personaId');
    }
  }, {
    key: "authId",
    get: function get() {
      return localStorage.getItem('authId');
    }
  }, {
    key: "identificadorOtp",
    get: function get() {
      return localStorage.getItem('identificadorOTP');
    }
  }, {
    key: "recoRestrictive",
    get: function get() {
      return localStorage.getItem('reconoserRestrictive');
    }
  }, {
    key: "otpRestrictive",
    get: function get() {
      return localStorage.getItem('otpRestrictive');
    }
  }, {
    key: "username",
    get: function get() {
      return localStorage.getItem('personaNombre');
    }
  }, {
    key: "documentUser",
    get: function get() {
      return localStorage.getItem('documento');
    }
  }, {
    key: "emailUser",
    get: function get() {
      return localStorage.getItem('correo');
    }
  }, {
    key: "reconoserGuid",
    get: function get() {
      return localStorage.getItem('reconoserGuid');
    }
  }, {
    key: "reconoserUrl",
    get: function get() {
      return localStorage.getItem('reconoserUrl');
    }
  }, {
    key: "validarOtp",
    get: function get() {
      return localStorage.getItem('validarOtp');
    }
  }, {
    key: "phoneUser",
    get: function get() {
      return localStorage.getItem('celular');
    }
  }, {
    key: "phoneUser2",
    get: function get() {
      return localStorage.getItem('phoneUser');
    }
  }, {
    key: "isLogged",
    get: function get() {
      return localStorage.getItem('token') != null;
    }
  }, {
    key: "isRequestPending",
    get: function get() {
      return localStorage.getItem('pendingRequest') != null;
    }
  }, {
    key: "isANoob",
    get: function get() {
      return localStorage.getItem('noob') === '1';
    }
  }, {
    key: "isNoobNull",
    get: function get() {
      return localStorage.getItem('noob') == null;
    }
  }, {
    key: "firstName",
    get: function get() {
      return localStorage.getItem('firstName');
    }
  }, {
    key: "lastName",
    get: function get() {
      return localStorage.getItem('lastName');
    }
  }, {
    key: "customerMobile",
    get: function get() {
      return localStorage.getItem('customerMobile');
    }
  }, {
    key: "user",
    get: function get() {
      return localStorage.getItem('user');
    }
  }, {
    key: "userIp",
    get: function get() {
      return localStorage.getItem('userIp');
    }
  }, {
    key: "signatureGuid",
    set: function set(value) {
      localStorage.setItem('firma', value);
    }
  }]);

  return SessionService;
}();

var sessionService = new SessionService();
/* harmony default export */ __webpack_exports__["default"] = (sessionService);

/***/ }),

/***/ "./src/app/utils.js":
/*!**************************!*\
  !*** ./src/app/utils.js ***!
  \**************************/
/*! exports provided: Uint8ArrayToStringBase64, stringToUint, logout, getExtensionImageFromURI, b64toBlob, getHexColorFromRgba, datosMaquina, detectWebcam */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Uint8ArrayToStringBase64", function() { return Uint8ArrayToStringBase64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringToUint", function() { return stringToUint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logout", function() { return logout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getExtensionImageFromURI", function() { return getExtensionImageFromURI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b64toBlob", function() { return b64toBlob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHexColorFromRgba", function() { return getHexColorFromRgba; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "datosMaquina", function() { return datosMaquina; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detectWebcam", function() { return detectWebcam; });
// This file contains utility functions used across the application

/**
 * Converts an unsigned array to a uri base64 string
 * @param data Array of unsigned integers data
 */
function Uint8ArrayToStringBase64(data) {
  var binary = '';
  var len = data.byteLength;

  for (var i = 0; i < len; ++i) {
    binary += String.fromCharCode(data[i]);
  }

  return window.btoa(binary);
}
/**
 * Converts a uri base64 string to an unsigned array
 * @param src Uri base64 data
 */

function stringToUint(src) {
  var binary = window.atob(src);
  var len = binary.length;
  var bytes = new Uint8Array(len);

  for (var i = 0; i < len; ++i) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}
function logout(router) {
  var noob = localStorage.getItem('noob');

  if (noob == null) {
    noob = '1';
  }

  localStorage.clear();
  localStorage.setItem('noob', noob);
  router.navigateByUrl('');
}
/**
 * Given a uri representation of an image of the form data:image/extension;base64, data, it returns the extesion of the image
 * @param base64 uri base64 data
 */

function getExtensionImageFromURI(base64) {
  if (base64.length <= 22 || base64.substr(0, 4) !== 'data') {
    throw new Error('Invalid URI');
  }

  var l = base64.indexOf(':') + 1;

  if (l !== 5) {
    throw new Error('Invalid URI');
  }

  var type = base64.substr(l, 6);

  if (type !== 'image/') {
    throw new Error('Invalid URI');
  }

  var semicolon = base64.indexOf(';') + 1;

  if (semicolon === 0) {
    throw new Error('Invalid URI');
  }

  var uri = base64.substr(semicolon, 7);

  if (uri !== 'base64,') {
    throw new Error('Invalid URI');
  }

  var extension = base64.substr(l + 6, semicolon - 1 - l - 6);
  return extension.toLowerCase();
}
/**
 * Transforms a URI - base64 to a blob
 */

function b64toBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], {
    type: 'application/pdf'
  });
}
/**
 * Gets the hexadecimal representation of a rgba color
 */

function getHexColorFromRgba(color) {
  if (color === 'rgba(158,234,170,0.5)') {
    return '#9eeaaa';
  } else {
    return '#a0daff';
  }
}
/**
 * Returns an object with details about the client machine
 * @param window window object
 */

function datosMaquina(window) {
  {
    var unknown = 'unknown'; // browser

    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browser = navigator.appName;
    var version = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset;
    var verOffset;
    var ix;

    if ((verOffset = nAgt.indexOf('Opera')) != -1) {
      browser = 'Opera';
      version = nAgt.substring(verOffset + 6);

      if ((verOffset = nAgt.indexOf('Version')) != -1) {
        version = nAgt.substring(verOffset + 8);
      }
    }

    if ((verOffset = nAgt.indexOf('OPR')) != -1) {
      browser = 'Opera';
      version = nAgt.substring(verOffset + 4);
    } else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
      browser = 'Microsoft Edge';
      version = nAgt.substring(verOffset + 5);
    } else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
      browser = 'Microsoft Internet Explorer';
      version = nAgt.substring(verOffset + 5);
    } else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
      browser = 'Chrome';
      version = nAgt.substring(verOffset + 7);
    } else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
      browser = 'Safari';
      version = nAgt.substring(verOffset + 7);

      if ((verOffset = nAgt.indexOf('Version')) != -1) {
        version = nAgt.substring(verOffset + 8);
      }
    } else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
      browser = 'Firefox';
      version = nAgt.substring(verOffset + 8);
    } else if (nAgt.indexOf('Trident/') != -1) {
      browser = 'Microsoft Internet Explorer';
      version = nAgt.substring(nAgt.indexOf('rv:') + 3);
    } else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
      browser = nAgt.substring(nameOffset, verOffset);
      version = nAgt.substring(verOffset + 1);

      if (browser.toLowerCase() === browser.toUpperCase()) {
        browser = navigator.appName;
      }
    } // trim the version string


    if ((ix = version.indexOf(';')) != -1) {
      version = version.substring(0, ix);
    }

    if ((ix = version.indexOf(' ')) != -1) {
      version = version.substring(0, ix);
    }

    if ((ix = version.indexOf(')')) != -1) {
      version = version.substring(0, ix);
    }

    majorVersion = parseInt('' + version, 10);

    if (isNaN(majorVersion)) {
      version = '' + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
    } // system


    var os = unknown;
    var clientStrings = [{
      s: 'Windows 10',
      r: /(Windows 10.0|Windows NT 10.0)/
    }, {
      s: 'Windows 8.1',
      r: /(Windows 8.1|Windows NT 6.3)/
    }, {
      s: 'Windows 8',
      r: /(Windows 8|Windows NT 6.2)/
    }, {
      s: 'Windows 7',
      r: /(Windows 7|Windows NT 6.1)/
    }, {
      s: 'Windows Vista',
      r: /Windows NT 6.0/
    }, {
      s: 'Windows Server 2003',
      r: /Windows NT 5.2/
    }, {
      s: 'Windows XP',
      r: /(Windows NT 5.1|Windows XP)/
    }, {
      s: 'Windows 2000',
      r: /(Windows NT 5.0|Windows 2000)/
    }, {
      s: 'Windows ME',
      r: /(Win 9x 4.90|Windows ME)/
    }, {
      s: 'Windows 98',
      r: /(Windows 98|Win98)/
    }, {
      s: 'Windows 95',
      r: /(Windows 95|Win95|Windows_95)/
    }, {
      s: 'Windows NT 4.0',
      r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
    }, {
      s: 'Windows CE',
      r: /Windows CE/
    }, {
      s: 'Windows 3.11',
      r: /Win16/
    }, {
      s: 'Android',
      r: /Android/
    }, {
      s: 'Open BSD',
      r: /OpenBSD/
    }, {
      s: 'Sun OS',
      r: /SunOS/
    }, {
      s: 'Chrome OS',
      r: /CrOS/
    }, {
      s: 'Linux',
      r: /(Linux|X11(?!.*CrOS))/
    }, {
      s: 'iOS',
      r: /(iPhone|iPad|iPod)/
    }, {
      s: 'Mac OS X',
      r: /Mac OS X/
    }, {
      s: 'Mac OS',
      r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
    }, {
      s: 'QNX',
      r: /QNX/
    }, {
      s: 'UNIX',
      r: /UNIX/
    }, {
      s: 'BeOS',
      r: /BeOS/
    }, {
      s: 'OS/2',
      r: /OS\/2/
    }, {
      s: 'Search Bot',
      r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
    }];

    for (var id in clientStrings) {
      var cs = clientStrings[id];

      if (cs.r.test(nAgt)) {
        os = cs.s;
        break;
      }
    }

    var osVersion = unknown;

    if (/Windows/.test(os)) {
      osVersion = /Windows (.*)/.exec(os)[1];
      os = 'Windows';
    }

    switch (os) {
      case 'Mac OS X':
        osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
        break;

      case 'Android':
        osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
        break;

      case 'iOS':
        osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
        osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
        break;
    }
  }
  return window.jscd = {
    browser: browser,
    browserVersion: version,
    browserMajorVersion: majorVersion,
    os: os,
    osVersion: osVersion
  };
}
function detectWebcam() {
  var mediaDevices = navigator.mediaDevices;
  return new Promise(function (resolve, reject) {
    if (!mediaDevices || !mediaDevices.enumerateDevices) {
      console.log('No hay media devices, saltar al próximo paso !');
      resolve(false);
    }

    mediaDevices.enumerateDevices().then(function (devices) {
      if (devices.some(function (device) {
        return device.kind === 'videoinput';
      })) {
        resolve(true);
      } else {
        resolve(false);
      }
    })["catch"](function () {
      return reject(false);
    });
  });
}

/***/ })

/******/ });
//# sourceMappingURL=app.js.map