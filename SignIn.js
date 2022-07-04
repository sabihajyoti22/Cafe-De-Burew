const passwordInput = document.querySelector("#signInPassword")
const rePasswordInput = document.querySelector("#signInRePassword")
const firstName = document.querySelector("#firstName")
const lastName = document.querySelector("#lastName")
const signInEmail = document.querySelector("#signInEmail")
const signInForm = document.querySelector(".my-form")
const msg = document.querySelector(".my-form p")

const users = [
    {
        id:1,
        firstName: "aaa",
        lastName: "xxx",
        email: "aaa@gmail.com",
        password: "123"
    },
]

signInForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    if(passwordInput.value !== rePasswordInput.value){
        msg.style.display="block"
    }else{
        const user = {
            id : Date.now().toString(),
            firstName: firstName.value,
            lastName: lastName.value,
            email: signInEmail.value,
            password: passwordInput.value
        }
        const users = localStorage.getItem("Users") ? JSON.parse(localStorage.getItem("Users")) : []
        console.log(users)
        users.push(user)
        firstName.value=""
        lastName.value=""
        signInEmail.value=""
        passwordInput.value=""
        rePasswordInput.value=""
        localStorage.setItem("Users",JSON.stringify(users));
        window.location.replace("/")
    }
})
