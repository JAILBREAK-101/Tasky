// Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/js/service-worker.js').then(() => {
      console.log('Service Worker registered');
    });
  }
  