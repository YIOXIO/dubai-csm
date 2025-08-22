
import 'core-js/stable';
import './index.css';
import './js/SvgRender.js';
import { PieChartFactory } from './js/Charts/PieChartFactory.js';
import { adminColors, adminData } from './data/Employees/AdminEmployees.js';
import { academicData, academicColors } from './data/Employees/AcademicEmployees.js';
import { LineChartFactory } from './js/Charts/LineChartFactory.js';
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
    100 // Максимальное значение для масштабирования
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


