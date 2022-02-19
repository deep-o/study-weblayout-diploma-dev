(() => {


  if (window.location.pathname.indexOf('catalog') >= 0) {
    const CLASSES = {
      rangeSlider: ['range-slider'],
      nouiConnect: ['noUi-connect'],
      nouiHandle: ['noUi-handle'],
      field: ['filters__wrap'],
      filterItem: ['filters__item'],
      more: ['filters__more', 'btn-reset'],
      extra: ['extra-item'],
      check: ['check__input'],
      price: ['filters__input'],
      hidden: ['visually-hidden'],
      tagList: ['catalog-tags__list'],
      tagItem: ['catalog-tags__item'],
      tagLabel: ['catalog-tags__label'],
      tagClose: ['close-btn', 'btn-reset', 'catalog-tags__close'],
    }

    const max = 9;
    const minPrice = 'filter-min';
    const maxPrice = 'filter-max';

    // инициализация rangeSlider
    const rangeSlider = document.querySelector(`.${CLASSES.rangeSlider}`);
    const inputMin = document.getElementById('min-price');
    const inputMax = document.getElementById('max-price');
    const inputs = [inputMin, inputMax];

    if (rangeSlider) {
      noUiSlider.create(rangeSlider, {
        start: [2000, 150000],
        connect: true,
        step: 500,
        range: {
          'min': 0,
          'max': 200000
        }
      });

      // отслеживание изменения rangeSlider и отображение значений в инпутах

      rangeSlider.noUiSlider.on('update', function (values, handle) {
        inputs[handle].value = Math.round(values[handle]);
      });

      const setRangeSlider = (i, value) => {
        let arr = [null, null];
        arr[i] = value;
        rangeSlider.noUiSlider.set(arr);
      }

      inputs.forEach((el, index) => {
        el.addEventListener('change', (e) => {
          setRangeSlider(index, e.currentTarget.value);
        })
      })
    }

    const line = document.querySelector(`.${CLASSES.nouiConnect}`);
    const handles = document.querySelectorAll(`.${CLASSES.nouiHandle}`)

    function activateLine() {
      line.classList.add('is-focused');
    };

    function deactivateLine() {
      line.classList.remove('is-focused');
    };

    handles.forEach((el) => {
      el.onfocus = function () {
        activateLine();
      };
      el.onblur = function () {
        deactivateLine();
      };

    })

    // добавление кнопок ещё, если фильтров более 9
    const filters = document.querySelectorAll(`.${CLASSES.field}`);

    // переключение кнопки ещё/свернуть
    function toggleMore(btn) {
      let hide = parseInt(btn.getAttribute('data-handle'));
      const list = btn.previousElementSibling.querySelectorAll('.extra-item');

      list.forEach((el) => {
        hide === 1 ? el.classList.add(`${CLASSES.hidden}`) : el.classList.remove(`${CLASSES.hidden}`);
      })

      hide ? btn.textContent = `+ ещё ${list.length}` : btn.textContent = 'свернуть';
      hide = 1 - hide;
      setAttributes(btn, {
        'data-handle': hide
      })
    }

    // посчитать количество чекбоксов в разделе, и если их более 9, то добавить кнопку
    function countItems(el) {
      const items = el.querySelectorAll(`.${CLASSES.filterItem}`);
      const more = items.length - max;

      if (more > 0) {
        const moreBtn = crElem('button', CLASSES.more);
        setAttributes(moreBtn, {
          'data-handle': 1
        })
        el.append(moreBtn);

        for (let i = max; i < items.length; i++) {
          items[i].classList.add(`${CLASSES.extra}`)
        }
        toggleMore(moreBtn);

        moreBtn.addEventListener('click', (el) => {
          toggleMore(el.target);
        });
      }
    }

    // пройтись по разделам фильтров
    filters.forEach((el) => {
      countItems(el);
    })

    // создание шильд и добавление их на лист

    // при нажатии на крестик в шильдах
    function onClose(data, change = false) {
      const tag = document.querySelector(`[data-check="${data}"]`);
      const input = document.querySelector(`[data-filter="${data}"]`);
      const type = input.getAttribute('data-type');

      if (!change && type === 'price') {
        const param = data.split('-')[1];
        input.value = input[param];

        const index = ['min', 'max'].indexOf(param);
        const setRangeSlider = (i, value) => {
          let arr = [null, null];
          arr[i] = value;
          rangeSlider.noUiSlider.set(arr);
        }
        setRangeSlider(index, input.value);
      }

      if (tag) {
        deleteElem(tag.parentElement)
      };

      input.checked = false;
    }
    // создать кнопку-таг
    function createTag(text, type, data) {
      const list = document.querySelector(`.${CLASSES.tagList}`);
      const tagItem = crElem('li', CLASSES.tagItem);
      const tagLabel = crElem('span', CLASSES.tagLabel, text);
      const tagClose = crElem('button', CLASSES.tagClose);
      const closeSvg = '<svg class="close-btn__svg"><use xlink:href="img/sprite.svg#close"></use></svg>';


      setAttributes(tagClose, {
        'aria-label': 'убрать фильтр',
        'data-check': data
      });
      tagClose.innerHTML = `${closeSvg}`;

      tagItem.append(tagLabel);
      tagItem.append(tagClose);
      setClasses(tagItem, [`${CLASSES.tagItem}--${type}`]);
      tagClose.addEventListener('click', () => {
        onClose(data);
      });
      list.append(tagItem);
    }

    // проверить инпуты с ценой от/до
    function checkPrice(el) {
      const key = el.getAttribute('data-filter');
      const value = parseInt(el.value, 10);
      const max = parseInt(el.max, 10);
      const min = parseInt(el.min, 10);

      switch (key) {
        case minPrice:
          if (value > min) {
            createTag(`от ${value}`, 'price', key);
          }
          break;
        case maxPrice:
          if (value < max) {
            createTag(`до ${value}`, 'price', key);
          }
          break;
        default:
          break;
      }
    }

    // пройтись по всем фильтрам и вызвать функцию "создать таг" если checked
    const checks = document.querySelectorAll(`.${CLASSES.check}`);
    checks.forEach((el) => {
      const text = el.nextElementSibling.nextElementSibling.textContent;
      const type = el.getAttribute('data-type');
      const data = el.getAttribute('data-filter');
      if (el.checked) {
        createTag(text, type, data);
      }
      el.addEventListener('click', () => {
        if (el.checked) {
          createTag(text, type, data);
        } else {
          el.checked = false;
          onClose(data);
        }
      })
    });

    // пройтись по фильтрам с ценой и создать шильды, если цена отличается от max min
    const prices = document.querySelectorAll(`.${CLASSES.price}`);

    function changePrice(el) {
      onClose(el.getAttribute('data-filter'), true);
      checkPrice(el);
    }

    prices.forEach((el) => {
      checkPrice(el);
      el.addEventListener('change', () => changePrice(el))
    })

    // если будут изменяться значения через rangeSlider
    rangeSlider.noUiSlider.on('change', function (values, handle) {
      changePrice(inputs[handle]);
    });
  }

})();
