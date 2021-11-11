/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/authentication.js":
/*!******************************************!*\
  !*** ./src/components/authentication.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar authenticationPage = function () {}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (authenticationPage);\n\n//# sourceURL=webpack://todo-list/./src/components/authentication.js?");

/***/ }),

/***/ "./src/functionInterface.js":
/*!**********************************!*\
  !*** ./src/functionInterface.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utils_apiCaller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/apiCaller */ \"./src/utils/apiCaller.js\");\n/* harmony import */ var _utils_errorHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/errorHandler */ \"./src/utils/errorHandler.js\");\n/* harmony import */ var _utils_formHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/formHandler */ \"./src/utils/formHandler.js\");\n/* harmony import */ var _utils_htmlHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/htmlHandler */ \"./src/utils/htmlHandler.js\");\n/* harmony import */ var _utils_tokenHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/tokenHandler */ \"./src/utils/tokenHandler.js\");\n/* harmony import */ var _components_authentication__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/authentication */ \"./src/components/authentication.js\");\n\n\n\n\n\n\n\nvar functionInterface = function () {\n  var returnUserStatus = function returnUserStatus() {\n    if (window.localStorage.getItem('token') !== null) {\n      _utils_tokenHandler__WEBPACK_IMPORTED_MODULE_4__.default.addHeaderToken(window.localStorage.getItem('token'));\n    } else {\n      _utils_tokenHandler__WEBPACK_IMPORTED_MODULE_4__.default.deleteHeaderToken();\n    }\n\n    return _utils_apiCaller__WEBPACK_IMPORTED_MODULE_0__.default.authenticationCall('check', {});\n  };\n\n  var startingPage = function startingPage() {\n    returnUserStatus().then(function (data) {\n      if (data.success == true) {\n        console.log(\"Open index\");\n      } else {\n        console.log(\"Open authentication\");\n      }\n    });\n  };\n\n  var authenticationForm = function authenticationForm(formName, hasErrors) {\n    var form = document.querySelector(\"#\".concat(formName, \"-form\"));\n    console.log(form);\n    var inputs = _utils_formHandler__WEBPACK_IMPORTED_MODULE_2__.default.getFormInputs(formName);\n\n    if (hasErrors) {\n      _utils_errorHandler__WEBPACK_IMPORTED_MODULE_1__.default.addErrorEvents(inputs);\n    }\n\n    form.addEventListener('submit', function (e) {\n      e.preventDefault();\n      var body = _utils_formHandler__WEBPACK_IMPORTED_MODULE_2__.default.getFormValues(formName);\n      _utils_apiCaller__WEBPACK_IMPORTED_MODULE_0__.default.authenticationCall(formName, body).then(function (data) {\n        if (data.success) {\n          if (formName === 'register' || formName === 'login' || formName === 'check' && data.success) {\n            _utils_tokenHandler__WEBPACK_IMPORTED_MODULE_4__.default.addHeaderToken(data.token);\n          } else {\n            _utils_tokenHandler__WEBPACK_IMPORTED_MODULE_4__.default.deleteHeaderToken();\n          }\n        } else {\n          if (hasErrors) {\n            var errorObjects = _utils_errorHandler__WEBPACK_IMPORTED_MODULE_1__.default.getInputErrors(data, formName);\n            _utils_htmlHandler__WEBPACK_IMPORTED_MODULE_3__.default.inputErrorMessage(errorObjects);\n          }\n        }\n      });\n    });\n  };\n\n  var taskForm = function taskForm(formName) {\n    var form = document.querySelector(\"#\".concat(formName, \"-form\"));\n    var inputs = _utils_formHandler__WEBPACK_IMPORTED_MODULE_2__.default.getFormInputs(formName);\n    form.addEventListener('submit', function (e) {\n      e.preventDefault();\n      var body = _utils_formHandler__WEBPACK_IMPORTED_MODULE_2__.default.getFormValues(formName); // console.log(body)\n\n      _utils_apiCaller__WEBPACK_IMPORTED_MODULE_0__.default.taskCall(formName, body);\n    });\n  };\n\n  var projectForm = function projectForm(formName) {\n    var form = document.querySelector(\"#\".concat(formName, \"-form\"));\n    var inputs = _utils_formHandler__WEBPACK_IMPORTED_MODULE_2__.default.getFormInputs(formName);\n    form.addEventListener('submit', function (e) {\n      e.preventDefault();\n      var body = _utils_formHandler__WEBPACK_IMPORTED_MODULE_2__.default.getFormValues(formName); // console.log(body)\n\n      _utils_apiCaller__WEBPACK_IMPORTED_MODULE_0__.default.projectCall(formName, body);\n    });\n  };\n\n  return {\n    authenticationForm: authenticationForm,\n    startingPage: startingPage,\n    taskForm: taskForm,\n    projectForm: projectForm\n  };\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (functionInterface);\n\n//# sourceURL=webpack://todo-list/./src/functionInterface.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _functionInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functionInterface */ \"./src/functionInterface.js\");\n/* harmony import */ var _styles_styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/styles.scss */ \"./src/styles/styles.scss\");\n\n // document.addEventListener('DOMContentLoaded', ()=>{\n//     functionInterface.checkUserStatus()\n//     //authenticationForm('formname', hasErrors)\n//     functionInterface.authenticationForm('register', true)\n//     \n// \n//     // functionInterface.authenticationForm('check', false)\n//     functionInterface.taskForm('task-create')\n//     functionInterface.projectForm('project-create')\n// })\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  var form = document.querySelector('.form-container');\n  form.classList.toggle('closed');\n  form.classList.toggle('open');\n  form.addEventListener('animationend', function () {\n    form.querySelectorAll('div').forEach(function (div) {\n      div.classList.add('open');\n      div.addEventListener('animationend', function () {\n        this.style.opacity = 1;\n      });\n    });\n    form.classList.remove('open');\n  });\n  _functionInterface__WEBPACK_IMPORTED_MODULE_0__.default.authenticationForm('login', true);\n  _functionInterface__WEBPACK_IMPORTED_MODULE_0__.default.authenticationForm('logout', false); // functionInterface.checkUserStatus()\n  // console.log(functionInterface.checkUserStatus())\n\n  _functionInterface__WEBPACK_IMPORTED_MODULE_0__.default.startingPage();\n});\n\n//# sourceURL=webpack://todo-list/./src/main.js?");

