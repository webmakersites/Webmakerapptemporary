function displayMessage(message) {
  document.querySelector('#sw-status').innerText = message;
}

if ('serviceWorker' in navigator) {
  // See https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // The updatefound event implies that registration.installing is set.
        var installingWorker = registration.installing;

        installingWorker.onstatechange = function() {
          switch (installingWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                // At this point, the old content will have been purged and the fresh content will
                // have been added to the cache.
                // It's the perfect time to display a "New content is available; please refresh."
                // message in the page's interface.
                displayMessage('Please refresh for updates to this site.');
              } else {
                // At this point, everything has been precached.
                // It's the perfect time to display a "Content is cached for offline use." message.
                displayMessage('This site is available offline!');
              }
              break;

            case 'redundant':
              displayMessage('Service worker installation failed.');
              break;
          }
        };
      };
    }).catch(function(e) {
      displayMessage('Error during service worker registration:' + e);
    });
  });
}
