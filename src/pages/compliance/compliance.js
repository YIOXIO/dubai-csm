import './compliance.css'
import '../../js/SvgRender.js'
import '../../js/pageNavigation.js'
import { tableData } from './data/complianceData.js'
import { initAnimations } from './animation.js'
let currentPage = 1;
const rowsPerPage = 50;
let filteredData = [...tableData];

// Функция для определения типа данных показателя
function getDataType(name, current) {
    if (name.includes('(%)') || current.includes('%')) return 'percentage';
    if (name.includes('(score out of 5)') || name.includes('(FWCI)')) return 'score';
    if (name.includes('(AED)')) return 'currency';
    if (name.includes('(#)')) return 'count';
    return 'other';
}

// Функция для парсинга числового значения
function parseNumericValue(value) {
    return parseFloat(value.replace('%', '').replace('M', '').replace('М', ''));
}

// Функция для определения currentLevel на основе текущего значения и порогов
function calculateCurrentLevel(row) {
    const currentValue = parseNumericValue(row.current);
    const lowThreshold = parseNumericValue(row.thresholdLow);
    const highThreshold = parseNumericValue(row.thresholdHigh);

    let mediumMin, mediumMax;
    if (row.thresholdMedium.includes('-')) {
        [mediumMin, mediumMax] = row.thresholdMedium.split('-').map(value => parseNumericValue(value));
    } else {
        mediumMin = mediumMax = parseNumericValue(row.thresholdMedium);
    }

    if (currentValue >= highThreshold) return "high";
    if (currentValue >= mediumMin) return "medium";
    if (currentValue >= lowThreshold) return "low";
    return "low";
}

// Функция для нормализации значения для прогресс-бара
function normalizeValue(row) {
    const dataType = getDataType(row.name, row.current);
    const currentValue = parseNumericValue(row.current);

    if (dataType === 'score') {
        return (currentValue / 5) * 100;
    }

    const highThreshold = parseNumericValue(row.thresholdHigh);
    return (currentValue / highThreshold) * 100;
}

// Константы для классов CSS
const CSS_CLASSES = {
    low: {
        current: 'threshold-low',
        progress: 'low-element'
    },
    medium: {
        current: 'threshold-medium',
        progress: 'medium-element'
    },
    high: {
        current: 'threshold-high',
        progress: 'high-element'
    }
};

// Функция для получения CSS классов
function getCssClasses(currentLevel) {
    return CSS_CLASSES[currentLevel] || { current: '', progress: '' };
}

// Функция для рендеринга CAA данных
function renderFrequencyCaa(frequencyCaa) {
    if (Array.isArray(frequencyCaa)) {
        return `
            <div class="frequency-caa-list">
                <div class="frequency-caa-title">MoHESR collects the data on:</div>
                <ul class="frequency-caa-items">
                    ${frequencyCaa.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    return frequencyCaa;
}

// Функция для создания строки таблицы
function createTableRow(row) {
    const dataType = getDataType(row.name, row.current);
    const currentLevel = calculateCurrentLevel(row);
    const progressValue = normalizeValue(row);
    const { current: currentClass, progress: progressClass } = getCssClasses(currentLevel);

    return `
        <tr>
            <td>${row.name}</td>
            <td>${row.frequencyPrue}</td>
            <td>${renderFrequencyCaa(row.frequencyCaa)}</td>
            <td class="td-container">
                <div class="threshold-container">
                    <p class="threshold-mark">${row.thresholdLow}</p> 
                    <div class="low-element"></div> 
                    <p class="threshold-text">low</p>
                </div>
                <div class="threshold-container">
                    <p class="threshold-mark">${row.thresholdMedium}</p> 
                    <div class="medium-element"></div> 
                    <p class="threshold-text">medium</p>
                </div>
                <div class="threshold-container">
                    <p class="threshold-mark">${row.thresholdHigh}</p> 
                    <div class="high-element"></div> 
                    <p class="threshold-text">high</p>
                </div>
            </td>
            <td class="td-current">
                <div class="current-value-container">
                    <div class="progress-wrapper">
                        <div class="progress-container">
                            <div class="progress-bar ${progressClass}" style="width: ${progressValue}%"></div>
                        </div>
                        <span class="progress-value ${currentClass}">${row.current}</span>
                    </div>
                </div>
            </td>
        </tr>
    `;
}

// Функция для отрисовки таблицы
function renderTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = filteredData.slice(start, end);

    paginatedData.forEach(row => {
        tableBody.innerHTML += createTableRow(row);
    });
    initAnimations();
}

// Первоначальная отрисовка таблицы
renderTable();