/***/ }),

/***/ "./src/utils/apiCaller.js":
/*!********************************!*\
  !*** ./src/utils/apiCaller.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _tokenHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokenHandler */ \"./src/utils/tokenHandler.js\");\n\n\nvar apiCaller = function () {\n  var headers = _tokenHandler__WEBPACK_IMPORTED_MODULE_0__.default.headers;\n  var apiURL = 'http://127.0.0.1:8000/todos/api/v1/';\n\n  var authenticationCall = function authenticationCall(type, body) {\n    type = type.toLowerCase();\n    return fetch(\"\".concat(apiURL).concat(type), {\n      method: \"POST\",\n      headers: headers,\n      body: JSON.stringify(body)\n    }).then(function (response) {\n      return response.json();\n    }).then(function (data) {\n      return data;\n    });\n  };\n\n  var taskCall = function taskCall(formName, body) {\n    return fetch(\"\".concat(apiURL, \"task-create\"), {\n      method: \"POST\",\n      headers: headers,\n      body: JSON.stringify(body)\n    }).then(function (response) {\n      return response.json();\n    }).then(function (data) {\n      console.log(data);\n      return data;\n    });\n  };\n\n  var projectCall = function projectCall(formName, body) {\n    return fetch(\"\".concat(apiURL, \"project-create\"), {\n      method: \"POST\",\n      headers: headers,\n      body: JSON.stringify(body)\n    }).then(function (response) {\n      return response.json();\n    }).then(function (data) {\n      console.log(data);\n      return data;\n    });\n  };\n\n  return {\n    authenticationCall: authenticationCall,\n    taskCall: taskCall,\n    projectCall: projectCall\n  };\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (apiCaller);\n\n//# sourceURL=webpack://todo-list/./src/utils/apiCaller.js?");

/***/ }),

/***/ "./src/utils/errorHandler.js":
/*!***********************************!*\
  !*** ./src/utils/errorHandler.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _htmlHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./htmlHandler */ \"./src/utils/htmlHandler.js\");\n\n\nvar errorHandler = function () {\n  var getInputErrors = function getInputErrors(data, formName) {\n    var errors = {};\n    console.log(data);\n\n    for (var input in data) {\n      if (input === 'success') break;\n      var error = data[input][0];\n      var inputDIV = document.querySelector(\"#\".concat(formName, \"-\").concat(input, \"-input\"));\n      var errorDIV = inputDIV.previousElementSibling;\n      errors[input] = {\n        'inputDIV': inputDIV,\n        'errorDIV': errorDIV,\n        'message': error\n      };\n    }\n\n    console.log(errors);\n    return errors;\n  };\n\n  var addErrorEvents = function addErrorEvents(formInputs) {\n    var _loop = function _loop(input) {\n      formInputs[input].addEventListener('keyup', function () {\n        return _htmlHandler__WEBPACK_IMPORTED_MODULE_0__.default.removeInputError(formInputs[input]);\n      });\n    };\n\n    for (var input in formInputs) {\n      _loop(input);\n    }\n  };\n\n  return {\n    getInputErrors: getInputErrors,\n    addErrorEvents: addErrorEvents\n  };\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (errorHandler);\n\n//# sourceURL=webpack://todo-list/./src/utils/errorHandler.js?");

