let currentIndex = 0;


let basket = [];


function renderAll() {
    let containers ={ 
        Burger: document.getElementById('burger-container'),
    Pizza: document.getElementById('pizza-container'),
    Salad: document.getElementById('salad-container'),
    }
   for (let container of Object.values(containers)) {
        container.innerHTML = '';
    }

    for (let i = 0; i < dishes.length; i++) {
        let dish = dishes[i];
        let basketItem = basket.find(item => item.name === dish.name);
        let amount = basketItem ? basketItem.amount : 0;
        let category = dish.category.toLowerCase();

        containers[dish.category].innerHTML += `
            <article class="dish-card">
                <img class="dish-img" src="./assets/img/${category}_${i + 1}.png">
                <div class="dish-content">
                    <div class="dish-header">
                        <h3 class="dish-title">${dish.name}</h3>
                        <span class="dish-price">${dish.price} €</span>
                    </div>
                    <p class="dish-description">${dish.ingredients.join(', ')}</p>
                    <div class="dish-actions">
                        <button class="add-to-basket-btn" onclick="addToBasket(${i})">
                            ${amount > 0 ? `Added (${amount})` : 'Add to basket'}
                        </button>
                    </div>
                </div>
            </article>`;
    }
}



function toggleNavMenu() {
    let navMenu = document.getElementById('nav-menu');

    navMenu.classList.toggle('d-none');
}


function toggleBasket() {
    let basketElement = document.getElementById('basket');

    basketElement.classList.toggle('d-none');
}


function addToBasket(i) {
    let selectedDish = dishes[i];

    let basketIndex = basket.findIndex(function (dish) {
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
    renderAll();
    openBasket();
}


function removeFromBasket(i) {
    basket.splice(i, 1);
    renderBasket();
    renderAll();
}


function changeAmount(i, increase) {
    if (increase) {
        basket[i].amount++;
    } else if (basket[i].amount > 1) {
        basket[i].amount--;
    } else {
        basket.splice(i, 1);
    }

    renderBasket();
    renderAll();
}


function openBasket() {
    let basketElement = document.getElementById('basket');

    basketElement.classList.remove('d-none');
}


function renderBasket() {
    let basketItems = document.getElementById('basket-items');
    let subtotal = 0;
    basketItems.innerHTML = '';

    for (let i = 0; i < basket.length; i++) {
        let item = basket[i], itemTotal = item.price * item.amount;
        subtotal += itemTotal;
        basketItems.innerHTML += `
            <div class="basket-item-card">
                <div class="basket-item-title">${item.name}</div>
                <div class="basket-item-controls">
                    <div class="amount-picker">
                        <button class="amount-btn" onclick="changeAmount(${i}, false)">-</button>
                        <span>${item.amount}x</span>
                        <button class="amount-btn" onclick="changeAmount(${i}, true)">+</button>
                    </div>
                    <span>${item.amount} × ${item.price.toFixed(2)} €</span>
                    <span>${itemTotal.toFixed(2)} €</span>
                </div>
                <button class="remove-from-basket-btn" onclick="changeAmount(${i}, false)"><img class="icon-default" src="./assets/icons/delete.svg"></button>
            </div>`;
    }
    let total = subtotal > 0 ? subtotal + 4.99 : 0;
    document.getElementById('subtotal').innerText = `${subtotal.toFixed(2)} €`;
    document.getElementById('total-price').innerText = `${total.toFixed(2)} €`;
    document.getElementById('btn-total').innerText = `${total.toFixed(2)} €`;
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