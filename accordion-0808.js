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
          // Prevent double-clicks from triggering the event handler multiple times.
          if (e.detail > 1) return;

          const accordionButton = e.currentTarget;
          const accordionBody = accordionButton.nextElementSibling;
          const expanded = accordionButton.getAttribute('aria-expanded') === 'true';

          if (!expanded) {
            accordionElem.classList.add('is-active');
            accordionButton.setAttribute('aria-expanded', 'true');

            // Perform the slide toggle in conjunction with css transitions.
            accordionBody.style.willChange = 'height';
            accordionBody.style.height = '0px';
            accordionBody.offsetHeight; // Force reflow to ensure smooth first open
            accordionBody.style.height = accordionBody.scrollHeight + "px";
            accordionBody.setAttribute('aria-hidden', 'false');

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

            // Remove will-change after transition completes.
            accordionBody.addEventListener('transitionend', () => {
              accordionBody.style.willChange = '';
            }, { once: true });

          } else {
            accordionButton.setAttribute('aria-expanded', 'false');

            // Set current height before collapsing to trigger transition.
            accordionBody.style.willChange = 'height';
            accordionBody.style.height = accordionBody.scrollHeight + "px";
            accordionBody.offsetHeight; // Force reflow
            setTimeout(() => {
              accordionBody.style.height = '0px';
            }, 0);

            accordionBody.setAttribute('aria-hidden', 'true');
            accordionBody.addEventListener('transitionend', () => {
              accordionBody.style.willChange = '';
              accordionElem.classList.remove('is-active');
            }, {once: true});
          }
        });
      });
    },
  };
})(Drupal, once);
