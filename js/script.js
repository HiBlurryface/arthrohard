// burger 
let burger = document.querySelector('#burger')
let burgerBtn = document.querySelector('#burgerBtn')

burgerBtn.addEventListener('click', function () {
    burger.classList.toggle("active");
})