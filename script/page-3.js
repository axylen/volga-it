(function() {
  const section = document.querySelector('.section--third');
  const specifications = [...document.querySelectorAll('.specification')];

  const closeCards = () => {
    specifications.forEach(element => {
      element.classList.remove('specification--opened');
    });
  };

  section.addEventListener('click', closeCards);

  specifications.forEach(element => {
    const openBtn = element.querySelector('.specification__btn');
    const card = element.querySelector('.specification__card');

    openBtn.addEventListener('click', e => {
      e.stopPropagation();
      closeCards();
      element.classList.add('specification--opened');
    });

    card.addEventListener('click', e => {
      e.stopPropagation();
    });
  });
})();
