const cart = document.querySelector(".cart")
const myBadge = document.querySelector(".my-badge");
const coffeeButton1 = document.querySelector(".cafe1")
const coffeeButton2 = document.querySelector(".cafe2")
const coffeeButton3 = document.querySelector(".cafe3")
const cartButton = document.querySelector(".cartButton")
const cartRef = document.querySelector(".cartRef")
const cartCard = document.querySelector('#cartCard')
const cartTotal = document.querySelector('.total')
const placeOrder = document.querySelector('#placeOrder')
const orderAddress = document.querySelector('#addressOrder')
const orderphoneNumber = document.querySelector('#phoneNumberOrder')
var modalElement = null
var flag = false
var total = 0;

const cartLoadData = ()=>{
    return localStorage.getItem("Orders") ? JSON.parse(localStorage.getItem("Orders")) : []
}

const createOrder = (orderId,orderName,orderPrice)=>{
    // console.log(e.target.value)
    var price = orderPrice
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
        <div id="${orderId}" class="row g-0">
            <div class="col-md-4 my-auto">
                <img src="./Image/${orderName}.jpg" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${orderName}</h5>
                    <p class="card-text">This is a wider card with supporting text</p>
                    <div class="input-group w-50">
                        <button id="plusButton" class="btn btn-secondary text-white fs-5 h-50" type="button">+</button>
                        <p id="numberInput" type="text" class="form-control" placeholder="" aria-label="Example text with two button addons">1<p>
                        <button id="minusButton" class="btn btn-secondary text-white fs-5" type="button">-</button>
                    </div>
                    <div class="d-flex justify-content-between">
                        <h4 class="card-text price pt-1">Price: $<span class="price">${price}</span> </h4>
                        <i id="deleteButton" class="fa-solid fa-trash-can"></i>
                    </div>
                </div>
            </div>
        </div>`;

    var textInput = newDiv.querySelector('#numberInput');
    const plusButton = newDiv.querySelector('#plusButton');
    const minusButton = newDiv.querySelector('#minusButton');
    const deleteButton = newDiv.querySelector('#deleteButton');
    
    plusButton.addEventListener("click", () => {
        textInput.innerHTML = parseInt(textInput.innerHTML) + 1
        price = JSON.stringify(parseInt(orderPrice)*parseInt(textInput.innerHTML))

        minusButton.disabled = textInput.innerHTML == 0 ? true : false;

        const selectedPrice = newDiv.querySelector(`.price span`);
        selectedPrice.innerHTML = price;
        total = total + parseInt(orderPrice);
        cartTotal.innerHTML = "$"+JSON.stringify(total)
    })

    minusButton.onclick = () => {
        if(textInput.innerHTML == 1){
            minusButton.disabled = true
        }
        else{
            textInput.innerHTML = parseInt(textInput.innerHTML) - 1
            price = JSON.stringify(parseInt(price)-parseInt(orderPrice))
            const selectedPrice = newDiv.querySelector(`.price span`);
            selectedPrice.innerHTML = price;
            total = total - parseInt(orderPrice);
            cartTotal.innerHTML = "$"+JSON.stringify(total)
        }
    }

    deleteButton.addEventListener("click",(e)=>{
        const selectedDiv = e.target.parentElement.parentElement.parentElement.parentElement

        newDiv.removeChild(selectedDiv)

        let cartData = cartLoadData();
        cartData = cartData.filter((item)=> item.id !== selectedDiv.id)

        localStorage.setItem("Orders",JSON.stringify(cartData));

        myBadge.innerHTML = cartLoadData().length

        const selectedPrice = selectedDiv.querySelector(".price span");
        total = total - parseInt(selectedPrice.innerHTML);
        cartTotal.innerHTML = "$"+JSON.stringify(total)
    })

    total = total + parseInt(orderPrice)
    cartTotal.innerHTML = "$"+JSON.stringify(total)
    cartCard.appendChild(newDiv)
}

cartButton.addEventListener("click",()=>{
    if(cartLoadData()[0]){
        cart.style.display = "block"
        cartLoadData().map((order)=> createOrder(order.id,order.name,order.price))
        cartRef.setAttribute("href","#goToCart")
        cartButton.disabled = true;
    }
})

myBadge.innerHTML = cartLoadData().length

const cartInsert = (e,price)=>{
    const orders = cartLoadData()
    for(let data of orders){
        if(data.id === e.target.id){
            alert("You've already pick this one")
            $("#"+e.target.id).popover({
                title: "You've already picked this one",
                content: "Please, checkout the cart"
            })
            $('.popover-dismiss', {
            trigger: 'focus'
            })
            return;
        }
    }
    myBadge.innerHTML = parseInt(myBadge.innerHTML) + 1;
    orders.push(
        {
            id: e.target.id,
            name : e.target.value,
            price: price,
        })
    localStorage.setItem("Orders",JSON.stringify(orders))
    cartButton.disabled = false;
    window.location.reload();
}

// Cart value changing
coffeeButton1.addEventListener("click",(e)=>{
    if(sessionStorage.key(0)){
        cartInsert(e,"5")
    }
})
coffeeButton2.addEventListener("click",(e)=>{
    if(sessionStorage.key(0)){
        cartInsert(e,"10")
        // window.location.reload();
    }
})
coffeeButton3.addEventListener("click",(e)=>{
    if(sessionStorage.key(0)){
        cartInsert(e,"15")
        // window.location.reload();
    }
})

// Place Order
if(modalElement !== null){
    modalElement.remove();
}
placeOrder.addEventListener("click",()=>{
    if(cartLoadData()[0] && orderAddress.value !== ""  && orderphoneNumber.value !== ""){
        modalElement = document.createElement("div");
        modalElement.innerHTML = `
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Orders</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <p id="finalOrders">
                <ul>

                </ul>
                <h4></h4>
            </p>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-success" data-bs-dismiss="modal">Confirm</button>
            </div>
        </div>
        </div>
        </div>`;

        const pDiv = modalElement.querySelector("#finalOrders")
        const totalDiv = modalElement.querySelector("h4")
        const ulDiv = modalElement.querySelector("ul")
        const buttonDiv = modalElement.querySelector(".modal-footer button")

        pDiv.innerHTML = "You have ordered:"
        totalDiv.innerHTML = "Total payable: $"+total;

        cartLoadData().map((orders)=>{
            const listDiv = document.createElement("li");
            listDiv.innerHTML = orders.name
            ulDiv.appendChild(listDiv)
        })

        buttonDiv.addEventListener("click",()=>{
            localStorage.removeItem("Orders");
            window.location.reload()
        })

        document.body.append(modalElement);
        var modal = new bootstrap.Modal(modalElement.querySelector(".modal"));
        modal.show()
    }
})