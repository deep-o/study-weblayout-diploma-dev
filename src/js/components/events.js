(() => {
  const CLASSES = {
    overlay: ['overlay'],
    modal: ['modal'],
    modalCallback: ['callback-modal'],
    close: ['close-btn'],
    closeBtn: ['modal__close', 'close-btn', 'btn-reset'],
    callbackForm: ['callback__form'],
    modalWrap: ['modal__wrap', 'callback-modal__wrap'],
    imgCallback: ['callback-modal__img'],
    textCallback: ['callback-modal__text'],
    modalProduct: ['product-page-modal'],
  }

  let previousActiveElement;

  // функция для установки аттрибутов элемента
  function setAttributes(el, options) {
    Object.keys(options).forEach((attr) => {
      el.setAttribute(attr, options[attr]);
    });
  }

  // функция для установки классов
  function setClasses(el, classes) {
    if (!classes) return;
    classes.forEach((item) => {
      el.classList.add(item);
    });
  }

  // создать элемент с классом и текстом
  function crElem(teg, classes, text) {
    const elem = document.createElement(teg);
    setClasses(elem, classes);
    elem.textContent = text;
    return elem;
  }

  // удалить элемент
  function deleteElem(element) {
    if (element) element.remove();
  }

  // анимация открытия модального окна
  function animateOpen() {
    gsap.from('.overlay', {
      opacity: 0,
      duration: 0.5,
    });
    gsap.from('.modal', {
      opacity: 0,
      y: -100,
      scale: 0.5,
      duration: 0.5,
    });
  }

  // анимация закрытия модального окна
  function animateClose() {
    gsap.to('.overlay', {
      opacity: 0,
      duration: 0.5
    });
    gsap.to('.modal', {
      opacity: 0,
      y: -100,
      scale: 0.5,
      duration: 0.5,
    });
  }

  // закрыть модальное окно
  function closeModal(elem) {
    animateClose();
    setTimeout(deleteElem, 300, elem);
    inertElements(false);
    previousActiveElement.focus();
    previousActiveElement = '';
  }

  // создать оболочку модального окна
  function createModal() {
    const closeSvg = '<svg class="close-btn__svg"><use xlink:href="img/sprite.svg#close"></use></svg>';
    const modalBase = crElem('div', []);
    const overlay = crElem('div', CLASSES.overlay);
    const modal = crElem('div', CLASSES.modal);
    const closeBtn = crElem('button', CLASSES.closeBtn);
    const wrap = crElem('div', CLASSES.modalWrap);
    let key = 27;

    setAttributes(closeBtn, {
      'aria-label': 'закрыть модальное окно'
    });

    closeBtn.innerHTML = `${closeSvg}`;

    modal.append(closeBtn);
    modal.append(wrap);
    modalBase.append(overlay);
    modalBase.append(modal);

    // inertElements(false, true);
    closeBtn.addEventListener('click', () => closeModal(modalBase));
    overlay.addEventListener('click', () => closeModal(modalBase));

    modalBase.addEventListener('keydown', (e) => {
      if (e.keyCode == key) {
        closeModal(modalBase);
      }
    })

    setTimeout(() => {
      closeBtn.focus();
    }, 100);

    if (window.location.pathname.indexOf('product') >= 0) {
      modal.classList.add(CLASSES.modalProduct);
    }


    return {
      modalBase,
      modal,
      wrap,
    }
  }

  // заполнить модальное окно элементами Мы Вам перезвоним
  function callback() {
    const img = crElem('img', CLASSES.imgCallback);
    const text = crElem('p', CLASSES.textCallback, 'Спасибо, мы вам перезвоним!');
    const modal = createModal();
    modal.modal.classList.add(CLASSES.modalCallback);


    setAttributes(img, {
      src: 'img/sdp.svg',
      alt: 'эмблема компании'
    })

    modal.wrap.append(img);
    modal.wrap.append(text);

    inertElements(false, true);

    return modal.modalBase;
  }

  function checkForm(elem) {
    const inValidFields = document.querySelectorAll('.just-validate-error-field');

    const agree = document.querySelector('.check__input');

    let isValid;
    inValidFields.length === 0 ? isValid = true : isValid = false;
    if (!agree.checked) {
      isValid = false;
      agree.classList.add('error');
    }

    if (isValid) {
      agree.classList.remove('error');
      if(elem) {
        deleteElem(elem);
      };
      const modal = callback();
      document.body.append(modal);
      animateOpen();
    };
  }

  function createModalTransit(elem) {
    previousActiveElement = elem;
    const modal = createModal();

    document.body.append(modal.modalBase);
    animateOpen();

    return modal
  }

  if (window.location.pathname.indexOf('index') >= 0) {
    const addCardBtn = document.querySelector('.high-raiting__btn');
    const formData = document.querySelector(`.${CLASSES.callbackForm}`);

    formData.addEventListener('submit', (e) => {
      e.preventDefault();
      previousActiveElement = e.target.querySelector('button');
      setTimeout(() => {
        checkForm();
      }, 1);
    });
  }

  window.crElem = crElem;
  window.setClasses = setClasses;
  window.deleteElem = deleteElem;
  window.setAttributes = setAttributes;
  window.createModalTransit = createModalTransit;
  window.checkForm = checkForm;
})();
