let body = document.querySelector('body')

let section = document.querySelectorAll('section');

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

$('.header__menu-link').click(function () {
    let elem = $(this).attr('href');
    let dist = $(elem).offset().top - 100;

    $('html,body').animate({ 'scrollTop': dist }, 1000)

    return false;
})

$(window).scroll(function () {
    $('section[id]').each(function () {
        var id = $(this).attr('id');
        if ($(this).offset().top - 100 < $(window).scrollTop()) {
            $(`.header__menu-link[href="${'#' + id}"]`).parent().addClass('active').siblings().removeClass('active')
        }
    })
})

// api scripts

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

let pageSize = [10, 20, 30, 40, 50];
let currentPageSize = 5;
let currentPageNum = 1;

function choosePageSize() {
    $('.product__menu-btn').text(currentPageSize);
}
choosePageSize();
productBtn.addEventListener('click', function () {
    productMenu.classList.toggle("active");
})

let markup = '';
$('.product__menu-item').click(function () {
    currentPageSize = $(this).attr('data-val');
    currentPageNum = 1;

    choosePageSize();
    getData();
    markup = '';
})


async function getData() {
    const url = `https://brandstestowy.smallhost.pl/api/random?pageNumber=${currentPageNum}&pageSize=${currentPageSize}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();

        let data = json.data;

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

        currentPageNum++;
    } catch (error) {
    }
}