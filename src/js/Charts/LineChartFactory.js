export class LineChartFactory {
    static createLineChart(containerSelector, data, colors, maxValue) {
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


            // Линия как div
            const lineDiv = document.createElement('div');
            lineDiv.style.cssText = `
                height: 0.208vw;
                background-color: ${colors[index % colors.length]};
                width: ${(item.value / maxDataValue) * 100}%;
                min-width: .1vw;
                max-width: 50%;
            `;
            // Применяем градиент или сплошной цвет
            if (typeof colors[index] === 'string' && colors[index].includes('gradient')) {
                lineDiv.style.background = colors[index];
            } else {
                lineDiv.style.backgroundColor = colors[index];
            }
            // Числовое значение
            const number = document.createElement('p');
            number.className = 'legend-number';
            number.textContent = item.value;

            lineContainer.appendChild(name);
            lineContainer.appendChild(lineDiv);
            lineContainer.appendChild(number);

            container.appendChild(lineContainer);
        });
    }
}