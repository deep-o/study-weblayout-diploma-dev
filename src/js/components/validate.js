function validateForm(elem) {
  const selector = document.querySelectorAll('input[type="tel"');
  const im = new Inputmask('+7 (999) 999-99-99');

  im.mask(selector);

  if(elem === 'index') {
    const validation = new window.JustValidate('.callback-form');
    validation
      .addField('.input-text', [
        {
          rule: 'required',
          errorMessage: 'обязательное поле',
        },
        {
          rule: 'minLength',
          value: 3,
          errorMessage: 'слишком короткое',
        },
      ])
      .addField('.input-tel', [
        {
          rule: 'required',
          errorMessage: 'обязательное поле',
        },
      ])
      .addField('.input-email', [
        {
          rule: 'required',
          errorMessage: 'обязательное поле',
        },
        {
          rule: 'email',
          errorMessage: 'некорректное значение',
        },
      ]);
  }

  if(elem === 'quick') {
    const quick = new window.JustValidate('.quick-form');
    quick
    .addField('.input-text', [
      {
        rule: 'required',
        errorMessage: 'обязательное поле',
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'слишком короткое',
      },
    ])
    .addField('.input-tel', [
      {
        rule: 'required',
        errorMessage: 'обязательное поле',
      },
    ]);
  }
}


if (window.location.pathname.indexOf('index') >= 0) {
  validateForm('index');
}

window.validateForm = validateForm;

