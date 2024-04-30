(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // ../easy_ui/easy_ui/public/assets/vendor/js/helpers.js
  var require_helpers = __commonJS({
    "../easy_ui/easy_ui/public/assets/vendor/js/helpers.js"(exports, module) {
      (function webpackUniversalModuleDefinition(root, factory) {
        if (typeof exports === "object" && typeof module === "object")
          module.exports = factory();
        else if (typeof define === "function" && define.amd)
          define([], factory);
        else {
          var a = factory();
          for (var i in a)
            (typeof exports === "object" ? exports : root)[i] = a[i];
        }
      })(self, function() {
        return function() {
          "use strict";
          var __webpack_modules__ = {
            "./js/helpers.js": function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
              eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Helpers: function() { return /* binding */ Helpers; }
/* harmony export */ });
function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// Constants
var TRANS_EVENTS = ['transitionend', 'webkitTransitionEnd', 'oTransitionEnd'];
var TRANS_PROPERTIES = ['transition', 'MozTransition', 'webkitTransition', 'WebkitTransition', 'OTransition'];
var INLINE_STYLES = "\\n.layout-menu-fixed .layout-navbar-full .layout-menu,\\n.layout-menu-fixed-offcanvas .layout-navbar-full .layout-menu {\\n  top: {navbarHeight}px !important;\\n}\\n.layout-page {\\n  padding-top: {navbarHeight}px !important;\\n}\\n.content-wrapper {\\n  padding-bottom: {footerHeight}px !important;\\n}";

// Guard
function requiredParam(name) {
  throw new Error("Parameter required".concat(name ? ": \`".concat(name, "\`") : ''));
}
var Helpers = {
  // Root Element
  ROOT_EL: typeof window !== 'undefined' ? document.documentElement : null,
  // Large screens breakpoint
  LAYOUT_BREAKPOINT: 1200,
  // Resize delay in milliseconds
  RESIZE_DELAY: 200,
  menuPsScroll: null,
  mainMenu: null,
  // Internal variables
  _curStyle: null,
  _styleEl: null,
  _resizeTimeout: null,
  _resizeCallback: null,
  _transitionCallback: null,
  _transitionCallbackTimeout: null,
  _listeners: [],
  _initialized: false,
  _autoUpdate: false,
  _lastWindowHeight: 0,
  // *******************************************************************************
  // * Utilities
  // ---
  // Scroll To Active Menu Item
  _scrollToActive: function _scrollToActive() {
    var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
    var layoutMenu = this.getLayoutMenu();
    if (!layoutMenu) return;
    var activeEl = layoutMenu.querySelector('li.menu-item.active:not(.open)');
    if (activeEl) {
      // t = current time
      // b = start value
      // c = change in value
      // d = duration
      var easeInOutQuad = function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t -= 1;
        return -c / 2 * (t * (t - 2) - 1) + b;
      };
      var element = this.getLayoutMenu().querySelector('.menu-inner');
      if (typeof activeEl === 'string') {
        activeEl = document.querySelector(activeEl);
      }
      if (typeof activeEl !== 'number') {
        activeEl = activeEl.getBoundingClientRect().top + element.scrollTop;
      }

      // If active element's top position is less than 2/3 (66%) of menu height than do not scroll
      if (activeEl < parseInt(element.clientHeight * 2 / 3, 10)) return;
      var start = element.scrollTop;
      var change = activeEl - start - parseInt(element.clientHeight / 2, 10);
      var startDate = +new Date();
      if (animate === true) {
        var animateScroll = function animateScroll() {
          var currentDate = +new Date();
          var currentTime = currentDate - startDate;
          var val = easeInOutQuad(currentTime, start, change, duration);
          element.scrollTop = val;
          if (currentTime < duration) {
            requestAnimationFrame(animateScroll);
          } else {
            element.scrollTop = change;
          }
        };
        animateScroll();
      } else {
        element.scrollTop = change;
      }
    }
  },
  // ---
  // Swipe In Gesture
  _swipeIn: function _swipeIn(targetEl, callback) {
    var _window = window,
      Hammer = _window.Hammer;
    if (typeof Hammer !== 'undefined' && typeof targetEl === 'string') {
      // Swipe menu gesture
      var swipeInElement = document.querySelector(targetEl);
      if (swipeInElement) {
        var hammerInstance = new Hammer(swipeInElement);
        hammerInstance.on('panright', callback);
      }
    }
  },
  // ---
  // Swipe Out Gesture
  _swipeOut: function _swipeOut(targetEl, callback) {
    var _window2 = window,
      Hammer = _window2.Hammer;
    if (typeof Hammer !== 'undefined' && typeof targetEl === 'string') {
      setTimeout(function () {
        // Swipe menu gesture
        var swipeOutElement = document.querySelector(targetEl);
        if (swipeOutElement) {
          var hammerInstance = new Hammer(swipeOutElement);
          hammerInstance.get('pan').set({
            direction: Hammer.DIRECTION_ALL,
            threshold: 250
          });
          hammerInstance.on('panleft', callback);
        }
      }, 500);
    }
  },
  // ---
  // Swipe Out On Overlay Tap
  _overlayTap: function _overlayTap(targetEl, callback) {
    var _window3 = window,
      Hammer = _window3.Hammer;
    if (typeof Hammer !== 'undefined' && typeof targetEl === 'string') {
      // Swipe out overlay element
      var swipeOutOverlayElement = document.querySelector(targetEl);
      if (swipeOutOverlayElement) {
        var hammerInstance = new Hammer(swipeOutOverlayElement);
        hammerInstance.on('tap', callback);
      }
    }
  },
  // ---
  // Add classes
  _addClass: function _addClass(cls) {
    var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.ROOT_EL;
    if (el.length !== undefined) {
      // Add classes to multiple elements
      el.forEach(function (e) {
        cls.split(' ').forEach(function (c) {
          return e.classList.add(c);
        });
      });
    } else {
      // Add classes to single element
      cls.split(' ').forEach(function (c) {
        return el.classList.add(c);
      });
    }
  },
  // ---
  // Remove classes
  _removeClass: function _removeClass(cls) {
    var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.ROOT_EL;
    if (el.length !== undefined) {
      // Remove classes to multiple elements
      el.forEach(function (e) {
        cls.split(' ').forEach(function (c) {
          return e.classList.remove(c);
        });
      });
    } else {
      // Remove classes to single element
      cls.split(' ').forEach(function (c) {
        return el.classList.remove(c);
      });
    }
  },
  // Toggle classes
  _toggleClass: function _toggleClass() {
    var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.ROOT_EL;
    var cls1 = arguments.length > 1 ? arguments[1] : undefined;
    var cls2 = arguments.length > 2 ? arguments[2] : undefined;
    if (el.classList.contains(cls1)) {
      el.classList.replace(cls1, cls2);
    } else {
      el.classList.replace(cls2, cls1);
    }
  },
  // ---
  // Has class
  _hasClass: function _hasClass(cls) {
    var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.ROOT_EL;
    var result = false;
    cls.split(' ').forEach(function (c) {
      if (el.classList.contains(c)) result = true;
    });
    return result;
  },
  _findParent: function _findParent(el, cls) {
    if (el && el.tagName.toUpperCase() === 'BODY' || el.tagName.toUpperCase() === 'HTML') return null;
    el = el.parentNode;
    while (el && el.tagName.toUpperCase() !== 'BODY' && !el.classList.contains(cls)) {
      el = el.parentNode;
    }
    el = el && el.tagName.toUpperCase() !== 'BODY' ? el : null;
    return el;
  },
  // ---
  // Trigger window event
  _triggerWindowEvent: function _triggerWindowEvent(name) {
    if (typeof window === 'undefined') return;
    if (document.createEvent) {
      var event;
      if (typeof Event === 'function') {
        event = new Event(name);
      } else {
        event = document.createEvent('Event');
        event.initEvent(name, false, true);
      }
      window.dispatchEvent(event);
    } else {
      window.fireEvent("on".concat(name), document.createEventObject());
    }
  },
  // ---
  // Trigger event
  _triggerEvent: function _triggerEvent(name) {
    this._triggerWindowEvent("layout".concat(name));
    this._listeners.filter(function (listener) {
      return listener.event === name;
    }).forEach(function (listener) {
      return listener.callback.call(null);
    });
  },
  // ---
  // Update style
  _updateInlineStyle: function _updateInlineStyle() {
    var navbarHeight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var footerHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (!this._styleEl) {
      this._styleEl = document.createElement('style');
      this._styleEl.type = 'text/css';
      document.head.appendChild(this._styleEl);
    }
    var newStyle = INLINE_STYLES.replace(/\\{navbarHeight\\}/gi, navbarHeight).replace(/\\{footerHeight\\}/gi, footerHeight);
    if (this._curStyle !== newStyle) {
      this._curStyle = newStyle;
      this._styleEl.textContent = newStyle;
    }
  },
  // ---
  // Remove style
  _removeInlineStyle: function _removeInlineStyle() {
    if (this._styleEl) document.head.removeChild(this._styleEl);
    this._styleEl = null;
    this._curStyle = null;
  },
  // ---
  // Redraw layout menu (Safari bugfix)
  _redrawLayoutMenu: function _redrawLayoutMenu() {
    var layoutMenu = this.getLayoutMenu();
    if (layoutMenu && layoutMenu.querySelector('.menu')) {
      var inner = layoutMenu.querySelector('.menu-inner');
      var scrollTop = inner.scrollTop;
      var pageScrollTop = document.documentElement.scrollTop;
      layoutMenu.style.display = 'none';
      // layoutMenu.offsetHeight
      layoutMenu.style.display = '';
      inner.scrollTop = scrollTop;
      document.documentElement.scrollTop = pageScrollTop;
      return true;
    }
    return false;
  },
  // ---
  // Check for transition support
  _supportsTransitionEnd: function _supportsTransitionEnd() {
    if (window.QUnit) return false;
    var el = document.body || document.documentElement;
    if (!el) return false;
    var result = false;
    TRANS_PROPERTIES.forEach(function (evnt) {
      if (typeof el.style[evnt] !== 'undefined') result = true;
    });
    return result;
  },
  // ---
  // Calculate current navbar height
  _getNavbarHeight: function _getNavbarHeight() {
    var _this2 = this;
    var layoutNavbar = this.getLayoutNavbar();
    if (!layoutNavbar) return 0;
    if (!this.isSmallScreen()) return layoutNavbar.getBoundingClientRect().height;

    // Needs some logic to get navbar height on small screens

    var clonedEl = layoutNavbar.cloneNode(true);
    clonedEl.id = null;
    clonedEl.style.visibility = 'hidden';
    clonedEl.style.position = 'absolute';
    Array.prototype.slice.call(clonedEl.querySelectorAll('.collapse.show')).forEach(function (el) {
      return _this2._removeClass('show', el);
    });
    layoutNavbar.parentNode.insertBefore(clonedEl, layoutNavbar);
    var navbarHeight = clonedEl.getBoundingClientRect().height;
    clonedEl.parentNode.removeChild(clonedEl);
    return navbarHeight;
  },
  // ---
  // Get current footer height
  _getFooterHeight: function _getFooterHeight() {
    var layoutFooter = this.getLayoutFooter();
    if (!layoutFooter) return 0;
    return layoutFooter.getBoundingClientRect().height;
  },
  // ---
  // Get animation duration of element
  _getAnimationDuration: function _getAnimationDuration(el) {
    var duration = window.getComputedStyle(el).transitionDuration;
    return parseFloat(duration) * (duration.indexOf('ms') !== -1 ? 1 : 1000);
  },
  // ---
  // Set menu hover state
  _setMenuHoverState: function _setMenuHoverState(hovered) {
    this[hovered ? '_addClass' : '_removeClass']('layout-menu-hover');
  },
  // ---
  // Toggle collapsed
  _setCollapsed: function _setCollapsed(collapsed) {
    var _this3 = this;
    if (this.isSmallScreen()) {
      if (collapsed) {
        this._removeClass('layout-menu-expanded');
      } else {
        setTimeout(function () {
          _this3._addClass('layout-menu-expanded');
        }, this._redrawLayoutMenu() ? 5 : 0);
      }
    } else {
      this[collapsed ? '_addClass' : '_removeClass']('layout-menu-collapsed');
    }
  },
  // ---
  // Add layout sivenav toggle animationEnd event
  _bindLayoutAnimationEndEvent: function _bindLayoutAnimationEndEvent(modifier, cb) {
    var _this4 = this;
    var menu = this.getMenu();
    var duration = menu ? this._getAnimationDuration(menu) + 50 : 0;
    if (!duration) {
      modifier.call(this);
      cb.call(this);
      return;
    }
    this._transitionCallback = function (e) {
      if (e.target !== menu) return;
      _this4._unbindLayoutAnimationEndEvent();
      cb.call(_this4);
    };
    TRANS_EVENTS.forEach(function (e) {
      menu.addEventListener(e, _this4._transitionCallback, false);
    });
    modifier.call(this);
    this._transitionCallbackTimeout = setTimeout(function () {
      _this4._transitionCallback.call(_this4, {
        target: menu
      });
    }, duration);
  },
  // ---
  // Remove layout sivenav toggle animationEnd event
  _unbindLayoutAnimationEndEvent: function _unbindLayoutAnimationEndEvent() {
    var _this5 = this;
    var menu = this.getMenu();
    if (this._transitionCallbackTimeout) {
      clearTimeout(this._transitionCallbackTimeout);
      this._transitionCallbackTimeout = null;
    }
    if (menu && this._transitionCallback) {
      TRANS_EVENTS.forEach(function (e) {
        menu.removeEventListener(e, _this5._transitionCallback, false);
      });
    }
    if (this._transitionCallback) {
      this._transitionCallback = null;
    }
  },
  // ---
  // Bind delayed window resize event
  _bindWindowResizeEvent: function _bindWindowResizeEvent() {
    var _this6 = this;
    this._unbindWindowResizeEvent();
    var cb = function cb() {
      if (_this6._resizeTimeout) {
        clearTimeout(_this6._resizeTimeout);
        _this6._resizeTimeout = null;
      }
      _this6._triggerEvent('resize');
    };
    this._resizeCallback = function () {
      if (_this6._resizeTimeout) clearTimeout(_this6._resizeTimeout);
      _this6._resizeTimeout = setTimeout(cb, _this6.RESIZE_DELAY);
    };
    window.addEventListener('resize', this._resizeCallback, false);
  },
  // ---
  // Unbind delayed window resize event
  _unbindWindowResizeEvent: function _unbindWindowResizeEvent() {
    if (this._resizeTimeout) {
      clearTimeout(this._resizeTimeout);
      this._resizeTimeout = null;
    }
    if (this._resizeCallback) {
      window.removeEventListener('resize', this._resizeCallback, false);
      this._resizeCallback = null;
    }
  },
  _bindMenuMouseEvents: function _bindMenuMouseEvents() {
    var _this7 = this;
    if (this._menuMouseEnter && this._menuMouseLeave && this._windowTouchStart) return;
    var layoutMenu = this.getLayoutMenu();
    if (!layoutMenu) return this._unbindMenuMouseEvents();
    if (!this._menuMouseEnter) {
      this._menuMouseEnter = function () {
        if (_this7.isSmallScreen() || !_this7._hasClass('layout-menu-collapsed') || _this7.isOffcanvas() || _this7._hasClass('layout-transitioning')) {
          return _this7._setMenuHoverState(false);
        }
        return _this7._setMenuHoverState(true);
      };
      layoutMenu.addEventListener('mouseenter', this._menuMouseEnter, false);
      layoutMenu.addEventListener('touchstart', this._menuMouseEnter, false);
    }
    if (!this._menuMouseLeave) {
      this._menuMouseLeave = function () {
        _this7._setMenuHoverState(false);
      };
      layoutMenu.addEventListener('mouseleave', this._menuMouseLeave, false);
    }
    if (!this._windowTouchStart) {
      this._windowTouchStart = function (e) {
        if (!e || !e.target || !_this7._findParent(e.target, '.layout-menu')) {
          _this7._setMenuHoverState(false);
        }
      };
      window.addEventListener('touchstart', this._windowTouchStart, true);
    }
  },
  _unbindMenuMouseEvents: function _unbindMenuMouseEvents() {
    if (!this._menuMouseEnter && !this._menuMouseLeave && !this._windowTouchStart) return;
    var layoutMenu = this.getLayoutMenu();
    if (this._menuMouseEnter) {
      if (layoutMenu) {
        layoutMenu.removeEventListener('mouseenter', this._menuMouseEnter, false);
        layoutMenu.removeEventListener('touchstart', this._menuMouseEnter, false);
      }
      this._menuMouseEnter = null;
    }
    if (this._menuMouseLeave) {
      if (layoutMenu) {
        layoutMenu.removeEventListener('mouseleave', this._menuMouseLeave, false);
      }
      this._menuMouseLeave = null;
    }
    if (this._windowTouchStart) {
      if (layoutMenu) {
        window.addEventListener('touchstart', this._windowTouchStart, true);
      }
      this._windowTouchStart = null;
    }
    this._setMenuHoverState(false);
  },
  // *******************************************************************************
  // * Methods
  scrollToActive: function scrollToActive() {
    var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    this._scrollToActive(animate);
  },
  swipeIn: function swipeIn(el, callback) {
    this._swipeIn(el, callback);
  },
  swipeOut: function swipeOut(el, callback) {
    this._swipeOut(el, callback);
  },
  overlayTap: function overlayTap(el, callback) {
    this._overlayTap(el, callback);
  },
  scrollPageTo: function scrollPageTo(to) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    var easeInOutQuad = function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t -= 1;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };
    var element = document.scrollingElement;
    if (typeof to === 'string') {
      to = document.querySelector(to);
    }
    if (typeof to !== 'number') {
      to = to.getBoundingClientRect().top + element.scrollTop;
    }
    var start = element.scrollTop;
    var change = to - start;
    var startDate = +new Date();
    // const increment = 20

    var animateScroll = function animateScroll() {
      var currentDate = +new Date();
      var currentTime = currentDate - startDate;
      var val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = to;
      }
    };
    animateScroll();
  },
  // ---
  // Collapse / expand layout
  setCollapsed: function setCollapsed() {
    var _this8 = this;
    var collapsed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : requiredParam('collapsed');
    var animate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var layoutMenu = this.getLayoutMenu();
    if (!layoutMenu) return;
    this._unbindLayoutAnimationEndEvent();
    if (animate && this._supportsTransitionEnd()) {
      this._addClass('layout-transitioning');
      if (collapsed) this._setMenuHoverState(false);
      this._bindLayoutAnimationEndEvent(function () {
        // Collapse / Expand
        _this8._setCollapsed(collapsed);
      }, function () {
        _this8._removeClass('layout-transitioning');
        _this8._triggerWindowEvent('resize');
        _this8._triggerEvent('toggle');
        _this8._setMenuHoverState(false);
      });
    } else {
      this._addClass('layout-no-transition');
      if (collapsed) this._setMenuHoverState(false);

      // Collapse / Expand
      this._setCollapsed(collapsed);
      setTimeout(function () {
        _this8._removeClass('layout-no-transition');
        _this8._triggerWindowEvent('resize');
        _this8._triggerEvent('toggle');
        _this8._setMenuHoverState(false);
      }, 1);
    }
  },
  // ---
  // Toggle layout
  toggleCollapsed: function toggleCollapsed() {
    var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    this.setCollapsed(!this.isCollapsed(), animate);
  },
  // ---
  // Set layout positioning
  setPosition: function setPosition() {
    var fixed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : requiredParam('fixed');
    var offcanvas = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : requiredParam('offcanvas');
    this._removeClass('layout-menu-offcanvas layout-menu-fixed layout-menu-fixed-offcanvas');
    if (!fixed && offcanvas) {
      this._addClass('layout-menu-offcanvas');
    } else if (fixed && !offcanvas) {
      this._addClass('layout-menu-fixed');
      this._redrawLayoutMenu();
    } else if (fixed && offcanvas) {
      this._addClass('layout-menu-fixed-offcanvas');
      this._redrawLayoutMenu();
    }
    this.update();
  },
  // *******************************************************************************
  // * Getters
  getLayoutMenu: function getLayoutMenu() {
    return document.querySelector('.layout-menu');
  },
  getMenu: function getMenu() {
    var layoutMenu = this.getLayoutMenu();
    if (!layoutMenu) return null;
    return !this._hasClass('menu', layoutMenu) ? layoutMenu.querySelector('.menu') : layoutMenu;
  },
  getLayoutNavbar: function getLayoutNavbar() {
    return document.querySelector('.layout-navbar');
  },
  getLayoutFooter: function getLayoutFooter() {
    return document.querySelector('.content-footer');
  },
  getLayoutContainer: function getLayoutContainer() {
    return document.querySelector('.layout-page');
  },
  // *******************************************************************************
  // * Setters
  setNavbarFixed: function setNavbarFixed() {
    var fixed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : requiredParam('fixed');
    this[fixed ? '_addClass' : '_removeClass']('layout-navbar-fixed');
    this.update();
  },
  setNavbar: function setNavbar(type) {
    if (type === 'sticky') {
      this._addClass('layout-navbar-fixed');
      this._removeClass('layout-navbar-hidden');
    } else if (type === 'hidden') {
      this._addClass('layout-navbar-hidden');
      this._removeClass('layout-navbar-fixed');
    } else {
      this._removeClass('layout-navbar-hidden');
      this._removeClass('layout-navbar-fixed');
    }
    this.update();
  },
  setFooterFixed: function setFooterFixed() {
    var fixed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : requiredParam('fixed');
    this[fixed ? '_addClass' : '_removeClass']('layout-footer-fixed');
    this.update();
  },
  setContentLayout: function setContentLayout() {
    var _this9 = this;
    var contentLayout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : requiredParam('contentLayout');
    setTimeout(function () {
      var contentArea = document.querySelector('.content-wrapper > div'); // For content area
      var navbarArea = document.querySelector('.layout-navbar'); // For navbar area for vertical menu
      var navbarAreaHorizontal = document.querySelector('.layout-navbar > div'); // For navbar area for horizontal menu
      var navbarSearchInputWrapper = document.querySelector('.layout-navbar .search-input-wrapper'); // For navbar search input wrapper
      var navbarSearchInput = document.querySelector('.layout-navbar .search-input-wrapper .search-input'); // For navbar search input
      var footerArea = document.querySelector('.content-footer > div'); // For footer area
      var containerFluid = [].slice.call(document.querySelectorAll('.container-fluid')); // To get container-fluid
      var containerXxl = [].slice.call(document.querySelectorAll('.container-xxl')); // To get container-xxl
      var verticalMenu = document.querySelector('.menu-vertical');
      var horizontalMenu = false; // For horizontal menu
      var horizontalMenuArea; // For horizontal menu area
      // Condition to check if layout is horizontal menu
      if (document.querySelector('.content-wrapper > .menu-horizontal > div')) {
        horizontalMenu = true;
        horizontalMenuArea = document.querySelector('.content-wrapper > .menu-horizontal > div');
      }
      //  If compact mode layout
      if (contentLayout === 'compact') {
        // Remove container fluid class from content area and footer area
        if (containerFluid.some(function (el) {
          return [contentArea, footerArea].includes(el);
        })) {
          _this9._removeClass('container-fluid', [contentArea, footerArea]);
          _this9._addClass('container-xxl', [contentArea, footerArea]);
        }
        // Navbar search input container condition is separated because it is not in starter kit
        if (navbarSearchInput) {
          _this9._removeClass('container-fluid', [navbarSearchInput]);
          _this9._addClass('container-xxl', [navbarSearchInput]);
        }
        // Remove container fluid class from navbar area in vertical menu
        if (verticalMenu) {
          if (containerFluid.some(function (el) {
            return [navbarArea].includes(el);
          })) {
            _this9._removeClass('container-fluid', [navbarArea]);
            _this9._addClass('container-xxl', [navbarArea]);
          }
        }
        // For horizontal menu only
        if (horizontalMenu) {
          _this9._removeClass('container-fluid', horizontalMenuArea);
          _this9._addClass('container-xxl', horizontalMenuArea);
          // For horizontal navbar only
          if (navbarAreaHorizontal) {
            _this9._removeClass('container-fluid', navbarAreaHorizontal);
            _this9._addClass('container-xxl', navbarAreaHorizontal);
          }
          // Navbar search input container condition is separated because it is not in starter kit
          if (navbarSearchInputWrapper) {
            _this9._removeClass('container-fluid', navbarSearchInputWrapper);
            _this9._addClass('container-xxl', navbarSearchInputWrapper);
          }
        }
      } else {
        //  If wide mode layout

        // Remove container xxl class from content area and footer area
        if (containerXxl.some(function (el) {
          return [contentArea, footerArea].includes(el);
        })) {
          _this9._removeClass('container-xxl', [contentArea, footerArea]);
          _this9._addClass('container-fluid', [contentArea, footerArea]);
        }
        // Navbar search input container condition is separated because it is not in starter kit
        if (navbarSearchInput) {
          _this9._removeClass('container-xxl', [navbarSearchInput]);
          _this9._addClass('container-fluid', [navbarSearchInput]);
        }
        // Remove container xxl class from navbar area in vertical menu
        if (verticalMenu) {
          if (containerXxl.some(function (el) {
            return [navbarArea].includes(el);
          })) {
            _this9._removeClass('container-xxl', [navbarArea]);
            _this9._addClass('container-fluid', [navbarArea]);
          }
        }
        // For horizontal menu only
        if (horizontalMenu) {
          _this9._removeClass('container-xxl', horizontalMenuArea);
          _this9._addClass('container-fluid', horizontalMenuArea);
          // For horizontal navbar only
          if (navbarAreaHorizontal) {
            _this9._removeClass('container-xxl', navbarAreaHorizontal);
            _this9._addClass('container-fluid', navbarAreaHorizontal);
          }
          // Navbar search input container condition is separated because it is not in starter kit
          if (navbarSearchInputWrapper) {
            _this9._removeClass('container-xxl', navbarSearchInputWrapper);
            _this9._addClass('container-fluid', navbarSearchInputWrapper);
          }
        }
      }
    }, 100);
  },
  // *******************************************************************************
  // * Update
  update: function update() {
    if (this.getLayoutNavbar() && (!this.isSmallScreen() && this.isLayoutNavbarFull() && this.isFixed() || this.isNavbarFixed()) || this.getLayoutFooter() && this.isFooterFixed()) {
      this._updateInlineStyle(this._getNavbarHeight(), this._getFooterHeight());
    }
    this._bindMenuMouseEvents();
  },
  setAutoUpdate: function setAutoUpdate() {
    var _this10 = this;
    var enable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : requiredParam('enable');
    if (enable && !this._autoUpdate) {
      this.on('resize.Helpers:autoUpdate', function () {
        return _this10.update();
      });
      this._autoUpdate = true;
    } else if (!enable && this._autoUpdate) {
      this.off('resize.Helpers:autoUpdate');
      this._autoUpdate = false;
    }
  },
  // Update custom option based on element
  updateCustomOptionCheck: function updateCustomOptionCheck(el) {
    if (el.checked) {
      // If custom option element is radio, remove checked from the siblings (closest \`.row\`)
      if (el.type === 'radio') {
        var customRadioOptionList = [].slice.call(el.closest('.row').querySelectorAll('.custom-option'));
        customRadioOptionList.map(function (customRadioOptionEL) {
          customRadioOptionEL.closest('.custom-option').classList.remove('checked');
        });
      }
      el.closest('.custom-option').classList.add('checked');
    } else {
      el.closest('.custom-option').classList.remove('checked');
    }
  },
  // *******************************************************************************
  // * Tests
  isRtl: function isRtl() {
    return document.querySelector('body').getAttribute('dir') === 'rtl' || document.querySelector('html').getAttribute('dir') === 'rtl';
  },
  isMobileDevice: function isMobileDevice() {
    return typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;
  },
  isSmallScreen: function isSmallScreen() {
    return (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < this.LAYOUT_BREAKPOINT;
  },
  isLayoutNavbarFull: function isLayoutNavbarFull() {
    return !!document.querySelector('.layout-wrapper.layout-navbar-full');
  },
  isCollapsed: function isCollapsed() {
    if (this.isSmallScreen()) {
      return !this._hasClass('layout-menu-expanded');
    }
    return this._hasClass('layout-menu-collapsed');
  },
  isFixed: function isFixed() {
    return this._hasClass('layout-menu-fixed layout-menu-fixed-offcanvas');
  },
  isOffcanvas: function isOffcanvas() {
    return this._hasClass('layout-menu-offcanvas layout-menu-fixed-offcanvas');
  },
  isNavbarFixed: function isNavbarFixed() {
    return this._hasClass('layout-navbar-fixed') || !this.isSmallScreen() && this.isFixed() && this.isLayoutNavbarFull();
  },
  isFooterFixed: function isFooterFixed() {
    return this._hasClass('layout-footer-fixed');
  },
  isLightStyle: function isLightStyle() {
    return document.documentElement.classList.contains('light-style');
  },
  isDarkStyle: function isDarkStyle() {
    return document.documentElement.classList.contains('dark-style');
  },
  // *******************************************************************************
  // * Events
  on: function on() {
    var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : requiredParam('event');
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : requiredParam('callback');
    var _event$split = event.split('.'),
      _event$split2 = _slicedToArray(_event$split, 1),
      _event = _event$split2[0];
    var _event$split3 = event.split('.'),
      _event$split4 = _toArray(_event$split3),
      namespace = _event$split4.slice(1);
    // let [_event, ...namespace] = event.split('.')
    namespace = namespace.join('.') || null;
    this._listeners.push({
      event: _event,
      namespace: namespace,
      callback: callback
    });
  },
  off: function off() {
    var _this11 = this;
    var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : requiredParam('event');
    var _event$split5 = event.split('.'),
      _event$split6 = _slicedToArray(_event$split5, 1),
      _event = _event$split6[0];
    var _event$split7 = event.split('.'),
      _event$split8 = _toArray(_event$split7),
      namespace = _event$split8.slice(1);
    namespace = namespace.join('.') || null;
    this._listeners.filter(function (listener) {
      return listener.event === _event && listener.namespace === namespace;
    }).forEach(function (listener) {
      return _this11._listeners.splice(_this11._listeners.indexOf(listener), 1);
    });
  },
  // *******************************************************************************
  // * Life cycle
  init: function init() {
    var _this12 = this;
    if (this._initialized) return;
    this._initialized = true;

    // Initialize \`style\` element
    this._updateInlineStyle(0);

    // Bind window resize event
    this._bindWindowResizeEvent();

    // Bind init event
    this.off('init._Helpers');
    this.on('init._Helpers', function () {
      _this12.off('resize._Helpers:redrawMenu');
      _this12.on('resize._Helpers:redrawMenu', function () {
        // eslint-disable-next-line no-unused-expressions
        _this12.isSmallScreen() && !_this12.isCollapsed() && _this12._redrawLayoutMenu();
      });

      // Force repaint in IE 10
      if (typeof document.documentMode === 'number' && document.documentMode < 11) {
        _this12.off('resize._Helpers:ie10RepaintBody');
        _this12.on('resize._Helpers:ie10RepaintBody', function () {
          if (_this12.isFixed()) return;
          var scrollTop = document.documentElement.scrollTop;
          document.body.style.display = 'none';
          // document.body.offsetHeight
          document.body.style.display = 'block';
          document.documentElement.scrollTop = scrollTop;
        });
      }
    });
    this._triggerEvent('init');
  },
  destroy: function destroy() {
    var _this13 = this;
    if (!this._initialized) return;
    this._initialized = false;
    this._removeClass('layout-transitioning');
    this._removeInlineStyle();
    this._unbindLayoutAnimationEndEvent();
    this._unbindWindowResizeEvent();
    this._unbindMenuMouseEvents();
    this.setAutoUpdate(false);
    this.off('init._Helpers');

    // Remove all listeners except \`init\`
    this._listeners.filter(function (listener) {
      return listener.event !== 'init';
    }).forEach(function (listener) {
      return _this13._listeners.splice(_this13._listeners.indexOf(listener), 1);
    });
  },
  // ---
  // Init Password Toggle
  initPasswordToggle: function initPasswordToggle() {
    var toggler = document.querySelectorAll('.form-password-toggle i');
    if (typeof toggler !== 'undefined' && toggler !== null) {
      toggler.forEach(function (el) {
        el.addEventListener('click', function (e) {
          e.preventDefault();
          var formPasswordToggle = el.closest('.form-password-toggle');
          var formPasswordToggleIcon = formPasswordToggle.querySelector('i');
          var formPasswordToggleInput = formPasswordToggle.querySelector('input');
          if (formPasswordToggleInput.getAttribute('type') === 'text') {
            formPasswordToggleInput.setAttribute('type', 'password');
            formPasswordToggleIcon.classList.replace('ti-eye', 'ti-eye-off');
          } else if (formPasswordToggleInput.getAttribute('type') === 'password') {
            formPasswordToggleInput.setAttribute('type', 'text');
            formPasswordToggleIcon.classList.replace('ti-eye-off', 'ti-eye');
          }
        });
      });
    }
  },
  //--
  // Init custom option check
  initCustomOptionCheck: function initCustomOptionCheck() {
    var _this = this;
    var custopOptionList = [].slice.call(document.querySelectorAll('.custom-option .form-check-input'));
    custopOptionList.map(function (customOptionEL) {
      // Update custom options check on page load
      _this.updateCustomOptionCheck(customOptionEL);

      // Update custom options check on click
      customOptionEL.addEventListener('click', function (e) {
        _this.updateCustomOptionCheck(customOptionEL);
      });
    });
  },
  // ---
  // Init Speech To Text
  initSpeechToText: function initSpeechToText() {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var speechToText = document.querySelectorAll('.speech-to-text');
    if (SpeechRecognition !== undefined && SpeechRecognition !== null) {
      if (typeof speechToText !== 'undefined' && speechToText !== null) {
        var recognition = new SpeechRecognition();
        var toggler = document.querySelectorAll('.speech-to-text i');
        toggler.forEach(function (el) {
          var listening = false;
          el.addEventListener('click', function () {
            el.closest('.input-group').querySelector('.form-control').focus();
            recognition.onspeechstart = function () {
              listening = true;
            };
            if (listening === false) {
              recognition.start();
            }
            recognition.onerror = function () {
              listening = false;
            };
            recognition.onresult = function (event) {
              el.closest('.input-group').querySelector('.form-control').value = event.results[0][0].transcript;
            };
            recognition.onspeechend = function () {
              listening = false;
              recognition.stop();
            };
          });
        });
      }
    }
  },
  // ---
  // Init Navbar Dropdown (i.e notification) PerfectScrollbar
  initNavbarDropdownScrollbar: function initNavbarDropdownScrollbar() {
    var scrollbarContainer = document.querySelectorAll('.navbar-dropdown .scrollable-container');
    var _window4 = window,
      PerfectScrollbar = _window4.PerfectScrollbar;
    if (PerfectScrollbar !== undefined) {
      if (typeof scrollbarContainer !== 'undefined' && scrollbarContainer !== null) {
        scrollbarContainer.forEach(function (el) {
          // eslint-disable-next-line no-new
          new PerfectScrollbar(el, {
            wheelPropagation: false,
            suppressScrollX: true
          });
        });
      }
    }
  },
  // Ajax Call Promise
  ajaxCall: function ajaxCall(url) {
    return new Promise(function (resolve, reject) {
      var req = new XMLHttpRequest();
      req.open('GET', url);
      req.onload = function () {
        return req.status === 200 ? resolve(req.response) : reject(Error(req.statusText));
      };
      req.onerror = function (e) {
        return reject(Error("Network Error: ".concat(e)));
      };
      req.send();
    });
  },
  // ---
  // SidebarToggle (Used in Apps)
  initSidebarToggle: function initSidebarToggle() {
    var sidebarToggler = document.querySelectorAll('[data-bs-toggle="sidebar"]');
    sidebarToggler.forEach(function (el) {
      el.addEventListener('click', function () {
        var target = el.getAttribute('data-target');
        var overlay = el.getAttribute('data-overlay');
        var appOverlay = document.querySelectorAll('.app-overlay');
        var targetEl = document.querySelectorAll(target);
        targetEl.forEach(function (tel) {
          tel.classList.toggle('show');
          if (typeof overlay !== 'undefined' && overlay !== null && overlay !== false && typeof appOverlay !== 'undefined') {
            if (tel.classList.contains('show')) {
              appOverlay[0].classList.add('show');
            } else {
              appOverlay[0].classList.remove('show');
            }
            appOverlay[0].addEventListener('click', function (e) {
              e.currentTarget.classList.remove('show');
              tel.classList.remove('show');
            });
          }
        });
      });
    });
  }
};

// *******************************************************************************
// * Initialization

if (typeof window !== 'undefined') {
  Helpers.init();
  if (Helpers.isMobileDevice() && window.chrome) {
    document.documentElement.classList.add('layout-menu-100vh');
  }

  // Update layout after page load
  if (document.readyState === 'complete') Helpers.update();else document.addEventListener('DOMContentLoaded', function onContentLoaded() {
    Helpers.update();
    document.removeEventListener('DOMContentLoaded', onContentLoaded);
  });
}

// ---


//# sourceURL=webpack://Vuexy/./js/helpers.js?`);
            }
          };
          var __webpack_require__ = {};
          !function() {
            __webpack_require__.d = function(exports2, definition) {
              for (var key in definition) {
                if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports2, key)) {
                  Object.defineProperty(exports2, key, { enumerable: true, get: definition[key] });
                }
              }
            };
          }();
          !function() {
            __webpack_require__.o = function(obj, prop) {
              return Object.prototype.hasOwnProperty.call(obj, prop);
            };
          }();
          !function() {
            __webpack_require__.r = function(exports2) {
              if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
              }
              Object.defineProperty(exports2, "__esModule", { value: true });
            };
          }();
          var __webpack_exports__ = {};
          __webpack_modules__["./js/helpers.js"](0, __webpack_exports__, __webpack_require__);
          return __webpack_exports__;
        }();
      });
    }
  });

  // ../easy_ui/easy_ui/public/assets/vendor/js/template-customizer.js
  var require_template_customizer = __commonJS({
    "../easy_ui/easy_ui/public/assets/vendor/js/template-customizer.js"(exports, module) {
      (function webpackUniversalModuleDefinition(root, factory) {
        if (typeof exports === "object" && typeof module === "object")
          module.exports = factory();
        else if (typeof define === "function" && define.amd)
          define([], factory);
        else {
          var a = factory();
          for (var i in a)
            (typeof exports === "object" ? exports : root)[i] = a[i];
        }
      })(self, function() {
        return function() {
          "use strict";
          var __webpack_modules__ = {
            "./js/template-customizer.js": function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
              eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TemplateCustomizer: function() { return /* binding */ TemplateCustomizer; }
/* harmony export */ });
/* harmony import */ var _template_customizer_template_customizer_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_template-customizer/_template-customizer.scss */ "./js/_template-customizer/_template-customizer.scss");
/* harmony import */ var _template_customizer_template_customizer_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_template-customizer/_template-customizer.html */ "./js/_template-customizer/_template-customizer.html");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


var CSS_FILENAME_PATTERN = '%name%.css';
var CONTROLS = ['rtl', 'style', 'headerType', 'contentLayout', 'layoutCollapsed', 'showDropdownOnHover', 'layoutNavbarOptions', 'layoutFooterFixed', 'themes'];
var STYLES = ['light', 'dark', 'system'];
var NAVBAR_OPTIONS = ['sticky', 'static', 'hidden'];
var layoutNavbarVar;
var cl = document.documentElement.classList;
if (cl.contains('layout-navbar-fixed')) layoutNavbarVar = 'sticky';else if (cl.contains('layout-navbar-hidden')) layoutNavbarVar = 'hidden';else layoutNavbarVar = 'static';
var DISPLAY_CUSTOMIZER = true;
var DEFAULT_THEME = document.getElementsByTagName('HTML')[0].getAttribute('data-theme') || 0;
var DEFAULT_STYLE = cl.contains('dark-style') ? 'dark' : 'light';
var DEFAULT_TEXT_DIR = document.documentElement.getAttribute('dir') === 'rtl';
var DEFAULT_MENU_COLLAPSED = !!cl.contains('layout-menu-collapsed');
var DEFAULT_SHOW_DROPDOWN_ON_HOVER = true;
var DEFAULT_NAVBAR_FIXED = layoutNavbarVar;
var DEFAULT_CONTENT_LAYOUT = cl.contains('layout-wide') ? 'wide' : 'compact';
var DEFAULT_FOOTER_FIXED = !!cl.contains('layout-footer-fixed');
var headerType;
if (cl.contains('layout-menu-offcanvas')) {
  headerType = 'static-offcanvas';
} else if (cl.contains('layout-menu-fixed')) {
  headerType = 'fixed';
} else if (cl.contains('layout-menu-fixed-offcanvas')) {
  headerType = 'fixed-offcanvas';
} else {
  headerType = 'static';
}
var DEFAULT_LAYOUT_TYPE = headerType;
var TemplateCustomizer = /*#__PURE__*/function () {
  function TemplateCustomizer(_ref) {
    var cssPath = _ref.cssPath,
      themesPath = _ref.themesPath,
      cssFilenamePattern = _ref.cssFilenamePattern,
      displayCustomizer = _ref.displayCustomizer,
      controls = _ref.controls,
      defaultTextDir = _ref.defaultTextDir,
      defaultHeaderType = _ref.defaultHeaderType,
      defaultContentLayout = _ref.defaultContentLayout,
      defaultMenuCollapsed = _ref.defaultMenuCollapsed,
      defaultShowDropdownOnHover = _ref.defaultShowDropdownOnHover,
      defaultNavbarType = _ref.defaultNavbarType,
      defaultFooterFixed = _ref.defaultFooterFixed,
      styles = _ref.styles,
      navbarOptions = _ref.navbarOptions,
      defaultStyle = _ref.defaultStyle,
      availableContentLayouts = _ref.availableContentLayouts,
      availableDirections = _ref.availableDirections,
      availableStyles = _ref.availableStyles,
      availableThemes = _ref.availableThemes,
      availableLayouts = _ref.availableLayouts,
      availableHeaderTypes = _ref.availableHeaderTypes,
      availableNavbarOptions = _ref.availableNavbarOptions,
      defaultTheme = _ref.defaultTheme,
      pathResolver = _ref.pathResolver,
      onSettingsChange = _ref.onSettingsChange,
      lang = _ref.lang;
    _classCallCheck(this, TemplateCustomizer);
    if (this._ssr) return;
    if (!window.Helpers) throw new Error('window.Helpers required.');
    this.settings = {};
    this.settings.cssPath = cssPath;
    this.settings.themesPath = themesPath;
    this.settings.cssFilenamePattern = cssFilenamePattern || CSS_FILENAME_PATTERN;
    this.settings.displayCustomizer = typeof displayCustomizer !== 'undefined' ? displayCustomizer : DISPLAY_CUSTOMIZER;
    this.settings.controls = controls || CONTROLS;
    this.settings.defaultTextDir = defaultTextDir === 'rtl' ? true :  false || DEFAULT_TEXT_DIR;
    this.settings.defaultHeaderType = defaultHeaderType || DEFAULT_LAYOUT_TYPE;
    this.settings.defaultMenuCollapsed = typeof defaultMenuCollapsed !== 'undefined' ? defaultMenuCollapsed : DEFAULT_MENU_COLLAPSED;
    this.settings.defaultContentLayout = typeof defaultContentLayout !== 'undefined' ? defaultContentLayout : DEFAULT_CONTENT_LAYOUT;
    this.settings.defaultShowDropdownOnHover = typeof defaultShowDropdownOnHover !== 'undefined' ? defaultShowDropdownOnHover : DEFAULT_SHOW_DROPDOWN_ON_HOVER;
    this.settings.defaultNavbarType = typeof defaultNavbarType !== 'undefined' ? defaultNavbarType : DEFAULT_NAVBAR_FIXED;
    this.settings.defaultFooterFixed = typeof defaultFooterFixed !== 'undefined' ? defaultFooterFixed : DEFAULT_FOOTER_FIXED;
    this.settings.availableDirections = availableDirections || TemplateCustomizer.DIRECTIONS;
    this.settings.availableStyles = availableStyles || TemplateCustomizer.STYLES;
    this.settings.availableThemes = availableThemes || TemplateCustomizer.THEMES;
    this.settings.availableHeaderTypes = availableHeaderTypes || TemplateCustomizer.HEADER_TYPES;
    this.settings.availableContentLayouts = availableContentLayouts || TemplateCustomizer.CONTENT;
    this.settings.availableLayouts = availableLayouts || TemplateCustomizer.LAYOUTS;
    this.settings.availableNavbarOptions = availableNavbarOptions || TemplateCustomizer.NAVBAR_OPTIONS;
    this.settings.defaultTheme = this._getDefaultTheme(typeof defaultTheme !== 'undefined' ? defaultTheme : DEFAULT_THEME);
    this.settings.styles = styles || STYLES;
    this.settings.navbarOptions = navbarOptions || NAVBAR_OPTIONS;
    this.settings.defaultStyle = defaultStyle || DEFAULT_STYLE;
    this.settings.lang = lang || 'en';
    this.pathResolver = pathResolver || function (p) {
      return p;
    };
    if (this.settings.styles.length < 2) {
      var i = this.settings.controls.indexOf('style');
      if (i !== -1) {
        this.settings.controls = this.settings.controls.slice(0, i).concat(this.settings.controls.slice(i + 1));
      }
    }
    this.settings.onSettingsChange = typeof onSettingsChange === 'function' ? onSettingsChange : function () {};
    this._loadSettings();
    this._listeners = [];
    this._controls = {};
    this._initDirection();
    this._initStyle();
    this._initTheme();
    this.setLayoutType(this.settings.headerType, false);
    this.setContentLayout(this.settings.contentLayout, false);
    this.setDropdownOnHover(this.settings.showDropdownOnHover, false);
    this.setLayoutNavbarOption(this.settings.layoutNavbarOptions, false);
    this.setLayoutFooterFixed(this.settings.layoutFooterFixed, false);
    this._setup();
  }
  _createClass(TemplateCustomizer, [{
    key: "setRtl",
    value: function setRtl(rtl) {
      if (!this._hasControls('rtl')) return;
      this._setSetting('Rtl', String(rtl));
      window.location.reload();
    }
  }, {
    key: "setContentLayout",
    value: function setContentLayout(contentLayout) {
      var updateStorage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (!this._hasControls('contentLayout')) return;
      this.settings.contentLayout = contentLayout;
      if (updateStorage) this._setSetting('contentLayout', contentLayout);
      window.Helpers.setContentLayout(contentLayout);
      if (updateStorage) this.settings.onSettingsChange.call(this, this.settings);
    }
  }, {
    key: "setStyle",
    value: function setStyle(style) {
      this._setSetting('Style', style);
      window.location.reload();
    }
  }, {
    key: "setTheme",
    value: function setTheme(themeName) {
      var updateStorage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (!this._hasControls('themes')) return;
      var theme = this._getThemeByName(themeName);
      if (!theme) return;
      this.settings.theme = theme;
      if (updateStorage) this._setSetting('Theme', themeName);
      var themeUrl = this.pathResolver(this.settings.themesPath + this.settings.cssFilenamePattern.replace('%name%', themeName + (this.settings.style !== 'light' ? "-".concat(this.settings.style) : '')));
      this._loadStylesheets(_defineProperty({}, themeUrl, document.querySelector('.template-customizer-theme-css')), cb || function () {});
      if (updateStorage) this.settings.onSettingsChange.call(this, this.settings);
    }
  }, {
    key: "setLayoutType",
    value: function setLayoutType(pos) {
      var updateStorage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (!this._hasControls('headerType')) return;
      if (pos !== 'static' && pos !== 'static-offcanvas' && pos !== 'fixed' && pos !== 'fixed-offcanvas') return;
      this.settings.headerType = pos;
      if (updateStorage) this._setSetting('LayoutType', pos);
      window.Helpers.setPosition(pos === 'fixed' || pos === 'fixed-offcanvas', pos === 'static-offcanvas' || pos === 'fixed-offcanvas');
      if (updateStorage) this.settings.onSettingsChange.call(this, this.settings);

      // Perfectscrollbar change on Layout change
      var menuScroll = window.Helpers.menuPsScroll;
      var PerfectScrollbarLib = window.PerfectScrollbar;
      if (this.settings.headerType === 'fixed' || this.settings.headerType === 'fixed-offcanvas') {
        // Set perfectscrollbar wheelPropagation false for fixed layout
        if (PerfectScrollbarLib && menuScroll) {
          window.Helpers.menuPsScroll.destroy();
          menuScroll = new PerfectScrollbarLib(document.querySelector('.menu-inner'), {
            suppressScrollX: true,
            wheelPropagation: false
          });
          window.Helpers.menuPsScroll = menuScroll;
        }
      } else if (menuScroll) {
        // Destroy perfectscrollbar for static layout
        window.Helpers.menuPsScroll.destroy();
      }
    }
  }, {
    key: "setDropdownOnHover",
    value: function setDropdownOnHover(open) {
      var updateStorage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (!this._hasControls('showDropdownOnHover')) return;
      this.settings.showDropdownOnHover = open;
      if (updateStorage) this._setSetting('ShowDropdownOnHover', open);
      if (window.Helpers.mainMenu) {
        window.Helpers.mainMenu.destroy();
        config.showDropdownOnHover = open;
        var _window = window,
          Menu = _window.Menu;
        window.Helpers.mainMenu = new Menu(document.getElementById('layout-menu'), {
          orientation: 'horizontal',
          closeChildren: true,
          showDropdownOnHover: config.showDropdownOnHover
        });
      }
      if (updateStorage) this.settings.onSettingsChange.call(this, this.settings);
    }
  }, {
    key: "setLayoutNavbarOption",
    value: function setLayoutNavbarOption(navbarType) {
      var updateStorage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (!this._hasControls('layoutNavbarOptions')) return;
      this.settings.layoutNavbarOptions = navbarType;
      if (updateStorage) this._setSetting('FixedNavbarOption', navbarType);
      window.Helpers.setNavbar(navbarType);
      if (updateStorage) this.settings.onSettingsChange.call(this, this.settings);
    }
  }, {
    key: "setLayoutFooterFixed",
    value: function setLayoutFooterFixed(fixed) {
      var updateStorage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      // if (!this._hasControls('layoutFooterFixed')) return
      this.settings.layoutFooterFixed = fixed;
      if (updateStorage) this._setSetting('FixedFooter', fixed);
      window.Helpers.setFooterFixed(fixed);
      if (updateStorage) this.settings.onSettingsChange.call(this, this.settings);
    }
  }, {
    key: "setLang",
    value: function setLang(lang) {
      var _this = this;
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (lang === this.settings.lang && !force) return;
      if (!TemplateCustomizer.LANGUAGES[lang]) throw new Error("Language \\"".concat(lang, "\\" not found!"));
      var t = TemplateCustomizer.LANGUAGES[lang];
      ['panel_header', 'panel_sub_header', 'theming_header', 'style_label', 'style_switch_light', 'style_switch_dark', 'layout_header', 'layout_label', 'layout_header_label', 'content_label', 'layout_static', 'layout_offcanvas', 'layout_fixed', 'layout_fixed_offcanvas', 'layout_dd_open_label', 'layout_navbar_label', 'layout_footer_label', 'misc_header', 'theme_label', 'direction_label'].forEach(function (key) {
        var el = _this.container.querySelector(".template-customizer-t-".concat(key));
        // eslint-disable-next-line no-unused-expressions
        el && (el.textContent = t[key]);
      });
      var tt = t.themes || {};
      var themes = this.container.querySelectorAll('.template-customizer-theme-item') || [];
      for (var i = 0, l = themes.length; i < l; i++) {
        var themeName = themes[i].querySelector('input[type="radio"]').value;
        themes[i].querySelector('.template-customizer-theme-name').textContent = tt[themeName] || this._getThemeByName(themeName).title;
      }
      this.settings.lang = lang;
    }

    // Update theme settings control
  }, {
    key: "update",
    value: function update() {
      if (this._ssr) return;
      var hasNavbar = !!document.querySelector('.layout-navbar');
      var hasMenu = !!document.querySelector('.layout-menu');
      var hasHorizontalMenu = !!document.querySelector('.layout-menu-horizontal.menu, .layout-menu-horizontal .menu');
      var isLayout1 = !!document.querySelector('.layout-wrapper.layout-navbar-full');
      var hasFooter = !!document.querySelector('.content-footer');
      if (this._controls.showDropdownOnHover) {
        if (hasMenu) {
          this._controls.showDropdownOnHover.setAttribute('disabled', 'disabled');
          this._controls.showDropdownOnHover.classList.add('disabled');
        } else {
          this._controls.showDropdownOnHover.removeAttribute('disabled');
          this._controls.showDropdownOnHover.classList.remove('disabled');
        }
      }
      if (this._controls.layoutNavbarOptions) {
        if (!hasNavbar) {
          this._controls.layoutNavbarOptions.setAttribute('disabled', 'disabled');
          this._controls.layoutNavbarOptionsW.classList.add('disabled');
        } else {
          this._controls.layoutNavbarOptions.removeAttribute('disabled');
          this._controls.layoutNavbarOptionsW.classList.remove('disabled');
        }

        //  Horizontal menu fixed layout - disabled fixed navbar switch
        if (hasHorizontalMenu && hasNavbar && this.settings.headerType === 'fixed') {
          this._controls.layoutNavbarOptions.setAttribute('disabled', 'disabled');
          this._controls.layoutNavbarOptionsW.classList.add('disabled');
        }
      }
      if (this._controls.layoutFooterFixed) {
        if (!hasFooter) {
          this._controls.layoutFooterFixed.setAttribute('disabled', 'disabled');
          this._controls.layoutFooterFixedW.classList.add('disabled');
        } else {
          this._controls.layoutFooterFixed.removeAttribute('disabled');
          this._controls.layoutFooterFixedW.classList.remove('disabled');
        }
      }
      if (this._controls.headerType) {
        // ? Uncomment If using offcanvas layout
        /*
        if (!hasMenu) {
          this._controls.headerType.querySelector('[value="static-offcanvas"]').setAttribute('disabled', 'disabled')
          this._controls.headerType.querySelector('[value="fixed-offcanvas"]').setAttribute('disabled', 'disabled')
        } else {
          this._controls.headerType.querySelector('[value="static-offcanvas"]').removeAttribute('disabled')
          this._controls.headerType.querySelector('[value="fixed-offcanvas"]').removeAttribute('disabled')
        }
        */

        // Disable menu layouts options if menu (vertical or horizontal) is not there
        // if ((!hasNavbar && !hasMenu) || (!hasMenu && !isLayout1)) {
        if (hasMenu || hasHorizontalMenu) {
          // (Updated condition)
          this._controls.headerType.removeAttribute('disabled');
        } else {
          this._controls.headerType.setAttribute('disabled', 'disabled');
        }
      }
    }

    // Clear local storage
  }, {
    key: "clearLocalStorage",
    value: function clearLocalStorage() {
      if (this._ssr) return;
      var layoutName = this._getLayoutName();
      var keysToRemove = ['Theme', 'Style', 'LayoutCollapsed', 'FixedNavbarOption', 'LayoutType', 'contentLayout', 'Rtl'];
      keysToRemove.forEach(function (key) {
        var localStorageKey = "templateCustomizer-".concat(layoutName, "--").concat(key);
        localStorage.removeItem(localStorageKey);
      });
      this._showResetBtnNotification(false);
    }

    // Clear local storage
  }, {
    key: "destroy",
    value: function destroy() {
      if (this._ssr) return;
      this._cleanup();
      this.settings = null;
      this.container.parentNode.removeChild(this.container);
      this.container = null;
    }
  }, {
    key: "_loadSettings",
    value: function _loadSettings() {
      // Get settings

      // const cl = document.documentElement.classList;
      var rtl = this._getSetting('Rtl');
      var style = this._getSetting('Style');
      var theme = this._getSetting('Theme');
      var contentLayout = this._getSetting('contentLayout');
      var collapsedMenu = this._getSetting('LayoutCollapsed'); // Value will be set from main.js
      var dropdownOnHover = this._getSetting('ShowDropdownOnHover'); // Value will be set from main.js
      var navbarOption = this._getSetting('FixedNavbarOption');
      var fixedFooter = this._getSetting('FixedFooter');
      var lType = this._getSetting('LayoutType');
      if (rtl !== '' || style !== '' || theme !== '' || contentLayout !== '' || collapsedMenu !== '' || navbarOption !== '' || lType !== '') {
        this._showResetBtnNotification(true);
      } else {
        this._showResetBtnNotification(false);
      }
      var type;
      if (lType !== '' && ['static', 'static-offcanvas', 'fixed', 'fixed-offcanvas'].indexOf(lType) !== -1) {
        type = lType;
      } else {
        type = this.settings.defaultHeaderType;
      }
      this.settings.headerType = type;

      // ! Set settings by following priority: Local Storage, Theme Config, HTML Classes
      this.settings.rtl = rtl !== '' ? rtl === 'true' : this.settings.defaultTextDir;
      this.settings.stylesOpt = this.settings.styles.indexOf(style) !== -1 ? style : this.settings.defaultStyle;
      if (this.settings.stylesOpt === 'system') {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          this.settings.style = 'dark';
          document.cookie = "style=dark"; // to fix laravel system mode issue
        } else {
          this.settings.style = 'light';
          document.cookie = "style=light"; // to fix laravel system mode issue
        }
      } else {
        document.cookie = "style=; expires=Thu, 01 Jan 2000 00:00:00 UTC; path=/;"; // to fix laravel system mode issue
        this.settings.style = this.settings.styles.indexOf(style) !== -1 ? style : this.settings.defaultStyle;
      }
      if (this.settings.styles.indexOf(this.settings.style) === -1) {
        // eslint-disable-next-line prefer-destructuring
        this.settings.style = this.settings.styles[0];
      }
      this.settings.contentLayout = contentLayout !== '' ? contentLayout : this.settings.defaultContentLayout;
      this.settings.layoutCollapsed = collapsedMenu !== '' ? collapsedMenu === 'true' : this.settings.defaultMenuCollapsed;
      this.settings.showDropdownOnHover = dropdownOnHover !== '' ? dropdownOnHover === 'true' : this.settings.defaultShowDropdownOnHover;
      var navType;
      if (navbarOption !== '' && ['static', 'sticky', 'hidden'].indexOf(navbarOption) !== -1) {
        navType = navbarOption;
      } else {
        navType = this.settings.defaultNavbarType;
      }
      this.settings.layoutNavbarOptions = navType;
      this.settings.layoutFooterFixed = fixedFooter !== '' ? fixedFooter === 'true' : this.settings.defaultFooterFixed;
      this.settings.theme = this._getThemeByName(this._getSetting('Theme'), true);

      // Filter options depending on available controls
      if (!this._hasControls('rtl')) this.settings.rtl = document.documentElement.getAttribute('dir') === 'rtl';
      if (!this._hasControls('style')) this.settings.style = cl.contains('dark-style') ? 'dark' : 'light';
      if (!this._hasControls('contentLayout')) this.settings.contentLayout = null;
      if (!this._hasControls('headerType')) this.settings.headerType = null;
      if (!this._hasControls('layoutCollapsed')) this.settings.layoutCollapsed = null;
      if (!this._hasControls('layoutNavbarOptions')) this.settings.layoutNavbarOptions = null;
      if (!this._hasControls('themes')) this.settings.theme = null;
    }

    // Setup theme settings controls and events
  }, {
    key: "_setup",
    value: function _setup() {
      var _this2 = this;
      var _container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
      // Function to create customizer elements
      var createOptionElement = function createOptionElement(nameVal, title, inputName, isDarkStyle, image) {
        image = image || nameVal;
        return _this2._getElementFromString("<div class=\\"col-4 px-2\\">\\n      <div class=\\"form-check custom-option custom-option-icon mb-0\\">\\n        <label class=\\"form-check-label custom-option-content p-0\\" for=\\"".concat(inputName).concat(nameVal, "\\">\\n          <span class=\\"custom-option-body mb-0\\">\\n            <img src=\\"").concat(assetsPath, "img/customizer/").concat(image).concat(isDarkStyle ? '-dark' : '', ".svg\\" alt=\\"").concat(title, "\\" class=\\"img-fluid scaleX-n1-rtl\\" />\\n          </span>\\n          <input\\n            name=\\"").concat(inputName, "\\"\\n            class=\\"form-check-input d-none\\"\\n            type=\\"radio\\"\\n            value=\\"").concat(nameVal, "\\"\\n            id=\\"").concat(inputName).concat(nameVal, "\\" />\\n        </label>\\n      </div>\\n      <label class=\\"form-check-label small\\" for=\\"").concat(inputName).concat(nameVal, "\\">").concat(title, "</label>\\n    </div>"));
      };
      this._cleanup();
      this.container = this._getElementFromString(_template_customizer_template_customizer_html__WEBPACK_IMPORTED_MODULE_1__["default"]);

      // Customizer visibility condition
      //
      var customizerW = this.container;
      if (this.settings.displayCustomizer) customizerW.setAttribute('style', 'visibility: visible');else customizerW.setAttribute('style', 'visibility: hidden');

      // Open btn
      //
      var openBtn = this.container.querySelector('.template-customizer-open-btn');
      var openBtnCb = function openBtnCb() {
        _this2.container.classList.add('template-customizer-open');
        _this2.update();
        if (_this2._updateInterval) clearInterval(_this2._updateInterval);
        _this2._updateInterval = setInterval(function () {
          _this2.update();
        }, 500);
      };
      openBtn.addEventListener('click', openBtnCb);
      this._listeners.push([openBtn, 'click', openBtnCb]);

      // Reset btn
      //

      var resetBtn = this.container.querySelector('.template-customizer-reset-btn');
      var resetBtnCb = function resetBtnCb() {
        _this2.clearLocalStorage();
        window.location.reload();
      };
      resetBtn.addEventListener('click', resetBtnCb);
      this._listeners.push([resetBtn, 'click', resetBtnCb]);

      // Close btn
      //

      var closeBtn = this.container.querySelector('.template-customizer-close-btn');
      var closeBtnCb = function closeBtnCb() {
        _this2.container.classList.remove('template-customizer-open');
        if (_this2._updateInterval) {
          clearInterval(_this2._updateInterval);
          _this2._updateInterval = null;
        }
      };
      closeBtn.addEventListener('click', closeBtnCb);
      this._listeners.push([closeBtn, 'click', closeBtnCb]);

      // Style
      var styleW = this.container.querySelector('.template-customizer-style');
      var styleOpt = styleW.querySelector('.template-customizer-styles-options');
      if (!this._hasControls('style')) {
        styleW.parentNode.removeChild(styleW);
      } else {
        this.settings.availableStyles.forEach(function (style) {
          var styleEl = createOptionElement(style.name, style.title, 'customRadioIcon', cl.contains('dark-style'));
          styleOpt.appendChild(styleEl);
        });
        styleOpt.querySelector("input[value=\\"".concat(this.settings.stylesOpt, "\\"]")).setAttribute('checked', 'checked');

        // styleCb
        var styleCb = function styleCb(e) {
          _this2._loadingState(true);
          _this2.setStyle(e.target.value, true, function () {
            _this2._loadingState(false);
          });
        };
        styleOpt.addEventListener('change', styleCb);
        this._listeners.push([styleOpt, 'change', styleCb]);
      }

      // Theme
      var themesW = this.container.querySelector('.template-customizer-themes');
      var themesWInner = themesW.querySelector('.template-customizer-themes-options');
      if (!this._hasControls('themes')) {
        themesW.parentNode.removeChild(themesW);
      } else {
        this.settings.availableThemes.forEach(function (theme) {
          var image = '';
          if (theme.name === 'theme-semi-dark') {
            image = "semi-dark";
          } else if (theme.name === 'theme-bordered') {
            image = "border";
          } else {
            image = "default";
          }
          var themeEl = createOptionElement(theme.name, theme.title, 'themeRadios', cl.contains('dark-style'), image);
          themesWInner.appendChild(themeEl);
        });
        themesWInner.querySelector("input[value=\\"".concat(this.settings.theme.name, "\\"]")).setAttribute('checked', 'checked');
        var themeCb = function themeCb(e) {
          _this2._loading = true;
          _this2._loadingState(true, true);
          _this2.setTheme(e.target.value, true, function () {
            _this2._loading = false;
            _this2._loadingState(false, true);
          });
        };
        themesWInner.addEventListener('change', themeCb);
        this._listeners.push([themesWInner, 'change', themeCb]);
      }
      var themingW = this.container.querySelector('.template-customizer-theming');
      if (!this._hasControls('style') && !this._hasControls('themes')) {
        themingW.parentNode.removeChild(themingW);
      }

      // Layout wrapper
      var layoutW = this.container.querySelector('.template-customizer-layout');
      if (!this._hasControls('rtl headerType contentLayout layoutCollapsed layoutNavbarOptions', true)) {
        layoutW.parentNode.removeChild(layoutW);
      } else {
        // RTL
        //

        var directionW = this.container.querySelector('.template-customizer-directions');
        // ? Hide RTL control in following 2 case
        if (!this._hasControls('rtl') || !rtlSupport) {
          directionW.parentNode.removeChild(directionW);
        } else {
          var directionOpt = directionW.querySelector('.template-customizer-directions-options');
          this.settings.availableDirections.forEach(function (dir) {
            var dirEl = createOptionElement(dir.name, dir.title, 'directionRadioIcon', cl.contains('dark-style'));
            directionOpt.appendChild(dirEl);
          });
          directionOpt.querySelector("input[value=\\"".concat(this.settings.rtl ? 'rtl' : 'ltr', "\\"]")).setAttribute('checked', 'checked');
          var rtlCb = function rtlCb(e) {
            _this2._loadingState(true);
            _this2.setRtl(e.target.value === 'rtl', true, function () {
              _this2._loadingState(false);
            });
          };
          directionOpt.addEventListener('change', rtlCb);
          this._listeners.push([directionOpt, 'change', rtlCb]);
        }

        // Header Layout Type
        var headerTypeW = this.container.querySelector('.template-customizer-headerOptions');
        var templateName = document.documentElement.getAttribute('data-template').split('-');
        if (!this._hasControls('headerType')) {
          headerTypeW.parentNode.removeChild(headerTypeW);
        } else {
          var headerOpt = headerTypeW.querySelector('.template-customizer-header-options');
          setTimeout(function () {
            if (templateName.includes('vertical')) {
              headerTypeW.parentNode.removeChild(headerTypeW);
            }
          }, 100);
          this.settings.availableHeaderTypes.forEach(function (header) {
            var headerEl = createOptionElement(header.name, header.title, 'headerRadioIcon', cl.contains('dark-style'), "horizontal-".concat(header.name));
            headerOpt.appendChild(headerEl);
          });
          headerOpt.querySelector("input[value=\\"".concat(this.settings.headerType, "\\"]")).setAttribute('checked', 'checked');
          var headerTypeCb = function headerTypeCb(e) {
            _this2.setLayoutType(e.target.value);
          };
          headerOpt.addEventListener('change', headerTypeCb);
          this._listeners.push([headerOpt, 'change', headerTypeCb]);
        }

        // CONTENT
        //

        var contentWrapper = this.container.querySelector('.template-customizer-content');
        // ? Hide RTL control in following 2 case
        if (!this._hasControls('contentLayout')) {
          contentWrapper.parentNode.removeChild(contentWrapper);
        } else {
          var contentOpt = contentWrapper.querySelector('.template-customizer-content-options');
          this.settings.availableContentLayouts.forEach(function (content) {
            var contentEl = createOptionElement(content.name, content.title, 'contentRadioIcon', cl.contains('dark-style'));
            contentOpt.appendChild(contentEl);
          });
          contentOpt.querySelector("input[value=\\"".concat(this.settings.contentLayout, "\\"]")).setAttribute('checked', 'checked');
          var contentCb = function contentCb(e) {
            _this2._loading = true;
            _this2._loadingState(true, true);
            _this2.setContentLayout(e.target.value, true, function () {
              _this2._loading = false;
              _this2._loadingState(false, true);
            });
          };
          contentOpt.addEventListener('change', contentCb);
          this._listeners.push([contentOpt, 'change', contentCb]);
        }

        // Layouts Collapsed: Expanded, Collapsed
        var layoutCollapsedW = this.container.querySelector('.template-customizer-layouts');
        if (!this._hasControls('layoutCollapsed')) {
          layoutCollapsedW.parentNode.removeChild(layoutCollapsedW);
        } else {
          setTimeout(function () {
            if (document.querySelector('.layout-menu-horizontal')) {
              layoutCollapsedW.parentNode.removeChild(layoutCollapsedW);
            }
          }, 100);
          var layoutCollapsedOpt = layoutCollapsedW.querySelector('.template-customizer-layouts-options');
          this.settings.availableLayouts.forEach(function (layoutOpt) {
            var layoutsEl = createOptionElement(layoutOpt.name, layoutOpt.title, 'layoutsRadios', cl.contains('dark-style'));
            layoutCollapsedOpt.appendChild(layoutsEl);
          });
          layoutCollapsedOpt.querySelector("input[value=\\"".concat(this.settings.layoutCollapsed ? 'collapsed' : 'expanded', "\\"]")).setAttribute('checked', 'checked');
          var layoutCb = function layoutCb(e) {
            window.Helpers.setCollapsed(e.target.value === 'collapsed', true);
            _this2._setSetting('LayoutCollapsed', e.target.value === 'collapsed');
          };
          layoutCollapsedOpt.addEventListener('change', layoutCb);
          this._listeners.push([layoutCollapsedOpt, 'change', layoutCb]);
        }

        // Layout Navbar Options
        var navbarOption = this.container.querySelector('.template-customizer-layoutNavbarOptions');
        if (!this._hasControls('layoutNavbarOptions')) {
          navbarOption.parentNode.removeChild(navbarOption);
        } else {
          setTimeout(function () {
            if (templateName.includes('horizontal')) {
              navbarOption.parentNode.removeChild(navbarOption);
            }
          }, 100);
          var navbarTypeOpt = navbarOption.querySelector('.template-customizer-navbar-options');
          this.settings.availableNavbarOptions.forEach(function (navbarOpt) {
            var navbarEl = createOptionElement(navbarOpt.name, navbarOpt.title, 'navbarOptionRadios', cl.contains('dark-style'));
            navbarTypeOpt.appendChild(navbarEl);
          });
          // check navbar option from settings
          navbarTypeOpt.querySelector("input[value=\\"".concat(this.settings.layoutNavbarOptions, "\\"]")).setAttribute('checked', 'checked');
          var navbarCb = function navbarCb(e) {
            _this2._loading = true;
            _this2._loadingState(true, true);
            _this2.setLayoutNavbarOption(e.target.value, true, function () {
              _this2._loading = false;
              _this2._loadingState(false, true);
            });
          };
          navbarTypeOpt.addEventListener('change', navbarCb);
          this._listeners.push([navbarTypeOpt, 'change', navbarCb]);
        }
      }
      setTimeout(function () {
        var layoutCustom = _this2.container.querySelector('.template-customizer-layout');
        if (document.querySelector('.menu-vertical')) {
          if (!_this2._hasControls('rtl contentLayout layoutCollapsed layoutNavbarOptions', true)) {
            if (layoutCustom) {
              layoutCustom.parentNode.removeChild(layoutCustom);
            }
          }
        } else if (document.querySelector('.menu-horizontal')) {
          if (!_this2._hasControls('rtl contentLayout headerType', true)) {
            if (layoutCustom) {
              layoutCustom.parentNode.removeChild(layoutCustom);
            }
          }
        }
      }, 100);

      // Set language
      this.setLang(this.settings.lang, true);

      // Append container
      if (_container === document) {
        if (_container.body) {
          _container.body.appendChild(this.container);
        } else {
          window.addEventListener('DOMContentLoaded', function () {
            return _container.body.appendChild(_this2.container);
          });
        }
      } else {
        _container.appendChild(this.container);
      }
    }
  }, {
    key: "_initDirection",
    value: function _initDirection() {
      if (this._hasControls('rtl')) document.documentElement.setAttribute('dir', this.settings.rtl ? 'rtl' : 'ltr');
    }

    // Init template styles
  }, {
    key: "_initStyle",
    value: function _initStyle() {
      if (!this._hasControls('style')) return;
      var style = this.settings.style;
      this._insertStylesheet('template-customizer-core-css', this.pathResolver(this.settings.cssPath + this.settings.cssFilenamePattern.replace('%name%', "core".concat(style !== 'light' ? "-".concat(style) : ''))));
      // ? Uncomment if needed
      /*
      this._insertStylesheet(
        'template-customizer-bootstrap-css',
        this.pathResolver(
          this.settings.cssPath +
            this.settings.cssFilenamePattern.replace('%name%', \`bootstrap\${style !== 'light' ? \`-\${style}\` : ''}\`)
        )
      )
      this._insertStylesheet(
        'template-customizer-bsextended-css',
        this.pathResolver(
          this.settings.cssPath +
            this.settings.cssFilenamePattern.replace(
              '%name%',
              \`bootstrap-extended\${style !== 'light' ? \`-\${style}\` : ''}\`
            )
        )
      )
      this._insertStylesheet(
        'template-customizer-components-css',
        this.pathResolver(
          this.settings.cssPath +
            this.settings.cssFilenamePattern.replace('%name%', \`components\${style !== 'light' ? \`-\${style}\` : ''}\`)
        )
      )
      this._insertStylesheet(
        'template-customizer-colors-css',
        this.pathResolver(
          this.settings.cssPath +
            this.settings.cssFilenamePattern.replace('%name%', \`colors\${style !== 'light' ? \`-\${style}\` : ''}\`)
        )
      )
      */

      var classesToRemove = style === 'light' ? ['dark-style'] : ['light-style'];
      classesToRemove.forEach(function (cls) {
        document.documentElement.classList.remove(cls);
      });
      document.documentElement.classList.add("".concat(style, "-style"));
    }

    // Init theme style
  }, {
    key: "_initTheme",
    value: function _initTheme() {
      if (this._hasControls('themes')) {
        this._insertStylesheet('template-customizer-theme-css', this.pathResolver(this.settings.themesPath + this.settings.cssFilenamePattern.replace('%name%', this.settings.theme.name + (this.settings.style !== 'light' ? "-".concat(this.settings.style) : ''))));
      } else {
        // If theme control is not enabled, get the current theme from localstorage else display default theme
        var theme = this._getSetting('Theme');
        this._insertStylesheet('template-customizer-theme-css', this.pathResolver(this.settings.themesPath + this.settings.cssFilenamePattern.replace('%name%', theme ? theme : 'easytouch' + (this.settings.style !== 'light' ? "-".concat(this.settings.style) : ''))));
      }
    }
  }, {
    key: "_insertStylesheet",
    value: function _insertStylesheet(className, href) {
      var curLink = document.querySelector(".".concat(className));
      if (typeof document.documentMode === 'number' && document.documentMode < 11) {
        if (!curLink) return;
        if (href === curLink.getAttribute('href')) return;
        var link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.className = className;
        link.setAttribute('href', href);
        curLink.parentNode.insertBefore(link, curLink.nextSibling);
      } else {
        document.write("<link rel=\\"stylesheet\\" type=\\"text/css\\" href=\\"".concat(href, "\\" class=\\"").concat(className, "\\">"));
      }
      curLink.parentNode.removeChild(curLink);
    }
  }, {
    key: "_loadStylesheets",
    value: function _loadStylesheets(stylesheets, cb) {
      var paths = Object.keys(stylesheets);
      var count = paths.length;
      var loaded = 0;
      function loadStylesheet(path, curLink, _cb) {
        var link = document.createElement('link');
        link.setAttribute('href', path);
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.className = curLink.className;
        var sheet = 'sheet' in link ? 'sheet' : 'styleSheet';
        var cssRules = 'sheet' in link ? 'cssRules' : 'rules';
        var intervalId;
        var timeoutId = setTimeout(function () {
          clearInterval(intervalId);
          clearTimeout(timeoutId);
          curLink.parentNode.removeChild(link);
          _cb(false, path);
        }, 15000);
        intervalId = setInterval(function () {
          try {
            if (link[sheet] && link[sheet][cssRules].length) {
              clearInterval(intervalId);
              clearTimeout(timeoutId);
              curLink.parentNode.removeChild(curLink);
              _cb(true);
            }
          } catch (e) {
            // Catch error
          }
        }, 10);
        curLink.parentNode.insertBefore(link, curLink.nextSibling);
      }
      function stylesheetCallBack() {
        if ((loaded += 1) >= count) {
          cb();
        }
      }
      for (var i = 0; i < paths.length; i++) {
        loadStylesheet(paths[i], stylesheets[paths[i]], stylesheetCallBack());
      }
    }
  }, {
    key: "_loadingState",
    value: function _loadingState(enable, themes) {
      this.container.classList[enable ? 'add' : 'remove']("template-customizer-loading".concat(themes ? '-theme' : ''));
    }
  }, {
    key: "_getElementFromString",
    value: function _getElementFromString(str) {
      var wrapper = document.createElement('div');
      wrapper.innerHTML = str;
      return wrapper.firstChild;
    }

    // Set settings in LocalStorage with layout & key
  }, {
    key: "_getSetting",
    value: function _getSetting(key) {
      var result = null;
      var layoutName = this._getLayoutName();
      try {
        result = localStorage.getItem("templateCustomizer-".concat(layoutName, "--").concat(key));
      } catch (e) {
        // Catch error
      }
      return String(result || '');
    }
  }, {
    key: "_showResetBtnNotification",
    value: function _showResetBtnNotification() {
      var _this3 = this;
      var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      setTimeout(function () {
        var resetBtnAttr = _this3.container.querySelector('.template-customizer-reset-btn .badge');
        if (show) {
          resetBtnAttr.classList.remove('d-none');
        } else {
          resetBtnAttr.classList.add('d-none');
        }
      }, 200);
    }

    // Set settings in LocalStorage with layout & key
  }, {
    key: "_setSetting",
    value: function _setSetting(key, val) {
      var layoutName = this._getLayoutName();
      try {
        localStorage.setItem("templateCustomizer-".concat(layoutName, "--").concat(key), String(val));
        this._showResetBtnNotification();
      } catch (e) {
        // Catch Error
      }
    }

    // Get layout name to set unique
  }, {
    key: "_getLayoutName",
    value: function _getLayoutName() {
      return document.getElementsByTagName('HTML')[0].getAttribute('data-template');
    }
  }, {
    key: "_removeListeners",
    value: function _removeListeners() {
      for (var i = 0, l = this._listeners.length; i < l; i++) {
        this._listeners[i][0].removeEventListener(this._listeners[i][1], this._listeners[i][2]);
      }
    }
  }, {
    key: "_cleanup",
    value: function _cleanup() {
      this._removeListeners();
      this._listeners = [];
      this._controls = {};
      if (this._updateInterval) {
        clearInterval(this._updateInterval);
        this._updateInterval = null;
      }
    }
  }, {
    key: "_ssr",
    get: function get() {
      return typeof window === 'undefined';
    }

    // Check controls availability
  }, {
    key: "_hasControls",
    value: function _hasControls(controls) {
      var _this4 = this;
      var oneOf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return controls.split(' ').reduce(function (result, control) {
        if (_this4.settings.controls.indexOf(control) !== -1) {
          if (oneOf || result !== false) result = true;
        } else if (!oneOf || result !== true) result = false;
        return result;
      }, null);
    }

    // Get the default theme
  }, {
    key: "_getDefaultTheme",
    value: function _getDefaultTheme(themeId) {
      var theme;
      if (typeof themeId === 'string') {
        theme = this._getThemeByName(themeId, false);
      } else {
        theme = this.settings.availableThemes[themeId];
      }
      if (!theme) {
        throw new Error("Theme ID \\"".concat(themeId, "\\" not found!"));
      }
      return theme;
    }

    // Get theme by themeId/themeName
  }, {
    key: "_getThemeByName",
    value: function _getThemeByName(themeName) {
      var returnDefault = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var themes = this.settings.availableThemes;
      for (var i = 0, l = themes.length; i < l; i++) {
        if (themes[i].name === themeName) return themes[i];
      }
      return returnDefault ? this.settings.defaultTheme : null;
    }
  }]);
  return TemplateCustomizer;
}(); // Styles
TemplateCustomizer.STYLES = [{
  name: 'light',
  title: 'Light'
}, {
  name: 'dark',
  title: 'Dark'
}, {
  name: 'system',
  title: 'System'
}];

