/**
 * @file
 *
 * Tab functionality
 */

(($, Drupal, once) => {
  /**
   * Hide show back to top links.
   *
   * @param {object} event JS event object
   */

  /**
   * Load Content
   * @param {Object} event Accordion Toggle Event
   */
  const toggleAccordion = (event) => {
    const expanded =
      event.currentTarget.getAttribute('aria-expanded') === 'true';
    const id = event.currentTarget.id;
    const openAccordion = document.querySelectorAll(
      '.accordion-group-header-active',
    );
    if (openAccordion.length > 0) {
      if (openAccordion[0] !== event.currentTarget) {
        $(openAccordion[0])
          .removeClass('accordion-group-header-active')
          .attr('aria-expanded', 'false');
        $(openAccordion[0].nextElementSibling).removeClass(
          'accordion-group-content-active',
        );
      }
    }

    // Toggle class and aria-expanded attribute (inverse of 'expanded').
    $(event.currentTarget)
      .toggleClass('accordion-group-header-active')
      .attr('aria-expanded', expanded ? 'false' : 'true');

    // Track in Analytics at the accordion has been opened.
    if (!expanded) {
      // Remove any "teaser" content from the string.
      const [name] = $(event.currentTarget).text().trim().split(/\r?\n/);

      if (
        typeof Drupal.esiDdlSchema !== 'undefined' &&
        typeof Drupal.esiDdlSchema.sendPageActionEvent !== 'undefined'
      ) {
        // EDDL method.
        Drupal.esiDdlSchema.sendPageActionEvent({
          controlText: name,
          controlRegion: 'main',
          controlType: 'Click',
          controlName: id
        });
      } else {
        // Traditional DDL method.
        const accordionCustomEvent = new CustomEvent('ESI_DDL_SCHEMA_EVENT', {
          detail: {
            event: {
              eventInfo: {
                eventName: name,
              },
              category: {
                primaryCategory: 'homepageActions',
              },
            },
          },
          bubbles: true,
          cancelable: false,
        });

        // Dispatch event.
        document.querySelector('html').dispatchEvent(accordionCustomEvent);
      }
    }

    $(event.currentTarget.nextElementSibling).toggleClass(
      'accordion-group-content-active',
    );
  };

  Drupal.behaviors.XFORCE_NESTED_ACCORDION = {
    attach() {
      $(once('XFORCE_NESTED_ACCORDION', 'body'))
        .on('click', '.accordion-group-header', toggleAccordion);
    },
  };
})(jQuery, Drupal, once);
