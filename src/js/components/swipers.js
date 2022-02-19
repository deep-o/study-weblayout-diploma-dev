const SWIPERS = {
  HERO: {
    name: 'swiperHero',
    class: '.hero-swiper',
    pagination: '.hero-swiper__pagination'
  },
  SPECIAL: {
    name: 'swiperSpecial',
    class: '.special-swiper',
    btnPrev: '.special-swiper-button-prev',
    btnNext: '.special-swiper-button-next',
  },
  USEFUL: {
    name: 'swiperUseful',
    class: '.useful-swiper',
    btnPrev: '.useful-swiper-button-prev',
    btnNext: '.useful-swiper-button-next',
  },
  PRODUCT: {
    name: 'swiperProduct',
    class: '.product-main-swiper',
  },
  PRODUCTMIN: {
    name: 'swiperProductmIN',
    class: '.product-mini-swiper',
    btnPrev: '.product-mini-swiper-prev',
    btnNext: '.product-mini-swiper-next',

  },
  SIMILAR: {
    name: 'swiperSimilar',
    class: '.product-similar-swiper',
    btnPrev: '.product-similar-button-prev',
    btnNext: '.product-similar-button-next',
  },
};

function tabindexChange(swiper, swiperClass, n) {
  const thisSwiper = document.querySelector(swiperClass);
  const slides = thisSwiper.querySelectorAll('.swiper-slide');
  const swiperBtns = thisSwiper.querySelectorAll('button');
  const secondaryBtns = thisSwiper.querySelectorAll('.secondary-btn');
  const swiperLinks = thisSwiper.querySelectorAll('.link-ui');

  // убираем tabindex у кнопок на неактивных слайдах, чтобы не ломался слайдер
  swiperBtns.forEach((el) => el.setAttribute('tabindex', -1));
  swiperLinks.forEach((el) => el.setAttribute('tabindex', -1));

  const indexSlide = swiper.activeIndex;


  // для активного слайда tabindex возвращается
  if(swiperBtns.length > 0) {
    for (let i = indexSlide; i < indexSlide + n; i++) {
      swiperBtns[i].setAttribute('tabindex', 0)
    }
  }
  if (swiperLinks.length > 0) {
    for (let i = indexSlide; i < indexSlide + n; i++) {
      swiperLinks[i].setAttribute('tabindex', 0)
    }
  }
  if (secondaryBtns.length > 0) {
    for (let i = indexSlide; i < indexSlide + n; i++) {
      secondaryBtns[i].setAttribute('tabindex', 0)
    }
  }
};

// инициализация слайдера в hero
const swiperHero =  new Swiper (SWIPERS.HERO.class, {
  pagination: {
    el: SWIPERS.HERO.pagination,
    clickable: true,
  },
  grabCursor: true,
  observer: true,
  autoplay: {
    delay: 5000,
  },
  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
    firstSlideMessage: 'первый слайд',
    lastSlideMessage: 'последний слайд',
    paginationBulletMessage: 'перейти к слайду {{index}}'
  },
  on: {
    init: function () {
      const bullets = document.querySelectorAll('.swiper-pagination-bullet')
      console.log(bullets);
      bullets.forEach((el) => {
        const svg = '<svg><circle class="spinner__bg" cx="10" cy="10" r="8"></circle><circle class="spinner__progress" cx="10" cy="10" r="8"></circle></svg>';
        el.classList.add('spinner');
        el.innerHTML = svg;
        console.log(el);
      })
    },
  },
})

swiperHero.on('activeIndexChange', function () {
  tabindexChange(swiperHero, SWIPERS.HERO.class, 1)
});

