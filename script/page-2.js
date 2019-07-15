(function() {
  const section = document.querySelector('.section--second');
  const cards = [...document.querySelectorAll('.card')];
  const easing = 'cubic-bezier(.37,0,.27,1)';

  const animationDurationMs = 200;

  const animationOptions = {
    duration: animationDurationMs,
    easing,
    fill: 'both',
  };
  const fadeIn = element => element.animate([{ opacity: 0 }, { opacity: 1 }], animationOptions);
  const fadeOut = element => element.animate([{ opacity: 1 }, { opacity: 0 }], animationOptions);

  const openCard = cardToOpen => {
    for (let card of cards) {
      card.classList.remove('card--closed');

      const cardContent = card.querySelector('.card__content');
      const cardContentDetailed = card.querySelector('.card__content-detailed');
      const cardContentMinified = card.querySelector('.card__content-minified');

      fadeOut(cardContent);

      if (card === cardToOpen) {
        card.classList.add('card--opened');

        setTimeout(() => {
          cardContentDetailed.style.display = 'flex';
          cardContent.style.display = 'none';
          fadeIn(cardContentDetailed);
        }, animationDurationMs);
      } else {
        card.classList.add('card--minified');

        setTimeout(() => {
          cardContentMinified.style.display = 'block';
          cardContent.style.display = 'none';
          fadeIn(cardContentMinified);
        }, animationDurationMs);
      }
    }

    section.classList.add('section--alt-bg');
  };
  const closeCard = () => {
    for (let card of cards) {
      card.classList.remove('card--opened', 'card--minified');
      card.classList.add('card--closed');

      const cardContent = card.querySelector('.card__content');
      const cardContentDetailed = card.querySelector('.card__content-detailed');
      const cardContentMinified = card.querySelector('.card__content-minified');

      fadeOut(cardContentDetailed);
      fadeOut(cardContentMinified);

      setTimeout(() => {
        cardContentDetailed.style.display = 'none';
        cardContentMinified.style.display = 'none';
        cardContent.style.display = 'flex';

        fadeIn(cardContent);
      }, animationDurationMs);
    }
    section.classList.remove('section--alt-bg');
  };

  cards.forEach(card => {
    const openBtn = card.querySelector('.card-btn--open');
    const closeBtn = card.querySelector('.card-btn--close');

    card.querySelector('.card__content-minified').style.display = 'none';
    card.querySelector('.card__content-detailed').style.display = 'none';

    openBtn.addEventListener('click', () => openCard(card));
    closeBtn.addEventListener('click', closeCard);
  });
})();
