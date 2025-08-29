import './industrial.css'
import '../../js/SvgRender'
import '../../js/pageNavigation.js'




document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.interaction-button');
    const industrialItems = document.querySelectorAll('.industrial-item');
    const industrialList = document.querySelector('.industrial-list');

    function filterCards(category) {

        industrialItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });


        filterButtons.forEach(button => {
            if (button.getAttribute('data-filter') === category) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterCards(this.getAttribute('data-filter'));
        });
    });


    filterCards('all');
});
