// Create array of services available and array of services requested
const services = [{
    id: 0,
    name: "Wash Car",
    price: 10,
},
{
    id: 1,
    name: "Mow Lawn",
    price: 20
},
{
    id: 2,
    name: "Pull Weeds",
    price: 30,
}]
let servicesRequested = []

// State of a services: added to request or not added 
let washAdded = false
let mowAdded = false
let weedsAdded = false
let paymentText = false
let totalCost = document.getElementById("total-cost")
const listItems = document.getElementById("list-items")
const washBtn = document.getElementById("wash-btn")
const mowBtn = document.getElementById("mow-btn")
const weedsBtn = document.getElementById("weeds-btn")
const removeBtn = document.getElementById("remove-btn")
const pymntMthdEl = document.getElementById("pymntMthd-el")
const sendBtn = document.getElementById("send-btn")

// Click service button to add to services and price arrays and display on receipt
washBtn.addEventListener("click", function() {
    if (washAdded === false) {
        servicesRequested.push(services[0])
        washAdded = true
        render(servicesRequested)
    }
})

mowBtn.addEventListener("click", function() {
    if (mowAdded === false) {
        servicesRequested.push(services[1])
        mowAdded = true
        render(servicesRequested)
    }
})

weedsBtn.addEventListener("click", function() {
    if (weedsAdded === false) {
        servicesRequested.push(services[2])
        weedsAdded = true
        render(servicesRequested)
    }
})

// Create function to add service to receipt with total cost; Cannot add service twice
function render(service) {
    let services = ""
    let total = 0
    for (let i = 0; i < service.length; i++) {
        services += `
            <li>${service[i].name}
                <span id='remove-btn' onclick='remove(${service[i].id})'>
                    Remove
                </span>
                <p class="price">
                    <span class="usd">$</span>
                    ${service[i].price}
                </p>
            </li>
            `
        total += service[i].price
    }
    if (paymentText === false) {
        pymntMthdEl.innerHTML += "<p class='paymentMethods'>We accept cash, credit card, or PayPal</p>"
        paymentText = true
    }
    listItems.innerHTML = services
    totalCost.textContent = `$${total}`
}

// Remove button removes item from list
function remove(serviceId) {
    console.log(servicesRequested)
    console.log(services[serviceId].id)
    // console.log(index)
    let index = ""
    for (let i = 0; i < servicesRequested.length; i++) {
        if (servicesRequested[i].id === serviceId) {
            index = i
        }
    }
    servicesRequested.splice(index, 1)
    if (serviceId === 0) {
        washAdded = false
    } else if (serviceId === 1) {
        mowAdded = false
    } else if (serviceId === 2) {
        weedsAdded = false
    }
    render(servicesRequested)
    if (servicesRequested.length === 0) {
        pymntMthdEl.innerHTML = ""
        paymentText = false
    }
    console.log(servicesRequested)
}

// Total cost must stay updated with each service added or removed

// Send invoice button resets invoice
sendBtn.addEventListener("click", function() {
    remove(0)
    remove(1)
    remove(2)
})