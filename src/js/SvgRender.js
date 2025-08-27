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
import buttonReset from '../svg/buttons/button-reset.svg';
import buttonTypeOne from '../svg/buttons/button-type-one.svg';
import buttonTypeTwo from '../svg/buttons/button-type-two.svg';
import buttonHome from '../svg/buttons/button-home.svg';
import searchInput from '../svg/header/search-input.svg';
import smallFrame from '../svg/small-frame.svg';
import gridCorner from '../svg/grid_plus_corner.svg';

import topLeftLine from '../svg/navigation-lines/top-left-line.svg?inline'
import topRightLine from '../svg/navigation-lines/top-right-line.svg?inline'
import bottomLeftLine from '../svg/navigation-lines/bottom-left-line.svg?inline'
import bottomRightLine from '../svg/navigation-lines/bottom-right-line.svg?inline'


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
    frames: [
        { className: 'small-frame', svg: smallFrame },
        { className: 'grid-corner', svg: gridCorner }
    ],

    navigationLines: [
        { className: 'top-left-line', svg: topLeftLine },
        { className: 'top-right-line', svg: topRightLine },
        { className: 'bottom-left-line', svg: bottomLeftLine },
        { className: 'bottom-right-line', svg: bottomRightLine },
    ]
};


function renderSvgBackgrounds(config) {
    Object.values(config).flat().forEach(({ className, svg }) => {
        const elements = document.querySelectorAll(`.${className}`);
        elements.forEach(element => {
            element.style.backgroundImage = `url(${svg})`;
            element.style.backgroundSize = 'contain';
            element.style.backgroundRepeat = 'no-repeat';
        });
    });
}

function renderNavigationLines(config) {
    // Рендерим навигационные линии inline
    if (config.navigationLines) {
        config.navigationLines.forEach(({ className, svg }) => {
            const elements = document.querySelectorAll(`.${className}`);
            elements.forEach(element => {
                // Вставляем SVG как inline код
                element.innerHTML = svg;

                // Добавляем класс для стилизации
                const svgElement = element.querySelector('svg');
                if (svgElement) {
                    svgElement.classList.add('navigation-line-svg');
                }
            });
        });
    }
}

function initializeSvgRendering() {
    renderSvgBackgrounds(svgConfig);
    renderNavigationLines(svgConfig)
}

document.addEventListener('DOMContentLoaded', initializeSvgRendering);

export { initializeSvgRendering };