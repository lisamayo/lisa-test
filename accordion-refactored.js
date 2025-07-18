/**
 * @file
 *
 * Tab functionality
 */

(($, Drupal, once) => {
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
        ).css({
          height: '0px',
          overflow: 'hidden',
        });
      }
    }

    $(event.currentTarget)
      .toggleClass('accordion-group-header-active')
      .attr('aria-expanded', expanded ? 'false' : 'true');

    // Track in Analytics at the accordion has been opened.
    if (!expanded) {
      const [name] = $(event.currentTarget).text().trim().split(/\r?\n/);

      if (
        typeof Drupal.esiDdlSchema !== 'undefined' &&
        typeof Drupal.esiDdlSchema.sendPageActionEvent !== 'undefined'
      ) {
        Drupal.esiDdlSchema.sendPageActionEvent({
          controlText: name,
          controlRegion: 'main',
          controlType: 'Click',
          controlName: id
        });
      } else {
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

        document.querySelector('html').dispatchEvent(accordionCustomEvent);
      }
    }

    const contentPanel = event.currentTarget.nextElementSibling;

    // --- Fix: Ensure content is visible before toggling ---
    $(contentPanel).css('display', 'block');

    // Apply class toggle inside requestAnimationFrame to ensure reflow
    requestAnimationFrame(() => {
      $(contentPanel).toggleClass('accordion-group-content-active');
    });
  };

  Drupal.behaviors.XFORCE_NESTED_ACCORDION = {
    attach() {
      $(once('XFORCE_NESTED_ACCORDION', 'body'))
        .on('click', '.accordion-group-header', toggleAccordion);
    },
  };
})(jQuery, Drupal, once);
