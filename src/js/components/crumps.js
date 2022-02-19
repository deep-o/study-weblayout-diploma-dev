(()=> {
  const CLASSES = {
    crumps: ['crumps__list'],
    crumpsItem: ['crumps__item'],
    crumpsLink: ['crumps__link', 'link-ui', 'txt-grey-14'],
  }

  function addCrump(product) {
    const list = document.querySelector(`.${CLASSES.crumps}`);

    const catalogCrumps = [
      { label: 'Главная', link: 'index.html' },
      { label: 'Каталог', link: 'catalog.html' },
      { label: 'Диваны', link: 'catalog.html#sofa' },
      { label: 'Прямые диваны', link: 'catalog.html#straight-sofa' },
    ];

    const supplyCrumps = [
      { label: 'Главная', link: 'index.html' },
      { label: 'Сотрудничество', link: 'cooperation.html' },
    ]

    const contactsCrumps = [
      { label: 'Главная', link: 'index.html' },
      { label: 'Контакты', link: 'contacts.html' },
    ]

    function getCrumps() {
      const page = window.location.pathname
        .split('#')
        .join()
        .replace('/', '')
        .replace('.html', '');
      let crumps;


      switch(page) {
        case 'catalog':
          crumps = catalogCrumps.slice();
          break;
        case 'product':
          crumps = catalogCrumps.slice();
          crumps.push({ label: product.model, link: `catalog.html#${product.model}`} );
          break;
        case 'cooperation':
          crumps = supplyCrumps.slice();
          break;
        case 'contacts':
          crumps = contactsCrumps.slice();
          break;
        default:
          break;
      }
      return crumps;
    }

    const crumps = getCrumps();

    crumps.forEach((crump) => {
      const item = crElem('li', CLASSES.crumpsItem);
      const link = crElem('a', CLASSES.crumpsLink, crump.label);

      setAttributes(link, { href: crump.link, 'aria-label': 'перейти'});
      item.append(link);
      list.append(item);
    })
  }
  window.addCrump = addCrump;
})();

