// header scripts

$('.header__menu-link, .burger__list-link').click(function () {
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

$('.burger__icon').click(function () {
    $('.burger').toggleClass("active");
    $('.burger__bg').toggleClass('active');
    $('body').toggleClass('locked');
})

$('.burger__list-link').click(function () {
    $('.burger').removeClass("active");
    $('.burger__bg').removeClass('active');
    $('body').removeClass('locked');
})

// end

// api request
let pageSize = [10, 20, 30, 40, 50];
let currentPageSize = pageSize[0];
let currentPageNum = 1;

$('.product__menu-btn').click(function () {
    $('.product__menu-list').addClass('active');
})

pageSize.forEach((item) => {
    console.log(item)
    $('.product__menu-list').append(getPageSizeList(item))
});

function getPageSizeList(size) {
    return `<li class="product__menu-item" data-val="${size}">${size}</li>`
}

function choosePageSize() {
    $('.product__menu-btn').text(currentPageSize);
}
choosePageSize();

$('.product__menu-item').click(function () {
    $('.product__wrapper').empty();
    currentPageSize = $(this).attr('data-val');
    currentPageNum = 1;

    $('.product__menu-list').removeClass('active');

    choosePageSize();
})

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight) {
        getData()
    }
});

function getProductItem(product) {
    return `<div class="product__item" data-id="${product.id}" data-text="${product.text}">
        <h4 class="product__item-title">ID:${product.id}</h4>
    </div>`
}

function openProduct(product) {
    $('#productId').text(product.id)
    $('#productText').text(product.id)

    $('.popup').addClass('active');
    $('body').addClass('locked');
}

$('.popup__close').click(function () {
    $('.popup').removeClass('active');
    $('body').removeClass('locked');
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
            $('.product__wrapper').append(getProductItem(product));
        });

        $('.product__item').click(function (event) {
            let data = {
                id: event.target.dataset.id,
                text: event.target.dataset.text
            }
            openProduct(data)
        })

        currentPageNum++;
    } catch (error) {

    }
}

// end