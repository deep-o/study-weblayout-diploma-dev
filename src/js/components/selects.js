function initSelect(element, choices, option) {
  const choice = new Choices(element, {
    silent: true,
    searchEnabled: false,
    itemSelectText: '',
    silent: true,
    shouldSort: false,
    choices: choices,
    allowHTML: true,
  });
  choice.setChoiceByValue(option);
}

function createSelect() {
  const citySelect = document.getElementById('city');
  const categorySelect = document.getElementById('category');
  const cities = [
    {value: 1, label: 'Москва'}, {value: 2, label: 'Санкт-Петербург'},
    {value: 3, label: 'Новосибирск'}, {value: 4, label: 'Екатеринбург'},
    {value: 5, label: 'Казань'}, {value: 6, label: 'Нижний&nbspНовгород'},
    {value: 7, label: 'Усть-Каменогорск'}, {value: 8, label: 'Днепропетровск'},
  ];
  const categories = [
    {value: 'sofa', label: 'Диваны'}, {value: 'drawer', label: 'Комоды'},
    {value: 'armchair', label: 'Кресла'}, {value: 'chair', label: 'Стулья'},
    {value: 'poof', label: 'Пуфы'}, {value: 'table', label: 'Столы'},
    {value: 'bed', label: 'Кровати'}, {value: 'accessory', label: 'Аксессуары'},
    {value: 'bedside', label: 'Тумбы'},
  ];
  initSelect(citySelect, cities, cities[0]);
  initSelect(categorySelect, categories, categories[0]);

  const ariaCity = city.getAttribute('aria-label');
  citySelect.closest('.choices').setAttribute('aria-label', ariaCity);
  const ariaCategory = city.getAttribute('aria-label');
  citySelect.closest('.choices').setAttribute('aria-label', ariaCategory);
}

createSelect();

const searchForm = document.querySelector('.search-filter');
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
})

const defaultSelect = () => {
  const element = document.querySelectorAll('.default')
}
