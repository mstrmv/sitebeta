// 1. Список товаров (добавляй сюда новые, если появятся)
const products = [
    { id: 1, name: 'Blackwood Core 10kg', price: 500, img: 'assets/img/core-10kg.png' },
    { id: 2, name: 'Blackwood Core 5kg', price: 280, img: 'assets/img/core-5kg.png' },
    { id: 3, name: 'Blackwood Yard 10kg', price: 450, img: 'assets/img/yard-10kg.jpg' },
    { id: 4, name: 'Blackwood Yard 5kg', price: 250, img: 'assets/img/yard-5kg.jpg' },
    { id: 5, name: 'Gloves', price: 150, img: 'assets/img/gloves.jpg' },
    { id: 6, name: 'Grill Set', price: 1200, img: 'assets/img/grill-set.jpg' }
];

// 2. Функция смены языка
async function setLang(lang) {
    const response = await fetch('translations.json');
    const translations = await response.json();
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = translations[lang][key];
    });

    // Сохраняем выбор и обновляем активный класс на кнопках
    localStorage.setItem('selectedLang', lang);
    document.querySelectorAll('.lang-switch span').forEach(s => s.classList.remove('active'));
    document.getElementById(`lang-${lang}`).classList.add('active');
}

// 3. Генерация каталога (если мы на странице каталога)
function renderCatalog() {
    const catalogGrid = document.querySelector('.catalog-grid');
    if (!catalogGrid) return;

    catalogGrid.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p class="price">${p.price} ₴</p>
            <button class="btn-gold" onclick="addToCart(${p.id})" data-i18n="add_to_cart">В кошик</button>
        </div>
    `).join('');
}

// 4. Простая корзина
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Товар додано!');
}

function updateCartCount() {
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.textContent = cart.length;
}

// Инициализация при загрузке
window.onload = () => {
    const savedLang = localStorage.getItem('selectedLang') || 'uk';
    setLang(savedLang);
    renderCatalog();
    updateCartCount();
};
