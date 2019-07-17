(function() {
  const section = document.querySelector('.section--second');
  const cards = [...document.querySelectorAll('.card')];

  const animationDurationMs = 200;

  const animationOptions = {
    duration: animationDurationMs,
    easing: 'cubic-bezier(.37,0,.27,1)',
  };
  const fadeIn = element => element.animate([{ opacity: 0 }, { opacity: 1 }], animationOptions);
  const fadeOut = element => element.animate([{ opacity: 1 }, { opacity: 0 }], animationOptions);

  const getCardContent = card => ({
    content: card.querySelector('.card__content'),
    contentDetailed: card.querySelector('.card__content-detailed'),
    contentMinified: card.querySelector('.card__content-minified'),
  });

  const openCard = cardToOpen => {
    for (let card of cards) {
      const { content, contentDetailed, contentMinified } = getCardContent(card);

      card.classList.remove('card--closed');
      fadeOut(content);

      if (card === cardToOpen) {
        card.classList.add('card--opened');

        setTimeout(() => {
          contentDetailed.style.display = null;
          content.style.display = 'none';
          fadeIn(contentDetailed);
        }, animationDurationMs);
      } else {
        card.classList.add('card--minified');

        setTimeout(() => {
          contentMinified.style.display = null;
          content.style.display = 'none';
          fadeIn(contentMinified);
        }, animationDurationMs);
      }
    }

    section.classList.add('section--alt-bg');
  };
  const closeCard = () => {
    for (let card of cards) {
      card.classList.remove('card--opened', 'card--minified');
      card.classList.add('card--closed');

      const { content, contentDetailed, contentMinified } = getCardContent(card);

      fadeOut(contentDetailed);
      fadeOut(contentMinified);

      setTimeout(() => {
        contentDetailed.style.display = 'none';
        contentMinified.style.display = 'none';
        content.style.display = 'flex';

        fadeIn(content);
      }, animationDurationMs);
    }
    section.classList.remove('section--alt-bg');
  };

  cards.forEach(card => {
    card.querySelector('.card__content-minified').style.display = 'none';
    card.querySelector('.card__content-detailed').style.display = 'none';

    card.querySelector('.card-btn--open').addEventListener('click', () => openCard(card));
    card.querySelector('.card-btn--close').addEventListener('click', closeCard);
  });
})();
