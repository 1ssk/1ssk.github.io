document.addEventListener('DOMContentLoaded', () => {
    // Плавная прокрутка
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Валидация формы
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            alert('Миссия запущена! Сообщение отправлено.');
            form.reset();
        } else {
            alert('Ошибка: Заполните все поля для запуска.');
        }
    });

    // Эффект звездного неба для всех секций
    const canvases = [
        { id: 'stars', height: window.innerHeight },
        { id: 'stars-about', height: window.innerHeight },
        { id: 'stars-portfolio', height: window.innerHeight },
        { id: 'stars-contact', height: window.innerHeight }
    ];

    canvases.forEach(canvasInfo => {
        const canvas = document.getElementById(canvasInfo.id);
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = canvasInfo.height;

        const stars = [];
        for (let i = 0; i < 200; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5,
                speed: Math.random() * 0.5 + 0.1
            });
        }

        function animateStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#fff';
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();
                star.x -= star.speed;
                if (star.x < 0) star.x = canvas.width;
            });
            requestAnimationFrame(animateStars);
        }
        animateStars();
    });

    // Анимация появления секций
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 1s, transform 1s';
        observer.observe(section);
    });
});