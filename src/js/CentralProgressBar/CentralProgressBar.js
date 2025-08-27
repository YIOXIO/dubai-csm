export class CentralProgressBar {
    constructor(containerSelector, totalHours = 1080) {
        this.container = document.querySelector(containerSelector);
        this.totalHours = totalHours;
        this.currentHours = 0;
        this.totalSegments = 61;
    }

    // Обновляем данные и перерисовываем прогресс-бар
    updateProgress(currentHours) {
        this.currentHours = currentHours;
        this.render();
        this.updateTextValues();
    }

    // Обновляем текстовые значения
    updateTextValues() {
        const percentage = Math.min(100, Math.round((this.currentHours / this.totalHours) * 100));

        const totalElement = document.querySelector('.circle-number-total');
        const successElement = document.querySelector('.circle-number-success');
        const successTextElement = document.querySelector('.circle-text-success');

        if (totalElement) totalElement.textContent = this.currentHours;
        if (successElement) successElement.textContent = `${percentage}%`;
        // if (successTextElement) {
        //     successTextElement.textContent = percentage === 100 ?
        //         'Absolute success' :
        //         `${percentage}% completed`;
        // }
    }

    // Генерируем SVG прогресс-бара
    generateSvg() {
        const completedSegments = Math.min(
            this.totalSegments,
            Math.floor((this.currentHours / this.totalHours) * this.totalSegments)
        );

        return `
            <svg class="progress-ring" width="19.211vw" height="100%" viewBox="0 0 363 361" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                    ${Array.from({ length: this.totalSegments }, (_, i) => {
            const angle = (i * 326) / this.totalSegments;
            const opacity = i < completedSegments ? 1 : 0.2;

            return `<path
                            class="progress-bar-segment"
                            d="M47.8668 179.775C47.9261 177.007 48.0712 174.231 48.3039 171.451L3.4607 167.698C3.15005 171.409 2.95626 175.115 2.87708 178.811L47.8668 179.775Z"
                            fill="#FB9B2B"
                            fill-opacity="${opacity}"
                            transform="rotate(${angle}, 181.5, 180.5)"
                        />`;
        }).join('')}
                </g>
            </svg>
        `;
    }

    // Рендерим прогресс-бар
    render() {
        if (this.container) {
            this.container.innerHTML = this.generateSvg();
        }
    }

    // Инициализация
    init() {
        this.render();
        this.updateTextValues();
    }
}