// инициализация слайдера в Специальных предложениях
const swiperSpecial =  new Swiper (SWIPERS.SPECIAL.class, {
  slidesPerView: 'auto',
  slidesPerGroup: 3,
  spaceBetween: 32,
  breakpoints: {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    1024: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    1352: {
      slidesPerView: 'auto',
    }
  },
  grabCursor: true,
  observer: true,
  navigation: {
    nextEl: SWIPERS.SPECIAL.btnNext,
    prevEl: SWIPERS.SPECIAL.btnPrev,
  },
  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
    firstSlideMessage: 'первый слайд',
    lastSlideMessage: 'последний слайд',
    paginationBulletMessage: 'перейти к слайду {{index}}'
  },
})

swiperSpecial.on('activeIndexChange', function() {
  const screenWidth = window.screen.width
  let slides;
  switch(true) {
    case screenWidth < 1024:
      slides = 2;
      break;
    default:
      slides = 3;
      break;
  };
  tabindexChange(swiperSpecial, SWIPERS.SPECIAL.class, slides);
});

// инициализация слайдера в разделе Полезное
const swiperUseful =  new Swiper (SWIPERS.USEFUL.class, {
  spaceBetween: 32,
  breakpoints: {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    1024: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    1352: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
  },
  grabCursor: true,
  observer: true,
  navigation: {
    nextEl: SWIPERS.USEFUL.btnNext,
    prevEl: SWIPERS.USEFUL.btnPrev,
  },
  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
    firstSlideMessage: 'первый слайд',
    lastSlideMessage: 'последний слайд',
    paginationBulletMessage: 'перейти к слайду {{index}}'
  },
})

swiperUseful.on('activeIndexChange', function() {
  const screenWidth = window.screen.width
  let slides;
  switch(true) {
    case screenWidth < 1023:
      slides = 2;
      break;
    case screenWidth < 1352:
      slides = 3;
      break;
    default:
      slides = 2;
      break;
  };
  console.log(slides);
  tabindexChange(swiperUseful, SWIPERS.USEFUL.class, slides);
});

// инициализация слайдера на странице Product
const swiperProductMin = new Swiper(SWIPERS.PRODUCTMIN.class, {
  freeMode: true,
  watchSlidesProgress: true,

  breakpoints: {
    320: {
      direction: 'horizontal',
      spaceBetween: 38,
      slidesPerView: 'auto',
    },
    768: {
      direction: 'vertical',
      spaceBetween: 18,
      slidesPerView: 4,
    },
    1024: {
      direction: 'horizontal',
      spaceBetween: 38,
      slidesPerView: 3.5,
    },
    1352: {
      slidesPerView: 4,
    },
  },
});
const swiperProduct = new Swiper(SWIPERS.PRODUCT.class, {
  spaceBetween: 10,
  grabCursor: true,
  observer: true,

  thumbs: {
    swiper: swiperProductMin,
  },

  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
    firstSlideMessage: 'первый слайд',
    lastSlideMessage: 'последний слайд',
    paginationBulletMessage: 'перейти к слайду {{index}}'
  },
});

// инициализация слайдера с похожими товараами на сстранице Product
const swiperSimilar =  new Swiper (SWIPERS.SIMILAR.class, {
  spaceBetween: 32,
  breakpoints: {
    320: {
      spaceBetween: 16,
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    1024: {
      spaceBetween: 32,
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    1352: {
      slidesPerView: 4,
      slidesPerGroup: 4,
    }
  },
  grabCursor: true,
  observer: true,
  navigation: {
    nextEl: SWIPERS.SIMILAR.btnNext,
    prevEl: SWIPERS.SIMILAR.btnPrev,
  },
  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
    firstSlideMessage: 'первый слайд',
    lastSlideMessage: 'последний слайд',
    paginationBulletMessage: 'перейти к слайду {{index}}'
  },
})

swiperSimilar.on('activeIndexChange', function() {
  const screenWidth = window.screen.width
  let slides;
  switch(true) {
    case screenWidth < 1024:
      slides = 2;
      break;
    default:
      slides = 4;
      break;
  };
  tabindexChange(swiperSimilar, SWIPERS.SIMILAR.class, slides);
});

