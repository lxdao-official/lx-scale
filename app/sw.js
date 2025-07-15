// Basic Service Worker for LXScale
// This prevents 404 errors when browsers automatically request sw.js

self.addEventListener('install', function() {
  // Skip waiting to activate immediately
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  // Take control of all clients immediately
  event.waitUntil(self.clients.claim());
});

// Basic fetch handler - just pass through requests
self.addEventListener('fetch', function() {
  // For now, just let requests go through normally
  // You can add caching strategies here in the future
});