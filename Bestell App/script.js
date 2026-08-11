let currentIndex = 0;

function renderAll() {
    let burgerContainer = document.getElementById('burger-container');
    let pizzaContainer = document.getElementById('pizza-container');
    let saladContainer = document.getElementById('salad-container');

    let htmlBurger = '';
    let htmlPizza = '';
    let htmlSalad = '';

    for (let i = 0; i < dishes.length; i++) {

        if (dishes[i].category === "Burger") {
            htmlBurger += `
                <article class="dish-card">
                    <img class="dish-img" src="./assets/img/burger_${i + 1}.png" alt="burger_${i + 1}">

                    <div class="dish-content">
                        <div class="dish-header">
                            <h3 class="dish-title">${dishes[i].name}</h3>
                            <span class="dish-price">${dishes[i].price} €</span>
                        </div>

                        <p class="dish-description">${dishes[i].ingredients}</p>

                        <div class="dish-actions">
                            <button class="add-to-basket-btn" onclick="addToBasket(${i})">
                                Add to basket
                            </button>
                        </div>
                    </div>
                </article>
            `;
        }

        else if (dishes[i].category === "Pizza") {
            htmlPizza += `
                <article class="dish-card">
                    <img class="dish-img" src="./assets/img/pizza_${i + 1}.png" alt="pizza_${i + 1}">

                    <div class="dish-content">
                        <div class="dish-header">
                            <h3 class="dish-title">${dishes[i].name}</h3>
                            <span class="dish-price">${dishes[i].price} €</span>
                        </div>

                        <p class="dish-description">${dishes[i].ingredients}</p>

                        <div class="dish-actions">
                            <button class="add-to-basket-btn" onclick="addToBasket(${i})">
                                Add to basket
                            </button>
                        </div>
                    </div>
                </article>
            `;
        }

        else if (dishes[i].category === "Salad") {
            htmlSalad += `
                <article class="dish-card">
                    <img class="dish-img" src="./assets/img/salad_${i + 1}.png" alt="salad_${i + 1}">

                    <div class="dish-content">
                        <div class="dish-header">
                            <h3 class="dish-title">${dishes[i].name}</h3>
                            <span class="dish-price">${dishes[i].price} €</span>
                        </div>

                        <p class="dish-description">${dishes[i].ingredients}</p>

                        <div class="dish-actions">
                            <button class="add-to-basket-btn" onclick="addToBasket(${i})">
                                Add to basket
                            </button>
                        </div>
                    </div>
                </article>
            `;
        }
    }

    burgerContainer.innerHTML = htmlBurger;
    pizzaContainer.innerHTML = htmlPizza;
    saladContainer.innerHTML = htmlSalad;
}


function toggleNavMenu() {
    let navMenu = document.getElementById('nav-menu');

    navMenu.classList.toggle('d-none');
}


function toggleBasket() {
    let basketElement = document.getElementById('basket');

    basketElement.classList.toggle('d-none');
}


let basket = [];


function addToBasket(i) {
    let selectedDish = dishes[i];

    let basketIndex = basket.findIndex(function(dish) {
        return dish.name === selectedDish.name;
    });

    if (basketIndex === -1) {
        basket.push({
            name: selectedDish.name,
            price: selectedDish.price,
            amount: 1
        });
    } else {
        basket[basketIndex].amount++;
    }

    renderBasket();
    openBasket();
}


function removeFromBasket(i) {
    basket.splice(i, 1);
    renderBasket();
}

function increaseAmount(i) {
    basket[i].amount++;
    renderBasket();
}


function decreaseAmount(i) {
    if (basket[i].amount > 1) {
        basket[i].amount--;
    } else {
        basket.splice(i, 1); 
    }
    renderBasket();
}

function openBasket() {
    let basketElement = document.getElementById('basket');

    basketElement.classList.remove('d-none');
}


function renderBasket() {
    let basketItems = document.getElementById('basket-items');
    let subtotalElement = document.getElementById('subtotal');
    let totalPriceElement = document.getElementById('total-price');
    let btnTotalElement = document.getElementById('btn-total');

    basketItems.innerHTML = '';

    let subtotal = 0;

    for (let i = 0; i < basket.length; i++) {
        let item = basket[i];

        let itemTotal = item.price * item.amount;

        subtotal += itemTotal;

        basketItems.innerHTML += `
            <div class="basket-item-card">

                <div class="basket-item-title">
                    ${item.name}
                </div>

                <div class="basket-item-controls">

                 <div class="amount-picker">
                        <button class="amount-btn" onclick="decreaseAmount(${i})">-</button>
                        <span>${item.amount}x</span>
                        <button class="amount-btn" onclick="increaseAmount(${i})">+</button>
                    </div>

                    <span>
                        ${item.amount} × ${item.price.toFixed(2)} €
                    </span>

                    <span>
                        ${itemTotal.toFixed(2)} €
                    </span>

                </div>

                <button
                    class="remove-from-basket-btn"
                    onclick="removeFromBasket(${i})">
                    <img class="icon-default" src="./assets/icons/delete.svg">
                </button>

            </div>
        `;
    }

    let deliveryFee = 4.99;
    let total = subtotal > 0 ? subtotal + deliveryFee : 0 ;

    subtotalElement.innerText = `${subtotal.toFixed(2)} €`;
    totalPriceElement.innerText = `${total.toFixed(2)} €`;
    btnTotalElement.innerText = `${total.toFixed(2)} €`;
}


function checkout() {
    if (basket.length === 0) {
        return;
    }

    let basketElement = document.getElementById('basket');
    basketElement.classList.add('d-none');

    let confirmation = document.getElementById('order-confirmation');
    confirmation.classList.remove('d-none');

    basket = [];
}


function closeConfirmation() {
    let confirmation = document.getElementById('order-confirmation');

    confirmation.classList.add('d-none');

    renderBasket();
}