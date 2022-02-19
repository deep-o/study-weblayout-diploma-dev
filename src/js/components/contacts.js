(() => {
  const CLASSES = {
    map: ['map'],
    shopSearchForm: ['shop-search'],
    shopSearchInput: ['shop-search__input'],
    shopDrop: ['shop-drop'],
    shopDropList: ['shop-drop__list'],
    shopDropItem: ['shop-drop__item'],
    shopDropLink: ['shop-drop__link'],
    shopDropTextDark: ['shop-drop__text', 'shop-drop__text--dark', 'text-reset'],
    shopDropTextLight: ['shop-drop__list', 'shop-drop__text--light', 'text-reset'],
    emptyModal: ['not-found'],
    emptyModalBtn: ['not-found__close'],
    isActive: ['is-active'],
  }
  const center = [55.750978, 37.623184];
  const shops = [{
      id: 'shop1',
      fullname: 'Москва, SitDownPls на Солянке',
      name: 'SitDownPls на Солянке',
      address: 'м. Китай-город, ул. Солянка, д.24',
      coordinates: [55.75076079358431, 37.641814364417975],
      bal: '',
    },
    {
      id: 'shop2',
      fullname: 'Москва, SitDownPls на Покровке',
      name: 'SitDownPls на Покровке',
      address: 'м. Курская, ул. Покровка, д.14',
      coordinates: [55.759091068985285, 37.64497999999997],
      bal: '',
    },
    {
      id: 'shop3',
      fullname: 'Москва, SitDownPls на Тверской',
      name: 'SitDownPls на Тверской',
      address: 'м. Охотный ряд, ул. Тверская, д.9',
      coordinates: [55.759570, 37.610875],
      bal: '',
    },
    {
      id: 'shop4',
      fullname: 'Москва, SitDownPls на Таганке',
      name: 'SitDownPls на Таганке',
      address: 'м. Таганская, Таганская площадь, 86/1с1',
      coordinates: [55.741523, 37.652814],
      bal: '',
    },
  ]
  const searchForm = document.querySelector(`.${CLASSES.shopSearchForm}`);
  const searchInput = document.querySelector(`.${CLASSES.shopSearchInput}`);

  let timer;

  // очищает список магазинов в выпадающем меню
  function onClear() {
    document.querySelector(`.${CLASSES.shopDropList}`).innerHTML = '';
  }

  // закрывает выпадающее меню со списком магазинов
  function onClose() {
    onClear();
    document.querySelector(`.${CLASSES.shopDrop}`).classList.remove('is-active');
  }


  // показывает выпадающее меню со списком магазинов
  function onShow() {
    document.querySelector(`.${CLASSES.shopDrop}`).classList.add('is-active');
  }

  // создает строку с магазином в выпадающем меню
  function createShopDropItem(shop) {
    const shopItem = crElem('li', CLASSES.shopDropItem);
    const shopLink = crElem('a', CLASSES.shopDropLink);
    const shopTextDark = crElem('p', CLASSES.shopDropTextDark, shop.fullname);
    const shopTextLight = crElem('p', CLASSES.shopDropTextLight, shop.address);

    setAttributes(shopLink, {
      href: '#'
    });

    shopLink.append(shopTextDark);
    shopLink.append(shopTextLight);
    shopItem.append(shopLink);
    console.log(shopLink);

    shopLink.addEventListener('click', function (el) {
      searchInput.value = this.firstChild.textContent;
      onClose();
    })

    return shopItem;
  }

  // работа со строкой поиска магазина
  function autoCompleteSearch(str) {
    let currentFocus;

    // находит магазины, удовлетворяющие условию поиска
    function findShops() {
      return shops.filter(shop => shop.fullname.toLowerCase().indexOf(str.toLowerCase()) > -1);
    }

    // показывает выпадающее меню со списком магазинов
    function throwDropdown() {
      onClear();
      currentFocus = -1;
      const list = document.querySelector(`.${CLASSES.shopDropList}`);

      const matchShops = findShops();
      matchShops.forEach((shop) => {
        list.append(createShopDropItem(shop))
      });
      onShow();
    }

    // проверяет значение в строке поиска
    function validateValue() {
      let show = true;

      if (str === '') {
        onClose();
        show = false;
      };

      if (show) throwDropdown();
    }

    validateValue();
  }

  // инициализация карты
  function init() {
    let map = new ymaps.Map('map', {
      center: center,
      zoom: 14
    });

    // создать шаблон балуна
    function createBalloon(shop) {
      MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
          '<h3 class="balloon__title title text-reset">$[properties.balloonHeader]</h3>' +
          '<ul class="list-reset">$[properties.balloonContent]</ul>'
        ),

        myPlacemark = window.myPlacemark = new ymaps.Placemark(shop.coordinates, {
          balloonHeader: `${shop.name}`,
          balloonContent: `
          <li class="balloon__item">
            <p class="balloon__text balloon__address text-reset">
              ${shop.address};
            </p>
            <a class="balloon__phone phone__link link-ui" href="tel:+7495885-45-47" aria-label="телефон">
              <svg class="phone__svg">
                <use xlink:href="img/sprite.svg#phone"></use>
              </svg>
              +7<span>&nbsp;(495)&nbsp;</span>885-45-47
            </a>
          </li>

          <li class="balloon__item">
            <p class="balloon__text text-reset">
              <span class="balloon__text--grey">Часы работы: </span>
              с 10:00 до 21:00
            </p>
          </li>

          <li class="balloon__item">
            <p class="balloon__text text-reset">
              <span class="balloon__text--grey">Что здесь: </span>
              шоурум, пункт отгрузки, пункт выдачи, пункт обмена-возврата, сервисный центр
            </p>
          </li>
          `
        }, {
          balloonShadow: false,
          balloonLayout: MyBalloonLayout,
          balloonContentLayout: MyBalloonContentLayout,
          balloonPanelMaxMapArea: 0,
          // Не скрываем иконку при открытом балуне.
          hideIconOnBalloonOpen: false,
          // И дополнительно смещаем балун, для открытия над иконкой.
          balloonOffset: [0, -30],
          iconLayout: 'default#image',
          iconImageHref: '../img/sdp.svg',
          iconImageSize: [32, 22],
          iconImageOffset: [-20, -10]
        });

      map.geoObjects.add(myPlacemark);
      let index = shops.findIndex(el => el.id === shop.id);
      shops[index].bal = myPlacemark;
    }

    MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
      '<div class="popover top modal balloon">' +
      '<button class="close modal__close close-btn btn-reset"><svg class="close-btn__svg"><use xlink:href="img/sprite.svg#close"></use></svg></button>' +
      '<div class="arrow"></div>' +
      '<div class="modal__wrap balloon__wrap">' +
      '$[[options.contentLayout]]' +
      '</div>' +
      '</div>', {
        build: function () {
          this.constructor.superclass.build.call(this);
          this._$element = $('.popover', this.getParentElement());
          this.applyElementOffset();
          this._$element.find('.close')
            .on('click', $.proxy(this.onCloseClick, this));
        },

        clear: function () {
          this._$element.find('.close')
            .off('click');
          this.constructor.superclass.clear.call(this);
        },

        onSublayoutSizeChange: function () {
          MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);
          if (!this._isElement(this._$element)) {
            return;
          }

          this.applyElementOffset();
          this.events.fire('shapechange');
        },

        applyElementOffset: function () {
          this._$element.css({
            left: -(this._$element[0].offsetWidth / 2),
            top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
          });
        },

        onCloseClick: function (e) {
          e.preventDefault();
          this.events.fire('userclose');
        },

        getShape: function () {
          if (!this._isElement(this._$element)) {
            return MyBalloonLayout.superclass.getShape.call(this);
          }

          var position = this._$element.position();

          return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
            [position.left, position.top],
            [
              position.left + this._$element[0].offsetWidth,
              position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
            ]
          ]));
        },

        _isElement: function (element) {
          return element && element[0] && element.find('.arrow')[0];
        }
      });

    // проходится по списку магазинов и создает балуны
    shops.forEach((shop) => {
      createBalloon(shop);
    })

    map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    map.controls.remove('typeSelector'); // удаляем тип
    map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил

    // shops[0].bal.balloon.open();

    function shopNotFoundHide() {
      modalEmpty.classList.remove('is-active');
    }

    function shopNotFoundShow() {
      map.balloon.close();
      modalEmpty.classList.add('is-active');
    }

    searchInput.addEventListener('input', (el) => {
      clearTimeout(timer);
      timer = setTimeout(autoCompleteSearch, 500, el.target.value)
    });
    searchInput.addEventListener('click', () => {
      searchInput.value = '';
      onClose();
    })
    searchForm.addEventListener('submit', (el) => {
      el.preventDefault();
      const searchValue = searchInput.value;
      shopTarget = shops.find(item => item.fullname === searchValue);
      if (shopTarget) {
        shopNotFoundHide();
        shopTarget.bal.balloon.open();
      } else {
        shopNotFoundShow();
      };
    })

    const modalEmpty = document.querySelector(`.${CLASSES.emptyModal}`);
    const modalEmptyClose = document.querySelector(`.${CLASSES.emptyModalBtn}`);
    modalEmptyClose.addEventListener('click', shopNotFoundHide);
  }

  document.body.addEventListener('click', (el) => {
    if (!el.target.closest(`.${CLASSES.shopDrop}`)) onClose();
  });

  document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.indexOf('contacts') >= 0) {
      addCrump();
      ymaps.ready(init);
    }
  })
})();
