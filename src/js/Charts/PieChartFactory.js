import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { LegendComponent } from 'echarts/components';
echarts.use([LegendComponent, PieChart, CanvasRenderer]);

export class PieChartFactory {
    static createChart(containerSelector, legendSelector, pieData, colors) {
        try {
            const chartDom = document.querySelector(containerSelector);
            const legendDom = document.querySelector(legendSelector);

            if (!chartDom || !legendDom) {
                throw new Error('Chart or legend container not found');
            }

            const myChart = echarts.init(chartDom);

            const option = {
                color: colors,
                legend: { show: false },
                series: [
                    {
                        name: 'Data',
                        type: 'pie',
                        radius: '100%',
                        data: pieData,
                        label: { show: false },
                        labelLine: { show: false },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 1,
                                shadowColor: 'rgba(135, 234, 120, 1)'
                            }
                        }
                    }
                ]
            };

            myChart.setOption(option);
            this.createExternalLegend(myChart, legendDom, colors);

            window.addEventListener('resize', () => {
                myChart.resize();
                this.createExternalLegend(myChart, legendDom, colors);
            });

            return myChart;

        } catch (error) {
            console.error('Error creating chart:', error);
        }
    }

    static createExternalLegend(chart, legendContainer, colors) {
        legendContainer.innerHTML = '';
        const option = chart.getOption();
        const seriesData = option.series[0].data;

        seriesData.forEach((item, index) => {
            const legendItem = document.createElement('div');
            legendItem.className = 'legend-item';
            legendItem.style.cssText = `
                display: flex;
                align-items: center;
                cursor: pointer;
                margin-inline-end: 0.313vw;
            `;

            const colorBox = document.createElement('div');
            colorBox.style.cssText = `
                width: 0.417vw;
                height: 0.417vw;
                background-color: ${colors[index % colors.length]};
                transform: rotate(-45deg);
                margin-right: 0.3vw;
            `;

            const text = document.createElement('span');
            text.textContent = item.name;
            text.style.cssText = `
                font-size: 0.349vw;
                color: #E0D8C1;
                letter-spacing: 0.035vw;
            `;

            legendItem.appendChild(colorBox);
            legendItem.appendChild(text);

            legendItem.addEventListener('click', () => {
                chart.dispatchAction({
                    type: 'legendToggleSelect',
                    name: item.name
                });
                this.updateLegendStyles(chart, legendContainer);
            });

            legendContainer.appendChild(legendItem);
        });

        this.updateLegendStyles(chart, legendContainer);
    }

    static updateLegendStyles(chart, legendContainer) {
        const option = chart.getOption();
        const legend = option.legend[0] || {};
        const selected = legend.selected || {};
        const legendItems = legendContainer.querySelectorAll('.legend-item');

        legendItems.forEach((item, index) => {
            const seriesData = option.series[0].data;
            if (index < seriesData.length) {
                const itemName = seriesData[index].name;
                const isSelected = selected[itemName] !== false;
                item.style.opacity = isSelected ? '1' : '0.3';
            }
        });
    }
}