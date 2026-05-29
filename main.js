// Бургер-меню
const burger = document.getElementById('burger');
const navList = document.getElementById('navList');

if (burger) {
  burger.addEventListener('click', () => {
    navList.classList.toggle('open');
  });
}

// Закрыть меню при клике на ссылку (мобилка)
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => navList.classList.remove('open'));
});

// Плавная анимация появления карточек при скролле
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .price-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Анимация счётчиков
const animateNumbers = () => {
  document.querySelectorAll('.stat-num').forEach(num => {
    const text = num.textContent;
    const match = text.match(/[\d.]+/);
    if (!match) return;
    const target = parseFloat(match[0]);
    const suffix = text.replace(match[0], '');
    let current = 0;
    const step = target / 50;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      num.textContent = (Number.isInteger(target) ? Math.floor(current) : current.toFixed(1)) + suffix;
    }, 30);
  });
};

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateNumbers();
      statObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) statObserver.observe(statsSection);
