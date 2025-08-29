document.addEventListener('DOMContentLoaded', function () {
    // Функция для навигации
    function setupNavigation(buttonClass, targetPage) {
        const button = document.querySelector(buttonClass);

        if (button) {
            button.addEventListener('click', function () {
                if (!window.location.pathname.endsWith(targetPage)) {
                    window.location.href = targetPage;
                }
            });
            button.style.cursor = 'pointer';
        }
    }

    // Настраиваем кнопки
    setupNavigation('.button-home', 'index.html');
    setupNavigation('.academic-link', 'employee-academic.html');
    setupNavigation('.admin-link', 'employee-admin.html');
    setupNavigation('.bottom-center', 'student.html');
    setupNavigation('.bottom-left', 'science.html');
    setupNavigation('.circle-lb', 'compliance.html');
    setupNavigation('.circle-b', 'industrial.html');
    setupNavigation('.bottom-right', 'development-courses.html');
    setupNavigation('.admissinon-campgain', 'admissinon-campgain.html');
    setupNavigation('.media-activity', 'media-activity.html');
    setupNavigation('.screen-saver-button', 'screen-saver.html');
});