// Create array of services available (as objects) and array of services requested
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

// State of a service: added to servicesRequested[] or not added. Used to determine whether an item can be added
let washAdded = false
let mowAdded = false
let weedsAdded = false
let paymentText = false

// Get elements from HTML 
const totalCost = document.getElementById("total-cost")
const listItems = document.getElementById("list-items")
const washBtn = document.getElementById("wash-btn")
const mowBtn = document.getElementById("mow-btn")
const weedsBtn = document.getElementById("weeds-btn")
const removeBtn = document.getElementById("remove-btn")
const pymntMthdEl = document.getElementById("pymntMthd-el")
const sendBtn = document.getElementById("send-btn")

// Click service button to add to servicesRequested[], checking that it is not already added and if not, mark it as added. Display list item
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

// Create function to add service and price to receipt with total cost; Cannot add service twice
    // add remove button next to item listed to enable option to remove
    // Render payment methods text
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

// function to remove service from receipt. Reset serviceAdded state to false
    // remove payment methods if no services are listed on receipt
function remove(serviceId) {
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
}

// Send invoice button resets invoice.
sendBtn.addEventListener("click", function() {
    remove(0)
    remove(1)
    remove(2)
})