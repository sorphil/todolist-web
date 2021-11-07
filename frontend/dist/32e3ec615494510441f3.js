import functionInterface from "./functionInterface";
import "./styles/styles.scss";
document.addEventListener('DOMContentLoaded', function () {
  functionInterface.checkUserStatus(); //authenticationForm('formname', hasErrors)

  functionInterface.authenticationForm('register', true);
  functionInterface.authenticationForm('login', true); // functionInterface.authenticationForm('logout', false)
  // functionInterface.authenticationForm('check', false)

  functionInterface.createForm('task-create');
  functionInterface.createForm('project-create');
});