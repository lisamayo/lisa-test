/**
 * @file
 *
 * Accordion functionality
 */

((Drupal, once) => {
  Drupal.behaviors.evernorth_sdc_accordion = {
    attach(context) {
      once(
        'evernorth_sdc_accordion',
        '.evernorth-sdc__accordion',
        context,
      ).forEach((accordionElem) => {
        const accordionButton = accordionElem.querySelector(
          '.evernorth-sdc__accordion__button',
        );
        const accordionBody = accordionButton.nextElementSibling;

        // Sync aria-expanded and aria-hidden with display state on attach.
        if (
          accordionButton.getAttribute('aria-expanded') === 'true' &&
          window.getComputedStyle(accordionBody).display === 'none'
        ) {
          accordionButton.setAttribute('aria-expanded', 'false');
          accordionBody.setAttribute('aria-hidden', 'true');
        }

        accordionButton.addEventListener('click', () => {
          // Prevent double click during transition
          if (accordionBody.classList.contains('is-transitioning')) return;

          const expanded =
            accordionButton.getAttribute('aria-expanded') === 'true';

          if (!expanded) {
            accordionElem.classList.add('is-active');
            accordionButton.setAttribute('aria-expanded', 'true');
            accordionBody.setAttribute('aria-hidden', 'false');
            accordionBody.style.display = 'block';
            accordionBody.style.height = 'auto';
            const height = `${accordionBody.clientHeight}px`;
            accordionBody.style.height = '0px';
            accordionBody.classList.add('is-transitioning');
            setTimeout(() => {
              accordionBody.style.height = height;
            }, 0);

            const onOpenEnd = () => {
              accordionBody.style.height = '';
              accordionBody.classList.remove('is-transitioning');
              accordionBody.removeEventListener('transitionend', onOpenEnd);
            };
            accordionBody.addEventListener('transitionend', onOpenEnd);

            // Send EDDL event.
            if (
              typeof Drupal.esiDdlSchema !== 'undefined' &&
              typeof Drupal.esiDdlSchema.sendPageActionEvent !== 'undefined'
            ) {
              const [name] = accordionButton.innerText.trim().split(/\r?\n/);
              const id = accordionButton.getAttribute('id');
              Drupal.esiDdlSchema.sendPageActionEvent({
                controlText: name,
                controlRegion: 'main',
                controlType: 'Click',
                controlName: id,
              });
            }
          } else {
            accordionButton.setAttribute('aria-expanded', 'false');
            accordionBody.style.height = `${accordionBody.clientHeight}px`;
            accordionBody.classList.add('is-transitioning');
            setTimeout(() => {
              accordionBody.style.height = '0px';
            }, 0);

            const onCloseEnd = () => {
              accordionElem.classList.remove('is-active');
              accordionBody.setAttribute('aria-hidden', 'true');
              accordionBody.style.display = 'none';
              accordionBody.style.height = '';
              accordionBody.classList.remove('is-transitioning');
              accordionBody.removeEventListener('transitionend', onCloseEnd);
            };
            accordionBody.addEventListener('transitionend', onCloseEnd);
          }
        });
      });
    },
  };
})(Drupal, once);