// Themes
TemplateCustomizer.THEMES = [{
  name: 'easytouch',
  title: 'Default'
}, {
  name: 'theme-bordered',
  title: 'Bordered'
}, {
  name: 'theme-semi-dark',
  title: 'Semi Dark'
}];

// Layouts
TemplateCustomizer.LAYOUTS = [{
  name: 'expanded',
  title: 'Expanded'
}, {
  name: 'collapsed',
  title: 'Collapsed'
}];

// Navbar Options
TemplateCustomizer.NAVBAR_OPTIONS = [{
  name: 'sticky',
  title: 'Sticky'
}, {
  name: 'static',
  title: 'Static'
}, {
  name: 'hidden',
  title: 'Hidden'
}];

// Header Types
TemplateCustomizer.HEADER_TYPES = [{
  name: 'fixed',
  title: 'Fixed'
}, {
  name: 'static',
  title: 'Static'
}];

// Content Types
TemplateCustomizer.CONTENT = [{
  name: 'compact',
  title: 'Compact'
}, {
  name: 'wide',
  title: 'Wide'
}];

// Directions
TemplateCustomizer.DIRECTIONS = [{
  name: 'ltr',
  title: 'Left to Right'
}, {
  name: 'rtl',
  title: 'Right to Left'
}];

// Theme setting language
TemplateCustomizer.LANGUAGES = {
  en: {
    panel_header: 'Template Customizer',
    panel_sub_header: 'Customize and preview in real time',
    theming_header: 'Theming',
    style_label: 'Style (Mode)',
    theme_label: 'Themes',
    layout_header: 'Layout',
    layout_label: 'Menu (Navigation)',
    layout_header_label: 'Header Types',
    content_label: 'Content',
    layout_navbar_label: 'Navbar Type',
    direction_label: 'Direction'
  },
  fr: {
    panel_header: 'Mod\xE8le De Personnalisation',
    panel_sub_header: 'Personnalisez et pr\xE9visualisez en temps r\xE9el',
    theming_header: 'Th\xE9matisation',
    style_label: 'Style (Mode)',
    theme_label: 'Th\xE8mes',
    layout_header: 'Disposition',
    layout_label: 'Menu (Navigation)',
    layout_header_label: "Types d'en-t\xEAte",
    content_label: 'Contenu',
    layout_navbar_label: 'Type de barre de navigation',
    direction_label: 'Direction'
  },
  ar: {
    panel_header: '\u0623\u062F\u0627\u0629 \u062A\u062E\u0635\u064A\u0635 \u0627\u0644\u0642\u0627\u0644\u0628',
    panel_sub_header: '\u062A\u062E\u0635\u064A\u0635 \u0648\u0645\u0639\u0627\u064A\u0646\u0629 \u0641\u064A \u0627\u0644\u0648\u0642\u062A \u0627\u0644\u062D\u0642\u064A\u0642\u064A',
    theming_header: '\u0627\u0644\u0633\u0645\u0627\u062A',
    style_label: '\u0627\u0644\u0646\u0645\u0637 (\u0627\u0644\u0648\u0636\u0639)',
    theme_label: '\u0627\u0644\u0645\u0648\u0627\u0636\u064A\u0639',
    layout_header: '\u062A\u064E\u062E\u0637\u0650\u064A\u0637',
    layout_label: '\u0627\u0644\u0642\u0627\u0626\u0645\u0629 (\u0627\u0644\u0645\u0644\u0627\u062D\u0629)',
    layout_header_label: '\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0631\u0623\u0633',
    content_label: '\u0645\u062D\u062A\u0648\u0649',
    layout_navbar_label: '\u0646\u0648\u0639 \u0634\u0631\u064A\u0637 \u0627\u0644\u062A\u0646\u0642\u0644',
    direction_label: '\u0627\u062A\u062C\u0627\u0647'
  },
  de: {
    panel_header: 'Vorlagen-Anpasser',
    panel_sub_header: 'Anpassen und Vorschau in Echtzeit',
    theming_header: 'Themen',
    style_label: 'Stil (Modus)',
    theme_label: 'Themen',
    layout_header: 'Layout',
    layout_label: 'Men\xFC (Navigation)',
    layout_header_label: 'Header-Typen',
    content_label: 'Inhalt',
    layout_navbar_label: 'Art der Navigationsleiste',
    direction_label: 'Richtung'
  },
  pt: {
    panel_header: 'Personalizador De Modelo',
    panel_sub_header: 'Personalize e visualize em tempo real',
    theming_header: 'Temas',
    style_label: 'Estilo (Modo)',
    theme_label: 'Temas',
    layout_header: 'Esquema',
    layout_label: 'Menu (Navega\xE7\xE3o)',
    layout_header_label: 'Tipos de cabe\xE7alho',
    content_label: 'Contente',
    layout_navbar_label: 'Tipo de barra de navega\xE7\xE3o',
    direction_label: 'Dire\xE7\xE3o'
  }
};


