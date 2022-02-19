(() => {
  const CLASSES = {
    site: ['site-container'],
  }

  function inertElements(element, show) {
    const site = document.querySelector(`.${CLASSES.site}`);
    const section = document.querySelector(`.${element}`);

    Array.from(site.children).forEach((child) => {
      show ? child.inert = true : child.inert = false;
    })

    if(section) {
      show ? section.parentElement.inert = false : null;
      Array.from(section.children).forEach((child) => {
        show ? child.inert = true : child.inert = false;
      })
    }
  }

  window.inertElements = inertElements;
})();
