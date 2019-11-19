let inputUsername = document.getElementById("inputUsername");
let inputPassword = document.getElementById("inputPassword");
let dummyUser = "john smith";
let dummyPass = "blue";

let main = document.getElementById("main");



function toIndex(){
    window.location.href = "./index.html";
}


function validateLogin(){  
if (inputUsername.value==dummyUser && inputPassword.value==dummyPass){
    window.location.href = "./adminTools.html";
} else {
    alert("login failed");
}    
};