//# sourceURL=webpack://Vuexy/./js/template-customizer.js?`);
            },
            "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./js/_template-customizer/_template-customizer.scss": function(module, __webpack_exports__, __webpack_require__) {
              eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);\n// Imports\n\n\n\nvar ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABClJREFUaEPtmY1RFEEQhbsjUCIQIhAiUCNQIxAiECIQIxAiECIAIpAMhAiECIQI2vquZqnZvp6fhb3SK5mqq6Ju92b69bzXf6is+dI1t1+eAfztG5z1BsxsU0S+ici2iPB3vm5E5EpEDlSVv2dZswFIxv8UkZcNy+5EZGcuEHMCOBeR951uvVDVD53vVl+bE8DvDu8Pxtyo6ta/BsByg1R15Bwzqz5/LJgn34CZwfnPInI4BUB6/1hV0cSjVxcAM4PbcBZjL0XklIPN7Is3fLCkdQPpPYw/VNXj5IhPIvJWRIhSl6p60ULWBGBm30Vk123EwRxCuIzWkkjNrCZywith10ewE1Xdq4GoAjCz/RTXW44Ynt+LyBEfT43kYfbj86J3w5Q32DNcRQDpwF+dkQXDMey8xem0L3TEqB4g3PZWad8agBMRgZPeu96D1/C2Zbh3X0p80Op1xxloztN48bMQQNoc7+eLEuAoPSPiIDY4Ooo+E6ixeNXM+D3GERz2U3CIqMstLJUgJQDe+7eq6mub0NYEkLAKwEHkiBQDCZtddZCZ8d6r7JDwFkoARklHRPZUFVDVZWbwGuNrC4EfdOzFrRABh3Wnqhv+d70AEBLGFROPmeHlnM81G69UdSd6IUuM0GgUVn1uqWmg5EmMfBeEyB7Pe3txBkY+rGT8j0J+WXq/BgDkUCaqLgEAnwcRog0veMIqFAAwCy2wnw+bI2GaGboBgF9k5N0o0rUSGUb4eO0BeO9j/GYhkSHMHMTIqwGARX6p6a+nlPBl8kZuXMD9j6pKfF9aZuaFOdJCEL5D4eYb9wCYVCanrBmGyii/tIq+SLj/HQBCaM5bLzwfPqdQ6FpVHyra4IbuVbXaY7dETC2ESPNNWiIOi69CcdgSMXsh4tNSUiklMgwmC0aNd08Y5WAES6HHehM4gu97wyhBgWpgqXsrASglprDy7CwhehMZOSbK6JMSma+Fio1KltCmlBIj7gfZOGx8ppQSXrhzFnOhJ/31BDkjFHRvOd09x0mRBA9SFgxUgHpQg0q0t5ymPMlL+EnldFTfDA0NAmf+OTQ0X0sRouf7NNkYGhrOYNrxtIaGg83MNzVDSe3LXLhP7O/yrCsCz1zlWTpjWkuZAOBpX3yVnLqI1yLCOKU6qMrmP7SSrUEw54XF4WBIK5FxCMOr3lVsfGqNSmPzBXUnJTIX1jyVBq9wO6UObOpgC5GjO98vFKnTdQMZXxEsWZlDiCZMIxAbNxQOqlpVZtobejBaZNoBnRDzMFpkxvTQOD36BlrcySZuI6p1ACB6LU3wWuf5581+oHfD1vi89bz3nFUC8Nm7ZlP3nKkFbM4bWPt/MSFwklprYItwt6cmvpWJ2IVcQBCz6bLysSCv3SaANCiTsnaNRrNRqMXVVT1/BrAqz/buu/Y38Ad3KC5PARej0QAAAABJRU5ErkJggg== */ "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABClJREFUaEPtmY1RFEEQhbsjUCIQIhAiUCNQIxAiECIQIxAiECIAIpAMhAiECIQI2vquZqnZvp6fhb3SK5mqq6Ju92b69bzXf6is+dI1t1+eAfztG5z1BsxsU0S+ici2iPB3vm5E5EpEDlSVv2dZswFIxv8UkZcNy+5EZGcuEHMCOBeR951uvVDVD53vVl+bE8DvDu8Pxtyo6ta/BsByg1R15Bwzqz5/LJgn34CZwfnPInI4BUB6/1hV0cSjVxcAM4PbcBZjL0XklIPN7Is3fLCkdQPpPYw/VNXj5IhPIvJWRIhSl6p60ULWBGBm30Vk123EwRxCuIzWkkjNrCZywith10ewE1Xdq4GoAjCz/RTXW44Ynt+LyBEfT43kYfbj86J3w5Q32DNcRQDpwF+dkQXDMey8xem0L3TEqB4g3PZWad8agBMRgZPeu96D1/C2Zbh3X0p80Op1xxloztN48bMQQNoc7+eLEuAoPSPiIDY4Ooo+E6ixeNXM+D3GERz2U3CIqMstLJUgJQDe+7eq6mub0NYEkLAKwEHkiBQDCZtddZCZ8d6r7JDwFkoARklHRPZUFVDVZWbwGuNrC4EfdOzFrRABh3Wnqhv+d70AEBLGFROPmeHlnM81G69UdSd6IUuM0GgUVn1uqWmg5EmMfBeEyB7Pe3txBkY+rGT8j0J+WXq/BgDkUCaqLgEAnwcRog0veMIqFAAwCy2wnw+bI2GaGboBgF9k5N0o0rUSGUb4eO0BeO9j/GYhkSHMHMTIqwGARX6p6a+nlPBl8kZuXMD9j6pKfF9aZuaFOdJCEL5D4eYb9wCYVCanrBmGyii/tIq+SLj/HQBCaM5bLzwfPqdQ6FpVHyra4IbuVbXaY7dETC2ESPNNWiIOi69CcdgSMXsh4tNSUiklMgwmC0aNd08Y5WAES6HHehM4gu97wyhBgWpgqXsrASglprDy7CwhehMZOSbK6JMSma+Fio1KltCmlBIj7gfZOGx8ppQSXrhzFnOhJ/31BDkjFHRvOd09x0mRBA9SFgxUgHpQg0q0t5ymPMlL+EnldFTfDA0NAmf+OTQ0X0sRouf7NNkYGhrOYNrxtIaGg83MNzVDSe3LXLhP7O/yrCsCz1zlWTpjWkuZAOBpX3yVnLqI1yLCOKU6qMrmP7SSrUEw54XF4WBIK5FxCMOr3lVsfGqNSmPzBXUnJTIX1jyVBq9wO6UObOpgC5GjO98vFKnTdQMZXxEsWZlDiCZMIxAbNxQOqlpVZtobejBaZNoBnRDzMFpkxvTQOD36BlrcySZuI6p1ACB6LU3wWuf5581+oHfD1vi89bz3nFUC8Nm7ZlP3nKkFbM4bWPt/MSFwklprYItwt6cmvpWJ2IVcQBCz6bLysSCv3SaANCiTsnaNRrNRqMXVVT1/BrAqz/buu/Y38Ad3KC5PARej0QAAAABJRU5ErkJggg=="), __webpack_require__.b);\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, "/*\\n* Template Customizer Style\\n**/\\n#template-customizer {\\n  font-family: \\"Public Sans\\", BlinkMacSystemFont, \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\" !important;\\n  font-size: inherit !important;\\n  position: fixed;\\n  top: 0;\\n  right: 0;\\n  height: 100%;\\n  z-index: 99999999;\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  -webkit-box-orient: vertical;\\n  -webkit-box-direction: normal;\\n  -ms-flex-direction: column;\\n  flex-direction: column;\\n  width: 400px;\\n  background: #fff;\\n  -webkit-box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);\\n  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);\\n  -webkit-transition: all 0.2s ease-in;\\n  -o-transition: all 0.2s ease-in;\\n  transition: all 0.2s ease-in;\\n  -webkit-transform: translateX(420px);\\n  -ms-transform: translateX(420px);\\n  transform: translateX(420px);\\n}\\n#template-customizer h5 {\\n  position: relative;\\n  font-size: 11px;\\n}\\n#template-customizer > h5 {\\n  flex: 0 0 auto;\\n}\\n#template-customizer .disabled {\\n  color: #d1d2d3 !important;\\n}\\n#template-customizer .form-label {\\n  font-size: 0.9375rem;\\n}\\n#template-customizer .form-check-label {\\n  font-size: 0.8125rem;\\n}\\n#template-customizer .template-customizer-t-panel_header {\\n  font-size: 1.125rem;\\n}\\n#template-customizer.template-customizer-open {\\n  -webkit-transition-delay: 0.1s;\\n  -o-transition-delay: 0.1s;\\n  transition-delay: 0.1s;\\n  -webkit-transform: none !important;\\n  -ms-transform: none !important;\\n  transform: none !important;\\n}\\n#template-customizer.template-customizer-open .custom-option.checked {\\n  color: var(--bs-primary);\\n  border-width: 2px;\\n}\\n#template-customizer.template-customizer-open .custom-option.checked .custom-option-content {\\n  border: none;\\n}\\n#template-customizer.template-customizer-open .custom-option .custom-option-content {\\n  border: 1px solid transparent;\\n}\\n#template-customizer .template-customizer-header a:hover {\\n  color: inherit !important;\\n}\\n#template-customizer .template-customizer-open-btn {\\n  position: absolute;\\n  top: 180px;\\n  left: 0;\\n  z-index: -1;\\n  display: block;\\n  width: 42px;\\n  height: 42px;\\n  border-top-left-radius: 15%;\\n  border-bottom-left-radius: 15%;\\n  background: var(--bs-primary);\\n  color: #fff !important;\\n  text-align: center;\\n  font-size: 18px !important;\\n  line-height: 42px;\\n  opacity: 1;\\n  -webkit-transition: all 0.1s linear 0.2s;\\n  -o-transition: all 0.1s linear 0.2s;\\n  transition: all 0.1s linear 0.2s;\\n  -webkit-transform: translateX(-62px);\\n  -ms-transform: translateX(-62px);\\n  transform: translateX(-62px);\\n}\\n@media (max-width: 991.98px) {\\n  #template-customizer .template-customizer-open-btn {\\n    top: 145px;\\n  }\\n}\\n.dark-style #template-customizer .template-customizer-open-btn {\\n  background: var(--bs-primary);\\n}\\n#template-customizer .template-customizer-open-btn::before {\\n  content: \\"\\";\\n  width: 22px;\\n  height: 22px;\\n  display: block;\\n  background-size: 100% 100%;\\n  position: absolute;\\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\\n  margin: 10px;\\n}\\n.customizer-hide #template-customizer .template-customizer-open-btn {\\n  display: none;\\n}\\n[dir=rtl] #template-customizer .template-customizer-open-btn {\\n  border-radius: 0;\\n  border-top-right-radius: 15%;\\n  border-bottom-right-radius: 15%;\\n}\\n[dir=rtl] #template-customizer .template-customizer-open-btn::before {\\n  margin-left: -2px;\\n}\\n#template-customizer.template-customizer-open .template-customizer-open-btn {\\n  opacity: 0;\\n  -webkit-transition-delay: 0s;\\n  -o-transition-delay: 0s;\\n  transition-delay: 0s;\\n  -webkit-transform: none !important;\\n  -ms-transform: none !important;\\n  transform: none !important;\\n}\\n#template-customizer .template-customizer-inner {\\n  position: relative;\\n  overflow: auto;\\n  -webkit-box-flex: 0;\\n  -ms-flex: 0 1 auto;\\n  flex: 0 1 auto;\\n  opacity: 1;\\n  -webkit-transition: opacity 0.2s;\\n  -o-transition: opacity 0.2s;\\n  transition: opacity 0.2s;\\n}\\n#template-customizer .template-customizer-inner > div:first-child > hr:first-of-type {\\n  display: none !important;\\n}\\n#template-customizer .template-customizer-inner > div:first-child > h5:first-of-type {\\n  padding-top: 0 !important;\\n}\\n#template-customizer .template-customizer-themes-inner {\\n  position: relative;\\n  opacity: 1;\\n  -webkit-transition: opacity 0.2s;\\n  -o-transition: opacity 0.2s;\\n  transition: opacity 0.2s;\\n}\\n#template-customizer .template-customizer-theme-item {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  -webkit-box-align: center;\\n  align-items: center;\\n  -ms-flex-align: center;\\n  -webkit-box-flex: 1;\\n  -ms-flex: 1 1 100%;\\n  flex: 1 1 100%;\\n  -webkit-box-pack: justify;\\n  -ms-flex-pack: justify;\\n  justify-content: space-between;\\n  margin-bottom: 10px;\\n  padding: 0 24px;\\n  width: 100%;\\n  cursor: pointer;\\n}\\n#template-customizer .template-customizer-theme-item input {\\n  position: absolute;\\n  z-index: -1;\\n  opacity: 0;\\n}\\n#template-customizer .template-customizer-theme-item input ~ span {\\n  opacity: 0.25;\\n  -webkit-transition: all 0.2s;\\n  -o-transition: all 0.2s;\\n  transition: all 0.2s;\\n}\\n#template-customizer .template-customizer-theme-item .template-customizer-theme-checkmark {\\n  display: inline-block;\\n  width: 6px;\\n  height: 12px;\\n  border-right: 1px solid;\\n  border-bottom: 1px solid;\\n  opacity: 0;\\n  -webkit-transition: all 0.2s;\\n  -o-transition: all 0.2s;\\n  transition: all 0.2s;\\n  -webkit-transform: rotate(45deg);\\n  -ms-transform: rotate(45deg);\\n  transform: rotate(45deg);\\n}\\n[dir=rtl] #template-customizer .template-customizer-theme-item .template-customizer-theme-checkmark {\\n  border-right: none;\\n  border-left: 1px solid;\\n  -webkit-transform: rotate(-45deg);\\n  -ms-transform: rotate(-45deg);\\n  transform: rotate(-45deg);\\n}\\n#template-customizer .template-customizer-theme-item input:checked:not([disabled]) ~ span, #template-customizer .template-customizer-theme-item:hover input:not([disabled]) ~ span {\\n  opacity: 1;\\n}\\n#template-customizer .template-customizer-theme-item input:checked:not([disabled]) ~ span .template-customizer-theme-checkmark {\\n  opacity: 1;\\n}\\n#template-customizer .template-customizer-theme-colors span {\\n  display: block;\\n  margin: 0 1px;\\n  width: 10px;\\n  height: 10px;\\n  border-radius: 50%;\\n  -webkit-box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1) inset;\\n  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1) inset;\\n}\\n#template-customizer.template-customizer-loading .template-customizer-inner, #template-customizer.template-customizer-loading-theme .template-customizer-themes-inner {\\n  opacity: 0.2;\\n}\\n#template-customizer.template-customizer-loading .template-customizer-inner::after, #template-customizer.template-customizer-loading-theme .template-customizer-themes-inner::after {\\n  content: \\"\\";\\n  position: absolute;\\n  top: 0;\\n  right: 0;\\n  bottom: 0;\\n  left: 0;\\n  z-index: 999;\\n  display: block;\\n}\\n\\n@media (max-width: 1200px) {\\n  #template-customizer {\\n    display: none;\\n    visibility: hidden !important;\\n  }\\n}\\n@media (max-width: 575.98px) {\\n  #template-customizer {\\n    width: 300px;\\n    -webkit-transform: translateX(320px);\\n    -ms-transform: translateX(320px);\\n    transform: translateX(320px);\\n  }\\n}\\n.layout-menu-100vh #template-customizer {\\n  height: 100vh;\\n}\\n\\n[dir=rtl] #template-customizer {\\n  right: auto;\\n  left: 0;\\n  -webkit-transform: translateX(-420px);\\n  -ms-transform: translateX(-420px);\\n  transform: translateX(-420px);\\n}\\n[dir=rtl] #template-customizer .template-customizer-open-btn {\\n  right: 0;\\n  left: auto;\\n  -webkit-transform: translateX(62px);\\n  -ms-transform: translateX(62px);\\n  transform: translateX(62px);\\n}\\n[dir=rtl] #template-customizer .template-customizer-close-btn {\\n  right: auto;\\n  left: 0;\\n}\\n\\n#template-customizer .template-customizer-layouts-options[disabled] {\\n  opacity: 0.5;\\n  pointer-events: none;\\n}\\n\\n[dir=rtl] .template-customizer-t-style_switch_light {\\n  padding-right: 0 !important;\\n}", ""]);\n// Exports\n/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://Vuexy/./js/_template-customizer/_template-customizer.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js');
            },
            "./node_modules/css-loader/dist/runtime/api.js": function(module) {
              eval('\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = "";\n      var needLayer = typeof item[5] !== "undefined";\n      if (item[4]) {\n        content += "@supports (".concat(item[4], ") {");\n      }\n      if (item[2]) {\n        content += "@media ".concat(item[2], " {");\n      }\n      if (needLayer) {\n        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += "}";\n      }\n      if (item[2]) {\n        content += "}";\n      }\n      if (item[4]) {\n        content += "}";\n      }\n      return content;\n    }).join("");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === "string") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== "undefined") {\n        if (typeof item[5] === "undefined") {\n          item[5] = layer;\n        } else {\n          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = "".concat(supports);\n        } else {\n          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://Vuexy/./node_modules/css-loader/dist/runtime/api.js?');
            },
            "./node_modules/css-loader/dist/runtime/getUrl.js": function(module) {
              eval(`

module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \\t\\n]|(%20)/.test(url) || options.needQuotes) {
    return "\\"".concat(url.replace(/"/g, '\\\\"').replace(/\\n/g, "\\\\n"), "\\"");
  }
  return url;
};

//# sourceURL=webpack://Vuexy/./node_modules/css-loader/dist/runtime/getUrl.js?`);
            },
            "./node_modules/css-loader/dist/runtime/noSourceMaps.js": function(module) {
              eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://Vuexy/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");
            },
            "./js/_template-customizer/_template-customizer.html": function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
              eval('__webpack_require__.r(__webpack_exports__);\n// Module\nvar code = "<div id=\\"template-customizer\\" class=\\"invert-bg-white\\"> <a href=\\"javascript:void(0)\\" class=\\"template-customizer-open-btn\\" tabindex=\\"-1\\"></a> <div class=\\"p-4 m-0 lh-1 border-bottom template-customizer-header position-relative py-3\\"> <h4 class=\\"template-customizer-t-panel_header mb-2\\"></h4> <p class=\\"template-customizer-t-panel_sub_header mb-0\\"></p> <div class=\\"d-flex align-items-center gap-2 position-absolute end-0 top-0 mt-4 me-3\\"> <a href=\\"javascript:void(0)\\" class=\\"template-customizer-reset-btn text-body\\" data-bs-toggle=\\"tooltip\\" data-bs-placement=\\"bottom\\" title=\\"Reset Customizer\\"><i class=\\"ti ti-refresh ti-sm\\"></i><span class=\\"badge rounded-pill bg-danger badge-dot badge-notifications d-none\\"></span></a> <a href=\\"javascript:void(0)\\" class=\\"template-customizer-close-btn fw-light text-body\\" tabindex=\\"-1\\"><i class=\\"ti ti-x ti-sm\\"></i></a> </div> </div> <div class=\\"template-customizer-inner pt-4\\"> <div class=\\"template-customizer-theming\\"> <h5 class=\\"m-0 px-4 py-4 lh-1 d-block\\"> <span class=\\"template-customizer-t-theming_header bg-label-primary rounded-1 py-1 px-2 fs-big\\"></span> </h5> <div class=\\"m-0 px-4 pb-3 pt-1 template-customizer-style w-100\\"> <label for=\\"customizerStyle\\" class=\\"form-label d-block template-customizer-t-style_label\\"></label> <div class=\\"row px-1 template-customizer-styles-options\\"></div> </div> <div class=\\"m-0 px-4 pt-3 template-customizer-themes w-100\\"> <label for=\\"customizerTheme\\" class=\\"form-label template-customizer-t-theme_label\\"></label> <div class=\\"row px-1 template-customizer-themes-options\\"></div> </div> </div> <div class=\\"template-customizer-layout\\"> <hr class=\\"m-0 px-4 my-4\\"/> <h5 class=\\"m-0 px-4 pb-4 pt-2 d-block\\"> <span class=\\"template-customizer-t-layout_header bg-label-primary rounded-1 py-1 px-2 fs-big\\"></span> </h5> <div class=\\"m-0 px-4 pb-3 d-block template-customizer-layouts\\"> <label for=\\"customizerStyle\\" class=\\"form-label d-block template-customizer-t-layout_label\\"></label> <div class=\\"row px-1 template-customizer-layouts-options\\"> </div> </div> <div class=\\"m-0 px-4 pb-3 template-customizer-headerOptions w-100\\"> <label for=\\"customizerHeader\\" class=\\"form-label template-customizer-t-layout_header_label\\"></label> <div class=\\"row px-1 template-customizer-header-options\\"></div> </div> <div class=\\"m-0 px-4 pb-3 template-customizer-layoutNavbarOptions w-100\\"> <label for=\\"customizerNavbar\\" class=\\"form-label template-customizer-t-layout_navbar_label\\"></label> <div class=\\"row px-1 template-customizer-navbar-options\\"></div> </div> <div class=\\"m-0 px-4 pb-3 template-customizer-content w-100\\"> <label for=\\"customizerContent\\" class=\\"form-label template-customizer-t-content_label\\"></label> <div class=\\"row px-1 template-customizer-content-options\\"></div> </div> <div class=\\"m-0 px-4 pb-3 template-customizer-directions w-100\\"> <label for=\\"customizerDirection\\" class=\\"form-label template-customizer-t-direction_label\\"></label> <div class=\\"row px-1 template-customizer-directions-options\\"></div> </div> </div> </div> </div> ";\n// Exports\n/* harmony default export */ __webpack_exports__["default"] = (code);\n\n//# sourceURL=webpack://Vuexy/./js/_template-customizer/_template-customizer.html?');
            },
            "./js/_template-customizer/_template-customizer.scss": function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
              eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_template_customizer_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./_template-customizer.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./js/_template-customizer/_template-customizer.scss");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_template_customizer_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);\n\n\n\n\n       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_template_customizer_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_template_customizer_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_template_customizer_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);\n\n\n//# sourceURL=webpack://Vuexy/./js/_template-customizer/_template-customizer.scss?');
            },
            "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js": function(module) {
              eval('\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = "".concat(id, " ").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://Vuexy/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?');
            },
            "./node_modules/style-loader/dist/runtime/insertBySelector.js": function(module) {
              eval(`

var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

//# sourceURL=webpack://Vuexy/./node_modules/style-loader/dist/runtime/insertBySelector.js?`);
            },
            "./node_modules/style-loader/dist/runtime/insertStyleElement.js": function(module) {
              eval('\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement("style");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://Vuexy/./node_modules/style-loader/dist/runtime/insertStyleElement.js?');
            },
            "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js": function(module, __unused_webpack_exports, __webpack_require__) {
              eval('\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute("nonce", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://Vuexy/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?');
            },
            "./node_modules/style-loader/dist/runtime/styleDomAPI.js": function(module) {
              eval('\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = "";\n  if (obj.supports) {\n    css += "@supports (".concat(obj.supports, ") {");\n  }\n  if (obj.media) {\n    css += "@media ".concat(obj.media, " {");\n  }\n  var needLayer = typeof obj.layer !== "undefined";\n  if (needLayer) {\n    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += "}";\n  }\n  if (obj.media) {\n    css += "}";\n  }\n  if (obj.supports) {\n    css += "}";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== "undefined") {\n    css += "\\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === "undefined") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://Vuexy/./node_modules/style-loader/dist/runtime/styleDomAPI.js?');
            },
            "./node_modules/style-loader/dist/runtime/styleTagTransform.js": function(module) {
              eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://Vuexy/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");
            },
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABClJREFUaEPtmY1RFEEQhbsjUCIQIhAiUCNQIxAiECIQIxAiECIAIpAMhAiECIQI2vquZqnZvp6fhb3SK5mqq6Ju92b69bzXf6is+dI1t1+eAfztG5z1BsxsU0S+ici2iPB3vm5E5EpEDlSVv2dZswFIxv8UkZcNy+5EZGcuEHMCOBeR951uvVDVD53vVl+bE8DvDu8Pxtyo6ta/BsByg1R15Bwzqz5/LJgn34CZwfnPInI4BUB6/1hV0cSjVxcAM4PbcBZjL0XklIPN7Is3fLCkdQPpPYw/VNXj5IhPIvJWRIhSl6p60ULWBGBm30Vk123EwRxCuIzWkkjNrCZywith10ewE1Xdq4GoAjCz/RTXW44Ynt+LyBEfT43kYfbj86J3w5Q32DNcRQDpwF+dkQXDMey8xem0L3TEqB4g3PZWad8agBMRgZPeu96D1/C2Zbh3X0p80Op1xxloztN48bMQQNoc7+eLEuAoPSPiIDY4Ooo+E6ixeNXM+D3GERz2U3CIqMstLJUgJQDe+7eq6mub0NYEkLAKwEHkiBQDCZtddZCZ8d6r7JDwFkoARklHRPZUFVDVZWbwGuNrC4EfdOzFrRABh3Wnqhv+d70AEBLGFROPmeHlnM81G69UdSd6IUuM0GgUVn1uqWmg5EmMfBeEyB7Pe3txBkY+rGT8j0J+WXq/BgDkUCaqLgEAnwcRog0veMIqFAAwCy2wnw+bI2GaGboBgF9k5N0o0rUSGUb4eO0BeO9j/GYhkSHMHMTIqwGARX6p6a+nlPBl8kZuXMD9j6pKfF9aZuaFOdJCEL5D4eYb9wCYVCanrBmGyii/tIq+SLj/HQBCaM5bLzwfPqdQ6FpVHyra4IbuVbXaY7dETC2ESPNNWiIOi69CcdgSMXsh4tNSUiklMgwmC0aNd08Y5WAES6HHehM4gu97wyhBgWpgqXsrASglprDy7CwhehMZOSbK6JMSma+Fio1KltCmlBIj7gfZOGx8ppQSXrhzFnOhJ/31BDkjFHRvOd09x0mRBA9SFgxUgHpQg0q0t5ymPMlL+EnldFTfDA0NAmf+OTQ0X0sRouf7NNkYGhrOYNrxtIaGg83MNzVDSe3LXLhP7O/yrCsCz1zlWTpjWkuZAOBpX3yVnLqI1yLCOKU6qMrmP7SSrUEw54XF4WBIK5FxCMOr3lVsfGqNSmPzBXUnJTIX1jyVBq9wO6UObOpgC5GjO98vFKnTdQMZXxEsWZlDiCZMIxAbNxQOqlpVZtobejBaZNoBnRDzMFpkxvTQOD36BlrcySZuI6p1ACB6LU3wWuf5581+oHfD1vi89bz3nFUC8Nm7ZlP3nKkFbM4bWPt/MSFwklprYItwt6cmvpWJ2IVcQBCz6bLysSCv3SaANCiTsnaNRrNRqMXVVT1/BrAqz/buu/Y38Ad3KC5PARej0QAAAABJRU5ErkJggg==": function(module) {
              eval('module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABClJREFUaEPtmY1RFEEQhbsjUCIQIhAiUCNQIxAiECIQIxAiECIAIpAMhAiECIQI2vquZqnZvp6fhb3SK5mqq6Ju92b69bzXf6is+dI1t1+eAfztG5z1BsxsU0S+ici2iPB3vm5E5EpEDlSVv2dZswFIxv8UkZcNy+5EZGcuEHMCOBeR951uvVDVD53vVl+bE8DvDu8Pxtyo6ta/BsByg1R15Bwzqz5/LJgn34CZwfnPInI4BUB6/1hV0cSjVxcAM4PbcBZjL0XklIPN7Is3fLCkdQPpPYw/VNXj5IhPIvJWRIhSl6p60ULWBGBm30Vk123EwRxCuIzWkkjNrCZywith10ewE1Xdq4GoAjCz/RTXW44Ynt+LyBEfT43kYfbj86J3w5Q32DNcRQDpwF+dkQXDMey8xem0L3TEqB4g3PZWad8agBMRgZPeu96D1/C2Zbh3X0p80Op1xxloztN48bMQQNoc7+eLEuAoPSPiIDY4Ooo+E6ixeNXM+D3GERz2U3CIqMstLJUgJQDe+7eq6mub0NYEkLAKwEHkiBQDCZtddZCZ8d6r7JDwFkoARklHRPZUFVDVZWbwGuNrC4EfdOzFrRABh3Wnqhv+d70AEBLGFROPmeHlnM81G69UdSd6IUuM0GgUVn1uqWmg5EmMfBeEyB7Pe3txBkY+rGT8j0J+WXq/BgDkUCaqLgEAnwcRog0veMIqFAAwCy2wnw+bI2GaGboBgF9k5N0o0rUSGUb4eO0BeO9j/GYhkSHMHMTIqwGARX6p6a+nlPBl8kZuXMD9j6pKfF9aZuaFOdJCEL5D4eYb9wCYVCanrBmGyii/tIq+SLj/HQBCaM5bLzwfPqdQ6FpVHyra4IbuVbXaY7dETC2ESPNNWiIOi69CcdgSMXsh4tNSUiklMgwmC0aNd08Y5WAES6HHehM4gu97wyhBgWpgqXsrASglprDy7CwhehMZOSbK6JMSma+Fio1KltCmlBIj7gfZOGx8ppQSXrhzFnOhJ/31BDkjFHRvOd09x0mRBA9SFgxUgHpQg0q0t5ymPMlL+EnldFTfDA0NAmf+OTQ0X0sRouf7NNkYGhrOYNrxtIaGg83MNzVDSe3LXLhP7O/yrCsCz1zlWTpjWkuZAOBpX3yVnLqI1yLCOKU6qMrmP7SSrUEw54XF4WBIK5FxCMOr3lVsfGqNSmPzBXUnJTIX1jyVBq9wO6UObOpgC5GjO98vFKnTdQMZXxEsWZlDiCZMIxAbNxQOqlpVZtobejBaZNoBnRDzMFpkxvTQOD36BlrcySZuI6p1ACB6LU3wWuf5581+oHfD1vi89bz3nFUC8Nm7ZlP3nKkFbM4bWPt/MSFwklprYItwt6cmvpWJ2IVcQBCz6bLysSCv3SaANCiTsnaNRrNRqMXVVT1/BrAqz/buu/Y38Ad3KC5PARej0QAAAABJRU5ErkJggg==";\n\n//# sourceURL=webpack://Vuexy/data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABClJREFUaEPtmY1RFEEQhbsjUCIQIhAiUCNQIxAiECIQIxAiECIAIpAMhAiECIQI2vquZqnZvp6fhb3SK5mqq6Ju92b69bzXf6is+dI1t1+eAfztG5z1BsxsU0S+ici2iPB3vm5E5EpEDlSVv2dZswFIxv8UkZcNy+5EZGcuEHMCOBeR951uvVDVD53vVl+bE8DvDu8Pxtyo6ta/BsByg1R15Bwzqz5/LJgn34CZwfnPInI4BUB6/1hV0cSjVxcAM4PbcBZjL0XklIPN7Is3fLCkdQPpPYw/VNXj5IhPIvJWRIhSl6p60ULWBGBm30Vk123EwRxCuIzWkkjNrCZywith10ewE1Xdq4GoAjCz/RTXW44Ynt+LyBEfT43kYfbj86J3w5Q32DNcRQDpwF+dkQXDMey8xem0L3TEqB4g3PZWad8agBMRgZPeu96D1/C2Zbh3X0p80Op1xxloztN48bMQQNoc7+eLEuAoPSPiIDY4Ooo+E6ixeNXM+D3GERz2U3CIqMstLJUgJQDe+7eq6mub0NYEkLAKwEHkiBQDCZtddZCZ8d6r7JDwFkoARklHRPZUFVDVZWbwGuNrC4EfdOzFrRABh3Wnqhv+d70AEBLGFROPmeHlnM81G69UdSd6IUuM0GgUVn1uqWmg5EmMfBeEyB7Pe3txBkY+rGT8j0J+WXq/BgDkUCaqLgEAnwcRog0veMIqFAAwCy2wnw+bI2GaGboBgF9k5N0o0rUSGUb4eO0BeO9j/GYhkSHMHMTIqwGARX6p6a+nlPBl8kZuXMD9j6pKfF9aZuaFOdJCEL5D4eYb9wCYVCanrBmGyii/tIq+SLj/HQBCaM5bLzwfPqdQ6FpVHyra4IbuVbXaY7dETC2ESPNNWiIOi69CcdgSMXsh4tNSUiklMgwmC0aNd08Y5WAES6HHehM4gu97wyhBgWpgqXsrASglprDy7CwhehMZOSbK6JMSma+Fio1KltCmlBIj7gfZOGx8ppQSXrhzFnOhJ/31BDkjFHRvOd09x0mRBA9SFgxUgHpQg0q0t5ymPMlL+EnldFTfDA0NAmf+OTQ0X0sRouf7NNkYGhrOYNrxtIaGg83MNzVDSe3LXLhP7O/yrCsCz1zlWTpjWkuZAOBpX3yVnLqI1yLCOKU6qMrmP7SSrUEw54XF4WBIK5FxCMOr3lVsfGqNSmPzBXUnJTIX1jyVBq9wO6UObOpgC5GjO98vFKnTdQMZXxEsWZlDiCZMIxAbNxQOqlpVZtobejBaZNoBnRDzMFpkxvTQOD36BlrcySZuI6p1ACB6LU3wWuf5581+oHfD1vi89bz3nFUC8Nm7ZlP3nKkFbM4bWPt/MSFwklprYItwt6cmvpWJ2IVcQBCz6bLysSCv3SaANCiTsnaNRrNRqMXVVT1/BrAqz/buu/Y38Ad3KC5PARej0QAAAABJRU5ErkJggg==?');
            }
          };
          var __webpack_module_cache__ = {};
          function __webpack_require__(moduleId) {
            var cachedModule = __webpack_module_cache__[moduleId];
            if (cachedModule !== void 0) {
              return cachedModule.exports;
            }
            var module2 = __webpack_module_cache__[moduleId] = {
              id: moduleId,
              exports: {}
            };
            __webpack_modules__[moduleId](module2, module2.exports, __webpack_require__);
            return module2.exports;
          }
          __webpack_require__.m = __webpack_modules__;
          !function() {
            __webpack_require__.n = function(module2) {
              var getter = module2 && module2.__esModule ? function() {
                return module2["default"];
              } : function() {
                return module2;
              };
              __webpack_require__.d(getter, { a: getter });
              return getter;
            };
          }();
          !function() {
            __webpack_require__.d = function(exports2, definition) {
              for (var key in definition) {
                if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports2, key)) {
                  Object.defineProperty(exports2, key, { enumerable: true, get: definition[key] });
                }
              }
            };
          }();
          !function() {
            __webpack_require__.o = function(obj, prop) {
              return Object.prototype.hasOwnProperty.call(obj, prop);
            };
          }();
          !function() {
            __webpack_require__.r = function(exports2) {
              if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
              }
              Object.defineProperty(exports2, "__esModule", { value: true });
            };
          }();
          !function() {
            __webpack_require__.b = document.baseURI || self.location.href;
            var installedChunks = {
              "js/template-customizer": 0
            };
          }();
          !function() {
            __webpack_require__.nc = void 0;
          }();
          var __webpack_exports__ = __webpack_require__("./js/template-customizer.js");
          return __webpack_exports__;
        }();
      });
    }
  });

  // ../easy_ui/easy_ui/public/js/header.bundle.js
  var import_helpers = __toESM(require_helpers());
  var import_template_customizer = __toESM(require_template_customizer());

  // ../easy_ui/easy_ui/public/assets/js/config.js
  var assetsPath = document.documentElement.getAttribute("data-assets-path");
  var templateName = document.documentElement.getAttribute("data-template");
  var rtlSupport = true;
  if (typeof TemplateCustomizer !== "undefined") {
    window.templateCustomizer = new TemplateCustomizer({
      cssPath: assetsPath + "vendor/css" + (rtlSupport ? "/rtl" : "") + "/",
      themesPath: assetsPath + "vendor/css" + (rtlSupport ? "/rtl" : "") + "/",
      displayCustomizer: true,
      controls: ["rtl", "style", "headerType", "contentLayout", "layoutCollapsed", "layoutNavbarOptions", "themes"]
    });
  }

  // ../easy_ui/easy_ui/public/js/header.bundle.js
  console.log("INJECTED FILE");
})();
//# sourceMappingURL=header.bundle.NHQ75WH3.js.map
