/**
 * @file
 *
 * Refactored Tab (Accordion) functionality with dynamic height handling.
 */

(($, Drupal, once) => {
  /**
   * Toggle Accordion Panel
   * @param {Object} event - Accordion Toggle Event
   */
  const toggleAccordion = (event) => {
    const trigger = event.currentTarget;
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    const id = trigger.id;
    const content = trigger.nextElementSibling;

    // Close any currently open accordion
    const openHeader = document.querySelector('.accordion-group-header-active');
    if (openHeader && openHeader !== trigger) {
      closeAccordion(openHeader, openHeader.nextElementSibling);
    }

    // Toggle current accordion
    if (expanded) {
      closeAccordion(trigger, content);
    } else {
      openAccordion(trigger, content);

      // Track Analytics Event
      const [name] = $(trigger).text().trim().split(/\r?\n/);
      trackAnalyticsEvent(name, id);
    }
  };

  /**
   * Open Accordion Helper
   */
  const openAccordion = (trigger, content) => {
    trigger.classList.add('accordion-group-header-active');
    trigger.setAttribute('aria-expanded', 'true');

    // Make sure content is visible before measuring
    content.style.display = 'block';
    content.style.overflow = 'hidden';
    content.style.height = '0px';

    // Allow the browser to render before measuring
    requestAnimationFrame(() => {
      const fullHeight = content.scrollHeight + 'px';
      content.style.transition = 'height 0.3s ease';
      content.style.height = fullHeight;

      // Cleanup after transition
      content.addEventListener('transitionend', function cleanup() {
        content.style.height = 'auto';
        content.style.overflow = 'visible';
        content.removeEventListener('transitionend', cleanup);
      });
    });
  };

  /**
   * Close Accordion Helper
   */
  const closeAccordion = (trigger, content) => {
    trigger.classList.remove('accordion-group-header-active');
    trigger.setAttribute('aria-expanded', 'false');

    content.style.overflow = 'hidden';
    content.style.height = content.scrollHeight + 'px';

    // Force reflow
    void content.offsetWidth;

    requestAnimationFrame(() => {
      content.style.transition = 'height 0.3s ease';
      content.style.height = '0px';
    });

    content.addEventListener('transitionend', function cleanup() {
      content.style.display = 'none';
      content.style.height = '';
      content.style.transition = '';
      content.removeEventListener('transitionend', cleanup);
    });
  };

  /**
   * Track Analytics Event
   */
  const trackAnalyticsEvent = (name, id) => {
    if (
      typeof Drupal.esiDdlSchema !== 'undefined' &&
      typeof Drupal.esiDdlSchema.sendPageActionEvent !== 'undefined'
    ) {
      Drupal.esiDdlSchema.sendPageActionEvent({
        controlText: name,
        controlRegion: 'main',
        controlType: 'Click',
        controlName: id,
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
  };

  Drupal.behaviors.XFORCE_NESTED_ACCORDION = {
    attach() {
      $(once('XFORCE_NESTED_ACCORDION', '.accordion-group-header')).on(
        'click',
        toggleAccordion
      );
    },
  };
})(jQuery, Drupal, once);
