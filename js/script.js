let body = document.querySelector('body')

let burger = document.querySelector('#burger');
let burgerBtn = document.querySelector('#burgerBtn');
let burgerBg = document.querySelector('#burgerBg');

let productsContainer = document.querySelector('#products');
let productId = document.querySelector('#productId');
let productText = document.querySelector('#productText');
let productBtn = document.querySelector('.product__menu-btn');
let productMenu = document.querySelector('.product__menu-list');

let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');

burgerBtn.addEventListener('click', function () {
    burger.classList.toggle("active");
    body.classList.toggle('locked');
    burgerBg.classList.toggle('active');
})

productBtn.addEventListener('click', function () {
    productMenu.classList.toggle("active");
})

function getProductItem(product) {
    return `<div class="product__item" data-id="${product.id}" data-text="${product.text}">
        <h4 class="product__item-title">ID:${product.id}</h4>
    </div>`
}

function openProduct(product) {
    productId.innerHTML = product.id;
    productText.innerHTML = product.text;

    body.classList.add('locked');
    popup.classList.add('active');
}

popupClose.addEventListener('click', function () {
    popup.classList.remove('active');
    body.classList.remove('locked');
})

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight) {
        getData()
    }
});

async function getData() {
    const url = "https://brandstestowy.smallhost.pl/api/random";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();

        let data = json.data;
        let markup = '';

        data.forEach((product) => {
            markup += getProductItem(product);
        });

        productsContainer.innerHTML = markup;

        let products = document.querySelectorAll('.product__item');
        products.forEach(product => {
            product.addEventListener('click', (event) => {
                let data = {
                    id: event.target.dataset.id,
                    text: event.target.dataset.text
                }

                openProduct(data)
            })
        })
    } catch (error) {
        console.error(error.message);
    }
}