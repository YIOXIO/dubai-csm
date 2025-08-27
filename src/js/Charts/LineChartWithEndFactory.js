export class LineChartWithEndFactory {
    static createLineChartWithEnd(containerSelector, data, colors, maxValue) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        container.innerHTML = '';

        const maxDataValue = maxValue || Math.max(...data.map(item => item.value));

        data.forEach((item, index) => {
            const lineContainer = document.createElement('div');
            lineContainer.className = 'chart-line-container';

            // Название
            const name = document.createElement('p');
            name.className = 'legend-name';
            name.textContent = item.name;

            // Основной контейнер для линии и значения
            const mainWrapper = document.createElement('div');
            mainWrapper.className = 'line-main-wrapper';

            // Контейнер для линии и ромба
            const lineWrapper = document.createElement('div');
            lineWrapper.className = 'line-wrapper';

            // Линия
            const lineDiv = document.createElement('div');
            lineDiv.className = 'chart-line';
            lineDiv.style.cssText = `
                background-color: ${colors[index % colors.length]};
                width: ${(item.value / maxDataValue) * 8}vw;
            `;

            // Применяем градиент или сплошной цвет
            if (typeof colors[index] === 'string' && colors[index].includes('gradient')) {
                lineDiv.style.background = colors[index];
            } else {
                lineDiv.style.backgroundColor = colors[index];
            }

            // Ромб на конце линии
            const diamond = document.createElement('div');
            diamond.className = 'line-diamond';

            lineWrapper.appendChild(lineDiv);
            lineWrapper.appendChild(diamond);

            // Числовое значение
            const number = document.createElement('p');
            number.className = 'legend-number';
            number.textContent = item.value;

            mainWrapper.appendChild(number);
            mainWrapper.appendChild(lineWrapper);

            lineContainer.appendChild(name);
            lineContainer.appendChild(mainWrapper);

            container.appendChild(lineContainer);
            
        });
    }
}