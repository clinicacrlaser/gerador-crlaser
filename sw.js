// ⚠️ SERVICE WORKER NEUTRALIZADO
// Apenas skip e claim, SEM cache
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
