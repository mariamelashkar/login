fullName = document.getElementById("full-name");
email = document.getElementById("email");
password = document.getElementById("password");
signForm = document.getElementById("signForm");
loginForm = document.getElementById("loginForm");
loginEmail = document.getElementById("typeEmailX");
loginPassword = document.getElementById("typePasswordX");

var newUser = [];
var newUser = JSON.parse(localStorage.getItem("users")) || [];

function addNewUser() {
  if(validateFullName(fullName.value)&&validateEmail(email.value)&&validatePassword(password.value)){
  var newUserobj = {
    uid: Date.now(),
    ufullName: fullName.value,
    uemail: email.value,
    upassword: password.value,
  };
  if (checkUser(email.value)) {
    alert("Error: user already exists!,please login");
    window.location.href = "index.html";
    return;
  }
  newUser.push(newUserobj);
  localStorage.setItem("users", JSON.stringify(newUser));
  window.location.href = "index.html";
  alert("user created sucessfully , please login");
  clearForm();
}
}

signForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("form submitted");
  addNewUser();
});

function clearForm() {
  fullName.value = null;
  email.value = null;
  password.value = null;
}
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  login();
});

function checkLoginEmail(email) {
  return (
    newUser.some((user) => user.uemail.toLowerCase() === email.toLowerCase())
  )
}

function checkLoginPassword(password) {
  return (
    newUser.some((user) => user.upassword=== password)
  )
}

function login() {
  if (checkLoginEmail(loginEmail.value) && checkLoginPassword(loginPassword.value) ) {
    window.location.href = "welcome.html";
  } else if (checkLoginEmail(loginEmail.value)==false){
    alert("Error:Inavalid email");
  }
else if (checkLoginPassword(loginPassword.value)==false){
  alert("Error:Inavalid password");
}
}
function validateFullName(fullName) {
  const fullNameRegex = /^[A-Za-z]{2,}( [A-Za-z]{2,})+$/;
  if (!fullNameRegex.test(fullName)) {
    alert("Invalid Full Name");
    return false;
  }
  return true;
}


function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Invalid Email. Please enter a valid email address");
    return false;
  }
  return true;
}

function validatePassword(password) {
  const passwordRegex = /^.{8,}$/;
    if (!passwordRegex.test(password)) {
    alert("Invalid Password. Password must be at least 8 characters long.");
    return false;
  }
  return true;
}

function checkUser(email) {
  return newUser.some(
    (user) => user.uemail.toLowerCase() === email.toLowerCase()
  );
}


