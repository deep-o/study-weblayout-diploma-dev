(() => {
  const PRODUCT = 'product.html';
  const URL = 'img/';
  const CLASSES = {
    card: ['product-hero-card'],
    raiting: ['card-product__raiting', 'product-hero-card__raiting'],
    title: ['card-product__title', 'product-hero-card__title', 'subtitle', 'text-reset'],
    link: ['card-product__link', 'link-ui'],
    quote: ['quote'],
    descr: ['product-hero-card__descr', 'txt-grey-14', 'text-reset'],
    price: ['card-product__price', 'product-hero-card__price', 'text-reset'],
    primaryBtn: ['product-hero-card__btn', 'primary-btn', 'btn-reset'],
    secondBtn: ['product-hero-card__btn', 'product-hero-card__btn--second', 'btn-reset'],
    descrBlock: ['product-descr'],
    descrText: ['product-descr__text'],
    descrImg: ['product-descr__img'],
    descrTable: ['product-table'],
    descrItemName: ['product-table__name'],
    descrItemValue: ['product-table__value'],
    productSwiper: ['product-swiper'],
    productMainSwiper: ['product-main-swiper'],
    productMiniSwiper: ['product-mini-swiper'],
    productMainSlide: ['product-main-swiper__slide'],
    productMiniSlide: ['product-mini-swiper__slide'],
    productPic: ['swiper-slide__pic'],
    productImg: ['swiper-slide__img'],
    swiperWrapSimilar: ['similar-swiper-wrapper'],
    swiperSlide: ['swiper-slide'],
    callbackForm: ['callback__form', 'quick-form'],
    callbackTitle: ['product-page-modal__title', 'title', 'text-reset'],
    callbackText: ['product-page-modal__text', 'text-reset'],
    callbackList: ['callback__list', 'list-reset'],
    callbackItem: ['callback__item'],
    callbackLabel: ['callback__label'],
    callbackInput: ['callback__input'],
    callbackBtn: ['callback__btn', 'primary-btn', 'btn-reset'],
    checkLabel: ['callback__agree', 'check'],
    checkInput: ['check__input'],
    checkbox: ['check__box'],
    checkboxLabel: ['check__label'],
    checkLink: ['check__link'],
    modalSlider: ['slider-modal'],
    pageModal: ['product-page-modal'],
  }
  let product;
  let previousActiveElement;

  // создать карточку главного товара страницы с кнопками Купить

  function createQuickForm() {
    const form = crElem('form', CLASSES.callbackForm);
    const title = crElem('h2', CLASSES.callbackTitle, 'Купить в один клик');
    const text = crElem('p', CLASSES.callbackText, 'Чтобы оформить заказ — заполните формы ниже и наш менеджер свяжется с вами в течении часа.');
    const list = crElem('ul', CLASSES.callbackList);
    const btn = crElem('button', CLASSES.callbackBtn, 'Отправить');
    const check = crElem('label', CLASSES.checkLabel);
    const checkInput = crElem('input', CLASSES.checkInput);
    const checkbox = crElem('span', CLASSES.checkbox);
    const checkLabel = crElem('span', CLASSES.checkboxLabel, 'Принимаю ');
    const checkLink = crElem('a', CLASSES.checkLink, 'пользовательское соглашение');
    const checkIcon = '<svg class="check__svg"><use xlink:href="img/sprite.svg#check"></use></svg>';
    const inputs = [
      { id: 'name', name: 'name', type: 'text', placeholder: 'Как вас зовут?', class: ['input-text'] },
      { id: 'tel', name: 'tel', type: 'tel', placeholder: 'Ваш телефон', class: ['input-tel'] },
    ]

    setAttributes(form, { action: '#', method: 'POST' });
    setAttributes(btn, { 'aria-label': 'отправить', type: 'submit' });
    setAttributes(checkInput, { required: '', type: 'checkbox', name: 'agree' });
    setAttributes(checkLink, { href: '#' });

    inputs.forEach((input) => {
      const item = crElem('li', CLASSES.callbackItem);
      const label = crElem('label', CLASSES.callbackLabel);
      const inp = crElem('input', CLASSES.callbackInput);

      setAttributes(inp, {id: input.id, type: input.type, name: input.name, placeholder: input.placeholder});
      setClasses(inp, input.class);

      label.append(inp);
      item.append(label);
      list.append(item);
    })



    checkbox.innerHTML = checkIcon;
    checkLabel.append(checkLink);
    check.append(checkInput);
    check.append(checkbox);
    check.append(checkLabel);

    form.append(title);
    form.append(text);
    form.append(list);
    form.append(btn);
    form.append(check);

    return form;
  }

  function createCard() {
    const parent = document.querySelector(`.${CLASSES.card}`);
    const raiting = crElem('div', CLASSES.raiting);
    const title = crElem('h3', CLASSES.title);
    const link = crElem('a', CLASSES.link);
    const name = crElem('span', [], product.name);
    const subcategory = crElem('span', [], ` ${product.subcategoryLbl} `);
    const model = crElem('span', CLASSES.model, product.model);
    const quoteRight = crElem('span', CLASSES.quote);
    const quoteLeft = crElem('span', CLASSES.quote);
    const descr = crElem('p', CLASSES.descr, product.descr);
    const price = crElem('p', CLASSES.price, `${product.price} руб.`);
    const primaryBtn = crElem('button', CLASSES.primaryBtn, 'Купить в один клик');
    const secondBtn = crElem('button', CLASSES.secondBtn, '+ Добавить в корзину');
    const star = '<svg class="star" aria-label="рейтинг"><use xlink:href="img/sprite.svg#star"></use></svg>'
    const quote = '&#8221';

    setAttributes(link, {
      href: `${PRODUCT}#sofa-d-31`,
      'aria-label': 'перейти'
    });

    setAttributes(primaryBtn, {
      'aria-label': 'купить'
    });

    setAttributes(secondBtn, {
      'aria-label': 'добавить'
    });


    primaryBtn.addEventListener('click', (e) => {
      previousActiveElement = e.target;
      const modal = createModalTransit(previousActiveElement);

      const form = createQuickForm();
      modal.wrap.append(form);
      validateForm('quick');

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        setTimeout(() => {
          checkForm(modal.modalBase);
        }, 1);
      });
      previousActiveElement = '';
    });

    raiting.innerHTML = `${star} ${product.raiting}`;
    quoteLeft.innerHTML = quote;
    quoteRight.innerHTML = quote;
    model.prepend(quoteLeft);
    model.append(quoteRight);

    link.append(name);
    link.append(subcategory);
    link.append(model);
    title.append(link);
    parent.append(raiting);
    parent.append(title);
    parent.append(descr);
    parent.append(price);
    parent.append(primaryBtn);
    parent.append(secondBtn);
  }

  // заполнить описание

  function fillDesription() {
    const category = CATEGORIES.find(item => item.category === product.category);
    const subcategory = category.subcategories.find(item => item.subcategory = product.subcategory);

    const descrParent =  document.querySelector(`.${CLASSES.descrBlock}`)
    const descrText = document.querySelector(`.${CLASSES.descrText}`);

    descrText.innerHTML = subcategory.descr;

    for(let i = 1; i <= subcategory.img; i++) {
      const img = crElem('img', CLASSES.descrImg);
      setAttributes(img, {
        src: `${URL}${subcategory.subcategory}-${i}.png`,
        alt: `${subcategory.alt}`,
      });
      descrParent.append(img);
    }

    const tableParent =  document.querySelector(`.${CLASSES.descrTable}`);

    product.parameters.forEach((param) => {
      const name = crElem('span', CLASSES.descrItemName, param.name);
      const value = crElem('span', CLASSES.descrItemValue, param.value);

      tableParent.append(name);
      tableParent.append(value);
    })
  }

  // заполнить слайдер в Hero

  function fillSliderHero(mainSlider, miniSlider) {
    let i = 1;

    mainSlider.forEach((el) => {
      const imgTiny = el.querySelector('source');
      const img = el.querySelector('img');

      setAttributes(imgTiny, {
        srcset: `${URL}${product.id}-${i}-lg.png`,
        media: '(max-width: 600px)'
      });

      setAttributes(img, {
        src: `${URL}${product.id}-${i}-lg.png`,
        alt: `карточка товара ${product.name} ${product.model}`
      });

      i === 5 ? i = 1 : i++;
    });

    miniSlider.forEach((el) => {
      const img = el.querySelector('img');

      setAttributes(img, {
        src: `${URL}${product.id}-${i}.png`,
        alt: `карточка товара ${product.name} ${product.model}`
      });

      i === 5 ? i = 1 : i++;
    })
  }

  // заполнить слайдер карточками с похожими товарами

  function fillSliderSimilar() {
    const cards = createSimilarCards(product.similar);
    const swiperWrap = document.querySelector(`.${CLASSES.swiperWrapSimilar}`);

    cards.forEach((card) => {
      swiperWrap.append(card);
      card.classList.add(CLASSES.swiperSlide);
    })
  }

  // заполнить слайдер в модальном окне

  function fillSliderModal() {
    const modal = createModalTransit(previousActiveElement);
    setClasses(modal.modal, CLASSES.modalSlider)
    modal.modal.classList.remove(CLASSES.pageModal);

    // const sliderMain = crElem('div', ['product-swiper', 'product-main-swiper', 'modal-max-swiper']);
    // const sliderMainWrapper = crElem('div', ['swiper-wrapper', 'product-main-swiper__wrapper', 'modal-min-swiper']);

    // const sliderMini = crElem('div', ['product-swiper', 'product-mini-swiper', 'modal-mini-swiper']);
    // const sliderMiniWrapper = crElem('div', ['swiper-wrapper', 'product-mini-swiper__wrapper']);

    // const prev = crElem('div', ['product-mini-swiper-prev', 'swiper-button-prev', 'circle-btn', 'product-mini-swiper-btn', 'product-mini-swiper-btn--prev']);
    // const next = crElem('div', ['product-mini-swiper-next', 'swiper-button-next', 'circle-btn', 'product-mini-swiper-btn', 'product-mini-swiper-btn--next']);

    // const slidesMain = [];
    // const slidesMini = [];

    // for(i = 1; i <= 5; i++) {
    //   const slideMain = crElem('div', ['product-main-swiper__slide', 'swiper-slide']);
    //   const slideMini = crElem('div', ['product-mini-swiper__slide', 'swiper-slide']);
    //   const picture = crElem ('picture', ['swiper-slide__pic']);
    //   const source = crElem('source', ['swiper-slide__img']);
    //   const imgMain = crElem('img', ['swiper-slide__img']);
    //   const imgMini = crElem('img', ['swiper-slide__img']);

    //   picture.append(source);
    //   picture.append(imgMain);
    //   slideMain.append(picture);
    //   slideMini.append(imgMini);

    //   sliderMainWrapper.append(slideMain);
    //   sliderMiniWrapper.append(slideMini);

    //   slidesMain.push(slideMain);
    //   slidesMini.push(slideMini);
    // };

    // sliderMain.append(sliderMainWrapper);
    // sliderMini.append(prev);
    // sliderMini.append(next);
    // sliderMini.append(sliderMiniWrapper);
    // modal.wrap.append(sliderMain);
    // modal.wrap.append(sliderMini);

    // fillSliderHero(slidesMain, slidesMini);


    const sliderMainBase = document.querySelector(`.${CLASSES.productMainSwiper}`);
    const sliderMiniBase = document.querySelector(`.${CLASSES.productMiniSwiper}`);

    const sliderMain = sliderMainBase.cloneNode(true);
    const sliderMini = sliderMiniBase.cloneNode(true);

    sliderMain.classList.add('modal-max-swiper');
    sliderMini.classList.add('modal-mini-swiper');

    modal.wrap.append(sliderMain);
    modal.wrap.append(sliderMini);

    const swiperProductMinModal = new Swiper('.modal-mini-swiper', {
      grabCursor: true,
      observer: true,


      navigation: {
        prevEl: '.product-mini-swiper-prev',
        nextEl: '.product-mini-swiper-next',
      },

      breakpoints: {
        320: {
          direction: 'horizontal',
          spaceBetween: 92,
          slidesPerView: 'auto',
        },
        768: {
          spaceBetween: 92,
          slidesPerView: 'auto',
        },
        1024: {
          spaceBetween: 78,
          slidesPerView: 'auto',
        },
        1352: {
          spaceBetween: 38,
          slidesPerView: 'auto',
        },
      },
    });
    const swiperProductModal = new Swiper('.modal-max-swiper', {
      spaceBetween: 10,
      grabCursor: true,
      observer: true,

      thumbs: {
        swiper: swiperProductMinModal,
      },

      a11y: {
        prevSlideMessage: 'Предыдущий слайд',
        nextSlideMessage: 'Следующий слайд',
        firstSlideMessage: 'первый слайд',
        lastSlideMessage: 'последний слайд',
        paginationBulletMessage: 'перейти к слайду {{index}}'
      },
    });
  }

  // заполнить страницу Product.html характеристиками товара
  function fillProductPage() {
    const productID = 'sofa-d-31';
    product = CATALOG.find(item => item.id === productID);
    addCrump(product);
    fillSliderHero(document.querySelectorAll(`.${CLASSES.productMainSlide}`), document.querySelectorAll(`.${CLASSES.productMiniSlide}`));
    createCard();
    fillDesription();
    fillSliderSimilar();

    document.querySelector(`.${CLASSES.productMainSwiper}`).addEventListener('click', (e)=> {
      previousActiveElement = e.target;
      fillSliderModal();
    })
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.indexOf('product') >= 0) {
      fillProductPage();
    }
  })
})();
