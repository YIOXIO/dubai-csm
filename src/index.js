
import 'core-js/stable';
import './index.css';
import './js/SvgRender.js';
import './js/pageNavigation.js'
import { PieChartFactory } from './js/Charts/PieChartFactory.js';
import { adminColors, adminData } from './data/Employees/AdminEmployees.js';
import { academicData, academicColors } from './data/Employees/AcademicEmployees.js';
import { LineChartFactory } from './js/Charts/LineChartFactory.js';
import { LineChartWithEndFactory } from './js/Charts/LineChartWithEndFactory.js';
import { genderAcademicData, genderAcademicColors } from './data/GenderData/GenderAcademicData.js';
import { genderAdminData, genderAdminColors } from './data/GenderData/GenderAdminData.js';
import { publicationData, publicationColors } from './data/ScientificResearch/publication.js';
import { conferenceData, conferenceColors } from './data/ScientificResearch/Conferences.js';
import { centersData, centersColors } from './data/CentersAndLabs/Centers.js';
import { bachelorsData, bachelorsColors } from './data/Students/bachelorsData.js';
import { enrolledData, enrolledColors } from './data/Students/enrolledData.js';
import { firstSemesterData, firstSemesterColors } from './data/Students/firstSemester.js';
import { secondSemesterData, secondSemesterColors } from './data/Students/secondSemester.js';
import { mastersData, mastersColors } from './data/Students/mastersData.js';
import { bachelorsProgrammData, bachelorsProgrammColors } from './data/Programms/bachelorsProgrammData.js';
import { mastersProgrammData, mastersProgrammColors } from './data/Programms/masterProgrammData.js';
import { CentralProgressBar } from './js/CentralProgressBar/CentralProgressBar.js';
import { totalHours } from './data/TotalHours/totalHours.js';

function initCharts() {
    // Первая диаграмма
    PieChartFactory.createChart(
        '.chart-container-admin',
        '.legends-admin',
        adminData,
        adminColors
    );

    // Вторая диаграмма (академические сотрудники)
    PieChartFactory.createChart(
        '.chart-container-academic',
        '.legends-academic',
        academicData,
        academicColors
    );
    const centralProgressBar = new CentralProgressBar('.performance-diagram-container', totalHours.total);
    centralProgressBar.updateProgress(totalHours.current);
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCharts);
} else {
    initCharts();
}


LineChartFactory.createLineChart(
    '.chart-line-container-admin',
    genderAdminData,
    genderAdminColors,
    45 // Максимальное значение для масштабирования
);

LineChartFactory.createLineChart(
    '.chart-line-container-academic',
    genderAcademicData,
    genderAcademicColors,
    45 // Максимальное значение для масштабирования
);
LineChartFactory.createLineChart(
    '.chart-line-container-publication',
    publicationData,
    publicationColors,
    30 // Максимальное значение для масштабирования
);
LineChartFactory.createLineChart(
    '.chart-line-container-conference',
    conferenceData,
    conferenceColors,
    45 // Максимальное значение для масштабирования
);
LineChartFactory.createLineChart(
    '.chart-line-container-centers',
    centersData,
    centersColors,
    4 // Максимальное значение для масштабирования
);
LineChartFactory.createLineChart(
    '.chart-line-container-bachelors',
    bachelorsData,
    bachelorsColors,
    100 // Максимальное значение для масштабирования
);
LineChartFactory.createLineChart(
    '.chart-line-container-masters',
    mastersData,
    mastersColors,
    300 // Максимальное значение для масштабирования
);
LineChartFactory.createLineChart(
    '.chart-line-container-firstSemester',
    firstSemesterData,
    firstSemesterColors,
    100 // Максимальное значение для масштабирования
);

LineChartFactory.createLineChart(
    '.chart-line-container-secondSemester',
    secondSemesterData,
    secondSemesterColors,
    100 // Максимальное значение для масштабирования
);

LineChartFactory.createLineChart(
    '.chart-line-container-enrolled',
    enrolledData,
    enrolledColors,
    100 // Максимальное значение для масштабирования
);


LineChartWithEndFactory.createLineChartWithEnd(
    '.chart-line-container-bachelors-programm',
    bachelorsProgrammData,
    bachelorsProgrammColors,
    100, // Максимальное значение для масштабирования

);


LineChartWithEndFactory.createLineChartWithEnd(
    '.chart-line-container-masters-programm',
    mastersProgrammData,
    mastersProgrammColors,
    100
);


function animateNavigationLine() {
    const line = document.querySelector('.bottom-left-line');
    if (!line) return;

    // Последовательность анимаций
    setTimeout(() => {
        line.style.setProperty('--after-opacity', '1');
    }, 500);

    setTimeout(() => {
        line.querySelector('svg').style.opacity = '1';
        const path = line.querySelector('path');
        path.style.animation = 'drawLine 1.5s ease-in-out forwards';
    }, 1000);

    setTimeout(() => {
        line.style.setProperty('--before-opacity', '1');
    }, 2500);
}

// Запуск при загрузке
document.addEventListener('DOMContentLoaded', animateNavigationLine);

