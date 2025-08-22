// SvgRender.js
import topLeft from '../svg/blocks/top-left.svg';
import bottomLeft from '../svg/blocks/bottom-left.svg';
import topRight from '../svg/blocks/top-right.svg';
import bottomRight from '../svg/blocks/bottom-right.svg';
import bottomCenter from '../svg/blocks/bottom-center.svg';
import circleB from '../svg/circle/circle-b.svg';
import circleLb from '../svg/circle/circle-lb.svg';
import circleLt from '../svg/circle/circle-lt.svg';
import circleRb from '../svg/circle/circle-rb.svg';
import circleRt from '../svg/circle/circle-rt.svg';
import circleT from '../svg/circle/circle-t.svg';
import circleC from '../svg/circle/circle-c.svg';
import buttonReset from '../svg/buttons/button-reset.svg';
import buttonTypeOne from '../svg/buttons/button-type-one.svg';
import buttonTypeTwo from '../svg/buttons/button-type-two.svg';
import buttonHome from '../svg/buttons/button-home.svg';
import searchInput from '../svg/header/search-input.svg';

// Конфигурация SVG-иконок
const svgConfig = {
    blocks: [
        { className: 'top-left', svg: topLeft },
        { className: 'bottom-left', svg: bottomLeft },
        { className: 'top-right', svg: topRight },
        { className: 'bottom-right', svg: bottomRight },
        { className: 'bottom-center', svg: bottomCenter },
    ],
    circles: [
        { className: 'circle-b', svg: circleB },
        { className: 'circle-lb', svg: circleLb },
        { className: 'circle-lt', svg: circleLt },
        { className: 'circle-rb', svg: circleRb },
        { className: 'circle-rt', svg: circleRt },
        { className: 'circle-t', svg: circleT },
        { className: 'circle-c', svg: circleC },
    ],
    buttons: [
        { className: 'button-reset', svg: buttonReset },
        { className: 'button-type-one', svg: buttonTypeOne },
        { className: 'button-type-two', svg: buttonTypeTwo },
        { className: 'button-home', svg: buttonHome },
    ],
    header: [
        { className: 'search-input-container', svg: searchInput },
    ],
};

// SVG для кольца прогресс-бара (inline)
const progressBarSvg = `
  <svg class="progress-ring" width="19.211vw" height="100%" viewBox="0 0 363 361" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g >
      ${Array.from({ length: 61 }, (_, i) => {
    const angle = (i * 326) / 61;
    return `<path
          class="absolute-progress-bar-item-${i + 1}"
          d="M47.8668 179.775C47.9261 177.007 48.0712 174.231 48.3039 171.451L3.4607 167.698C3.15005 171.409 2.95626 175.115 2.87708 178.811L47.8668 179.775Z"
          fill="#FB9B2B"
          transform="rotate(${angle}, 181.5, 180.5)"
        />`;
}).join('')}
    </g>
  </svg>
`;

// Функция для рендеринга SVG как фоновых изображений
function renderSvgBackgrounds(config) {
    Object.values(config).flat().forEach(({ className, svg }) => {
        const element = document.querySelector(`.${className}`);
        if (element) {
            element.style.backgroundImage = `url(${svg})`;
            element.style.backgroundSize = 'contain';
            element.style.backgroundRepeat = 'no-repeat';
        }
    });
}

// Функция для рендеринга inline SVG прогресс-бара
function renderProgressBar() {
    const container = document.querySelector('.performance-diagram-container');
    if (container) {
        container.innerHTML = progressBarSvg;
    }
}

// Инициализация рендеринга
function initializeSvgRendering() {
    renderSvgBackgrounds(svgConfig);
    renderProgressBar();
}

// Выполнение рендеринга при загрузке страницы
document.addEventListener('DOMContentLoaded', initializeSvgRendering);

export { initializeSvgRendering };