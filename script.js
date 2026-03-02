// Полный список твоих товаров на основе скриншота папки
const products = [
    { id: 1, name: 'Blackwood Core', weight: '10kg', price: 600, img: 'assets/img/core-10kg.png' },
    { id: 2, name: 'Blackwood Core', weight: '5kg', price: 350, img: 'assets/img/core-5kg.png' },
    { id: 3, name: 'Blackwood Core', weight: '3kg', price: 220, img: 'assets/img/core-3kg.png' },
    { id: 4, name: 'Blackwood Yard', weight: '10kg', price: 550, img: 'assets/img/yard-10kg.jpg' },
    { id: 5, name: 'Blackwood Yard', weight: '5kg', price: 300, img: 'assets/img/yard-5kg.jpg' },
    { id: 6, name: 'Blackwood Yard', weight: '3kg', price: 180, img: 'assets/img/yard-3kg.jpg' },
    { id: 7, name: 'Yard Set', weight: 'Full Kit', price: 1200, img: 'assets/img/yard-set.jpg' },
    { id: 8, name: 'Weekend Box', weight: 'Set', price: 950, img: 'assets/img/weekend-box.jpg' },
    { id: 9, name: 'Grill Set', weight: 'Pro', price: 1500, img: 'assets/img/grill-set.jpg' },
    { id: 10, name: 'Gloves', weight: 'Leather', price: 450, img: 'assets/img/gloves.jpg' },
    { id: 11, name: 'Apron', weight: 'Blackwood', price: 700, img: 'assets/img/apron.jpg' },
    { id: 12, name: 'Blower', weight: 'Manual', price: 250, img: 'assets/img/blower.jpg' },
    { id: 13, name: 'Starter', weight: 'Fire', price: 150, img: 'assets/img/starter.jpg' },
    { id: 14, name: 'Thermometer', weight: 'Digital', price: 400, img: 'assets/img/thermometer.jpg' },
    { id: 15, name: 'Royal Ignition', weight: 'Fluid', price: 200, img: 'assets/img/royal-ignition.jpg' }
];

// Логика мультиязычности
async function setLang(lang) {
    try {
        const response = await fetch('translations.json');
        const translations = await response.json();
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        localStorage.setItem('selectedLang', lang);
        document.querySelectorAll('.lang-switch span').forEach(s => s.classList.remove('active'));
        document.getElementById(`lang-${lang}`).classList.add('active');
    } catch (e) { console.error("Ошибка загрузки перевода", e); }
}

// Рендер карточек в каталоге
function renderCatalog() {
    const grid = document.querySelector('.catalog-grid');
    if (!grid) return;

    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <div class="product-img">
                <img src="${p.img}" alt="${p.name}" onerror="this.src='assets/img/hero-bg.png'">
            </div>
            <h3>${p.name}</h3>
            <span>${p.weight}</span>
            <p class="price">${p.price} ₴</p>
            <button class="btn-gold" onclick="addToCart(${p.id})">В кошик</button>
        </div>
    `).join('');
}

// Корзина
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.innerText = cart.length;
}

window.onload = () => {
    const lang = localStorage.getItem('selectedLang') || 'uk';
    setLang(lang);
    renderCatalog();
    updateCartCount();
};

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
