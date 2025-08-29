// Функция для анимации прогресс-бара
function animateProgressBar(progressBar, progressValue) {
    progressBar.style.width = `${progressValue}%`;
    progressBar.style.transition = 'width 1s ease-in-out';
}

// Функция для анимации появления строк
function animateRows() {
    const rows = document.querySelectorAll('.table-row');
    rows.forEach((row, index) => {
        setTimeout(() => {
            row.classList.add('row-visible');
        }, index * 50);
    });
}

// Функция для анимации прогресс-баров
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach((bar, index) => {
        const progressValue = bar.parentElement.parentElement.parentElement.parentElement.getAttribute('data-progress');
        setTimeout(() => {
            animateProgressBar(bar, progressValue);
        }, index * 50 + 300);
    });
}

// Основная функция инициализации анимаций
export function initAnimations() {
    // Анимация появления строк
    animateRows();

    // Анимация прогресс-баров
    animateProgressBars();
}

// Функция для анимации при hover
export function initHoverAnimations() {
    const rows = document.querySelectorAll('tr');
    rows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.transform = 'translateY(-2px)';
            row.style.transition = 'transform 0.3s ease';
        });

        row.addEventListener('mouseleave', () => {
            row.style.transform = 'translateY(0)';
        });
    });
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    initHoverAnimations();
});