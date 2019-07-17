(function() {
  const scrollSection = document.querySelector('.section-scroll');
  const sections = [...scrollSection.querySelectorAll('.section')];
  let currentSection = 0;
  let isAnimating = false;

  const scrollTime = 700;
  const animationOptions = {
    duration: scrollTime,
    easing: 'cubic-bezier(.37,0,.27,1)',
    fill: 'forwards',
  };

  const hideSections = () => {
    sections.forEach((el, id) => {
      if (id === currentSection) return;
      el.classList.add('section--hidden');
    });
  };
  const showSections = () => {
    sections.forEach(el => {
      el.classList.remove('section--hidden');
    });
  };

  hideSections();

  const disableAnimating = timeout => {
    showSections();
    isAnimating = true;
    setTimeout(() => {
      isAnimating = false;
      hideSections();
    }, timeout);
  };

  const playCantScrollAnimation = isScrollForward => {
    const currentPos = -currentSection * 100;
    const scrollDistance = isScrollForward ? -1 : 1;

    scrollSection.animate(
      [
        { transform: `translateX(${currentPos}vw)` },
        { transform: `translateX(${currentPos + scrollDistance}vw)` },
        { transform: `translateX(${currentPos}vw)` },
      ],
      { duration: 250, easing: 'ease-in-out' },
    );
    disableAnimating(250);
  };

  const gotoSection = sectionNumber => {
    if (isAnimating) return;

    const currentPos = -currentSection * 100;
    const nextPos = -sectionNumber * 100;

    if (sectionNumber >= sections.length) return playCantScrollAnimation(true);
    if (sectionNumber < 0) return playCantScrollAnimation();

    scrollSection.animate(
      [{ transform: `translateX(${currentPos}vw)` }, { transform: `translateX(${nextPos}vw)` }],
      animationOptions,
    );
    currentSection = sectionNumber;
    disableAnimating(scrollTime);
  };

  document.addEventListener('wheel', e => {
    if (e.wheelDelta > 0) {
      gotoSection(currentSection - 1);
    } else {
      gotoSection(currentSection + 1);
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
      gotoSection(currentSection - 1);
    }
    if (e.key === 'ArrowRight') {
      gotoSection(currentSection + 1);
    }
  });
  
})();
