// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/menu.js":[function(require,module,exports) {
var navigation = {
  // Variables
  $navTrigger: document.querySelector('.nav__trigger', '.bars_trigger'),
  $navTrigger2: document.querySelector('.logo-menu'),
  $nav: document.querySelector('.nav'),
  $navItems: document.querySelectorAll('.nav__item a'),
  $main: document.querySelector('.main'),
  transitionEnd: 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
  isOpeningNav: false,
  init: function init() {
    var self = this; // Reset overflow and height on load

    self.$main.style.overflow = 'auto';
    self.$main.style.height = 'auto'; // Handle scroll events

    window.addEventListener('scroll', function (e) {
      if (window.scrollY == 0 && self.isOpeningNav) {
        self.isOpeningNav = false; // Add a small delay

        setTimeout(function () {
          self.openNavigation();
        }, 150);
      }
    }); // Handle .nav__trigger click event

    self.$navTrigger.addEventListener('click', function (e) {
      e.preventDefault();

      if (!self.$navTrigger.classList.contains('is-active')) {
        if (window.scrollY !== 0) {
          // Scroll to top
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          }); // Enable opening nav

          self.isOpeningNav = true;
        } else {
          self.openNavigation();
        }
      } else {
        self.closeNavigation();
      }
    });
    self.$navTrigger2.addEventListener('click', function (e) {
      e.preventDefault();

      if (!self.$navTrigger2.classList.contains('is-active')) {
        if (window.scrollY !== 0) {
          // Scroll to top
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          }); // Enable opening nav

          self.isOpeningNav = true;
        } else {
          self.openNavigation();
        }
      } else {
        self.closeNavigation();
      }
    }); // Handle .nav__item click events

    self.$navItems.forEach(function (navLink) {
      navLink.addEventListener('click', function (e) {
        e.preventDefault(); // Remove is-active from all .nav__items

        self.$navItems.forEach(function (el) {
          el.classList.remove('is-active');
        }); // Ad is-active to clicked .nav__item

        this.classList.add('is-active'); // Transition the page

        self.transitionPage();
        this.click();
      });
    });
  },
  openNavigation: function openNavigation() {
    var self = this; // .nav--trigger active

    self.$navTrigger.classList.add('is-active'); // body froze

    document.body.classList.add('is-froze'); // Remove old inline styles

    if (self.$main.style.removeProperty) {
      self.$main.style.removeProperty('overflow');
      self.$main.style.removeProperty('height');
    } else {
      self.$main.style.removeAttribute('overflow');
      self.$main.style.removeAttribute('height');
    } // .main active


    self.$main.classList.add('is-active');
  },
  closeNavigation: function closeNavigation() {
    var self = this; // .nav--trigger inactive

    self.$navTrigger.classList.remove('is-active'); // .main inactive

    self.$main.classList.remove('is-active');
    self.$main.addEventListener('transitionend', function (e) {
      if (e.propertyName == 'transform' && !self.$navTrigger.classList.contains('is-active')) {
        // Reset overflow and height
        self.$main.style.overflow = 'auto';
        self.$main.style.height = 'auto'; // body unfroze

        document.body.classList.remove('is-froze');
      }
    }); // no-csstransitions fallback

    if (document.documentElement.classList.contains('no-csstransitions')) {
      // .main inactive
      self.$main.classList.remove('is-active'); // body unfroze

      document.body.classList.remove('is-froze');
    }
  },
  transitionPage: function transitionPage() {
    var self = this; // .main transitioning

    self.$main.classList.add('is-transition-out');
    self.$main.addEventListener('transitionend', function (e) {
      if (e.propertyName == 'clip-path') {
        if (self.$main.classList.contains('is-transition-in')) {
          self.$main.classList.remove('is-transition-in');
          self.$main.classList.remove('is-transition-out');
          self.closeNavigation();
        }

        if (self.$main.classList.contains('is-transition-out')) {
          self.$main.classList.remove('is-transition-out'); // Add new content to .main

          setTimeout(function () {
            self.$main.classList.add('is-transition-in');
          }, 500);
        }
      }
    });
  }
};
navigation.init();
$(document).ready(function () {
  $(".nav__list").on("click", "a", function (event) {
    // console.log(this);
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault(); //забираем идентификатор блока с атрибута href

    var id = $(this).attr('href'),
        //узнаем высоту от начала страницы до блока на который ссылается якорь
    top = $(id).offset().top + 100; //анимируем переход на расстояние - top за 1500 мс

    $('body,html').animate({
      scrollTop: top
    }, 1500);
  });
  $(".scroll").on("click", "a", function (event) {
    // console.log(this);
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault(); //забираем идентификатор блока с атрибута href

    var id = $(this).attr('href'),
        //узнаем высоту от начала страницы до блока на который ссылается якорь
    top = $(id).offset().top; //анимируем переход на расстояние - top за 1500 мс

    $('body,html').animate({
      scrollTop: top
    }, 1500);
  });
});
},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56356" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/menu.js"], null)
//# sourceMappingURL=/menu.0c91648c.js.map