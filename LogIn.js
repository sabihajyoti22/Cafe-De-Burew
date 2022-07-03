const logInForm = document.querySelector(".logIn-form")
const passwordIcon = document.querySelector(".eye")
const passwordInput = document.querySelector("#exampleInputPassword1")
const emailInput = document.querySelector("#exampleInputEmail1");
const hidePassword1 = document.querySelector(".hide1")
const hidePassword2 = document.querySelector(".hide2")
const logInName = document.querySelector("#navbarDropdown");
const signInToggle = document.querySelector(".siginToggle")
const logOutToggle = document.querySelector(".logoutToggle")
var modalElement = null
var flag = false;
let lastName = ""
var id = ""

const createModal = (name, icon, color)=>{
    modalElement = document.createElement("div");
    modalElement.innerHTML = `
            <div class="modal" tabindex="-1">
            <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title">Log In</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                <i class="${icon} bg-light text-${color} fa-2x"></i>
                <h3>${name}</h3>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary closeButton" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
            </div>
            </div>`;
    document.body.append(modalElement);
    var modal = new bootstrap.Modal(modalElement.querySelector(".modal"));
    modal.show()
}

// Show Hide Button
const hideFunction = (e)=>{
    if(passwordInput.type == "password"){
        passwordInput.type = "text"
        hidePassword1.style.display = "none";
        hidePassword2.style.display = "block";
        hidePassword2.style.marginTop ="5px";
    }
    else{
        passwordInput.type = "password"
        hidePassword1.style.display = "block";
        hidePassword1.style.marginTop ="5px";
        hidePassword2.style.display = "none" 
    }
}
passwordIcon.addEventListener("click",hideFunction)

// Sign in Auhentication
const users = localStorage.getItem("Users") ? JSON.parse(localStorage.getItem("Users")) : [];

logInForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const email = emailInput.value;
    const password = passwordInput.value;
    
    users.map((user)=>{
        if(email === user.email && password === user.password){
            flag = true;
            id = user.id;
            lastName = user.lastName;
            sessionStorage.setItem(id,lastName)
        }
    })

    if(modalElement !== null){
        modalElement.remove();
    }
    if(flag){
            emailInput.value = ""
            passwordInput.value = ""
            window.location.reload()
            
    }else{
        createModal("Didn't find your Account","fa-solid fa-circle-xmark","danger")
    }
})

// Login
if(sessionStorage.key(1)){
    logInName.style.padding = "35px";
    logInName.innerHTML = sessionStorage.getItem(sessionStorage.key(1));
    
    // SignIn && LogOut Toggler
    signInToggle.style.display="none"
    logOutToggle.style.display="block"
}

// Logout
logOutToggle.addEventListener("click",()=>{
    sessionStorage.removeItem(sessionStorage.key(1))
    localStorage.removeItem("Orders");
    window.location.reload()
})

// Setting Popover
if(!sessionStorage.key(1)){
   $(function(){
    $('[data-bs-toggle="popover"]').popover({
        title: "Can't order now!!!",
        content: "Please, log in first"
    })
   })
   $('.popover-dismiss', {
        trigger: 'focus'
    })
}
