  // Intercept creation of script tags and block those loading OneTrust scripts
  (function() {
    const originalCreateElement = document.createElement.bind(document);

    document.createElement = function(tagName) {
      const element = originalCreateElement(tagName);
      if (tagName.toLowerCase() === 'script') {
        Object.defineProperty(element, 'src', {
          set: function(src) {
            if (src && src.includes('cdn.cookielaw.org')) {
              // Prevent loading OneTrust script by not setting src
              console.log('Blocked OneTrust script:', src);
              return;
            }
            // Otherwise set src normally
            this.setAttribute('src', src);
          },
          get: function() {
            return this.getAttribute('src');
          },
          configurable: true,
          enumerable: true,
        });
      }
      return element;
    };
  })();
