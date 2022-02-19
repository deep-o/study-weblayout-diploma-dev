(() => {
  const CLASSES = {
    overlay: ['overlay'],
    container: ['header__container'],
    burger: ['burger'],
    burgerMenu: ['burger-menu', 'container'],
    menu: ['burger-menu'],
    wrap: ['burger-menu__wrap'],
    close: ['close-btn', 'burger-menu__close', 'btn-reset'],
    nav: ['burger-menu__nav'],
    list: ['burger-menu__list', 'list-reset'],
    listItem: ['burger-menu__item'],
    link: ['burger-menu__link', 'link-ui'],
  }

  const burger = document.querySelector(`.${CLASSES.burger}`);
  let previousActiveElement;

  function animateOpen() {
    gsap.from(`.${CLASSES.overlay}`, {
      opacity: 0,
      duration: 0.5,
    });
    gsap.from(`.${CLASSES.menu}`, {
      opacity: 0,
      scale: 0.2,
      duration: 0.5,
    });
  };

  function animateClose() {
    gsap.to(`.${CLASSES.overlay}`, {
      opacity: 0,
      duration: 0.5,
    });
    gsap.to(`.${CLASSES.menu}`, {
      opacity: 0,
      scale: 0.2,
      duration: 0.5,
    });
  };

  function createModal() {
    const overlay = crElem('div', CLASSES.overlay);
    const burgerMenu = crElem('div', CLASSES.burgerMenu);
    const wrap = crElem('div', CLASSES.wrap);
    const closeBtn = crElem('button', CLASSES.close);
    const nav = crElem('nav', CLASSES.nav);
    const list = crElem('ul', CLASSES.list);
    const closeSvg = '<svg class="close-btn__svg"><use xlink:href="img/sprite.svg#close"></use></svg>';
    const backSvg = '<svg class="burger-menu__svg"><use xlink:href="img/sprite.svg#sdp"></use></svg>';
    let key = 27;

    previousActiveElement = document.activeElement;

    const links = [
      {text: 'Каталог', href: 'catalog.html'},
      {text: 'Магазины', href: '#'},
      {text: 'Шоу-рум', href: '#'},
      {text: 'Доставка и оплата', href:'#'},
      {text: 'Дисконт', href:'#'},
      {text: 'Контакты', href:'#'},
    ];

    function hideMenu() {
      animateClose();
      setTimeout(deleteElem, 300, overlay);
      setTimeout(deleteElem, 300, burgerMenu);
      inertElements(CLASSES.container);
      previousActiveElement.focus();
    }

    setAttributes(closeBtn, { 'aria-label': 'закрыть меню' });
    closeBtn.innerHTML = `${closeSvg}`;

    links.forEach((item) => {
      const listItem = crElem('li', CLASSES.listItem);
      const link = crElem('a', CLASSES.link, item.text);
      setAttributes(link, { href: item.href });
      listItem.append(link);
      list.append(listItem);
    });

    nav.append(list);
    wrap.innerHTML = `${backSvg}`;
    wrap.append(closeBtn);
    wrap.append(nav);
    burgerMenu.append(wrap);

    inertElements(CLASSES.container, true);
    closeBtn.addEventListener('click', () => {
      animateClose();
      hideMenu();
    });

    overlay.addEventListener('click', () => {
      animateClose();
      hideMenu();
    });

    burgerMenu.addEventListener('keydown', (e) => {
      if(e.keyCode == key) {
        animateClose();
        setTimeout(deleteElem, 300, burgerMenu);
        hideMenu();
      }
    })

    return {
      overlay,
      burgerMenu
    };
  }

  burger.addEventListener('click', () => {
    const container = document.querySelector(`.${CLASSES.container}`);
    const menu = createModal();
    container.append(menu.overlay);
    container.append(menu.burgerMenu);
    animateOpen();
    const close = document.querySelector(`.${CLASSES.close}`)
    setTimeout(() => {
      close.focus();
    }, 100);
  });
})();
