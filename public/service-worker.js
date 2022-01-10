// init variables
const APP_PREFIX = "Budget-";
const VERSION = 'v1';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
    "./Index.html",
    "./js/idb.js",
    "./js/index.js",
    "./icons/icon-72x72.png",
    "./icons/icon-96x96.png",
    "./icons/icon-128x128.png",
    "./icons/icon-144x144.png",
    "./icons/icon-152x152.png",
    "./icons/icon-192x192.png",
    "./icons/icon-384x384.png",
    "./icons/icon-512x512.png",
    "./css/styles.css"
]
//install
self.addEventListener('install',function(event){
    event.waitUntil(
        caches.open(VERSION).then(function(cache){
            return cache.addAll(FILES_TO_CACHE)
        })
    )
})

// activation, clear out andy old data from the cache
self.addEventListener("activate", function (event) {
    event.waitUntil(
      caches.keys().then(function (keyList) {
        let cacheKeeplist = keyList.filter(function (key) {
          return key.indexOf(APP_PREFIX);
        });
        cacheKeeplist.push(CACHE_NAME);
  // promise that resolves once all old versions of the cache have been deleted
        return Promise.all(
          keyList.map(function (key, i) {
            if (cacheKeeplist.indexOf(key) === -1) {
              console.log("deleting cache : " + keyList[i]);
              return caches.delete(keyList[i]);
            }
          })
        );
      })
    );
  });

  //intercept fetch request, retrieve information from the cache
  self.addEventListener('fetch', function (event) {
    console.log('fetch request : ' + event.request.url)
    event.respondWith(
      caches.match(e.request).then(function (request) {// match to determine if the resource already existg in cache
        if (request) { // if match the exists in caches will log url or allow the resource to beb retrieved
          console.log('responding with cache : ' + event.request.url)
          return request
        } else {       
          console.log('file is not cached, fetching : ' + event.request.url)
          return fetch(e.request)
        }
      })
    )
  })