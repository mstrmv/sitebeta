// Проверка путей: если картинка не в assets/img, замени ниже
const IMG_PATH = 'assets/img/';

const products = [
    { id: 1, name: 'Core', weight: '10kg', price: 600, img: 'core-10kg.png' },
    { id: 2, name: 'Core', weight: '5kg', price: 350, img: 'core-5kg.png' },
    { id: 3, name: 'Yard', weight: '10kg', price: 550, img: 'yard-10kg.jpg' },
    { id: 4, name: 'Yard Set', weight: 'Pro', price: 1200, img: 'yard-set.jpg' }
    // Добавь остальные по аналогии
];

// Установка фона через JS (так надежнее для GitHub)
function initHero() {
    const hero = document.getElementById('hero-section');
    if (hero) {
        hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${IMG_PATH}hero-bg.png')`;
    }
}

// Перевод
async function setLang(lang) {
    try {
        const res = await fetch('translations.json');
        if (!res.ok) throw new Error('Файл переводов не найден');
        const data = await res.json();
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (data[lang][key]) el.textContent = data[lang][key];
        });

        localStorage.setItem('lang', lang);
        document.querySelectorAll('.lang-switch span').forEach(s => s.classList.remove('active'));
        document.getElementById(`lang-${lang}`).classList.add('active');
    } catch (err) { console.log(err); }
}

// Корзина
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const el = document.getElementById('cart-count');
    if (el) el.innerText = cart.length;
}

window.onload = () => {
    initHero();
    const savedLang = localStorage.getItem('lang') || 'uk';
    setLang(savedLang);
    updateCartCount();
};
