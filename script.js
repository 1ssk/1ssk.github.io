// ===========================
// ФУНКЦИЯ ПОДКЛЮЧЕНИЯ К TELEGRAM
// ===========================

function handleConnect() {
    window.open('https://t.me/annonyx_bot', '_blank');
}

// ===========================
// ДОПОЛНИТЕЛЬНЫЕ АНИМАЦИИ И ЭФФЕКТЫ
// ===========================

// Плавное появление элементов при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем класс для плавного появления контента
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Анимация появления карточек преимуществ
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 200 + (index * 150));
    });
});

// ===========================
// ПАРАЛЛАКС ЭФФЕКТ ДЛЯ ОРБИТ
// ===========================

document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const orbits = document.querySelectorAll('.orbit');
    orbits.forEach((orbit, index) => {
        const speed = (index + 1) * 10;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        orbit.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    // Параллакс для звезд
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        const speed = (index + 1) * 5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        star.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===========================
// ОПТИМИЗАЦИЯ ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ
// ===========================

// Отключаем параллакс на мобильных устройствах для лучшей производительности
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
    document.addEventListener('mousemove', function(e) {
        e.preventDefault();
    });
}

// ===========================
// SMOOTH SCROLL (опционально)
// ===========================

// Плавная прокрутка для ссылок (если будут добавлены якоря)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// INTERSECTION OBSERVER ДЛЯ АНИМАЦИЙ
// ===========================

// Создаем наблюдатель для анимации элементов при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Наблюдаем за секциями
const sections = document.querySelectorAll('.features-section, .footer');
sections.forEach(section => {
    observer.observe(section);
});

// ===========================
// ДОПОЛНИТЕЛЬНАЯ АНИМАЦИЯ ПРИ СКРОЛЛЕ
// ===========================

let lastScrollY = window.scrollY;

window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;
    
    // Эффект параллакса для радиального градиента
    const radialGradient = document.querySelector('.radial-gradient');
    if (radialGradient) {
        const scrollPercent = currentScrollY / window.innerHeight;
        radialGradient.style.opacity = Math.max(0, 1 - scrollPercent);
    }
    
    // Обновляем положение звезд при скролле
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        const speed = (index + 1) * 0.5;
        star.style.transform = `translateY(${currentScrollY * speed * 0.1}px)`;
    });
    
    lastScrollY = currentScrollY;
});

// ===========================
// УЛУЧШЕННАЯ ДОСТУПНОСТЬ
// ===========================

// Добавляем поддержку клавиатуры для кнопки
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleConnect();
        }
    });
}

// Фокус для доступности
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// ===========================
// ПРОИЗВОДИТЕЛЬНОСТЬ
// ===========================

// Дебаунс для оптимизации событий
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Оптимизируем обработчик скролла
const optimizedScroll = debounce(function() {
    // Дополнительная логика при скролле
}, 100);

window.addEventListener('scroll', optimizedScroll);

// ===========================
// ДОПОЛНИТЕЛЬНЫЕ УТИЛИТЫ
// ===========================

// Функция для добавления ripple эффекта на кнопку (опционально)
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Можно добавить ripple эффект к кнопке (опционально)
// ctaButton.addEventListener('click', createRipple);

// ===========================
// КОНСОЛЬ ИНФО
// ===========================

console.log('%c🚀 Anyx - Быстрое и стабильное подключение', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
console.log('%c150 ₽ в месяц | @annonyx_bot', 'color: #22d3ee; font-size: 14px;');
console.log('%c© 2026 Anyx. Разработка и дизайн', 'color: #64748b; font-size: 12px;');