/***/ }),

/***/ "./src/utils/formHandler.js":
/*!**********************************!*\
  !*** ./src/utils/formHandler.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar formHandler = function () {\n  var getFormInputs = function getFormInputs(formName) {\n    var data = {};\n    formName = formName.toLowerCase();\n    var form = document.querySelector(\"#\".concat(formName, \"-form\"));\n\n    for (var i = 0, element; element = form[i]; i++) // Obtain form input values\n    {\n      if (element.name != \"submit\") // if it doesn't have a name, it's a submit button\n        {\n          data[element.name] = element;\n        }\n    }\n\n    return data;\n  };\n\n  var getFormValues = function getFormValues(formName) {\n    var data = {};\n    formName = formName.toLowerCase();\n    var form = document.querySelector(\"#\".concat(formName, \"-form\"));\n\n    for (var i = 0, element; element = form[i]; i++) // Obtain form input values\n    {\n      if (element.name != \"submit\") // if it doesn't have a name, it's a submit button\n        {\n          data[element.name] = element.value;\n        }\n    }\n\n    return data;\n  };\n\n  return {\n    getFormInputs: getFormInputs,\n    getFormValues: getFormValues\n  };\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formHandler); // const addFormEvents = (formName, method)=>{\n//     const form = document.querySelector(`#${formName}-form`)\n//     form.addEventListener('submit', (e)=>{\n//         let body = getFormValues(formName)\n//         e.preventDefault()\n//         apiCaller.authenticationCall(formName, method, body)\n//     })\n// }\n\n//# sourceURL=webpack://todo-list/./src/utils/formHandler.js?");

/***/ }),

/***/ "./src/utils/htmlHandler.js":
/*!**********************************!*\
  !*** ./src/utils/htmlHandler.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar htmlHandler = function () {\n  var inputErrorMessage = function inputErrorMessage(errors) {\n    for (var error in errors) {\n      errors[error].errorDIV.innerHTML = errors[error].message;\n      errors[error].errorDIV.classList.add('active');\n      errors[error].inputDIV.classList.add('error');\n    }\n  };\n\n  var removeInputError = function removeInputError(formInput) {\n    if (formInput.classList.contains('error')) {\n      formInput.classList.remove('error');\n      formInput.previousElementSibling.classList.remove('active');\n    }\n  };\n\n  return {\n    inputErrorMessage: inputErrorMessage,\n    removeInputError: removeInputError\n  };\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (htmlHandler);\n\n//# sourceURL=webpack://todo-list/./src/utils/htmlHandler.js?");

/***/ }),

