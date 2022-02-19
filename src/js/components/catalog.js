(() => {
  const URL = 'img/';
  const PRODUCT = 'product.html';
  const star = '<svg class="star" aria-label="рейтинг"><use xlink:href="img/sprite.svg#star"></use></svg>'
  const CLASSES = {
    hidden: ['visually-hidden'],
    list: ['high-raiting__list'],
    item: ['high-grid__item', 'high-raiting__item'],
    card: ['card-product'],
    inner: ['card-product__inner'],
    ribbon: ['ribbon', 'visually-hidden'],
    ribbonBody: ['ribbon__body'],
    ribbonHexagon: ['ribbon__hexagon'],
    raiting: ['card-product__raiting'],
    pic: ['card-product__pic'],
    img: ['card-product__img'],
    wrap: ['card-product__wrap'],
    title: ['card-product__title', 'subtitle', 'text-reset'],
    link: ['card-product__link', 'link-ui'],
    model: ['card-product__model'],
    quote: ['quote'],
    text: ['card-product__text', 'txt-grey-16', 'text-reset'],
    actionPrice: ['card-product__price', 'card-product__price--action'],
    normalPrice: ['card-product__price', 'card-product__price--normal'],
    btn: ['card-product__btn', 'high-raiting__btn--card', 'secondary-btn', 'btn-reset'],
    catalogCards: ['catalog-cards'],
    catalogList: ['catalog-cards-grid', 'catalog-cards__list', 'tabs__item', 'list-reset'],
    activeTab: ['tabs__item--active'],
    catalogListItem: ['catalog-cards__item'],
    tabsBtnsWrap: ['tabs__btns'],
    tabsBtn: ['tabs__btn', 'secondary-btn', 'btn-reset'],
    activeBtn: ['tabs__btn--active'],
    filters: ['filters'],
    dropdownBtn: ['filters__btn'],
    dropdownFilters: ['filters-dropdown'],
    isOpen: ['is-open'],
    addBtn: ['high-raiting__btn'],
  };

  // создать карточку товара
  function createCard(product) {
    const card = crElem('article', CLASSES.card);
    const inner = crElem('div', CLASSES.inner);
    const ribbon = crElem('div', CLASSES.ribbon);
    const ribbonBody = crElem('span', CLASSES.ribbonBody);
    const ribbonHexagon = crElem('span', CLASSES.ribbonHexagon);
    const raiting = crElem('div', CLASSES.raiting);
    const picture = crElem('picture', CLASSES.pic);
    const source = crElem('source', CLASSES.img);
    const img = crElem('img', CLASSES.img);
    const wrap = crElem('div', CLASSES.wrap);
    const title = crElem('h3', CLASSES.title);
    const link = crElem('a', CLASSES.link, product.name);
    const model = crElem('span', CLASSES.model, product.model);
    const quoteRight = crElem('span', CLASSES.quote);
    const quoteLeft = crElem('span', CLASSES.quote);
    const text = crElem('p', CLASSES.text);
    const priceAction = crElem('span', CLASSES.actionPrice);
    const priceNormal = crElem('span', CLASSES.normalPrice, `${product.price} руб.`);
    const btn = crElem('button', CLASSES.btn, 'Купить');
    const quote = '&#8221';

    setAttributes(source, {
      srcset: `${URL}${product.id}-1-tiny.png`,
      media: '(max-width: 600px)'
    });
    setAttributes(img, {
      src: `${URL}${product.id}-1.png`,
      alt: `карточка товара ${product.name} ${product.model}`
    });
    setAttributes(link, {
      href: `${PRODUCT}#sofa-d-31`,
      'aria-label': 'перейти'
    });
    setAttributes(btn, {
      'aria-label': 'купить'
    });

    raiting.innerHTML = `${star} ${product.raiting}`;
    quoteLeft.innerHTML = quote;
    quoteRight.innerHTML = quote;
    model.prepend(quoteLeft);
    model.append(quoteRight);

    ribbon.append(ribbonBody);
    ribbon.append(ribbonHexagon);
    picture.append(source);
    picture.append(img);
    link.append(model);
    title.append(link);
    text.append(priceAction);
    text.append(priceNormal);
    wrap.append(title);
    wrap.append(text);
    wrap.append(btn);
    inner.append(ribbon);
    inner.append(raiting);
    inner.append(picture);
    inner.append(wrap);
    card.append(inner);

    return card;
  }

  // сортировать массив по рейтингу
  function sortCatalog(arr) {
    arr.sort((a, b) => b.raiting - a.raiting || parseInt(b.price, 10) - parseInt(a.price, 10));
    return arr;
  }

  // заполнить раздел Высокий рейтинг на Главной странице
  function fillHighRaiting() {
    const screenWidth = window.screen.width;
    const list = document.querySelector(`.${CLASSES.list}`)
    const min = document.querySelectorAll(`.${CLASSES.item}`).length || 0;
    let newCards;
    let pairs;
    switch (true) {
      case screenWidth < 1024:
        newCards = 2;
        pairs = 3;
        break;
      case screenWidth < 1352:
        newCards = 3;
        pairs = 2;
        break;
      default:
        newCards = 4;
        pairs = 2;
        break;
    };
    const max = Math.max(min + newCards - min % newCards, newCards * pairs);

    const newCatalog = sortCatalog(CATALOG);
    const cards = newCatalog.slice(min, max);

    cards.forEach((card) => {
      const listItem = crElem('li', CLASSES.item);
      const item = createCard(card);
      listItem.append(item);
      list.append(listItem);
      const raiting = listItem.querySelector(`.${CLASSES.raiting}`);
      raiting.innerHTML = `${star} ${card.raiting}`;
    });

    const totalCards = newCatalog.length;
    const shownCards = list.querySelectorAll('li').length;

    if(totalCards === shownCards) {
      const btn = document.querySelector(`.${CLASSES.addBtn}`);
      setAttributes(btn, {disabled: true});

      btn.removeEventListener('click', () => {
        fillHighRaiting();
      })
    }
  }

  // заполнить каталог на листе Каталог
  function fillCatalog() {
    const section = document.querySelector(`.${CLASSES.catalogCards}`);
    const screenWidth = window.screen.width;
    const cardsTotal = CATALOG.length;
    const btns = crElem('div', CLASSES.tabsBtnsWrap);
    let cardsInTab;

    switch (true) {
      case screenWidth < 1024:
        cardsInTab = 6;
        break;
      default:
        cardsInTab = 9;
        break;
    };

    const tabs = Math.ceil(cardsTotal / cardsInTab);
    const newCatalog = sortCatalog(CATALOG);

    for (let i = 0; i < tabs; i++) {
      const list = crElem('ul', CLASSES.catalogList);

      const min = i * cardsInTab;
      const max = Math.min(i * cardsInTab + cardsInTab, cardsTotal);
      const products = newCatalog.slice(min, max);

      products.forEach((product) => {
        const listItem = crElem('li', CLASSES.catalogListItem);
        const card = createCard(product);
        listItem.append(card);
        list.append(listItem);
      })

      const btn = crElem('button', CLASSES.tabsBtn, i + 1);
      setAttributes(list, {
        'data-target': `cards-list-${i+1}`
      })
      setAttributes(btn, {
        'aria-label': 'перейти',
        'data-path': `cards-list-${i+1}`
      });
      i == 0 ? setClasses(list, CLASSES.activeTab) : null;
      i == 0 ? setClasses(btn, CLASSES.activeBtn) : null;

      btn.addEventListener('click', (el) => {
        const path = el.currentTarget.dataset.path;

        document.querySelectorAll(`.${CLASSES.tabsBtn}`).forEach((el) => {
          el.classList.remove(CLASSES.activeBtn);
        })
        el.currentTarget.classList.add(CLASSES.activeBtn);

        document.querySelectorAll(`.${CLASSES.catalogList}`).forEach((el) => {
          el.classList.remove(CLASSES.activeTab);
        })
        document.querySelector(`[data-target="${path}"]`).classList.add(CLASSES.activeTab);
      });

      btns.append(btn);
      section.append(list);
    }
    section.append(btns);
  }

  function dropdown() {
    const btns = document.querySelectorAll(`.${CLASSES.dropdownBtn}`);

    function removeIsOpen() {
      const open = document.querySelectorAll(`.${CLASSES.isOpen}`);
      if(open) {
        open.forEach((item) => {
          item.classList.remove(CLASSES.isOpen);
        })
      }
    }

    btns.forEach((el) => {
      el.addEventListener('click', (el) => {
        const check = el.target.classList.contains(CLASSES.isOpen);
        removeIsOpen();

        if(!check) {
          el.target.classList.add(CLASSES.isOpen);
          el.target.nextElementSibling.classList.add(CLASSES.isOpen);
        }
      })
    })

    document.body.addEventListener('click', (el) => {
      if (!el.target.closest(`.${CLASSES.filters}`)) removeIsOpen();
    });
  }

  function createSimilarCards(products) {
    const cards = [];
    products.forEach((productID) => {
      const product = CATALOG.find(item => item.id === productID);
      cards.push(createCard(product));
    })
    return(cards);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const addCardBtn = document.querySelector(`.${CLASSES.addBtn}`);

    if (addCardBtn) {
      addCardBtn.addEventListener('click', () => {
        fillHighRaiting();
      })
    }

    if (document.querySelector(`.${CLASSES.list}`)) {
      fillHighRaiting();
    }
  })

  document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.indexOf('catalog') >= 0) {
      addCrump();
      fillCatalog();
      dropdown();
    }
  })

  window.fillHighRaiting = fillHighRaiting;
  window.createSimilarCards = createSimilarCards;
})();


