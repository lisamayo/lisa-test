/**
 * @file
 *
 * Accordion functionality
 */

((Drupal, once) => {
  Drupal.behaviors.evernorth_sdc_accordion = {
    attach(context) {
      once('evernorth_sdc_accordion', '.evernorth-sdc__accordion', context).forEach((accordionElem) => {
        accordionElem.querySelector('.evernorth-sdc__accordion__button').addEventListener('click', (e) => {
          const accordionButton = e.currentTarget;
          const accordionBody = accordionButton.nextElementSibling;
          const expanded = accordionButton.getAttribute('aria-expanded') === 'true';

          if (!expanded) {
            accordionElem.classList.add('is-active');
            accordionButton.setAttribute('aria-expanded', 'true');

            // Perform the slide toggle in conjunction with css transitions.
            accordionBody.style.height = "auto";
            accordionBody.setAttribute('aria-hidden', 'false');
            const height = accordionBody.clientHeight + "px";
            accordionBody.style.height = "0px";
            setTimeout(() => {
              accordionBody.style.height = height;
            }, 0);

            // Send EDDL event.
            if (
              typeof Drupal.esiDdlSchema !== 'undefined' &&
              typeof Drupal.esiDdlSchema.sendPageActionEvent !== 'undefined'
            ) {
              // Remove any "teaser" content from the string.
              const [name] = accordionButton.innerText.trim().split(/\r?\n/);
              const id = accordionButton.getAttribute('id');

              Drupal.esiDdlSchema.sendPageActionEvent({
                controlText: name,
                controlRegion: 'main',
                controlType: 'Click',
                controlName: id
              });
            }
          } else {
            accordionButton.setAttribute('aria-expanded', 'false');
            accordionBody.style.height = accordionBody.clientHeight + "px";
            setTimeout(() => {
              accordionBody.style.height = '0px';
            }, 0);
            accordionBody.setAttribute('aria-hidden', 'true');
            accordionBody.addEventListener('transitionend', () => {
              accordionElem.classList.remove('is-active');
            }, {once: true})
          }
        });
      });
    },
  };
})(Drupal, once);