/***/ "./src/utils/tokenHandler.js":
/*!***********************************!*\
  !*** ./src/utils/tokenHandler.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar tokenHandler = function () {\n  var headers = {\n    \"Content-Type\": \"application/json\"\n  };\n\n  var addHeaderToken = function addHeaderToken(token) {\n    if (token === undefined) return;\n    tokenHandler.headers[\"Authorization\"] = \"Token \".concat(token);\n    window.localStorage.setItem('token', token);\n    window.localStorage.setItem('headers', headers);\n    console.log(headers);\n  };\n\n  var deleteHeaderToken = function deleteHeaderToken() {\n    console.log(\"DELETED\");\n    delete tokenHandler.headers[\"Authorization\"];\n    window.localStorage.removeItem('token');\n    console.log(headers);\n  };\n\n  return {\n    headers: headers,\n    addHeaderToken: addHeaderToken,\n    deleteHeaderToken: deleteHeaderToken\n  };\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tokenHandler);\n\n//# sourceURL=webpack://todo-list/./src/utils/tokenHandler.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/styles.scss":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/styles.scss ***!
  \*************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n___CSS_LOADER_EXPORT___.push([module.id, \"@import url(https://fonts.googleapis.com/css2?family=Rubik:wght@600&display=swap);\"]);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"@keyframes openContainer {\\n  0% {\\n    max-height: 0px;\\n  }\\n  100% {\\n    max-height: 1000px;\\n  }\\n}\\n@keyframes fadeIn {\\n  0% {\\n    opacity: 0;\\n  }\\n  100% {\\n    opacity: 1;\\n  }\\n}\\n* {\\n  padding: 0;\\n  margin: 0;\\n  box-sizing: border-box;\\n}\\n\\nbody, html {\\n  min-width: 100vw;\\n  min-height: 100vh;\\n  font-size: 10px;\\n  background-color: #1d1c22;\\n  display: flex;\\n  justify-content: space-around;\\n  align-items: center;\\n}\\n\\n.form-container {\\n  border-radius: 15px;\\n  width: 40rem;\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n  background-color: #f8f8ff;\\n  box-shadow: 0px -1px 45px -4px rgba(0, 0, 0, 0.75);\\n}\\n.form-container.closed {\\n  height: 0;\\n}\\n.form-container.open {\\n  animation: openContainer 500ms;\\n}\\n.form-container > div {\\n  opacity: 0;\\n}\\n.form-container > div.open {\\n  animation: fadeIn 100ms;\\n}\\n\\n.form-header {\\n  padding: 3.5rem 0 2.5rem 0;\\n  margin-bottom: 1.5rem;\\n  font-size: 1.2rem;\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  width: 100%;\\n  font-family: \\\"Rubik\\\", sans-serif;\\n  font-weight: bold;\\n  color: #1d1c22;\\n  border-bottom: 2px solid #1d1c22;\\n}\\n\\n.form-group {\\n  padding: 2rem 0 0rem 0;\\n  transition: all 300ms;\\n}\\n\\n#form-navs {\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  font-size: 2rem;\\n  padding: 0 0 4rem 0;\\n}\\n#form-navs > span {\\n  font-size: 2rem;\\n  padding: 0 1rem 0 1rem;\\n  color: #1d1c22;\\n}\\n#form-navs #form-navs-link {\\n  font-size: 2rem;\\n  color: #6a62d2;\\n  cursor: pointer;\\n}\\n#form-navs #form-navs-link:hover {\\n  text-decoration: underline;\\n}\\n\\n.form-label {\\n  font-size: 2.1rem;\\n  color: #1d1c22;\\n  display: block;\\n  opacity: 1;\\n  transform: translateY(-4.5rem);\\n  transform-origin: 0 0;\\n  transition: all 300ms;\\n}\\n\\n.form-input {\\n  font-size: 2.5rem;\\n  height: 6rem;\\n  width: 100%;\\n  box-shadow: none;\\n  background-color: transparent;\\n  border-radius: 0;\\n  border-style: none none solid none;\\n  transition: all 500ms;\\n}\\n\\n.form-input::placeholder {\\n  color: transparent;\\n}\\n\\n.form-input:focus {\\n  box-shadow: none;\\n  outline: none;\\n  border-color: #1d1c22;\\n}\\n\\n.form-input:focus + .form-label,\\n.form-input:not(:placeholder-shown) + .form-label {\\n  transform: translateY(-8rem) scale(0.8);\\n}\\n\\n.form-button {\\n  font-family: \\\"Rubik\\\", sans-serif;\\n  box-sizing: border-box;\\n  color: #f8f8ff;\\n  padding: 1.5rem 0.5rem 1.5rem 0.5rem;\\n  margin: 2rem 0 2rem 0;\\n  font-size: 1.7rem;\\n  transition: all 300ms;\\n  cursor: pointer;\\n  transform-origin: left;\\n  background-color: #1d1c22;\\n  width: 100%;\\n}\\n.form-button:active {\\n  background-color: #4d4c53;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://todo-list/./src/styles/styles.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === \"string\") {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, \"\"]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://todo-list/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./src/styles/styles.scss":
/*!********************************!*\
  !*** ./src/styles/styles.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./styles.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/styles.scss\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__.default, options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__.default && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__.default.locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__.default.locals : undefined);\n\n\n//# sourceURL=webpack://todo-list/./src/styles/styles.scss?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://todo-list/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://todo-list/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var style = document.createElement(\"style\");\n  options.setAttributes(style, options.attributes);\n  options.insert(style);\n  return style;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://todo-list/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(style) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    style.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://todo-list/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute(\"media\", media);\n  } else {\n    style.removeAttribute(\"media\");\n  }\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, style);\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var style = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(style, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(style);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://todo-list/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, style) {\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://todo-list/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;