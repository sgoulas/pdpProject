(function() {
var exports = {};
exports.id = "pages/_document";
exports.ids = ["pages/_document"];
exports.modules = {

/***/ "./node_modules/next/dist/client/head-manager.js":
/*!*******************************************************!*\
  !*** ./node_modules/next/dist/client/head-manager.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


exports.__esModule = true;
exports.default = initHeadManager;
exports.DOMAttributeNames = void 0;
var DOMAttributeNames = {
  acceptCharset: 'accept-charset',
  className: 'class',
  htmlFor: 'for',
  httpEquiv: 'http-equiv',
  noModule: 'noModule'
};
exports.DOMAttributeNames = DOMAttributeNames;

function reactElementToDOM(_ref) {
  var type = _ref.type,
      props = _ref.props;
  var el = document.createElement(type);

  for (var p in props) {
    if (!props.hasOwnProperty(p)) continue;
    if (p === 'children' || p === 'dangerouslySetInnerHTML') continue; // we don't render undefined props to the DOM

    if (props[p] === undefined) continue;
    var attr = DOMAttributeNames[p] || p.toLowerCase();

    if (type === 'script' && (attr === 'async' || attr === 'defer' || attr === 'noModule')) {
      ;
      el[attr] = !!props[p];
    } else {
      el.setAttribute(attr, props[p]);
    }
  }

  var children = props.children,
      dangerouslySetInnerHTML = props.dangerouslySetInnerHTML;

  if (dangerouslySetInnerHTML) {
    el.innerHTML = dangerouslySetInnerHTML.__html || '';
  } else if (children) {
    el.textContent = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
  }

  return el;
}

function updateElements(type, components) {
  var headEl = document.getElementsByTagName('head')[0];
  var headCountEl = headEl.querySelector('meta[name=next-head-count]');

  if (true) {
    if (!headCountEl) {
      console.error('Warning: next-head-count is missing. https://nextjs.org/docs/messages/next-head-count-missing');
      return;
    }
  }

  var headCount = Number(headCountEl.content);
  var oldTags = [];

  for (var i = 0, j = headCountEl.previousElementSibling; i < headCount; i++, j = j.previousElementSibling) {
    if (j.tagName.toLowerCase() === type) {
      oldTags.push(j);
    }
  }

  var newTags = components.map(reactElementToDOM).filter(function (newTag) {
    for (var k = 0, len = oldTags.length; k < len; k++) {
      var oldTag = oldTags[k];

      if (oldTag.isEqualNode(newTag)) {
        oldTags.splice(k, 1);
        return false;
      }
    }

    return true;
  });
  oldTags.forEach(function (t) {
    return t.parentNode.removeChild(t);
  });
  newTags.forEach(function (t) {
    return headEl.insertBefore(t, headCountEl);
  });
  headCountEl.content = (headCount - oldTags.length + newTags.length).toString();
}

function initHeadManager() {
  var updatePromise = null;
  return {
    mountedInstances: new Set(),
    updateHead: function updateHead(head) {
      var promise = updatePromise = Promise.resolve().then(function () {
        if (promise !== updatePromise) return;
        updatePromise = null;
        var tags = {};
        head.forEach(function (h) {
          if ( // If the font tag is loaded only on client navigation
          // it won't be inlined. In this case revert to the original behavior
          h.type === 'link' && h.props['data-optimized-fonts'] && !document.querySelector("style[data-href=\"".concat(h.props['data-href'], "\"]"))) {
            h.props.href = h.props['data-href'];
            h.props['data-href'] = undefined;
          }

          var components = tags[h.type] || [];
          components.push(h);
          tags[h.type] = components;
        });
        var titleComponent = tags.title ? tags.title[0] : null;
        var title = '';

        if (titleComponent) {
          var children = titleComponent.props.children;
          title = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
        }

        if (title !== document.title) document.title = title;
        ['meta', 'base', 'link', 'style', 'script'].forEach(function (type) {
          updateElements(type, tags[type] || []);
        });
      });
    }
  };
}

/***/ }),

/***/ "./node_modules/next/dist/client/request-idle-callback.js":
/*!****************************************************************!*\
  !*** ./node_modules/next/dist/client/request-idle-callback.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


exports.__esModule = true;
exports.cancelIdleCallback = exports.requestIdleCallback = void 0;

var requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback || function (cb) {
  var start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function timeRemaining() {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};

exports.requestIdleCallback = requestIdleCallback;

var cancelIdleCallback = typeof self !== 'undefined' && self.cancelIdleCallback || function (id) {
  return clearTimeout(id);
};

exports.cancelIdleCallback = cancelIdleCallback;

/***/ }),

/***/ "./node_modules/next/dist/client/script.js":
/*!*************************************************!*\
  !*** ./node_modules/next/dist/client/script.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/next/node_modules/@babel/runtime/helpers/slicedToArray.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.initScriptLoader = initScriptLoader;
exports.default = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/next/node_modules/@babel/runtime/helpers/extends.js"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "./node_modules/next/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js"));

var _react = __webpack_require__(/*! react */ "react");

var _headManagerContext = __webpack_require__(/*! ../next-server/lib/head-manager-context */ "../next-server/lib/head-manager-context");

var _headManager = __webpack_require__(/*! ./head-manager */ "./node_modules/next/dist/client/head-manager.js");

var _requestIdleCallback = __webpack_require__(/*! ./request-idle-callback */ "./node_modules/next/dist/client/request-idle-callback.js");

var ScriptCache = new Map();
var LoadCache = new Set();
var ignoreProps = ['onLoad', 'dangerouslySetInnerHTML', 'children', 'onError', 'strategy'];

var loadScript = function loadScript(props) {
  var src = props.src,
      id = props.id,
      _props$onLoad = props.onLoad,
      onLoad = _props$onLoad === void 0 ? function () {} : _props$onLoad,
      dangerouslySetInnerHTML = props.dangerouslySetInnerHTML,
      _props$children = props.children,
      children = _props$children === void 0 ? '' : _props$children,
      onError = props.onError;
  var cacheKey = id || src;

  if (ScriptCache.has(src)) {
    if (!LoadCache.has(cacheKey)) {
      LoadCache.add(cacheKey); // Execute onLoad since the script loading has begun

      ScriptCache.get(src).then(onLoad, onError);
    }

    return;
  }

  var el = document.createElement('script');
  var loadPromise = new Promise(function (resolve, reject) {
    el.addEventListener('load', function () {
      resolve();

      if (onLoad) {
        onLoad.call(this);
      }
    });
    el.addEventListener('error', function () {
      reject();

      if (onError) {
        onError();
      }
    });
  });

  if (src) {
    ScriptCache.set(src, loadPromise);
    LoadCache.add(cacheKey);
  }

  if (dangerouslySetInnerHTML) {
    el.innerHTML = dangerouslySetInnerHTML.__html || '';
  } else if (children) {
    el.textContent = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
  } else if (src) {
    el.src = src;
  }

  for (var _i = 0, _Object$entries = Object.entries(props); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        k = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    if (value === undefined || ignoreProps.includes(k)) {
      continue;
    }

    var attr = _headManager.DOMAttributeNames[k] || k.toLowerCase();
    el.setAttribute(attr, value);
  }

  document.body.appendChild(el);
};

function handleClientScriptLoad(props) {
  var _props$strategy = props.strategy,
      strategy = _props$strategy === void 0 ? 'afterInteractive' : _props$strategy;

  if (strategy === 'afterInteractive') {
    loadScript(props);
  } else if (strategy === 'lazyOnload') {
    window.addEventListener('load', function () {
      (0, _requestIdleCallback.requestIdleCallback)(function () {
        return loadScript(props);
      });
    });
  }
}

function loadLazyScript(props) {
  if (document.readyState === 'complete') {
    (0, _requestIdleCallback.requestIdleCallback)(function () {
      return loadScript(props);
    });
  } else {
    window.addEventListener('load', function () {
      (0, _requestIdleCallback.requestIdleCallback)(function () {
        return loadScript(props);
      });
    });
  }
}

function initScriptLoader(scriptLoaderItems) {
  scriptLoaderItems.forEach(handleClientScriptLoad);
}

function Script(props) {
  var _props$src = props.src,
      src = _props$src === void 0 ? '' : _props$src,
      _props$onLoad2 = props.onLoad,
      onLoad = _props$onLoad2 === void 0 ? function () {} : _props$onLoad2,
      _props$strategy2 = props.strategy,
      strategy = _props$strategy2 === void 0 ? 'afterInteractive' : _props$strategy2,
      onError = props.onError,
      restProps = (0, _objectWithoutPropertiesLoose2["default"])(props, ["src", "onLoad", "dangerouslySetInnerHTML", "strategy", "onError"]); // Context is available only during SSR

  var _ref = (0, _react.useContext)(_headManagerContext.HeadManagerContext),
      updateScripts = _ref.updateScripts,
      scripts = _ref.scripts;

  (0, _react.useEffect)(function () {
    if (strategy === 'afterInteractive') {
      loadScript(props);
    } else if (strategy === 'lazyOnload') {
      loadLazyScript(props);
    }
  }, [props, strategy]);

  if (strategy === 'beforeInteractive') {
    if (updateScripts) {
      scripts.beforeInteractive = (scripts.beforeInteractive || []).concat([(0, _extends2["default"])({
        src: src,
        onLoad: onLoad,
        onError: onError
      }, restProps)]);
      updateScripts(scripts);
    }
  }

  return null;
}

var _default = Script;
exports.default = _default;

/***/ }),

/***/ "./node_modules/next/dist/pages/_document.js":
/*!***************************************************!*\
  !*** ./node_modules/next/dist/pages/_document.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _defineProperty = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/next/node_modules/@babel/runtime/helpers/defineProperty.js");

var _regeneratorRuntime = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/next/node_modules/@babel/runtime/regenerator/index.js");

var _asyncToGenerator = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/next/node_modules/@babel/runtime/helpers/asyncToGenerator.js");

var _classCallCheck = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/next/node_modules/@babel/runtime/helpers/classCallCheck.js");

var _createClass = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/next/node_modules/@babel/runtime/helpers/createClass.js");

var _inherits = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/next/node_modules/@babel/runtime/helpers/inherits.js");

var _possibleConstructorReturn = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/next/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");

var _getPrototypeOf = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/next/node_modules/@babel/runtime/helpers/getPrototypeOf.js");

var _objectWithoutProperties = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/next/node_modules/@babel/runtime/helpers/objectWithoutProperties.js");

var _toConsumableArray = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/next/node_modules/@babel/runtime/helpers/toConsumableArray.js");

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/next/node_modules/@babel/runtime/helpers/typeof.js");

var _excluded = ["strategy"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

exports.__esModule = true;
exports.Html = Html;
exports.Main = Main;
exports.NextScript = exports.Head = exports.default = void 0;

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _server = _interopRequireDefault(__webpack_require__(/*! styled-jsx/server */ "styled-jsx/server"));

var _constants = __webpack_require__(/*! ../next-server/lib/constants */ "../next-server/lib/constants");

var _documentContext = __webpack_require__(/*! ../next-server/lib/document-context */ "../next-server/lib/document-context");

var _utils = __webpack_require__(/*! ../next-server/lib/utils */ "../next-server/lib/utils");

exports.DocumentContext = _utils.DocumentContext;
exports.DocumentInitialProps = _utils.DocumentInitialProps;
exports.DocumentProps = _utils.DocumentProps;

var _getPageFiles = __webpack_require__(/*! ../next-server/server/get-page-files */ "../next-server/server/get-page-files");

var _utils2 = __webpack_require__(/*! ../next-server/server/utils */ "../next-server/server/utils");

var _htmlescape = __webpack_require__(/*! ../server/htmlescape */ "./node_modules/next/dist/server/htmlescape.js");

var _script = _interopRequireDefault(__webpack_require__(/*! ../client/script */ "./node_modules/next/dist/client/script.js"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function getDocumentFiles(buildManifest, pathname, inAmpMode) {
  var sharedFiles = (0, _getPageFiles.getPageFiles)(buildManifest, '/_app');
  var pageFiles = inAmpMode ? [] : (0, _getPageFiles.getPageFiles)(buildManifest, pathname);
  return {
    sharedFiles: sharedFiles,
    pageFiles: pageFiles,
    allFiles: _toConsumableArray(new Set([].concat(_toConsumableArray(sharedFiles), _toConsumableArray(pageFiles))))
  };
}

function _getPolyfillScripts(context, props) {
  // polyfills.js has to be rendered as nomodule without async
  // It also has to be the first script to load
  var assetPrefix = context.assetPrefix,
      buildManifest = context.buildManifest,
      devOnlyCacheBusterQueryString = context.devOnlyCacheBusterQueryString,
      disableOptimizedLoading = context.disableOptimizedLoading;
  return buildManifest.polyfillFiles.filter(function (polyfill) {
    return polyfill.endsWith('.js') && !polyfill.endsWith('.module.js');
  }).map(function (polyfill) {
    return /*#__PURE__*/_react["default"].createElement("script", {
      key: polyfill,
      defer: !disableOptimizedLoading,
      nonce: props.nonce,
      crossOrigin: props.crossOrigin || undefined,
      noModule: true,
      src: "".concat(assetPrefix, "/_next/").concat(polyfill).concat(devOnlyCacheBusterQueryString)
    });
  });
}

function _getPreNextScripts(context, props) {
  var scriptLoader = context.scriptLoader,
      disableOptimizedLoading = context.disableOptimizedLoading;
  return (scriptLoader.beforeInteractive || []).map(function (file) {
    var strategy = file.strategy,
        scriptProps = _objectWithoutProperties(file, _excluded);

    return /*#__PURE__*/_react["default"].createElement("script", Object.assign({}, scriptProps, {
      defer: !disableOptimizedLoading,
      nonce: props.nonce,
      crossOrigin: props.crossOrigin || undefined
    }));
  });
}

function _getDynamicChunks(context, props, files) {
  var dynamicImports = context.dynamicImports,
      assetPrefix = context.assetPrefix,
      isDevelopment = context.isDevelopment,
      devOnlyCacheBusterQueryString = context.devOnlyCacheBusterQueryString,
      disableOptimizedLoading = context.disableOptimizedLoading;
  return dynamicImports.map(function (file) {
    if (!file.endsWith('.js') || files.allFiles.includes(file)) return null;
    return /*#__PURE__*/_react["default"].createElement("script", {
      async: !isDevelopment && disableOptimizedLoading,
      defer: !disableOptimizedLoading,
      key: file,
      src: "".concat(assetPrefix, "/_next/").concat(encodeURI(file)).concat(devOnlyCacheBusterQueryString),
      nonce: props.nonce,
      crossOrigin: props.crossOrigin || undefined
    });
  });
}

function _getScripts(context, props, files) {
  var _buildManifest$lowPri;

  var assetPrefix = context.assetPrefix,
      buildManifest = context.buildManifest,
      isDevelopment = context.isDevelopment,
      devOnlyCacheBusterQueryString = context.devOnlyCacheBusterQueryString,
      disableOptimizedLoading = context.disableOptimizedLoading;
  var normalScripts = files.allFiles.filter(function (file) {
    return file.endsWith('.js');
  });
  var lowPriorityScripts = (_buildManifest$lowPri = buildManifest.lowPriorityFiles) == null ? void 0 : _buildManifest$lowPri.filter(function (file) {
    return file.endsWith('.js');
  });
  return [].concat(_toConsumableArray(normalScripts), _toConsumableArray(lowPriorityScripts)).map(function (file) {
    return /*#__PURE__*/_react["default"].createElement("script", {
      key: file,
      src: "".concat(assetPrefix, "/_next/").concat(encodeURI(file)).concat(devOnlyCacheBusterQueryString),
      nonce: props.nonce,
      async: !isDevelopment && disableOptimizedLoading,
      defer: !disableOptimizedLoading,
      crossOrigin: props.crossOrigin || undefined
    });
  });
}
/**
* `Document` component handles the initial `document` markup and renders only on the server side.
* Commonly used for implementing server side rendering for `css-in-js` libraries.
*/


var Document = /*#__PURE__*/function (_react$Component) {
  _inherits(Document, _react$Component);

  var _super = _createSuper(Document);

  function Document() {
    _classCallCheck(this, Document);

    return _super.apply(this, arguments);
  }

  _createClass(Document, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(Html, null, /*#__PURE__*/_react["default"].createElement(Head, null), /*#__PURE__*/_react["default"].createElement("body", null, /*#__PURE__*/_react["default"].createElement(Main, null), /*#__PURE__*/_react["default"].createElement(NextScript, null)));
    }
  }], [{
    key: "getInitialProps",
    value:
    /**
    * `getInitialProps` hook returns the context object with the addition of `renderPage`.
    * `renderPage` callback executes `React` rendering logic synchronously to support server-rendering wrappers
    */
    function () {
      var _getInitialProps = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(ctx) {
        var enhanceApp, _yield$ctx$renderPage, html, head, styles;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                enhanceApp = function enhanceApp(App) {
                  return function (props) {
                    return /*#__PURE__*/_react["default"].createElement(App, props);
                  };
                };

                _context.next = 3;
                return ctx.renderPage({
                  enhanceApp: enhanceApp
                });

              case 3:
                _yield$ctx$renderPage = _context.sent;
                html = _yield$ctx$renderPage.html;
                head = _yield$ctx$renderPage.head;
                styles = _toConsumableArray((0, _server["default"])());
                return _context.abrupt("return", {
                  html: html,
                  head: head,
                  styles: styles
                });

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getInitialProps(_x) {
        return _getInitialProps.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }, {
    key: "renderDocument",
    value: function renderDocument(DocumentComponent, props) {
      return /*#__PURE__*/_react["default"].createElement(_documentContext.DocumentContext.Provider, {
        value: props
      }, /*#__PURE__*/_react["default"].createElement(DocumentComponent, props));
    }
  }]);

  return Document;
}(_react.Component);

exports.default = Document;

function Html(props) {
  var _ref = (0, _react.useContext)(_documentContext.DocumentContext),
      inAmpMode = _ref.inAmpMode,
      docComponentsRendered = _ref.docComponentsRendered,
      locale = _ref.locale;

  docComponentsRendered.Html = true;
  return /*#__PURE__*/_react["default"].createElement("html", Object.assign({}, props, {
    lang: props.lang || locale || undefined,
    amp: inAmpMode ? '' : undefined,
    "data-ampdevmode": inAmpMode && true ? '' : undefined
  }));
}

var Head = /*#__PURE__*/function (_react$Component2) {
  _inherits(Head, _react$Component2);

  var _super2 = _createSuper(Head);

  function Head() {
    var _this;

    _classCallCheck(this, Head);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super2.call.apply(_super2, [this].concat(args));
    _this.context = void 0;
    return _this;
  }

  _createClass(Head, [{
    key: "getCssLinks",
    value: function getCssLinks(files) {
      var _this2 = this;

      var _this$context = this.context,
          assetPrefix = _this$context.assetPrefix,
          devOnlyCacheBusterQueryString = _this$context.devOnlyCacheBusterQueryString,
          dynamicImports = _this$context.dynamicImports;
      var cssFiles = files.allFiles.filter(function (f) {
        return f.endsWith('.css');
      });
      var sharedFiles = new Set(files.sharedFiles); // Unmanaged files are CSS files that will be handled directly by the
      // webpack runtime (`mini-css-extract-plugin`).

      var unmangedFiles = new Set([]);
      var dynamicCssFiles = Array.from(new Set(dynamicImports.filter(function (file) {
        return file.endsWith('.css');
      })));

      if (dynamicCssFiles.length) {
        var existing = new Set(cssFiles);
        dynamicCssFiles = dynamicCssFiles.filter(function (f) {
          return !(existing.has(f) || sharedFiles.has(f));
        });
        unmangedFiles = new Set(dynamicCssFiles);
        cssFiles.push.apply(cssFiles, _toConsumableArray(dynamicCssFiles));
      }

      var cssLinkElements = [];
      cssFiles.forEach(function (file) {
        var isSharedFile = sharedFiles.has(file);

        if (true) {
          cssLinkElements.push( /*#__PURE__*/_react["default"].createElement("link", {
            key: "".concat(file, "-preload"),
            nonce: _this2.props.nonce,
            rel: "preload",
            href: "".concat(assetPrefix, "/_next/").concat(encodeURI(file)).concat(devOnlyCacheBusterQueryString),
            as: "style",
            crossOrigin: _this2.props.crossOrigin || undefined
          }));
        }

        var isUnmanagedFile = unmangedFiles.has(file);
        cssLinkElements.push( /*#__PURE__*/_react["default"].createElement("link", {
          key: file,
          nonce: _this2.props.nonce,
          rel: "stylesheet",
          href: "".concat(assetPrefix, "/_next/").concat(encodeURI(file)).concat(devOnlyCacheBusterQueryString),
          crossOrigin: _this2.props.crossOrigin || undefined,
          "data-n-g": isUnmanagedFile ? undefined : isSharedFile ? '' : undefined,
          "data-n-p": isUnmanagedFile ? undefined : isSharedFile ? undefined : ''
        }));
      });

      if (false) {}

      return cssLinkElements.length === 0 ? null : cssLinkElements;
    }
  }, {
    key: "getPreloadDynamicChunks",
    value: function getPreloadDynamicChunks() {
      var _this3 = this;

      var _this$context2 = this.context,
          dynamicImports = _this$context2.dynamicImports,
          assetPrefix = _this$context2.assetPrefix,
          devOnlyCacheBusterQueryString = _this$context2.devOnlyCacheBusterQueryString;
      return dynamicImports.map(function (file) {
        if (!file.endsWith('.js')) {
          return null;
        }

        return /*#__PURE__*/_react["default"].createElement("link", {
          rel: "preload",
          key: file,
          href: "".concat(assetPrefix, "/_next/").concat(encodeURI(file)).concat(devOnlyCacheBusterQueryString),
          as: "script",
          nonce: _this3.props.nonce,
          crossOrigin: _this3.props.crossOrigin || undefined
        });
      }) // Filter out nulled scripts
      .filter(Boolean);
    }
  }, {
    key: "getPreloadMainLinks",
    value: function getPreloadMainLinks(files) {
      var _this4 = this;

      var _this$context3 = this.context,
          assetPrefix = _this$context3.assetPrefix,
          devOnlyCacheBusterQueryString = _this$context3.devOnlyCacheBusterQueryString,
          scriptLoader = _this$context3.scriptLoader;
      var preloadFiles = files.allFiles.filter(function (file) {
        return file.endsWith('.js');
      });
      return [].concat(_toConsumableArray((scriptLoader.beforeInteractive || []).map(function (file) {
        return /*#__PURE__*/_react["default"].createElement("link", {
          key: file.src,
          nonce: _this4.props.nonce,
          rel: "preload",
          href: file.src,
          as: "script",
          crossOrigin: _this4.props.crossOrigin || undefined
        });
      })), _toConsumableArray(preloadFiles.map(function (file) {
        return /*#__PURE__*/_react["default"].createElement("link", {
          key: file,
          nonce: _this4.props.nonce,
          rel: "preload",
          href: "".concat(assetPrefix, "/_next/").concat(encodeURI(file)).concat(devOnlyCacheBusterQueryString),
          as: "script",
          crossOrigin: _this4.props.crossOrigin || undefined
        });
      })));
    }
  }, {
    key: "getDynamicChunks",
    value: function getDynamicChunks(files) {
      return _getDynamicChunks(this.context, this.props, files);
    }
  }, {
    key: "getPreNextScripts",
    value: function getPreNextScripts() {
      return _getPreNextScripts(this.context, this.props);
    }
  }, {
    key: "getScripts",
    value: function getScripts(files) {
      return _getScripts(this.context, this.props, files);
    }
  }, {
    key: "getPolyfillScripts",
    value: function getPolyfillScripts() {
      return _getPolyfillScripts(this.context, this.props);
    }
  }, {
    key: "handleDocumentScriptLoaderItems",
    value: function handleDocumentScriptLoaderItems(children) {
      var scriptLoader = this.context.scriptLoader;
      var scriptLoaderItems = [];
      var filteredChildren = [];

      _react["default"].Children.forEach(children, function (child) {
        if (child.type === _script["default"]) {
          if (child.props.strategy === 'beforeInteractive') {
            scriptLoader.beforeInteractive = (scriptLoader.beforeInteractive || []).concat([_objectSpread({}, child.props)]);
            return;
          } else if (['lazyOnload', 'afterInteractive'].includes(child.props.strategy)) {
            scriptLoaderItems.push(child.props);
            return;
          }
        }

        filteredChildren.push(child);
      });

      this.context.__NEXT_DATA__.scriptLoader = scriptLoaderItems;
      return filteredChildren;
    }
  }, {
    key: "makeStylesheetInert",
    value: function makeStylesheetInert(node) {
      var _this5 = this;

      return _react["default"].Children.map(node, function (c) {
        if (c.type === 'link' && c.props['href'] && _constants.OPTIMIZED_FONT_PROVIDERS.some(function (_ref2) {
          var url = _ref2.url;
          return c.props['href'].startsWith(url);
        })) {
          var newProps = _objectSpread({}, c.props || {});

          newProps['data-href'] = newProps['href'];
          newProps['href'] = undefined;
          return /*#__PURE__*/_react["default"].cloneElement(c, newProps);
        } else if (c.props && c.props['children']) {
          c.props['children'] = _this5.makeStylesheetInert(c.props['children']);
        }

        return c;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _react$default;

      var _this$props$nonce, _this$props$nonce2;

      var _this$context4 = this.context,
          styles = _this$context4.styles,
          ampPath = _this$context4.ampPath,
          inAmpMode = _this$context4.inAmpMode,
          hybridAmp = _this$context4.hybridAmp,
          canonicalBase = _this$context4.canonicalBase,
          __NEXT_DATA__ = _this$context4.__NEXT_DATA__,
          dangerousAsPath = _this$context4.dangerousAsPath,
          headTags = _this$context4.headTags,
          unstable_runtimeJS = _this$context4.unstable_runtimeJS,
          unstable_JsPreload = _this$context4.unstable_JsPreload,
          disableOptimizedLoading = _this$context4.disableOptimizedLoading;
      var disableRuntimeJS = unstable_runtimeJS === false;
      var disableJsPreload = unstable_JsPreload === false || !disableOptimizedLoading;
      this.context.docComponentsRendered.Head = true;
      var head = this.context.head;
      var cssPreloads = [];
      var otherHeadElements = [];

      if (head) {
        head.forEach(function (c) {
          if (c && c.type === 'link' && c.props['rel'] === 'preload' && c.props['as'] === 'style') {
            cssPreloads.push(c);
          } else {
            c && otherHeadElements.push(c);
          }
        });
        head = cssPreloads.concat(otherHeadElements);
      }

      var children = _react["default"].Children.toArray(this.props.children).filter(Boolean); // show a warning if Head contains <title> (only in development)


      if (true) {
        children = _react["default"].Children.map(children, function (child) {
          var _child$props;

          var isReactHelmet = child == null ? void 0 : (_child$props = child.props) == null ? void 0 : _child$props['data-react-helmet'];

          if (!isReactHelmet) {
            var _child$props2;

            if ((child == null ? void 0 : child.type) === 'title') {
              console.warn("Warning: <title> should not be used in _document.js's <Head>. https://nextjs.org/docs/messages/no-document-title");
            } else if ((child == null ? void 0 : child.type) === 'meta' && (child == null ? void 0 : (_child$props2 = child.props) == null ? void 0 : _child$props2.name) === 'viewport') {
              console.warn("Warning: viewport meta tags should not be used in _document.js's <Head>. https://nextjs.org/docs/messages/no-document-viewport-meta");
            }
          }

          return child;
        });
        if (this.props.crossOrigin) console.warn('Warning: `Head` attribute `crossOrigin` is deprecated. https://nextjs.org/docs/messages/doc-crossorigin-deprecated');
      }

      if (false) {}

      children = this.handleDocumentScriptLoaderItems(children);
      var hasAmphtmlRel = false;
      var hasCanonicalRel = false; // show warning and remove conflicting amp head tags

      head = _react["default"].Children.map(head || [], function (child) {
        if (!child) return child;
        var type = child.type,
            props = child.props;

        if (inAmpMode) {
          var badProp = '';

          if (type === 'meta' && props.name === 'viewport') {
            badProp = 'name="viewport"';
          } else if (type === 'link' && props.rel === 'canonical') {
            hasCanonicalRel = true;
          } else if (type === 'script') {
            // only block if
            // 1. it has a src and isn't pointing to ampproject's CDN
            // 2. it is using dangerouslySetInnerHTML without a type or
            // a type of text/javascript
            if (props.src && props.src.indexOf('ampproject') < -1 || props.dangerouslySetInnerHTML && (!props.type || props.type === 'text/javascript')) {
              badProp = '<script';
              Object.keys(props).forEach(function (prop) {
                badProp += " ".concat(prop, "=\"").concat(props[prop], "\"");
              });
              badProp += '/>';
            }
          }

          if (badProp) {
            console.warn("Found conflicting amp tag \"".concat(child.type, "\" with conflicting prop ").concat(badProp, " in ").concat(__NEXT_DATA__.page, ". https://nextjs.org/docs/messages/conflicting-amp-tag"));
            return null;
          }
        } else {
          // non-amp mode
          if (type === 'link' && props.rel === 'amphtml') {
            hasAmphtmlRel = true;
          }
        }

        return child;
      }); // try to parse styles from fragment for backwards compat

      var curStyles = Array.isArray(styles) ? styles : [];

      if (inAmpMode && styles && // @ts-ignore Property 'props' does not exist on type ReactElement
      styles.props && // @ts-ignore Property 'props' does not exist on type ReactElement
      Array.isArray(styles.props.children)) {
        var hasStyles = function hasStyles(el) {
          var _el$props, _el$props$dangerously;

          return el == null ? void 0 : (_el$props = el.props) == null ? void 0 : (_el$props$dangerously = _el$props.dangerouslySetInnerHTML) == null ? void 0 : _el$props$dangerously.__html;
        }; // @ts-ignore Property 'props' does not exist on type ReactElement


        styles.props.children.forEach(function (child) {
          if (Array.isArray(child)) {
            child.forEach(function (el) {
              return hasStyles(el) && curStyles.push(el);
            });
          } else if (hasStyles(child)) {
            curStyles.push(child);
          }
        });
      }

      var files = getDocumentFiles(this.context.buildManifest, this.context.__NEXT_DATA__.page, inAmpMode);
      return /*#__PURE__*/_react["default"].createElement("head", this.props, this.context.isDevelopment && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("style", {
        "data-next-hide-fouc": true,
        "data-ampdevmode": inAmpMode ? 'true' : undefined,
        dangerouslySetInnerHTML: {
          __html: "body{display:none}"
        }
      }), /*#__PURE__*/_react["default"].createElement("noscript", {
        "data-next-hide-fouc": true,
        "data-ampdevmode": inAmpMode ? 'true' : undefined
      }, /*#__PURE__*/_react["default"].createElement("style", {
        dangerouslySetInnerHTML: {
          __html: "body{display:block}"
        }
      }))), children,  false && /*#__PURE__*/0, head, /*#__PURE__*/_react["default"].createElement("meta", {
        name: "next-head-count",
        content: _react["default"].Children.count(head || []).toString()
      }), inAmpMode && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("meta", {
        name: "viewport",
        content: "width=device-width,minimum-scale=1,initial-scale=1"
      }), !hasCanonicalRel && /*#__PURE__*/_react["default"].createElement("link", {
        rel: "canonical",
        href: canonicalBase + (0, _utils2.cleanAmpPath)(dangerousAsPath)
      }), /*#__PURE__*/_react["default"].createElement("link", {
        rel: "preload",
        as: "script",
        href: "https://cdn.ampproject.org/v0.js"
      }), styles && /*#__PURE__*/_react["default"].createElement("style", {
        "amp-custom": "",
        dangerouslySetInnerHTML: {
          __html: curStyles.map(function (style) {
            return style.props.dangerouslySetInnerHTML.__html;
          }).join('').replace(/\/\*# sourceMappingURL=.*\*\//g, '').replace(/\/\*@ sourceURL=.*?\*\//g, '')
        }
      }), /*#__PURE__*/_react["default"].createElement("style", {
        "amp-boilerplate": "",
        dangerouslySetInnerHTML: {
          __html: "body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}"
        }
      }), /*#__PURE__*/_react["default"].createElement("noscript", null, /*#__PURE__*/_react["default"].createElement("style", {
        "amp-boilerplate": "",
        dangerouslySetInnerHTML: {
          __html: "body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}"
        }
      })), /*#__PURE__*/_react["default"].createElement("script", {
        async: true,
        src: "https://cdn.ampproject.org/v0.js"
      })), !inAmpMode && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, !hasAmphtmlRel && hybridAmp && /*#__PURE__*/_react["default"].createElement("link", {
        rel: "amphtml",
        href: canonicalBase + getAmpPath(ampPath, dangerousAsPath)
      }),  true && this.getCssLinks(files),  true && /*#__PURE__*/_react["default"].createElement("noscript", {
        "data-n-css": (_this$props$nonce = this.props.nonce) != null ? _this$props$nonce : ''
      }),  false && /*#__PURE__*/0, !disableRuntimeJS && !disableJsPreload && this.getPreloadDynamicChunks(), !disableRuntimeJS && !disableJsPreload && this.getPreloadMainLinks(files), !disableOptimizedLoading && !disableRuntimeJS && this.getPolyfillScripts(), !disableOptimizedLoading && !disableRuntimeJS && this.getPreNextScripts(), !disableOptimizedLoading && !disableRuntimeJS && this.getDynamicChunks(files), !disableOptimizedLoading && !disableRuntimeJS && this.getScripts(files),  false && 0,  false && /*#__PURE__*/0, this.context.isDevelopment &&
      /*#__PURE__*/
      // this element is used to mount development styles so the
      // ordering matches production
      // (by default, style-loader injects at the bottom of <head />)
      _react["default"].createElement("noscript", {
        id: "__next_css__DO_NOT_USE__"
      }), styles || null), /*#__PURE__*/(_react$default = _react["default"]).createElement.apply(_react$default, [_react["default"].Fragment, {}].concat(_toConsumableArray(headTags || []))));
    }
  }]);

  return Head;
}(_react.Component);

exports.Head = Head;
Head.contextType = _documentContext.DocumentContext;
Head.propTypes = {
  nonce: _propTypes["default"].string,
  crossOrigin: _propTypes["default"].string
};

function Main() {
  var _ref3 = (0, _react.useContext)(_documentContext.DocumentContext),
      inAmpMode = _ref3.inAmpMode,
      html = _ref3.html,
      docComponentsRendered = _ref3.docComponentsRendered;

  docComponentsRendered.Main = true;
  if (inAmpMode) return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, _constants.AMP_RENDER_TARGET);
  return /*#__PURE__*/_react["default"].createElement("div", {
    id: "__next",
    dangerouslySetInnerHTML: {
      __html: html
    }
  });
}

var NextScript = /*#__PURE__*/function (_react$Component3) {
  _inherits(NextScript, _react$Component3);

  var _super3 = _createSuper(NextScript);

  function NextScript() {
    var _this6;

    _classCallCheck(this, NextScript);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this6 = _super3.call.apply(_super3, [this].concat(args));
    _this6.context = void 0;
    return _this6;
  }

  _createClass(NextScript, [{
    key: "getDynamicChunks",
    value: function getDynamicChunks(files) {
      return _getDynamicChunks(this.context, this.props, files);
    }
  }, {
    key: "getPreNextScripts",
    value: function getPreNextScripts() {
      return _getPreNextScripts(this.context, this.props);
    }
  }, {
    key: "getScripts",
    value: function getScripts(files) {
      return _getScripts(this.context, this.props, files);
    }
  }, {
    key: "getPolyfillScripts",
    value: function getPolyfillScripts() {
      return _getPolyfillScripts(this.context, this.props);
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var _this$context5 = this.context,
          assetPrefix = _this$context5.assetPrefix,
          inAmpMode = _this$context5.inAmpMode,
          buildManifest = _this$context5.buildManifest,
          unstable_runtimeJS = _this$context5.unstable_runtimeJS,
          docComponentsRendered = _this$context5.docComponentsRendered,
          devOnlyCacheBusterQueryString = _this$context5.devOnlyCacheBusterQueryString,
          disableOptimizedLoading = _this$context5.disableOptimizedLoading;
      var disableRuntimeJS = unstable_runtimeJS === false;
      docComponentsRendered.NextScript = true;

      if (inAmpMode) {
        if (false) {}

        var ampDevFiles = [].concat(_toConsumableArray(buildManifest.devFiles), _toConsumableArray(buildManifest.polyfillFiles), _toConsumableArray(buildManifest.ampDevFiles));
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, disableRuntimeJS ? null : /*#__PURE__*/_react["default"].createElement("script", {
          id: "__NEXT_DATA__",
          type: "application/json",
          nonce: this.props.nonce,
          crossOrigin: this.props.crossOrigin || undefined,
          dangerouslySetInnerHTML: {
            __html: NextScript.getInlineScriptSource(this.context)
          },
          "data-ampdevmode": true
        }), ampDevFiles.map(function (file) {
          return /*#__PURE__*/_react["default"].createElement("script", {
            key: file,
            src: "".concat(assetPrefix, "/_next/").concat(file).concat(devOnlyCacheBusterQueryString),
            nonce: _this7.props.nonce,
            crossOrigin: _this7.props.crossOrigin || undefined,
            "data-ampdevmode": true
          });
        }));
      }

      if (true) {
        if (this.props.crossOrigin) console.warn('Warning: `NextScript` attribute `crossOrigin` is deprecated. https://nextjs.org/docs/messages/doc-crossorigin-deprecated');
      }

      var files = getDocumentFiles(this.context.buildManifest, this.context.__NEXT_DATA__.page, inAmpMode);
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, !disableRuntimeJS && buildManifest.devFiles ? buildManifest.devFiles.map(function (file) {
        return /*#__PURE__*/_react["default"].createElement("script", {
          key: file,
          src: "".concat(assetPrefix, "/_next/").concat(encodeURI(file)).concat(devOnlyCacheBusterQueryString),
          nonce: _this7.props.nonce,
          crossOrigin: _this7.props.crossOrigin || undefined
        });
      }) : null, disableRuntimeJS ? null : /*#__PURE__*/_react["default"].createElement("script", {
        id: "__NEXT_DATA__",
        type: "application/json",
        nonce: this.props.nonce,
        crossOrigin: this.props.crossOrigin || undefined,
        dangerouslySetInnerHTML: {
          __html: NextScript.getInlineScriptSource(this.context)
        }
      }), disableOptimizedLoading && !disableRuntimeJS && this.getPolyfillScripts(), disableOptimizedLoading && !disableRuntimeJS && this.getPreNextScripts(), disableOptimizedLoading && !disableRuntimeJS && this.getDynamicChunks(files), disableOptimizedLoading && !disableRuntimeJS && this.getScripts(files));
    }
  }], [{
    key: "getInlineScriptSource",
    value: function getInlineScriptSource(documentProps) {
      var __NEXT_DATA__ = documentProps.__NEXT_DATA__;

      try {
        var data = JSON.stringify(__NEXT_DATA__);
        return (0, _htmlescape.htmlEscapeJsonString)(data);
      } catch (err) {
        if (err.message.indexOf('circular structure')) {
          throw new Error("Circular structure in \"getInitialProps\" result of page \"".concat(__NEXT_DATA__.page, "\". https://nextjs.org/docs/messages/circular-structure"));
        }

        throw err;
      }
    }
  }]);

  return NextScript;
}(_react.Component);

exports.NextScript = NextScript;
NextScript.contextType = _documentContext.DocumentContext;
NextScript.propTypes = {
  nonce: _propTypes["default"].string,
  crossOrigin: _propTypes["default"].string
};
NextScript.safariNomoduleFix = '!function(){var e=document,t=e.createElement("script");if(!("noModule"in t)&&"onbeforeload"in t){var n=!1;e.addEventListener("beforeload",function(e){if(e.target===t)n=!0;else if(!e.target.hasAttribute("nomodule")||!n)return;e.preventDefault()},!0),t.type="module",t.src=".",e.head.appendChild(t),t.remove()}}();';

function getAmpPath(ampPath, asPath) {
  return ampPath || "".concat(asPath).concat(asPath.includes('?') ? '&' : '?', "amp=1");
}

/***/ }),

/***/ "./node_modules/next/dist/server/htmlescape.js":
/*!*****************************************************!*\
  !*** ./node_modules/next/dist/server/htmlescape.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
exports.__esModule=true;exports.htmlEscapeJsonString=htmlEscapeJsonString;// This utility is based on https://github.com/zertosh/htmlescape
// License: https://github.com/zertosh/htmlescape/blob/0527ca7156a524d256101bb310a9f970f63078ad/LICENSE
const ESCAPE_LOOKUP={'&':'\\u0026','>':'\\u003e','<':'\\u003c','\u2028':'\\u2028','\u2029':'\\u2029'};const ESCAPE_REGEX=/[&><\u2028\u2029]/g;function htmlEscapeJsonString(str){return str.replace(ESCAPE_REGEX,match=>ESCAPE_LOOKUP[match]);}
//# sourceMappingURL=htmlescape.js.map

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/arrayLikeToArray.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \***********************************************************************************/
/***/ (function(module) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \*********************************************************************************/
/***/ (function(module) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
/*!************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray */ "./node_modules/next/node_modules/@babel/runtime/helpers/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \****************************************************************************************/
/***/ (function(module) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/asyncToGenerator.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \***********************************************************************************/
/***/ (function(module) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \*********************************************************************************/
/***/ (function(module) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/createClass.js":
/*!******************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/createClass.js ***!
  \******************************************************************************/
/***/ (function(module) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/defineProperty.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \*********************************************************************************/
/***/ (function(module) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/extends.js":
/*!**************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/extends.js ***!
  \**************************************************************************/
/***/ (function(module) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \*********************************************************************************/
/***/ (function(module) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/inherits.js":
/*!***************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/inherits.js ***!
  \***************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "./node_modules/next/node_modules/@babel/runtime/helpers/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \****************************************************************************************/
/***/ (function(module) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/iterableToArray.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \**********************************************************************************/
/***/ (function(module) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \***************************************************************************************/
/***/ (function(module) {

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \**********************************************************************************/
/***/ (function(module) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/nonIterableSpread.js":
/*!************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \************************************************************************************/
/***/ (function(module) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/objectWithoutProperties.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/objectWithoutProperties.js ***!
  \******************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var objectWithoutPropertiesLoose = __webpack_require__(/*! ./objectWithoutPropertiesLoose */ "./node_modules/next/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

module.exports = _objectWithoutProperties;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js ***!
  \***********************************************************************************************/
/***/ (function(module) {

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \********************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/next/node_modules/@babel/runtime/helpers/typeof.js");

var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ "./node_modules/next/node_modules/@babel/runtime/helpers/assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \*********************************************************************************/
/***/ (function(module) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/slicedToArray.js":
/*!********************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \********************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles */ "./node_modules/next/node_modules/@babel/runtime/helpers/arrayWithHoles.js");

var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit */ "./node_modules/next/node_modules/@babel/runtime/helpers/iterableToArrayLimit.js");

var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray */ "./node_modules/next/node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");

var nonIterableRest = __webpack_require__(/*! ./nonIterableRest */ "./node_modules/next/node_modules/@babel/runtime/helpers/nonIterableRest.js");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/toConsumableArray.js":
/*!************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles */ "./node_modules/next/node_modules/@babel/runtime/helpers/arrayWithoutHoles.js");

var iterableToArray = __webpack_require__(/*! ./iterableToArray */ "./node_modules/next/node_modules/@babel/runtime/helpers/iterableToArray.js");

var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray */ "./node_modules/next/node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");

var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread */ "./node_modules/next/node_modules/@babel/runtime/helpers/nonIterableSpread.js");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/typeof.js":
/*!*************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/typeof.js ***!
  \*************************************************************************/
/***/ (function(module) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \*********************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray */ "./node_modules/next/node_modules/@babel/runtime/helpers/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/regenerator/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/regenerator/index.js ***!
  \****************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "regenerator-runtime");


/***/ }),

/***/ "../next-server/lib/constants":
/*!*********************************************************!*\
  !*** external "next/dist/next-server/lib/constants.js" ***!
  \*********************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/constants.js");;

/***/ }),

/***/ "../next-server/lib/document-context":
/*!****************************************************************!*\
  !*** external "next/dist/next-server/lib/document-context.js" ***!
  \****************************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/document-context.js");;

/***/ }),

/***/ "../next-server/lib/head-manager-context":
/*!********************************************************************!*\
  !*** external "next/dist/next-server/lib/head-manager-context.js" ***!
  \********************************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/head-manager-context.js");;

/***/ }),

/***/ "../next-server/lib/utils":
/*!*****************************************************!*\
  !*** external "next/dist/next-server/lib/utils.js" ***!
  \*****************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/utils.js");;

/***/ }),

/***/ "../next-server/server/get-page-files":
/*!*****************************************************************!*\
  !*** external "next/dist/next-server/server/get-page-files.js" ***!
  \*****************************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/server/get-page-files.js");;

/***/ }),

/***/ "../next-server/server/utils":
/*!********************************************************!*\
  !*** external "next/dist/next-server/server/utils.js" ***!
  \********************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/server/utils.js");;

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/***/ (function(module) {

"use strict";
module.exports = require("prop-types");;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ "regenerator-runtime":
/*!**************************************!*\
  !*** external "regenerator-runtime" ***!
  \**************************************/
/***/ (function(module) {

"use strict";
module.exports = require("regenerator-runtime");;

/***/ }),

/***/ "styled-jsx/server":
/*!************************************!*\
  !*** external "styled-jsx/server" ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = require("styled-jsx/server");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__("./node_modules/next/dist/pages/_document.js"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wZXJzb25hbC1kZXZlbG9wbWVudC1wbGFuLXByb2plY3QvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC9oZWFkLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vcGVyc29uYWwtZGV2ZWxvcG1lbnQtcGxhbi1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jbGllbnQvcmVxdWVzdC1pZGxlLWNhbGxiYWNrLmpzIiwid2VicGFjazovL3BlcnNvbmFsLWRldmVsb3BtZW50LXBsYW4tcHJvamVjdC8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvY2xpZW50L3NjcmlwdC5qcyIsIndlYnBhY2s6Ly9wZXJzb25hbC1kZXZlbG9wbWVudC1wbGFuLXByb2plY3QvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L3BhZ2VzL19kb2N1bWVudC5qcyIsIndlYnBhY2s6Ly9wZXJzb25hbC1kZXZlbG9wbWVudC1wbGFuLXByb2plY3QvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L3NlcnZlci9odG1sZXNjYXBlLmpzIiwid2VicGFjazovL3BlcnNvbmFsLWRldmVsb3BtZW50LXBsYW4tcHJvamVjdC8uL25vZGVfbW9kdWxlcy9uZXh0L25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5TGlrZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vcGVyc29uYWwtZGV2ZWxvcG1lbnQtcGxhbi1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL25leHQvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRoSG9sZXMuanMiLCJ3ZWJwYWNrOi8vcGVyc29uYWwtZGV2ZWxvcG1lbnQtcGxhbi1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL25leHQvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRob3V0SG9sZXMuanMiLCJ3ZWJwYWNrOi8vcGVyc29uYWwtZGV2ZWxvcG1lbnQtcGxhbi1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL25leHQvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovL3BlcnNvbmFsLWRldmVsb3BtZW50LXBsYW4tcHJvamVjdC8uL25vZGVfbW9kdWxlcy9uZXh0L25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vcGVyc29uYWwtZGV2ZWxvcG1lbnQtcGxhbi1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL25leHQvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vcGVyc29uYWwtZGV2ZWxvcG1lbnQtcGxhbi1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL25leHQvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vcGVyc29uYWwtZGV2ZWxvcG1lbnQtcGxhbi1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL25leHQvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vcGVyc29uYWwtZGV2ZWxvcG1lbnQtcGxhbi1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL25leHQvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXh0ZW5kcy5qcyIsIndlYnBhY2s6Ly9wZXJzb25hbC1kZXZlbG9wbWVudC1wbGFuLXByb2plY3QvLi9ub2RlX21vZHVsZXMvbmV4dC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9nZXRQcm90b3R5cGVPZi5qcyIsIndlYnBhY2s6Ly9wZXJzb25hbC1kZXZlbG9wbWVudC1wbGFuLXByb2plY3QvLi9ub2RlX21vZHVsZXMvbmV4dC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qcyIsIndlYnBhY2s6Ly9wZXJzb25hbC1kZXZlbG9wbWVudC1wbGFuLXByb2plY3QvLi9ub2RlX21vZHVsZXMvbmV4dC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJ3ZWJwYWNrOi8vcGVyc29uYWwtZGV2ZWxvcG1lbnQtcGxhbi1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL25leHQvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovL3BlcnNvbmFsLWRldmVsb3BtZW50LXBsYW4tcHJvamVjdC8uL25vZGVfbW9kdWxlcy9uZXh0L25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzIiwid2VicGFjazovL3BlcnNvbmFsLWRldmVsb3BtZW50LXBsYW4tcHJvamVjdC8uL25vZGVfbW9kdWxlcy9uZXh0L25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL25vbkl0ZXJhYmxlUmVzdC5qcyIsIndlYnBhY2s6Ly9wZXJzb25hbC1kZXZlbG9wbWVudC1wbGFuLXByb2plY3QvLi9ub2RlX21vZHVsZXMvbmV4dC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVNwcmVhZC5qcyIsIndlYnBhY2s6Ly9wZXJzb25hbC1kZXZlbG9wbWVudC1wbGFuLXByb2plY3QvLi9ub2RlX21vZHVsZXMvbmV4dC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RXaXRob3V0UHJvcGVydGllcy5qcyIsIndlYnBhY2s6Ly9wZXJzb25hbC1kZXZlbG9wbWVudC1wbGFuLXByb2plY3QvLi9ub2RlX21vZHVsZXMvbmV4dC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlLmpzIiwid2VicGFjazovL3BlcnNvbmFsLWRldmVsb3BtZW50LXBsYW4tcHJvamVjdC8uL25vZGVfbW9kdWxlcy9uZXh0L25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanMiLCJ3ZWJwYWNrOi8vcGVyc29uYWwtZGV2ZWxvcG1lbnQtcGxhbi1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL25leHQvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc2V0UHJvdG90eXBlT2YuanMiLCJ3ZWJwYWNrOi8vcGVyc29uYWwtZGV2ZWxvcG1lbnQtcGxhbi1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL25leHQvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9wZXJzb25hbC1kZXZlbG9wbWVudC1wbGFuLXByb2plY3QvLi9ub2RlX21vZHVsZXMvbmV4dC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90b0NvbnN1bWFibGVBcnJheS5qcyIsIndlYnBhY2s6Ly9wZXJzb25hbC1kZXZlbG9wbWVudC1wbGFuLXByb2plY3QvLi9ub2RlX21vZHVsZXMvbmV4dC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vcGVyc29uYWwtZGV2ZWxvcG1lbnQtcGxhbi1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL25leHQvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vcGVyc29uYWwtZGV2ZWxvcG1lbnQtcGxhbi1wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL25leHQvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yL2luZGV4LmpzIiwid2VicGFjazovL3BlcnNvbmFsLWRldmVsb3BtZW50LXBsYW4tcHJvamVjdC9leHRlcm5hbCBcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9saWIvY29uc3RhbnRzLmpzXCIiLCJ3ZWJwYWNrOi8vcGVyc29uYWwtZGV2ZWxvcG1lbnQtcGxhbi1wcm9qZWN0L2V4dGVybmFsIFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi9kb2N1bWVudC1jb250ZXh0LmpzXCIiLCJ3ZWJwYWNrOi8vcGVyc29uYWwtZGV2ZWxvcG1lbnQtcGxhbi1wcm9qZWN0L2V4dGVybmFsIFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi9oZWFkLW1hbmFnZXItY29udGV4dC5qc1wiIiwid2VicGFjazovL3BlcnNvbmFsLWRldmVsb3BtZW50LXBsYW4tcHJvamVjdC9leHRlcm5hbCBcIm5leHQvZGlzdC9uZXh0LXNlcnZlci9saWIvdXRpbHMuanNcIiIsIndlYnBhY2s6Ly9wZXJzb25hbC1kZXZlbG9wbWVudC1wbGFuLXByb2plY3QvZXh0ZXJuYWwgXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvc2VydmVyL2dldC1wYWdlLWZpbGVzLmpzXCIiLCJ3ZWJwYWNrOi8vcGVyc29uYWwtZGV2ZWxvcG1lbnQtcGxhbi1wcm9qZWN0L2V4dGVybmFsIFwibmV4dC9kaXN0L25leHQtc2VydmVyL3NlcnZlci91dGlscy5qc1wiIiwid2VicGFjazovL3BlcnNvbmFsLWRldmVsb3BtZW50LXBsYW4tcHJvamVjdC9leHRlcm5hbCBcInByb3AtdHlwZXNcIiIsIndlYnBhY2s6Ly9wZXJzb25hbC1kZXZlbG9wbWVudC1wbGFuLXByb2plY3QvZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovL3BlcnNvbmFsLWRldmVsb3BtZW50LXBsYW4tcHJvamVjdC9leHRlcm5hbCBcInJlZ2VuZXJhdG9yLXJ1bnRpbWVcIiIsIndlYnBhY2s6Ly9wZXJzb25hbC1kZXZlbG9wbWVudC1wbGFuLXByb2plY3QvZXh0ZXJuYWwgXCJzdHlsZWQtanN4L3NlcnZlclwiIl0sIm5hbWVzIjpbImV4cG9ydHMiLCJpbml0SGVhZE1hbmFnZXIiLCJET01BdHRyaWJ1dGVOYW1lcyIsImFjY2VwdENoYXJzZXQiLCJjbGFzc05hbWUiLCJodG1sRm9yIiwiaHR0cEVxdWl2Iiwibm9Nb2R1bGUiLCJyZWFjdEVsZW1lbnRUb0RPTSIsInR5cGUiLCJwcm9wcyIsImVsIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwicCIsImhhc093blByb3BlcnR5IiwidW5kZWZpbmVkIiwiYXR0ciIsInRvTG93ZXJDYXNlIiwic2V0QXR0cmlidXRlIiwiY2hpbGRyZW4iLCJkYW5nZXJvdXNseVNldElubmVySFRNTCIsImlubmVySFRNTCIsIl9faHRtbCIsInRleHRDb250ZW50IiwiQXJyYXkiLCJpc0FycmF5Iiwiam9pbiIsInVwZGF0ZUVsZW1lbnRzIiwiY29tcG9uZW50cyIsImhlYWRFbCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaGVhZENvdW50RWwiLCJxdWVyeVNlbGVjdG9yIiwiY29uc29sZSIsImVycm9yIiwiaGVhZENvdW50IiwiTnVtYmVyIiwiY29udGVudCIsIm9sZFRhZ3MiLCJpIiwiaiIsInByZXZpb3VzRWxlbWVudFNpYmxpbmciLCJ0YWdOYW1lIiwicHVzaCIsIm5ld1RhZ3MiLCJtYXAiLCJmaWx0ZXIiLCJuZXdUYWciLCJrIiwibGVuIiwibGVuZ3RoIiwib2xkVGFnIiwiaXNFcXVhbE5vZGUiLCJzcGxpY2UiLCJmb3JFYWNoIiwidCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImluc2VydEJlZm9yZSIsInRvU3RyaW5nIiwidXBkYXRlUHJvbWlzZSIsIm1vdW50ZWRJbnN0YW5jZXMiLCJTZXQiLCJ1cGRhdGVIZWFkIiwiaGVhZCIsInByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJ0YWdzIiwiaCIsImhyZWYiLCJ0aXRsZUNvbXBvbmVudCIsInRpdGxlIiwicmVxdWVzdElkbGVDYWxsYmFjayIsInNlbGYiLCJjYiIsInN0YXJ0IiwiRGF0ZSIsIm5vdyIsInNldFRpbWVvdXQiLCJkaWRUaW1lb3V0IiwidGltZVJlbWFpbmluZyIsIk1hdGgiLCJtYXgiLCJjYW5jZWxJZGxlQ2FsbGJhY2siLCJpZCIsImNsZWFyVGltZW91dCIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiaW5pdFNjcmlwdExvYWRlciIsIl9leHRlbmRzMiIsIl9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlMiIsIl9yZWFjdCIsIl9oZWFkTWFuYWdlckNvbnRleHQiLCJfaGVhZE1hbmFnZXIiLCJfcmVxdWVzdElkbGVDYWxsYmFjayIsIlNjcmlwdENhY2hlIiwiTWFwIiwiTG9hZENhY2hlIiwiaWdub3JlUHJvcHMiLCJsb2FkU2NyaXB0Iiwic3JjIiwib25Mb2FkIiwib25FcnJvciIsImNhY2hlS2V5IiwiaGFzIiwiYWRkIiwiZ2V0IiwibG9hZFByb21pc2UiLCJyZWplY3QiLCJhZGRFdmVudExpc3RlbmVyIiwiY2FsbCIsInNldCIsIk9iamVjdCIsImVudHJpZXMiLCJ2YWx1ZSIsImluY2x1ZGVzIiwiYm9keSIsImFwcGVuZENoaWxkIiwiaGFuZGxlQ2xpZW50U2NyaXB0TG9hZCIsInN0cmF0ZWd5Iiwid2luZG93IiwibG9hZExhenlTY3JpcHQiLCJyZWFkeVN0YXRlIiwic2NyaXB0TG9hZGVySXRlbXMiLCJTY3JpcHQiLCJyZXN0UHJvcHMiLCJ1c2VDb250ZXh0IiwiSGVhZE1hbmFnZXJDb250ZXh0IiwidXBkYXRlU2NyaXB0cyIsInNjcmlwdHMiLCJ1c2VFZmZlY3QiLCJiZWZvcmVJbnRlcmFjdGl2ZSIsImNvbmNhdCIsIl9kZWZhdWx0IiwiSHRtbCIsIk1haW4iLCJfcHJvcFR5cGVzIiwiX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQiLCJfc2VydmVyIiwiX2NvbnN0YW50cyIsIl9kb2N1bWVudENvbnRleHQiLCJfdXRpbHMiLCJEb2N1bWVudENvbnRleHQiLCJEb2N1bWVudEluaXRpYWxQcm9wcyIsIkRvY3VtZW50UHJvcHMiLCJfZ2V0UGFnZUZpbGVzIiwiX3V0aWxzMiIsIl9odG1sZXNjYXBlIiwiX3NjcmlwdCIsIl9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSIsIldlYWtNYXAiLCJjYWNoZSIsIm9iaiIsIl9fZXNNb2R1bGUiLCJuZXdPYmoiLCJoYXNQcm9wZXJ0eURlc2NyaXB0b3IiLCJkZWZpbmVQcm9wZXJ0eSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImtleSIsInByb3RvdHlwZSIsImRlc2MiLCJnZXREb2N1bWVudEZpbGVzIiwiYnVpbGRNYW5pZmVzdCIsInBhdGhuYW1lIiwiaW5BbXBNb2RlIiwic2hhcmVkRmlsZXMiLCJnZXRQYWdlRmlsZXMiLCJwYWdlRmlsZXMiLCJhbGxGaWxlcyIsImdldFBvbHlmaWxsU2NyaXB0cyIsImNvbnRleHQiLCJhc3NldFByZWZpeCIsImRldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nIiwiZGlzYWJsZU9wdGltaXplZExvYWRpbmciLCJwb2x5ZmlsbEZpbGVzIiwicG9seWZpbGwiLCJlbmRzV2l0aCIsImRlZmVyIiwibm9uY2UiLCJjcm9zc09yaWdpbiIsInByb2Nlc3MiLCJnZXRQcmVOZXh0U2NyaXB0cyIsInNjcmlwdExvYWRlciIsImZpbGUiLCJzY3JpcHRQcm9wcyIsImFzc2lnbiIsIl9fTkVYVF9DUk9TU19PUklHSU4iLCJnZXREeW5hbWljQ2h1bmtzIiwiZmlsZXMiLCJkeW5hbWljSW1wb3J0cyIsImlzRGV2ZWxvcG1lbnQiLCJhc3luYyIsImVuY29kZVVSSSIsImdldFNjcmlwdHMiLCJfYnVpbGRNYW5pZmVzdCRsb3dQcmkiLCJub3JtYWxTY3JpcHRzIiwibG93UHJpb3JpdHlTY3JpcHRzIiwibG93UHJpb3JpdHlGaWxlcyIsIkRvY3VtZW50IiwiSGVhZCIsIk5leHRTY3JpcHQiLCJjdHgiLCJlbmhhbmNlQXBwIiwiQXBwIiwicmVuZGVyUGFnZSIsImh0bWwiLCJzdHlsZXMiLCJEb2N1bWVudENvbXBvbmVudCIsIlByb3ZpZGVyIiwiQ29tcG9uZW50IiwiZG9jQ29tcG9uZW50c1JlbmRlcmVkIiwibG9jYWxlIiwibGFuZyIsImFtcCIsImFyZ3MiLCJjc3NGaWxlcyIsImYiLCJ1bm1hbmdlZEZpbGVzIiwiZHluYW1pY0Nzc0ZpbGVzIiwiZnJvbSIsImV4aXN0aW5nIiwiY3NzTGlua0VsZW1lbnRzIiwiaXNTaGFyZWRGaWxlIiwicmVsIiwiYXMiLCJpc1VubWFuYWdlZEZpbGUiLCJCb29sZWFuIiwicHJlbG9hZEZpbGVzIiwiZmlsdGVyZWRDaGlsZHJlbiIsIkNoaWxkcmVuIiwiY2hpbGQiLCJfX05FWFRfREFUQV9fIiwibm9kZSIsImMiLCJPUFRJTUlaRURfRk9OVF9QUk9WSURFUlMiLCJzb21lIiwidXJsIiwic3RhcnRzV2l0aCIsIm5ld1Byb3BzIiwiY2xvbmVFbGVtZW50IiwibWFrZVN0eWxlc2hlZXRJbmVydCIsIl90aGlzJHByb3BzJG5vbmNlIiwiX3RoaXMkcHJvcHMkbm9uY2UyIiwiYW1wUGF0aCIsImh5YnJpZEFtcCIsImNhbm9uaWNhbEJhc2UiLCJkYW5nZXJvdXNBc1BhdGgiLCJoZWFkVGFncyIsInVuc3RhYmxlX3J1bnRpbWVKUyIsInVuc3RhYmxlX0pzUHJlbG9hZCIsImRpc2FibGVSdW50aW1lSlMiLCJkaXNhYmxlSnNQcmVsb2FkIiwiY3NzUHJlbG9hZHMiLCJvdGhlckhlYWRFbGVtZW50cyIsInRvQXJyYXkiLCJfY2hpbGQkcHJvcHMiLCJpc1JlYWN0SGVsbWV0IiwiX2NoaWxkJHByb3BzMiIsIndhcm4iLCJuYW1lIiwiaGFuZGxlRG9jdW1lbnRTY3JpcHRMb2FkZXJJdGVtcyIsImhhc0FtcGh0bWxSZWwiLCJoYXNDYW5vbmljYWxSZWwiLCJiYWRQcm9wIiwiaW5kZXhPZiIsImtleXMiLCJwcm9wIiwicGFnZSIsImN1clN0eWxlcyIsImhhc1N0eWxlcyIsIl9lbCRwcm9wcyIsIl9lbCRwcm9wcyRkYW5nZXJvdXNseSIsIkZyYWdtZW50IiwiY291bnQiLCJjbGVhbkFtcFBhdGgiLCJzdHlsZSIsInJlcGxhY2UiLCJnZXRBbXBQYXRoIiwiZ2V0Q3NzTGlua3MiLCJnZXRQcmVsb2FkRHluYW1pY0NodW5rcyIsImdldFByZWxvYWRNYWluTGlua3MiLCJjb250ZXh0VHlwZSIsInByb3BUeXBlcyIsInN0cmluZyIsIkFNUF9SRU5ERVJfVEFSR0VUIiwiYW1wRGV2RmlsZXMiLCJkZXZGaWxlcyIsImdldElubGluZVNjcmlwdFNvdXJjZSIsImRvY3VtZW50UHJvcHMiLCJkYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsImh0bWxFc2NhcGVKc29uU3RyaW5nIiwiZXJyIiwibWVzc2FnZSIsIkVycm9yIiwic2FmYXJpTm9tb2R1bGVGaXgiLCJhc1BhdGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBYTs7QUFBQUEsa0JBQUEsR0FBbUIsSUFBbkI7QUFBd0JBLGVBQUEsR0FBZ0JDLGVBQWhCO0FBQWdDRCx5QkFBQSxHQUEwQixLQUFLLENBQS9CO0FBQWlDLElBQU1FLGlCQUFpQixHQUFDO0FBQUNDLGVBQWEsRUFBQyxnQkFBZjtBQUFnQ0MsV0FBUyxFQUFDLE9BQTFDO0FBQWtEQyxTQUFPLEVBQUMsS0FBMUQ7QUFBZ0VDLFdBQVMsRUFBQyxZQUExRTtBQUF1RkMsVUFBUSxFQUFDO0FBQWhHLENBQXhCO0FBQW9JUCx5QkFBQSxHQUEwQkUsaUJBQTFCOztBQUE0QyxTQUFTTSxpQkFBVCxPQUF3QztBQUFBLE1BQVpDLElBQVksUUFBWkEsSUFBWTtBQUFBLE1BQVBDLEtBQU8sUUFBUEEsS0FBTztBQUFDLE1BQU1DLEVBQUUsR0FBQ0MsUUFBUSxDQUFDQyxhQUFULENBQXVCSixJQUF2QixDQUFUOztBQUFzQyxPQUFJLElBQU1LLENBQVYsSUFBZUosS0FBZixFQUFxQjtBQUFDLFFBQUcsQ0FBQ0EsS0FBSyxDQUFDSyxjQUFOLENBQXFCRCxDQUFyQixDQUFKLEVBQTRCO0FBQVMsUUFBR0EsQ0FBQyxLQUFHLFVBQUosSUFBZ0JBLENBQUMsS0FBRyx5QkFBdkIsRUFBaUQsU0FBdkYsQ0FBZ0c7O0FBQzFkLFFBQUdKLEtBQUssQ0FBQ0ksQ0FBRCxDQUFMLEtBQVdFLFNBQWQsRUFBd0I7QUFBUyxRQUFNQyxJQUFJLEdBQUNmLGlCQUFpQixDQUFDWSxDQUFELENBQWpCLElBQXNCQSxDQUFDLENBQUNJLFdB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Q0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEseUI7Ozs7Ozs7Ozs7QUNoQkEsdUJBQXVCLG1CQUFPLENBQUMsdUdBQW9COztBQUVuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZDOzs7Ozs7Ozs7O0FDWEEsc0ZBQStDOzs7Ozs7Ozs7Ozs7QUNBL0Msb0U7Ozs7Ozs7Ozs7O0FDQUEsMkU7Ozs7Ozs7Ozs7O0FDQUEsK0U7Ozs7Ozs7Ozs7O0FDQUEsZ0U7Ozs7Ozs7Ozs7O0FDQUEsNEU7Ozs7Ozs7Ozs7O0FDQUEsbUU7Ozs7Ozs7Ozs7O0FDQUEsd0M7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsaUQ7Ozs7Ozs7Ozs7O0FDQUEsK0MiLCJmaWxlIjoicGFnZXMvX2RvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7ZXhwb3J0cy5fX2VzTW9kdWxlPXRydWU7ZXhwb3J0cy5kZWZhdWx0PWluaXRIZWFkTWFuYWdlcjtleHBvcnRzLkRPTUF0dHJpYnV0ZU5hbWVzPXZvaWQgMDtjb25zdCBET01BdHRyaWJ1dGVOYW1lcz17YWNjZXB0Q2hhcnNldDonYWNjZXB0LWNoYXJzZXQnLGNsYXNzTmFtZTonY2xhc3MnLGh0bWxGb3I6J2ZvcicsaHR0cEVxdWl2OidodHRwLWVxdWl2Jyxub01vZHVsZTonbm9Nb2R1bGUnfTtleHBvcnRzLkRPTUF0dHJpYnV0ZU5hbWVzPURPTUF0dHJpYnV0ZU5hbWVzO2Z1bmN0aW9uIHJlYWN0RWxlbWVudFRvRE9NKHt0eXBlLHByb3BzfSl7Y29uc3QgZWw9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtmb3IoY29uc3QgcCBpbiBwcm9wcyl7aWYoIXByb3BzLmhhc093blByb3BlcnR5KHApKWNvbnRpbnVlO2lmKHA9PT0nY2hpbGRyZW4nfHxwPT09J2Rhbmdlcm91c2x5U2V0SW5uZXJIVE1MJyljb250aW51ZTsvLyB3ZSBkb24ndCByZW5kZXIgdW5kZWZpbmVkIHByb3BzIHRvIHRoZSBET01cbmlmKHByb3BzW3BdPT09dW5kZWZpbmVkKWNvbnRpbnVlO2NvbnN0IGF0dHI9RE9NQXR0cmlidXRlTmFtZXNbcF18fHAudG9Mb3dlckNhc2UoKTtpZih0eXBlPT09J3NjcmlwdCcmJihhdHRyPT09J2FzeW5jJ3x8YXR0cj09PSdkZWZlcid8fGF0dHI9PT0nbm9Nb2R1bGUnKSl7O2VsW2F0dHJdPSEhcHJvcHNbcF07fWVsc2V7ZWwuc2V0QXR0cmlidXRlKGF0dHIscHJvcHNbcF0pO319Y29uc3R7Y2hpbGRyZW4sZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUx9PXByb3BzO2lmKGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MKXtlbC5pbm5lckhUTUw9ZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwuX19odG1sfHwnJzt9ZWxzZSBpZihjaGlsZHJlbil7ZWwudGV4dENvbnRlbnQ9dHlwZW9mIGNoaWxkcmVuPT09J3N0cmluZyc/Y2hpbGRyZW46QXJyYXkuaXNBcnJheShjaGlsZHJlbik/Y2hpbGRyZW4uam9pbignJyk6Jyc7fXJldHVybiBlbDt9ZnVuY3Rpb24gdXBkYXRlRWxlbWVudHModHlwZSxjb21wb25lbnRzKXtjb25zdCBoZWFkRWw9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtjb25zdCBoZWFkQ291bnRFbD1oZWFkRWwucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPW5leHQtaGVhZC1jb3VudF0nKTtpZihwcm9jZXNzLmVudi5OT0RFX0VOViE9PSdwcm9kdWN0aW9uJyl7aWYoIWhlYWRDb3VudEVsKXtjb25zb2xlLmVycm9yKCdXYXJuaW5nOiBuZXh0LWhlYWQtY291bnQgaXMgbWlzc2luZy4gaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvbmV4dC1oZWFkLWNvdW50LW1pc3NpbmcnKTtyZXR1cm47fX1jb25zdCBoZWFkQ291bnQ9TnVtYmVyKGhlYWRDb3VudEVsLmNvbnRlbnQpO2NvbnN0IG9sZFRhZ3M9W107Zm9yKGxldCBpPTAsaj1oZWFkQ291bnRFbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO2k8aGVhZENvdW50O2krKyxqPWoucHJldmlvdXNFbGVtZW50U2libGluZyl7aWYoai50YWdOYW1lLnRvTG93ZXJDYXNlKCk9PT10eXBlKXtvbGRUYWdzLnB1c2goaik7fX1jb25zdCBuZXdUYWdzPWNvbXBvbmVudHMubWFwKHJlYWN0RWxlbWVudFRvRE9NKS5maWx0ZXIobmV3VGFnPT57Zm9yKGxldCBrPTAsbGVuPW9sZFRhZ3MubGVuZ3RoO2s8bGVuO2srKyl7Y29uc3Qgb2xkVGFnPW9sZFRhZ3Nba107aWYob2xkVGFnLmlzRXF1YWxOb2RlKG5ld1RhZykpe29sZFRhZ3Muc3BsaWNlKGssMSk7cmV0dXJuIGZhbHNlO319cmV0dXJuIHRydWU7fSk7b2xkVGFncy5mb3JFYWNoKHQ9PnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0KSk7bmV3VGFncy5mb3JFYWNoKHQ9PmhlYWRFbC5pbnNlcnRCZWZvcmUodCxoZWFkQ291bnRFbCkpO2hlYWRDb3VudEVsLmNvbnRlbnQ9KGhlYWRDb3VudC1vbGRUYWdzLmxlbmd0aCtuZXdUYWdzLmxlbmd0aCkudG9TdHJpbmcoKTt9ZnVuY3Rpb24gaW5pdEhlYWRNYW5hZ2VyKCl7bGV0IHVwZGF0ZVByb21pc2U9bnVsbDtyZXR1cm57bW91bnRlZEluc3RhbmNlczpuZXcgU2V0KCksdXBkYXRlSGVhZDpoZWFkPT57Y29uc3QgcHJvbWlzZT11cGRhdGVQcm9taXNlPVByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCk9PntpZihwcm9taXNlIT09dXBkYXRlUHJvbWlzZSlyZXR1cm47dXBkYXRlUHJvbWlzZT1udWxsO2NvbnN0IHRhZ3M9e307aGVhZC5mb3JFYWNoKGg9PntpZigvLyBJZiB0aGUgZm9udCB0YWcgaXMgbG9hZGVkIG9ubHkgb24gY2xpZW50IG5hdmlnYXRpb25cbi8vIGl0IHdvbid0IGJlIGlubGluZWQuIEluIHRoaXMgY2FzZSByZXZlcnQgdG8gdGhlIG9yaWdpbmFsIGJlaGF2aW9yXG5oLnR5cGU9PT0nbGluaycmJmgucHJvcHNbJ2RhdGEtb3B0aW1pemVkLWZvbnRzJ10mJiFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBzdHlsZVtkYXRhLWhyZWY9XCIke2gucHJvcHNbJ2RhdGEtaHJlZiddfVwiXWApKXtoLnByb3BzLmhyZWY9aC5wcm9wc1snZGF0YS1ocmVmJ107aC5wcm9wc1snZGF0YS1ocmVmJ109dW5kZWZpbmVkO31jb25zdCBjb21wb25lbnRzPXRhZ3NbaC50eXBlXXx8W107Y29tcG9uZW50cy5wdXNoKGgpO3RhZ3NbaC50eXBlXT1jb21wb25lbnRzO30pO2NvbnN0IHRpdGxlQ29tcG9uZW50PXRhZ3MudGl0bGU/dGFncy50aXRsZVswXTpudWxsO2xldCB0aXRsZT0nJztpZih0aXRsZUNvbXBvbmVudCl7Y29uc3R7Y2hpbGRyZW59PXRpdGxlQ29tcG9uZW50LnByb3BzO3RpdGxlPXR5cGVvZiBjaGlsZHJlbj09PSdzdHJpbmcnP2NoaWxkcmVuOkFycmF5LmlzQXJyYXkoY2hpbGRyZW4pP2NoaWxkcmVuLmpvaW4oJycpOicnO31pZih0aXRsZSE9PWRvY3VtZW50LnRpdGxlKWRvY3VtZW50LnRpdGxlPXRpdGxlO1snbWV0YScsJ2Jhc2UnLCdsaW5rJywnc3R5bGUnLCdzY3JpcHQnXS5mb3JFYWNoKHR5cGU9Pnt1cGRhdGVFbGVtZW50cyh0eXBlLHRhZ3NbdHlwZV18fFtdKTt9KTt9KTt9fTt9XG4vLyMgc291cmNlTWFwcGluZ1VSTD1oZWFkLW1hbmFnZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZXhwb3J0cy5fX2VzTW9kdWxlPXRydWU7ZXhwb3J0cy5jYW5jZWxJZGxlQ2FsbGJhY2s9ZXhwb3J0cy5yZXF1ZXN0SWRsZUNhbGxiYWNrPXZvaWQgMDtjb25zdCByZXF1ZXN0SWRsZUNhbGxiYWNrPXR5cGVvZiBzZWxmIT09J3VuZGVmaW5lZCcmJnNlbGYucmVxdWVzdElkbGVDYWxsYmFja3x8ZnVuY3Rpb24oY2Ipe2xldCBzdGFydD1EYXRlLm5vdygpO3JldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7Y2Ioe2RpZFRpbWVvdXQ6ZmFsc2UsdGltZVJlbWFpbmluZzpmdW5jdGlvbigpe3JldHVybiBNYXRoLm1heCgwLDUwLShEYXRlLm5vdygpLXN0YXJ0KSk7fX0pO30sMSk7fTtleHBvcnRzLnJlcXVlc3RJZGxlQ2FsbGJhY2s9cmVxdWVzdElkbGVDYWxsYmFjaztjb25zdCBjYW5jZWxJZGxlQ2FsbGJhY2s9dHlwZW9mIHNlbGYhPT0ndW5kZWZpbmVkJyYmc2VsZi5jYW5jZWxJZGxlQ2FsbGJhY2t8fGZ1bmN0aW9uKGlkKXtyZXR1cm4gY2xlYXJUaW1lb3V0KGlkKTt9O2V4cG9ydHMuY2FuY2VsSWRsZUNhbGxiYWNrPWNhbmNlbElkbGVDYWxsYmFjaztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlcXVlc3QtaWRsZS1jYWxsYmFjay5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjt2YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdD1yZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7ZXhwb3J0cy5fX2VzTW9kdWxlPXRydWU7ZXhwb3J0cy5pbml0U2NyaXB0TG9hZGVyPWluaXRTY3JpcHRMb2FkZXI7ZXhwb3J0cy5kZWZhdWx0PXZvaWQgMDt2YXIgX2V4dGVuZHMyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXh0ZW5kc1wiKSk7dmFyIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2VcIikpO3ZhciBfcmVhY3Q9cmVxdWlyZShcInJlYWN0XCIpO3ZhciBfaGVhZE1hbmFnZXJDb250ZXh0PXJlcXVpcmUoXCIuLi9uZXh0LXNlcnZlci9saWIvaGVhZC1tYW5hZ2VyLWNvbnRleHRcIik7dmFyIF9oZWFkTWFuYWdlcj1yZXF1aXJlKFwiLi9oZWFkLW1hbmFnZXJcIik7dmFyIF9yZXF1ZXN0SWRsZUNhbGxiYWNrPXJlcXVpcmUoXCIuL3JlcXVlc3QtaWRsZS1jYWxsYmFja1wiKTtjb25zdCBTY3JpcHRDYWNoZT1uZXcgTWFwKCk7Y29uc3QgTG9hZENhY2hlPW5ldyBTZXQoKTtjb25zdCBpZ25vcmVQcm9wcz1bJ29uTG9hZCcsJ2Rhbmdlcm91c2x5U2V0SW5uZXJIVE1MJywnY2hpbGRyZW4nLCdvbkVycm9yJywnc3RyYXRlZ3knXTtjb25zdCBsb2FkU2NyaXB0PXByb3BzPT57Y29uc3R7c3JjLGlkLG9uTG9hZD0oKT0+e30sZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwsY2hpbGRyZW49Jycsb25FcnJvcn09cHJvcHM7Y29uc3QgY2FjaGVLZXk9aWR8fHNyYztpZihTY3JpcHRDYWNoZS5oYXMoc3JjKSl7aWYoIUxvYWRDYWNoZS5oYXMoY2FjaGVLZXkpKXtMb2FkQ2FjaGUuYWRkKGNhY2hlS2V5KTsvLyBFeGVjdXRlIG9uTG9hZCBzaW5jZSB0aGUgc2NyaXB0IGxvYWRpbmcgaGFzIGJlZ3VuXG5TY3JpcHRDYWNoZS5nZXQoc3JjKS50aGVuKG9uTG9hZCxvbkVycm9yKTt9cmV0dXJuO31jb25zdCBlbD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtjb25zdCBsb2FkUHJvbWlzZT1uZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57ZWwuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsZnVuY3Rpb24oKXtyZXNvbHZlKCk7aWYob25Mb2FkKXtvbkxvYWQuY2FsbCh0aGlzKTt9fSk7ZWwuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLGZ1bmN0aW9uKCl7cmVqZWN0KCk7aWYob25FcnJvcil7b25FcnJvcigpO319KTt9KTtpZihzcmMpe1NjcmlwdENhY2hlLnNldChzcmMsbG9hZFByb21pc2UpO0xvYWRDYWNoZS5hZGQoY2FjaGVLZXkpO31pZihkYW5nZXJvdXNseVNldElubmVySFRNTCl7ZWwuaW5uZXJIVE1MPWRhbmdlcm91c2x5U2V0SW5uZXJIVE1MLl9faHRtbHx8Jyc7fWVsc2UgaWYoY2hpbGRyZW4pe2VsLnRleHRDb250ZW50PXR5cGVvZiBjaGlsZHJlbj09PSdzdHJpbmcnP2NoaWxkcmVuOkFycmF5LmlzQXJyYXkoY2hpbGRyZW4pP2NoaWxkcmVuLmpvaW4oJycpOicnO31lbHNlIGlmKHNyYyl7ZWwuc3JjPXNyYzt9Zm9yKGNvbnN0W2ssdmFsdWVdb2YgT2JqZWN0LmVudHJpZXMocHJvcHMpKXtpZih2YWx1ZT09PXVuZGVmaW5lZHx8aWdub3JlUHJvcHMuaW5jbHVkZXMoaykpe2NvbnRpbnVlO31jb25zdCBhdHRyPV9oZWFkTWFuYWdlci5ET01BdHRyaWJ1dGVOYW1lc1trXXx8ay50b0xvd2VyQ2FzZSgpO2VsLnNldEF0dHJpYnV0ZShhdHRyLHZhbHVlKTt9ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbCk7fTtmdW5jdGlvbiBoYW5kbGVDbGllbnRTY3JpcHRMb2FkKHByb3BzKXtjb25zdHtzdHJhdGVneT0nYWZ0ZXJJbnRlcmFjdGl2ZSd9PXByb3BzO2lmKHN0cmF0ZWd5PT09J2FmdGVySW50ZXJhY3RpdmUnKXtsb2FkU2NyaXB0KHByb3BzKTt9ZWxzZSBpZihzdHJhdGVneT09PSdsYXp5T25sb2FkJyl7d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCgpPT57KDAsX3JlcXVlc3RJZGxlQ2FsbGJhY2sucmVxdWVzdElkbGVDYWxsYmFjaykoKCk9PmxvYWRTY3JpcHQocHJvcHMpKTt9KTt9fWZ1bmN0aW9uIGxvYWRMYXp5U2NyaXB0KHByb3BzKXtpZihkb2N1bWVudC5yZWFkeVN0YXRlPT09J2NvbXBsZXRlJyl7KDAsX3JlcXVlc3RJZGxlQ2FsbGJhY2sucmVxdWVzdElkbGVDYWxsYmFjaykoKCk9PmxvYWRTY3JpcHQocHJvcHMpKTt9ZWxzZXt3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsKCk9PnsoMCxfcmVxdWVzdElkbGVDYWxsYmFjay5yZXF1ZXN0SWRsZUNhbGxiYWNrKSgoKT0+bG9hZFNjcmlwdChwcm9wcykpO30pO319ZnVuY3Rpb24gaW5pdFNjcmlwdExvYWRlcihzY3JpcHRMb2FkZXJJdGVtcyl7c2NyaXB0TG9hZGVySXRlbXMuZm9yRWFjaChoYW5kbGVDbGllbnRTY3JpcHRMb2FkKTt9ZnVuY3Rpb24gU2NyaXB0KHByb3BzKXtjb25zdHtzcmM9Jycsb25Mb2FkPSgpPT57fSxzdHJhdGVneT0nYWZ0ZXJJbnRlcmFjdGl2ZScsb25FcnJvcn09cHJvcHMscmVzdFByb3BzPSgwLF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlMi5kZWZhdWx0KShwcm9wcyxbXCJzcmNcIixcIm9uTG9hZFwiLFwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIixcInN0cmF0ZWd5XCIsXCJvbkVycm9yXCJdKTsvLyBDb250ZXh0IGlzIGF2YWlsYWJsZSBvbmx5IGR1cmluZyBTU1JcbmNvbnN0e3VwZGF0ZVNjcmlwdHMsc2NyaXB0c309KDAsX3JlYWN0LnVzZUNvbnRleHQpKF9oZWFkTWFuYWdlckNvbnRleHQuSGVhZE1hbmFnZXJDb250ZXh0KTsoMCxfcmVhY3QudXNlRWZmZWN0KSgoKT0+e2lmKHN0cmF0ZWd5PT09J2FmdGVySW50ZXJhY3RpdmUnKXtsb2FkU2NyaXB0KHByb3BzKTt9ZWxzZSBpZihzdHJhdGVneT09PSdsYXp5T25sb2FkJyl7bG9hZExhenlTY3JpcHQocHJvcHMpO319LFtwcm9wcyxzdHJhdGVneV0pO2lmKHN0cmF0ZWd5PT09J2JlZm9yZUludGVyYWN0aXZlJyl7aWYodXBkYXRlU2NyaXB0cyl7c2NyaXB0cy5iZWZvcmVJbnRlcmFjdGl2ZT0oc2NyaXB0cy5iZWZvcmVJbnRlcmFjdGl2ZXx8W10pLmNvbmNhdChbKDAsX2V4dGVuZHMyLmRlZmF1bHQpKHtzcmMsb25Mb2FkLG9uRXJyb3J9LHJlc3RQcm9wcyldKTt1cGRhdGVTY3JpcHRzKHNjcmlwdHMpO319cmV0dXJuIG51bGw7fXZhciBfZGVmYXVsdD1TY3JpcHQ7ZXhwb3J0cy5kZWZhdWx0PV9kZWZhdWx0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NyaXB0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2V4cG9ydHMuX19lc01vZHVsZT10cnVlO2V4cG9ydHMuSHRtbD1IdG1sO2V4cG9ydHMuTWFpbj1NYWluO2V4cG9ydHMuTmV4dFNjcmlwdD1leHBvcnRzLkhlYWQ9ZXhwb3J0cy5kZWZhdWx0PXZvaWQgMDt2YXIgX3Byb3BUeXBlcz1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJwcm9wLXR5cGVzXCIpKTt2YXIgX3JlYWN0PV9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCJyZWFjdFwiKSk7dmFyIF9zZXJ2ZXI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwic3R5bGVkLWpzeC9zZXJ2ZXJcIikpO3ZhciBfY29uc3RhbnRzPXJlcXVpcmUoXCIuLi9uZXh0LXNlcnZlci9saWIvY29uc3RhbnRzXCIpO3ZhciBfZG9jdW1lbnRDb250ZXh0PXJlcXVpcmUoXCIuLi9uZXh0LXNlcnZlci9saWIvZG9jdW1lbnQtY29udGV4dFwiKTt2YXIgX3V0aWxzPXJlcXVpcmUoXCIuLi9uZXh0LXNlcnZlci9saWIvdXRpbHNcIik7ZXhwb3J0cy5Eb2N1bWVudENvbnRleHQ9X3V0aWxzLkRvY3VtZW50Q29udGV4dDtleHBvcnRzLkRvY3VtZW50SW5pdGlhbFByb3BzPV91dGlscy5Eb2N1bWVudEluaXRpYWxQcm9wcztleHBvcnRzLkRvY3VtZW50UHJvcHM9X3V0aWxzLkRvY3VtZW50UHJvcHM7dmFyIF9nZXRQYWdlRmlsZXM9cmVxdWlyZShcIi4uL25leHQtc2VydmVyL3NlcnZlci9nZXQtcGFnZS1maWxlc1wiKTt2YXIgX3V0aWxzMj1yZXF1aXJlKFwiLi4vbmV4dC1zZXJ2ZXIvc2VydmVyL3V0aWxzXCIpO3ZhciBfaHRtbGVzY2FwZT1yZXF1aXJlKFwiLi4vc2VydmVyL2h0bWxlc2NhcGVcIik7dmFyIF9zY3JpcHQ9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vY2xpZW50L3NjcmlwdFwiKSk7ZnVuY3Rpb24gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKCl7aWYodHlwZW9mIFdlYWtNYXAhPT1cImZ1bmN0aW9uXCIpcmV0dXJuIG51bGw7dmFyIGNhY2hlPW5ldyBXZWFrTWFwKCk7X2dldFJlcXVpcmVXaWxkY2FyZENhY2hlPWZ1bmN0aW9uKCl7cmV0dXJuIGNhY2hlO307cmV0dXJuIGNhY2hlO31mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmope2lmKG9iaiYmb2JqLl9fZXNNb2R1bGUpe3JldHVybiBvYmo7fWlmKG9iaj09PW51bGx8fHR5cGVvZiBvYmohPT1cIm9iamVjdFwiJiZ0eXBlb2Ygb2JqIT09XCJmdW5jdGlvblwiKXtyZXR1cm57ZGVmYXVsdDpvYmp9O312YXIgY2FjaGU9X2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKCk7aWYoY2FjaGUmJmNhY2hlLmhhcyhvYmopKXtyZXR1cm4gY2FjaGUuZ2V0KG9iaik7fXZhciBuZXdPYmo9e307dmFyIGhhc1Byb3BlcnR5RGVzY3JpcHRvcj1PYmplY3QuZGVmaW5lUHJvcGVydHkmJk9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7Zm9yKHZhciBrZXkgaW4gb2JqKXtpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLGtleSkpe3ZhciBkZXNjPWhhc1Byb3BlcnR5RGVzY3JpcHRvcj9PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaixrZXkpOm51bGw7aWYoZGVzYyYmKGRlc2MuZ2V0fHxkZXNjLnNldCkpe09iamVjdC5kZWZpbmVQcm9wZXJ0eShuZXdPYmosa2V5LGRlc2MpO31lbHNle25ld09ialtrZXldPW9ialtrZXldO319fW5ld09iai5kZWZhdWx0PW9iajtpZihjYWNoZSl7Y2FjaGUuc2V0KG9iaixuZXdPYmopO31yZXR1cm4gbmV3T2JqO31mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntkZWZhdWx0Om9ian07fWZ1bmN0aW9uIGdldERvY3VtZW50RmlsZXMoYnVpbGRNYW5pZmVzdCxwYXRobmFtZSxpbkFtcE1vZGUpe2NvbnN0IHNoYXJlZEZpbGVzPSgwLF9nZXRQYWdlRmlsZXMuZ2V0UGFnZUZpbGVzKShidWlsZE1hbmlmZXN0LCcvX2FwcCcpO2NvbnN0IHBhZ2VGaWxlcz1pbkFtcE1vZGU/W106KDAsX2dldFBhZ2VGaWxlcy5nZXRQYWdlRmlsZXMpKGJ1aWxkTWFuaWZlc3QscGF0aG5hbWUpO3JldHVybntzaGFyZWRGaWxlcyxwYWdlRmlsZXMsYWxsRmlsZXM6Wy4uLm5ldyBTZXQoWy4uLnNoYXJlZEZpbGVzLC4uLnBhZ2VGaWxlc10pXX07fWZ1bmN0aW9uIGdldFBvbHlmaWxsU2NyaXB0cyhjb250ZXh0LHByb3BzKXsvLyBwb2x5ZmlsbHMuanMgaGFzIHRvIGJlIHJlbmRlcmVkIGFzIG5vbW9kdWxlIHdpdGhvdXQgYXN5bmNcbi8vIEl0IGFsc28gaGFzIHRvIGJlIHRoZSBmaXJzdCBzY3JpcHQgdG8gbG9hZFxuY29uc3R7YXNzZXRQcmVmaXgsYnVpbGRNYW5pZmVzdCxkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZyxkaXNhYmxlT3B0aW1pemVkTG9hZGluZ309Y29udGV4dDtyZXR1cm4gYnVpbGRNYW5pZmVzdC5wb2x5ZmlsbEZpbGVzLmZpbHRlcihwb2x5ZmlsbD0+cG9seWZpbGwuZW5kc1dpdGgoJy5qcycpJiYhcG9seWZpbGwuZW5kc1dpdGgoJy5tb2R1bGUuanMnKSkubWFwKHBvbHlmaWxsPT4vKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLHtrZXk6cG9seWZpbGwsZGVmZXI6IWRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nLG5vbmNlOnByb3BzLm5vbmNlLGNyb3NzT3JpZ2luOnByb3BzLmNyb3NzT3JpZ2lufHxwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOLG5vTW9kdWxlOnRydWUsc3JjOmAke2Fzc2V0UHJlZml4fS9fbmV4dC8ke3BvbHlmaWxsfSR7ZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmd9YH0pKTt9ZnVuY3Rpb24gZ2V0UHJlTmV4dFNjcmlwdHMoY29udGV4dCxwcm9wcyl7Y29uc3R7c2NyaXB0TG9hZGVyLGRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nfT1jb250ZXh0O3JldHVybihzY3JpcHRMb2FkZXIuYmVmb3JlSW50ZXJhY3RpdmV8fFtdKS5tYXAoZmlsZT0+e2NvbnN0e3N0cmF0ZWd5LC4uLnNjcmlwdFByb3BzfT1maWxlO3JldHVybi8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIsT2JqZWN0LmFzc2lnbih7fSxzY3JpcHRQcm9wcyx7ZGVmZXI6IWRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nLG5vbmNlOnByb3BzLm5vbmNlLGNyb3NzT3JpZ2luOnByb3BzLmNyb3NzT3JpZ2lufHxwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOfSkpO30pO31mdW5jdGlvbiBnZXREeW5hbWljQ2h1bmtzKGNvbnRleHQscHJvcHMsZmlsZXMpe2NvbnN0e2R5bmFtaWNJbXBvcnRzLGFzc2V0UHJlZml4LGlzRGV2ZWxvcG1lbnQsZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmcsZGlzYWJsZU9wdGltaXplZExvYWRpbmd9PWNvbnRleHQ7cmV0dXJuIGR5bmFtaWNJbXBvcnRzLm1hcChmaWxlPT57aWYoIWZpbGUuZW5kc1dpdGgoJy5qcycpfHxmaWxlcy5hbGxGaWxlcy5pbmNsdWRlcyhmaWxlKSlyZXR1cm4gbnVsbDtyZXR1cm4vKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLHthc3luYzohaXNEZXZlbG9wbWVudCYmZGlzYWJsZU9wdGltaXplZExvYWRpbmcsZGVmZXI6IWRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nLGtleTpmaWxlLHNyYzpgJHthc3NldFByZWZpeH0vX25leHQvJHtlbmNvZGVVUkkoZmlsZSl9JHtkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZ31gLG5vbmNlOnByb3BzLm5vbmNlLGNyb3NzT3JpZ2luOnByb3BzLmNyb3NzT3JpZ2lufHxwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOfSk7fSk7fWZ1bmN0aW9uIGdldFNjcmlwdHMoY29udGV4dCxwcm9wcyxmaWxlcyl7dmFyIF9idWlsZE1hbmlmZXN0JGxvd1ByaTtjb25zdHthc3NldFByZWZpeCxidWlsZE1hbmlmZXN0LGlzRGV2ZWxvcG1lbnQsZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmcsZGlzYWJsZU9wdGltaXplZExvYWRpbmd9PWNvbnRleHQ7Y29uc3Qgbm9ybWFsU2NyaXB0cz1maWxlcy5hbGxGaWxlcy5maWx0ZXIoZmlsZT0+ZmlsZS5lbmRzV2l0aCgnLmpzJykpO2NvbnN0IGxvd1ByaW9yaXR5U2NyaXB0cz0oX2J1aWxkTWFuaWZlc3QkbG93UHJpPWJ1aWxkTWFuaWZlc3QubG93UHJpb3JpdHlGaWxlcyk9PW51bGw/dm9pZCAwOl9idWlsZE1hbmlmZXN0JGxvd1ByaS5maWx0ZXIoZmlsZT0+ZmlsZS5lbmRzV2l0aCgnLmpzJykpO3JldHVyblsuLi5ub3JtYWxTY3JpcHRzLC4uLmxvd1ByaW9yaXR5U2NyaXB0c10ubWFwKGZpbGU9PntyZXR1cm4vKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLHtrZXk6ZmlsZSxzcmM6YCR7YXNzZXRQcmVmaXh9L19uZXh0LyR7ZW5jb2RlVVJJKGZpbGUpfSR7ZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmd9YCxub25jZTpwcm9wcy5ub25jZSxhc3luYzohaXNEZXZlbG9wbWVudCYmZGlzYWJsZU9wdGltaXplZExvYWRpbmcsZGVmZXI6IWRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nLGNyb3NzT3JpZ2luOnByb3BzLmNyb3NzT3JpZ2lufHxwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOfSk7fSk7fS8qKlxuICogYERvY3VtZW50YCBjb21wb25lbnQgaGFuZGxlcyB0aGUgaW5pdGlhbCBgZG9jdW1lbnRgIG1hcmt1cCBhbmQgcmVuZGVycyBvbmx5IG9uIHRoZSBzZXJ2ZXIgc2lkZS5cbiAqIENvbW1vbmx5IHVzZWQgZm9yIGltcGxlbWVudGluZyBzZXJ2ZXIgc2lkZSByZW5kZXJpbmcgZm9yIGBjc3MtaW4tanNgIGxpYnJhcmllcy5cbiAqL2NsYXNzIERvY3VtZW50IGV4dGVuZHMgX3JlYWN0LkNvbXBvbmVudHsvKipcbiAgICogYGdldEluaXRpYWxQcm9wc2AgaG9vayByZXR1cm5zIHRoZSBjb250ZXh0IG9iamVjdCB3aXRoIHRoZSBhZGRpdGlvbiBvZiBgcmVuZGVyUGFnZWAuXG4gICAqIGByZW5kZXJQYWdlYCBjYWxsYmFjayBleGVjdXRlcyBgUmVhY3RgIHJlbmRlcmluZyBsb2dpYyBzeW5jaHJvbm91c2x5IHRvIHN1cHBvcnQgc2VydmVyLXJlbmRlcmluZyB3cmFwcGVyc1xuICAgKi9zdGF0aWMgYXN5bmMgZ2V0SW5pdGlhbFByb3BzKGN0eCl7Y29uc3QgZW5oYW5jZUFwcD1BcHA9PntyZXR1cm4gcHJvcHM9Pi8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KEFwcCxwcm9wcyk7fTtjb25zdHtodG1sLGhlYWR9PWF3YWl0IGN0eC5yZW5kZXJQYWdlKHtlbmhhbmNlQXBwfSk7Y29uc3Qgc3R5bGVzPVsuLi4oMCxfc2VydmVyLmRlZmF1bHQpKCldO3JldHVybntodG1sLGhlYWQsc3R5bGVzfTt9c3RhdGljIHJlbmRlckRvY3VtZW50KERvY3VtZW50Q29tcG9uZW50LHByb3BzKXtyZXR1cm4vKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChfZG9jdW1lbnRDb250ZXh0LkRvY3VtZW50Q29udGV4dC5Qcm92aWRlcix7dmFsdWU6cHJvcHN9LC8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KERvY3VtZW50Q29tcG9uZW50LHByb3BzKSk7fXJlbmRlcigpe3JldHVybi8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KEh0bWwsbnVsbCwvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChIZWFkLG51bGwpLC8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYm9keVwiLG51bGwsLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoTWFpbixudWxsKSwvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChOZXh0U2NyaXB0LG51bGwpKSk7fX1leHBvcnRzLmRlZmF1bHQ9RG9jdW1lbnQ7ZnVuY3Rpb24gSHRtbChwcm9wcyl7Y29uc3R7aW5BbXBNb2RlLGRvY0NvbXBvbmVudHNSZW5kZXJlZCxsb2NhbGV9PSgwLF9yZWFjdC51c2VDb250ZXh0KShfZG9jdW1lbnRDb250ZXh0LkRvY3VtZW50Q29udGV4dCk7ZG9jQ29tcG9uZW50c1JlbmRlcmVkLkh0bWw9dHJ1ZTtyZXR1cm4vKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImh0bWxcIixPYmplY3QuYXNzaWduKHt9LHByb3BzLHtsYW5nOnByb3BzLmxhbmd8fGxvY2FsZXx8dW5kZWZpbmVkLGFtcDppbkFtcE1vZGU/Jyc6dW5kZWZpbmVkLFwiZGF0YS1hbXBkZXZtb2RlXCI6aW5BbXBNb2RlJiZwcm9jZXNzLmVudi5OT0RFX0VOViE9PSdwcm9kdWN0aW9uJz8nJzp1bmRlZmluZWR9KSk7fWNsYXNzIEhlYWQgZXh0ZW5kcyBfcmVhY3QuQ29tcG9uZW50e2NvbnN0cnVjdG9yKC4uLmFyZ3Mpe3N1cGVyKC4uLmFyZ3MpO3RoaXMuY29udGV4dD12b2lkIDA7fWdldENzc0xpbmtzKGZpbGVzKXtjb25zdHthc3NldFByZWZpeCxkZXZPbmx5Q2FjaGVCdXN0ZXJRdWVyeVN0cmluZyxkeW5hbWljSW1wb3J0c309dGhpcy5jb250ZXh0O2NvbnN0IGNzc0ZpbGVzPWZpbGVzLmFsbEZpbGVzLmZpbHRlcihmPT5mLmVuZHNXaXRoKCcuY3NzJykpO2NvbnN0IHNoYXJlZEZpbGVzPW5ldyBTZXQoZmlsZXMuc2hhcmVkRmlsZXMpOy8vIFVubWFuYWdlZCBmaWxlcyBhcmUgQ1NTIGZpbGVzIHRoYXQgd2lsbCBiZSBoYW5kbGVkIGRpcmVjdGx5IGJ5IHRoZVxuLy8gd2VicGFjayBydW50aW1lIChgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5gKS5cbmxldCB1bm1hbmdlZEZpbGVzPW5ldyBTZXQoW10pO2xldCBkeW5hbWljQ3NzRmlsZXM9QXJyYXkuZnJvbShuZXcgU2V0KGR5bmFtaWNJbXBvcnRzLmZpbHRlcihmaWxlPT5maWxlLmVuZHNXaXRoKCcuY3NzJykpKSk7aWYoZHluYW1pY0Nzc0ZpbGVzLmxlbmd0aCl7Y29uc3QgZXhpc3Rpbmc9bmV3IFNldChjc3NGaWxlcyk7ZHluYW1pY0Nzc0ZpbGVzPWR5bmFtaWNDc3NGaWxlcy5maWx0ZXIoZj0+IShleGlzdGluZy5oYXMoZil8fHNoYXJlZEZpbGVzLmhhcyhmKSkpO3VubWFuZ2VkRmlsZXM9bmV3IFNldChkeW5hbWljQ3NzRmlsZXMpO2Nzc0ZpbGVzLnB1c2goLi4uZHluYW1pY0Nzc0ZpbGVzKTt9bGV0IGNzc0xpbmtFbGVtZW50cz1bXTtjc3NGaWxlcy5mb3JFYWNoKGZpbGU9Pntjb25zdCBpc1NoYXJlZEZpbGU9c2hhcmVkRmlsZXMuaGFzKGZpbGUpO2lmKCFwcm9jZXNzLmVudi5fX05FWFRfT1BUSU1JWkVfQ1NTKXtjc3NMaW5rRWxlbWVudHMucHVzaCgvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpbmtcIix7a2V5OmAke2ZpbGV9LXByZWxvYWRgLG5vbmNlOnRoaXMucHJvcHMubm9uY2UscmVsOlwicHJlbG9hZFwiLGhyZWY6YCR7YXNzZXRQcmVmaXh9L19uZXh0LyR7ZW5jb2RlVVJJKGZpbGUpfSR7ZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmd9YCxhczpcInN0eWxlXCIsY3Jvc3NPcmlnaW46dGhpcy5wcm9wcy5jcm9zc09yaWdpbnx8cHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTn0pKTt9Y29uc3QgaXNVbm1hbmFnZWRGaWxlPXVubWFuZ2VkRmlsZXMuaGFzKGZpbGUpO2Nzc0xpbmtFbGVtZW50cy5wdXNoKC8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlua1wiLHtrZXk6ZmlsZSxub25jZTp0aGlzLnByb3BzLm5vbmNlLHJlbDpcInN0eWxlc2hlZXRcIixocmVmOmAke2Fzc2V0UHJlZml4fS9fbmV4dC8ke2VuY29kZVVSSShmaWxlKX0ke2Rldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nfWAsY3Jvc3NPcmlnaW46dGhpcy5wcm9wcy5jcm9zc09yaWdpbnx8cHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTixcImRhdGEtbi1nXCI6aXNVbm1hbmFnZWRGaWxlP3VuZGVmaW5lZDppc1NoYXJlZEZpbGU/Jyc6dW5kZWZpbmVkLFwiZGF0YS1uLXBcIjppc1VubWFuYWdlZEZpbGU/dW5kZWZpbmVkOmlzU2hhcmVkRmlsZT91bmRlZmluZWQ6Jyd9KSk7fSk7aWYocHJvY2Vzcy5lbnYuTk9ERV9FTlYhPT0nZGV2ZWxvcG1lbnQnJiZwcm9jZXNzLmVudi5fX05FWFRfT1BUSU1JWkVfRk9OVFMpe2Nzc0xpbmtFbGVtZW50cz10aGlzLm1ha2VTdHlsZXNoZWV0SW5lcnQoY3NzTGlua0VsZW1lbnRzKTt9cmV0dXJuIGNzc0xpbmtFbGVtZW50cy5sZW5ndGg9PT0wP251bGw6Y3NzTGlua0VsZW1lbnRzO31nZXRQcmVsb2FkRHluYW1pY0NodW5rcygpe2NvbnN0e2R5bmFtaWNJbXBvcnRzLGFzc2V0UHJlZml4LGRldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nfT10aGlzLmNvbnRleHQ7cmV0dXJuIGR5bmFtaWNJbXBvcnRzLm1hcChmaWxlPT57aWYoIWZpbGUuZW5kc1dpdGgoJy5qcycpKXtyZXR1cm4gbnVsbDt9cmV0dXJuLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIse3JlbDpcInByZWxvYWRcIixrZXk6ZmlsZSxocmVmOmAke2Fzc2V0UHJlZml4fS9fbmV4dC8ke2VuY29kZVVSSShmaWxlKX0ke2Rldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nfWAsYXM6XCJzY3JpcHRcIixub25jZTp0aGlzLnByb3BzLm5vbmNlLGNyb3NzT3JpZ2luOnRoaXMucHJvcHMuY3Jvc3NPcmlnaW58fHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU59KTt9KS8vIEZpbHRlciBvdXQgbnVsbGVkIHNjcmlwdHNcbi5maWx0ZXIoQm9vbGVhbik7fWdldFByZWxvYWRNYWluTGlua3MoZmlsZXMpe2NvbnN0e2Fzc2V0UHJlZml4LGRldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nLHNjcmlwdExvYWRlcn09dGhpcy5jb250ZXh0O2NvbnN0IHByZWxvYWRGaWxlcz1maWxlcy5hbGxGaWxlcy5maWx0ZXIoZmlsZT0+e3JldHVybiBmaWxlLmVuZHNXaXRoKCcuanMnKTt9KTtyZXR1cm5bLi4uKHNjcmlwdExvYWRlci5iZWZvcmVJbnRlcmFjdGl2ZXx8W10pLm1hcChmaWxlPT4vKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpbmtcIix7a2V5OmZpbGUuc3JjLG5vbmNlOnRoaXMucHJvcHMubm9uY2UscmVsOlwicHJlbG9hZFwiLGhyZWY6ZmlsZS5zcmMsYXM6XCJzY3JpcHRcIixjcm9zc09yaWdpbjp0aGlzLnByb3BzLmNyb3NzT3JpZ2lufHxwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOfSkpLC4uLnByZWxvYWRGaWxlcy5tYXAoZmlsZT0+LyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIse2tleTpmaWxlLG5vbmNlOnRoaXMucHJvcHMubm9uY2UscmVsOlwicHJlbG9hZFwiLGhyZWY6YCR7YXNzZXRQcmVmaXh9L19uZXh0LyR7ZW5jb2RlVVJJKGZpbGUpfSR7ZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmd9YCxhczpcInNjcmlwdFwiLGNyb3NzT3JpZ2luOnRoaXMucHJvcHMuY3Jvc3NPcmlnaW58fHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU59KSldO31nZXREeW5hbWljQ2h1bmtzKGZpbGVzKXtyZXR1cm4gZ2V0RHluYW1pY0NodW5rcyh0aGlzLmNvbnRleHQsdGhpcy5wcm9wcyxmaWxlcyk7fWdldFByZU5leHRTY3JpcHRzKCl7cmV0dXJuIGdldFByZU5leHRTY3JpcHRzKHRoaXMuY29udGV4dCx0aGlzLnByb3BzKTt9Z2V0U2NyaXB0cyhmaWxlcyl7cmV0dXJuIGdldFNjcmlwdHModGhpcy5jb250ZXh0LHRoaXMucHJvcHMsZmlsZXMpO31nZXRQb2x5ZmlsbFNjcmlwdHMoKXtyZXR1cm4gZ2V0UG9seWZpbGxTY3JpcHRzKHRoaXMuY29udGV4dCx0aGlzLnByb3BzKTt9aGFuZGxlRG9jdW1lbnRTY3JpcHRMb2FkZXJJdGVtcyhjaGlsZHJlbil7Y29uc3R7c2NyaXB0TG9hZGVyfT10aGlzLmNvbnRleHQ7Y29uc3Qgc2NyaXB0TG9hZGVySXRlbXM9W107Y29uc3QgZmlsdGVyZWRDaGlsZHJlbj1bXTtfcmVhY3QuZGVmYXVsdC5DaGlsZHJlbi5mb3JFYWNoKGNoaWxkcmVuLGNoaWxkPT57aWYoY2hpbGQudHlwZT09PV9zY3JpcHQuZGVmYXVsdCl7aWYoY2hpbGQucHJvcHMuc3RyYXRlZ3k9PT0nYmVmb3JlSW50ZXJhY3RpdmUnKXtzY3JpcHRMb2FkZXIuYmVmb3JlSW50ZXJhY3RpdmU9KHNjcmlwdExvYWRlci5iZWZvcmVJbnRlcmFjdGl2ZXx8W10pLmNvbmNhdChbey4uLmNoaWxkLnByb3BzfV0pO3JldHVybjt9ZWxzZSBpZihbJ2xhenlPbmxvYWQnLCdhZnRlckludGVyYWN0aXZlJ10uaW5jbHVkZXMoY2hpbGQucHJvcHMuc3RyYXRlZ3kpKXtzY3JpcHRMb2FkZXJJdGVtcy5wdXNoKGNoaWxkLnByb3BzKTtyZXR1cm47fX1maWx0ZXJlZENoaWxkcmVuLnB1c2goY2hpbGQpO30pO3RoaXMuY29udGV4dC5fX05FWFRfREFUQV9fLnNjcmlwdExvYWRlcj1zY3JpcHRMb2FkZXJJdGVtcztyZXR1cm4gZmlsdGVyZWRDaGlsZHJlbjt9bWFrZVN0eWxlc2hlZXRJbmVydChub2RlKXtyZXR1cm4gX3JlYWN0LmRlZmF1bHQuQ2hpbGRyZW4ubWFwKG5vZGUsYz0+e2lmKGMudHlwZT09PSdsaW5rJyYmYy5wcm9wc1snaHJlZiddJiZfY29uc3RhbnRzLk9QVElNSVpFRF9GT05UX1BST1ZJREVSUy5zb21lKCh7dXJsfSk9PmMucHJvcHNbJ2hyZWYnXS5zdGFydHNXaXRoKHVybCkpKXtjb25zdCBuZXdQcm9wcz17Li4uKGMucHJvcHN8fHt9KX07bmV3UHJvcHNbJ2RhdGEtaHJlZiddPW5ld1Byb3BzWydocmVmJ107bmV3UHJvcHNbJ2hyZWYnXT11bmRlZmluZWQ7cmV0dXJuLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNsb25lRWxlbWVudChjLG5ld1Byb3BzKTt9ZWxzZSBpZihjLnByb3BzJiZjLnByb3BzWydjaGlsZHJlbiddKXtjLnByb3BzWydjaGlsZHJlbiddPXRoaXMubWFrZVN0eWxlc2hlZXRJbmVydChjLnByb3BzWydjaGlsZHJlbiddKTt9cmV0dXJuIGM7fSk7fXJlbmRlcigpe3ZhciBfdGhpcyRwcm9wcyRub25jZSxfdGhpcyRwcm9wcyRub25jZTI7Y29uc3R7c3R5bGVzLGFtcFBhdGgsaW5BbXBNb2RlLGh5YnJpZEFtcCxjYW5vbmljYWxCYXNlLF9fTkVYVF9EQVRBX18sZGFuZ2Vyb3VzQXNQYXRoLGhlYWRUYWdzLHVuc3RhYmxlX3J1bnRpbWVKUyx1bnN0YWJsZV9Kc1ByZWxvYWQsZGlzYWJsZU9wdGltaXplZExvYWRpbmd9PXRoaXMuY29udGV4dDtjb25zdCBkaXNhYmxlUnVudGltZUpTPXVuc3RhYmxlX3J1bnRpbWVKUz09PWZhbHNlO2NvbnN0IGRpc2FibGVKc1ByZWxvYWQ9dW5zdGFibGVfSnNQcmVsb2FkPT09ZmFsc2V8fCFkaXNhYmxlT3B0aW1pemVkTG9hZGluZzt0aGlzLmNvbnRleHQuZG9jQ29tcG9uZW50c1JlbmRlcmVkLkhlYWQ9dHJ1ZTtsZXR7aGVhZH09dGhpcy5jb250ZXh0O2xldCBjc3NQcmVsb2Fkcz1bXTtsZXQgb3RoZXJIZWFkRWxlbWVudHM9W107aWYoaGVhZCl7aGVhZC5mb3JFYWNoKGM9PntpZihjJiZjLnR5cGU9PT0nbGluaycmJmMucHJvcHNbJ3JlbCddPT09J3ByZWxvYWQnJiZjLnByb3BzWydhcyddPT09J3N0eWxlJyl7Y3NzUHJlbG9hZHMucHVzaChjKTt9ZWxzZXtjJiZvdGhlckhlYWRFbGVtZW50cy5wdXNoKGMpO319KTtoZWFkPWNzc1ByZWxvYWRzLmNvbmNhdChvdGhlckhlYWRFbGVtZW50cyk7fWxldCBjaGlsZHJlbj1fcmVhY3QuZGVmYXVsdC5DaGlsZHJlbi50b0FycmF5KHRoaXMucHJvcHMuY2hpbGRyZW4pLmZpbHRlcihCb29sZWFuKTsvLyBzaG93IGEgd2FybmluZyBpZiBIZWFkIGNvbnRhaW5zIDx0aXRsZT4gKG9ubHkgaW4gZGV2ZWxvcG1lbnQpXG5pZihwcm9jZXNzLmVudi5OT0RFX0VOViE9PSdwcm9kdWN0aW9uJyl7Y2hpbGRyZW49X3JlYWN0LmRlZmF1bHQuQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLGNoaWxkPT57dmFyIF9jaGlsZCRwcm9wcztjb25zdCBpc1JlYWN0SGVsbWV0PWNoaWxkPT1udWxsP3ZvaWQgMDooX2NoaWxkJHByb3BzPWNoaWxkLnByb3BzKT09bnVsbD92b2lkIDA6X2NoaWxkJHByb3BzWydkYXRhLXJlYWN0LWhlbG1ldCddO2lmKCFpc1JlYWN0SGVsbWV0KXt2YXIgX2NoaWxkJHByb3BzMjtpZigoY2hpbGQ9PW51bGw/dm9pZCAwOmNoaWxkLnR5cGUpPT09J3RpdGxlJyl7Y29uc29sZS53YXJuKFwiV2FybmluZzogPHRpdGxlPiBzaG91bGQgbm90IGJlIHVzZWQgaW4gX2RvY3VtZW50LmpzJ3MgPEhlYWQ+LiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9uby1kb2N1bWVudC10aXRsZVwiKTt9ZWxzZSBpZigoY2hpbGQ9PW51bGw/dm9pZCAwOmNoaWxkLnR5cGUpPT09J21ldGEnJiYoY2hpbGQ9PW51bGw/dm9pZCAwOihfY2hpbGQkcHJvcHMyPWNoaWxkLnByb3BzKT09bnVsbD92b2lkIDA6X2NoaWxkJHByb3BzMi5uYW1lKT09PSd2aWV3cG9ydCcpe2NvbnNvbGUud2FybihcIldhcm5pbmc6IHZpZXdwb3J0IG1ldGEgdGFncyBzaG91bGQgbm90IGJlIHVzZWQgaW4gX2RvY3VtZW50LmpzJ3MgPEhlYWQ+LiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9uby1kb2N1bWVudC12aWV3cG9ydC1tZXRhXCIpO319cmV0dXJuIGNoaWxkO30pO2lmKHRoaXMucHJvcHMuY3Jvc3NPcmlnaW4pY29uc29sZS53YXJuKCdXYXJuaW5nOiBgSGVhZGAgYXR0cmlidXRlIGBjcm9zc09yaWdpbmAgaXMgZGVwcmVjYXRlZC4gaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvZG9jLWNyb3Nzb3JpZ2luLWRlcHJlY2F0ZWQnKTt9aWYocHJvY2Vzcy5lbnYuTk9ERV9FTlYhPT0nZGV2ZWxvcG1lbnQnJiZwcm9jZXNzLmVudi5fX05FWFRfT1BUSU1JWkVfRk9OVFMmJiFpbkFtcE1vZGUpe2NoaWxkcmVuPXRoaXMubWFrZVN0eWxlc2hlZXRJbmVydChjaGlsZHJlbik7fWNoaWxkcmVuPXRoaXMuaGFuZGxlRG9jdW1lbnRTY3JpcHRMb2FkZXJJdGVtcyhjaGlsZHJlbik7bGV0IGhhc0FtcGh0bWxSZWw9ZmFsc2U7bGV0IGhhc0Nhbm9uaWNhbFJlbD1mYWxzZTsvLyBzaG93IHdhcm5pbmcgYW5kIHJlbW92ZSBjb25mbGljdGluZyBhbXAgaGVhZCB0YWdzXG5oZWFkPV9yZWFjdC5kZWZhdWx0LkNoaWxkcmVuLm1hcChoZWFkfHxbXSxjaGlsZD0+e2lmKCFjaGlsZClyZXR1cm4gY2hpbGQ7Y29uc3R7dHlwZSxwcm9wc309Y2hpbGQ7aWYoaW5BbXBNb2RlKXtsZXQgYmFkUHJvcD0nJztpZih0eXBlPT09J21ldGEnJiZwcm9wcy5uYW1lPT09J3ZpZXdwb3J0Jyl7YmFkUHJvcD0nbmFtZT1cInZpZXdwb3J0XCInO31lbHNlIGlmKHR5cGU9PT0nbGluaycmJnByb3BzLnJlbD09PSdjYW5vbmljYWwnKXtoYXNDYW5vbmljYWxSZWw9dHJ1ZTt9ZWxzZSBpZih0eXBlPT09J3NjcmlwdCcpey8vIG9ubHkgYmxvY2sgaWZcbi8vIDEuIGl0IGhhcyBhIHNyYyBhbmQgaXNuJ3QgcG9pbnRpbmcgdG8gYW1wcHJvamVjdCdzIENETlxuLy8gMi4gaXQgaXMgdXNpbmcgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwgd2l0aG91dCBhIHR5cGUgb3Jcbi8vIGEgdHlwZSBvZiB0ZXh0L2phdmFzY3JpcHRcbmlmKHByb3BzLnNyYyYmcHJvcHMuc3JjLmluZGV4T2YoJ2FtcHByb2plY3QnKTwtMXx8cHJvcHMuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwmJighcHJvcHMudHlwZXx8cHJvcHMudHlwZT09PSd0ZXh0L2phdmFzY3JpcHQnKSl7YmFkUHJvcD0nPHNjcmlwdCc7T2JqZWN0LmtleXMocHJvcHMpLmZvckVhY2gocHJvcD0+e2JhZFByb3ArPWAgJHtwcm9wfT1cIiR7cHJvcHNbcHJvcF19XCJgO30pO2JhZFByb3ArPScvPic7fX1pZihiYWRQcm9wKXtjb25zb2xlLndhcm4oYEZvdW5kIGNvbmZsaWN0aW5nIGFtcCB0YWcgXCIke2NoaWxkLnR5cGV9XCIgd2l0aCBjb25mbGljdGluZyBwcm9wICR7YmFkUHJvcH0gaW4gJHtfX05FWFRfREFUQV9fLnBhZ2V9LiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9jb25mbGljdGluZy1hbXAtdGFnYCk7cmV0dXJuIG51bGw7fX1lbHNley8vIG5vbi1hbXAgbW9kZVxuaWYodHlwZT09PSdsaW5rJyYmcHJvcHMucmVsPT09J2FtcGh0bWwnKXtoYXNBbXBodG1sUmVsPXRydWU7fX1yZXR1cm4gY2hpbGQ7fSk7Ly8gdHJ5IHRvIHBhcnNlIHN0eWxlcyBmcm9tIGZyYWdtZW50IGZvciBiYWNrd2FyZHMgY29tcGF0XG5jb25zdCBjdXJTdHlsZXM9QXJyYXkuaXNBcnJheShzdHlsZXMpP3N0eWxlczpbXTtpZihpbkFtcE1vZGUmJnN0eWxlcyYmLy8gQHRzLWlnbm9yZSBQcm9wZXJ0eSAncHJvcHMnIGRvZXMgbm90IGV4aXN0IG9uIHR5cGUgUmVhY3RFbGVtZW50XG5zdHlsZXMucHJvcHMmJi8vIEB0cy1pZ25vcmUgUHJvcGVydHkgJ3Byb3BzJyBkb2VzIG5vdCBleGlzdCBvbiB0eXBlIFJlYWN0RWxlbWVudFxuQXJyYXkuaXNBcnJheShzdHlsZXMucHJvcHMuY2hpbGRyZW4pKXtjb25zdCBoYXNTdHlsZXM9ZWw9Pnt2YXIgX2VsJHByb3BzLF9lbCRwcm9wcyRkYW5nZXJvdXNseTtyZXR1cm4gZWw9PW51bGw/dm9pZCAwOihfZWwkcHJvcHM9ZWwucHJvcHMpPT1udWxsP3ZvaWQgMDooX2VsJHByb3BzJGRhbmdlcm91c2x5PV9lbCRwcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTCk9PW51bGw/dm9pZCAwOl9lbCRwcm9wcyRkYW5nZXJvdXNseS5fX2h0bWw7fTsvLyBAdHMtaWdub3JlIFByb3BlcnR5ICdwcm9wcycgZG9lcyBub3QgZXhpc3Qgb24gdHlwZSBSZWFjdEVsZW1lbnRcbnN0eWxlcy5wcm9wcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkPT57aWYoQXJyYXkuaXNBcnJheShjaGlsZCkpe2NoaWxkLmZvckVhY2goZWw9Pmhhc1N0eWxlcyhlbCkmJmN1clN0eWxlcy5wdXNoKGVsKSk7fWVsc2UgaWYoaGFzU3R5bGVzKGNoaWxkKSl7Y3VyU3R5bGVzLnB1c2goY2hpbGQpO319KTt9Y29uc3QgZmlsZXM9Z2V0RG9jdW1lbnRGaWxlcyh0aGlzLmNvbnRleHQuYnVpbGRNYW5pZmVzdCx0aGlzLmNvbnRleHQuX19ORVhUX0RBVEFfXy5wYWdlLGluQW1wTW9kZSk7cmV0dXJuLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJoZWFkXCIsdGhpcy5wcm9wcyx0aGlzLmNvbnRleHQuaXNEZXZlbG9wbWVudCYmLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX3JlYWN0LmRlZmF1bHQuRnJhZ21lbnQsbnVsbCwvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIse1wiZGF0YS1uZXh0LWhpZGUtZm91Y1wiOnRydWUsXCJkYXRhLWFtcGRldm1vZGVcIjppbkFtcE1vZGU/J3RydWUnOnVuZGVmaW5lZCxkYW5nZXJvdXNseVNldElubmVySFRNTDp7X19odG1sOmBib2R5e2Rpc3BsYXk6bm9uZX1gfX0pLC8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibm9zY3JpcHRcIix7XCJkYXRhLW5leHQtaGlkZS1mb3VjXCI6dHJ1ZSxcImRhdGEtYW1wZGV2bW9kZVwiOmluQW1wTW9kZT8ndHJ1ZSc6dW5kZWZpbmVkfSwvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIse2Rhbmdlcm91c2x5U2V0SW5uZXJIVE1MOntfX2h0bWw6YGJvZHl7ZGlzcGxheTpibG9ja31gfX0pKSksY2hpbGRyZW4scHJvY2Vzcy5lbnYuX19ORVhUX09QVElNSVpFX0ZPTlRTJiYvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcIm1ldGFcIix7bmFtZTpcIm5leHQtZm9udC1wcmVjb25uZWN0XCJ9KSxoZWFkLC8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibWV0YVwiLHtuYW1lOlwibmV4dC1oZWFkLWNvdW50XCIsY29udGVudDpfcmVhY3QuZGVmYXVsdC5DaGlsZHJlbi5jb3VudChoZWFkfHxbXSkudG9TdHJpbmcoKX0pLGluQW1wTW9kZSYmLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX3JlYWN0LmRlZmF1bHQuRnJhZ21lbnQsbnVsbCwvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcIm1ldGFcIix7bmFtZTpcInZpZXdwb3J0XCIsY29udGVudDpcIndpZHRoPWRldmljZS13aWR0aCxtaW5pbXVtLXNjYWxlPTEsaW5pdGlhbC1zY2FsZT0xXCJ9KSwhaGFzQ2Fub25pY2FsUmVsJiYvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpbmtcIix7cmVsOlwiY2Fub25pY2FsXCIsaHJlZjpjYW5vbmljYWxCYXNlKygwLF91dGlsczIuY2xlYW5BbXBQYXRoKShkYW5nZXJvdXNBc1BhdGgpfSksLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIse3JlbDpcInByZWxvYWRcIixhczpcInNjcmlwdFwiLGhyZWY6XCJodHRwczovL2Nkbi5hbXBwcm9qZWN0Lm9yZy92MC5qc1wifSksc3R5bGVzJiYvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIse1wiYW1wLWN1c3RvbVwiOlwiXCIsZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw6e19faHRtbDpjdXJTdHlsZXMubWFwKHN0eWxlPT5zdHlsZS5wcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTC5fX2h0bWwpLmpvaW4oJycpLnJlcGxhY2UoL1xcL1xcKiMgc291cmNlTWFwcGluZ1VSTD0uKlxcKlxcLy9nLCcnKS5yZXBsYWNlKC9cXC9cXCpAIHNvdXJjZVVSTD0uKj9cXCpcXC8vZywnJyl9fSksLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiLHtcImFtcC1ib2lsZXJwbGF0ZVwiOlwiXCIsZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw6e19faHRtbDpgYm9keXstd2Via2l0LWFuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RoOy1tb3otYW5pbWF0aW9uOi1hbXAtc3RhcnQgOHMgc3RlcHMoMSxlbmQpIDBzIDEgbm9ybWFsIGJvdGg7LW1zLWFuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RoO2FuaW1hdGlvbjotYW1wLXN0YXJ0IDhzIHN0ZXBzKDEsZW5kKSAwcyAxIG5vcm1hbCBib3RofUAtd2Via2l0LWtleWZyYW1lcyAtYW1wLXN0YXJ0e2Zyb217dmlzaWJpbGl0eTpoaWRkZW59dG97dmlzaWJpbGl0eTp2aXNpYmxlfX1ALW1vei1rZXlmcmFtZXMgLWFtcC1zdGFydHtmcm9te3Zpc2liaWxpdHk6aGlkZGVufXRve3Zpc2liaWxpdHk6dmlzaWJsZX19QC1tcy1rZXlmcmFtZXMgLWFtcC1zdGFydHtmcm9te3Zpc2liaWxpdHk6aGlkZGVufXRve3Zpc2liaWxpdHk6dmlzaWJsZX19QC1vLWtleWZyYW1lcyAtYW1wLXN0YXJ0e2Zyb217dmlzaWJpbGl0eTpoaWRkZW59dG97dmlzaWJpbGl0eTp2aXNpYmxlfX1Aa2V5ZnJhbWVzIC1hbXAtc3RhcnR7ZnJvbXt2aXNpYmlsaXR5OmhpZGRlbn10b3t2aXNpYmlsaXR5OnZpc2libGV9fWB9fSksLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJub3NjcmlwdFwiLG51bGwsLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiLHtcImFtcC1ib2lsZXJwbGF0ZVwiOlwiXCIsZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw6e19faHRtbDpgYm9keXstd2Via2l0LWFuaW1hdGlvbjpub25lOy1tb3otYW5pbWF0aW9uOm5vbmU7LW1zLWFuaW1hdGlvbjpub25lO2FuaW1hdGlvbjpub25lfWB9fSkpLC8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIse2FzeW5jOnRydWUsc3JjOlwiaHR0cHM6Ly9jZG4uYW1wcHJvamVjdC5vcmcvdjAuanNcIn0pKSwhaW5BbXBNb2RlJiYvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChfcmVhY3QuZGVmYXVsdC5GcmFnbWVudCxudWxsLCFoYXNBbXBodG1sUmVsJiZoeWJyaWRBbXAmJi8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlua1wiLHtyZWw6XCJhbXBodG1sXCIsaHJlZjpjYW5vbmljYWxCYXNlK2dldEFtcFBhdGgoYW1wUGF0aCxkYW5nZXJvdXNBc1BhdGgpfSksIXByb2Nlc3MuZW52Ll9fTkVYVF9PUFRJTUlaRV9DU1MmJnRoaXMuZ2V0Q3NzTGlua3MoZmlsZXMpLCFwcm9jZXNzLmVudi5fX05FWFRfT1BUSU1JWkVfQ1NTJiYvKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcIm5vc2NyaXB0XCIse1wiZGF0YS1uLWNzc1wiOihfdGhpcyRwcm9wcyRub25jZT10aGlzLnByb3BzLm5vbmNlKSE9bnVsbD9fdGhpcyRwcm9wcyRub25jZTonJ30pLHByb2Nlc3MuZW52Ll9fTkVYVF9PUFRJTUlaRV9JTUFHRVMmJi8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibWV0YVwiLHtuYW1lOlwibmV4dC1pbWFnZS1wcmVsb2FkXCJ9KSwhZGlzYWJsZVJ1bnRpbWVKUyYmIWRpc2FibGVKc1ByZWxvYWQmJnRoaXMuZ2V0UHJlbG9hZER5bmFtaWNDaHVua3MoKSwhZGlzYWJsZVJ1bnRpbWVKUyYmIWRpc2FibGVKc1ByZWxvYWQmJnRoaXMuZ2V0UHJlbG9hZE1haW5MaW5rcyhmaWxlcyksIWRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nJiYhZGlzYWJsZVJ1bnRpbWVKUyYmdGhpcy5nZXRQb2x5ZmlsbFNjcmlwdHMoKSwhZGlzYWJsZU9wdGltaXplZExvYWRpbmcmJiFkaXNhYmxlUnVudGltZUpTJiZ0aGlzLmdldFByZU5leHRTY3JpcHRzKCksIWRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nJiYhZGlzYWJsZVJ1bnRpbWVKUyYmdGhpcy5nZXREeW5hbWljQ2h1bmtzKGZpbGVzKSwhZGlzYWJsZU9wdGltaXplZExvYWRpbmcmJiFkaXNhYmxlUnVudGltZUpTJiZ0aGlzLmdldFNjcmlwdHMoZmlsZXMpLHByb2Nlc3MuZW52Ll9fTkVYVF9PUFRJTUlaRV9DU1MmJnRoaXMuZ2V0Q3NzTGlua3MoZmlsZXMpLHByb2Nlc3MuZW52Ll9fTkVYVF9PUFRJTUlaRV9DU1MmJi8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibm9zY3JpcHRcIix7XCJkYXRhLW4tY3NzXCI6KF90aGlzJHByb3BzJG5vbmNlMj10aGlzLnByb3BzLm5vbmNlKSE9bnVsbD9fdGhpcyRwcm9wcyRub25jZTI6Jyd9KSx0aGlzLmNvbnRleHQuaXNEZXZlbG9wbWVudCYmLyojX19QVVJFX18qLyAvLyB0aGlzIGVsZW1lbnQgaXMgdXNlZCB0byBtb3VudCBkZXZlbG9wbWVudCBzdHlsZXMgc28gdGhlXG4vLyBvcmRlcmluZyBtYXRjaGVzIHByb2R1Y3Rpb25cbi8vIChieSBkZWZhdWx0LCBzdHlsZS1sb2FkZXIgaW5qZWN0cyBhdCB0aGUgYm90dG9tIG9mIDxoZWFkIC8+KVxuX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcIm5vc2NyaXB0XCIse2lkOlwiX19uZXh0X2Nzc19fRE9fTk9UX1VTRV9fXCJ9KSxzdHlsZXN8fG51bGwpLC8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdC5kZWZhdWx0LkZyYWdtZW50LHt9LC4uLihoZWFkVGFnc3x8W10pKSk7fX1leHBvcnRzLkhlYWQ9SGVhZDtIZWFkLmNvbnRleHRUeXBlPV9kb2N1bWVudENvbnRleHQuRG9jdW1lbnRDb250ZXh0O0hlYWQucHJvcFR5cGVzPXtub25jZTpfcHJvcFR5cGVzLmRlZmF1bHQuc3RyaW5nLGNyb3NzT3JpZ2luOl9wcm9wVHlwZXMuZGVmYXVsdC5zdHJpbmd9O2Z1bmN0aW9uIE1haW4oKXtjb25zdHtpbkFtcE1vZGUsaHRtbCxkb2NDb21wb25lbnRzUmVuZGVyZWR9PSgwLF9yZWFjdC51c2VDb250ZXh0KShfZG9jdW1lbnRDb250ZXh0LkRvY3VtZW50Q29udGV4dCk7ZG9jQ29tcG9uZW50c1JlbmRlcmVkLk1haW49dHJ1ZTtpZihpbkFtcE1vZGUpcmV0dXJuLyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX3JlYWN0LmRlZmF1bHQuRnJhZ21lbnQsbnVsbCxfY29uc3RhbnRzLkFNUF9SRU5ERVJfVEFSR0VUKTtyZXR1cm4vKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLHtpZDpcIl9fbmV4dFwiLGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOntfX2h0bWw6aHRtbH19KTt9Y2xhc3MgTmV4dFNjcmlwdCBleHRlbmRzIF9yZWFjdC5Db21wb25lbnR7Y29uc3RydWN0b3IoLi4uYXJncyl7c3VwZXIoLi4uYXJncyk7dGhpcy5jb250ZXh0PXZvaWQgMDt9Z2V0RHluYW1pY0NodW5rcyhmaWxlcyl7cmV0dXJuIGdldER5bmFtaWNDaHVua3ModGhpcy5jb250ZXh0LHRoaXMucHJvcHMsZmlsZXMpO31nZXRQcmVOZXh0U2NyaXB0cygpe3JldHVybiBnZXRQcmVOZXh0U2NyaXB0cyh0aGlzLmNvbnRleHQsdGhpcy5wcm9wcyk7fWdldFNjcmlwdHMoZmlsZXMpe3JldHVybiBnZXRTY3JpcHRzKHRoaXMuY29udGV4dCx0aGlzLnByb3BzLGZpbGVzKTt9Z2V0UG9seWZpbGxTY3JpcHRzKCl7cmV0dXJuIGdldFBvbHlmaWxsU2NyaXB0cyh0aGlzLmNvbnRleHQsdGhpcy5wcm9wcyk7fXN0YXRpYyBnZXRJbmxpbmVTY3JpcHRTb3VyY2UoZG9jdW1lbnRQcm9wcyl7Y29uc3R7X19ORVhUX0RBVEFfX309ZG9jdW1lbnRQcm9wczt0cnl7Y29uc3QgZGF0YT1KU09OLnN0cmluZ2lmeShfX05FWFRfREFUQV9fKTtyZXR1cm4oMCxfaHRtbGVzY2FwZS5odG1sRXNjYXBlSnNvblN0cmluZykoZGF0YSk7fWNhdGNoKGVycil7aWYoZXJyLm1lc3NhZ2UuaW5kZXhPZignY2lyY3VsYXIgc3RydWN0dXJlJykpe3Rocm93IG5ldyBFcnJvcihgQ2lyY3VsYXIgc3RydWN0dXJlIGluIFwiZ2V0SW5pdGlhbFByb3BzXCIgcmVzdWx0IG9mIHBhZ2UgXCIke19fTkVYVF9EQVRBX18ucGFnZX1cIi4gaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvY2lyY3VsYXItc3RydWN0dXJlYCk7fXRocm93IGVycjt9fXJlbmRlcigpe2NvbnN0e2Fzc2V0UHJlZml4LGluQW1wTW9kZSxidWlsZE1hbmlmZXN0LHVuc3RhYmxlX3J1bnRpbWVKUyxkb2NDb21wb25lbnRzUmVuZGVyZWQsZGV2T25seUNhY2hlQnVzdGVyUXVlcnlTdHJpbmcsZGlzYWJsZU9wdGltaXplZExvYWRpbmd9PXRoaXMuY29udGV4dDtjb25zdCBkaXNhYmxlUnVudGltZUpTPXVuc3RhYmxlX3J1bnRpbWVKUz09PWZhbHNlO2RvY0NvbXBvbmVudHNSZW5kZXJlZC5OZXh0U2NyaXB0PXRydWU7aWYoaW5BbXBNb2RlKXtpZihwcm9jZXNzLmVudi5OT0RFX0VOVj09PSdwcm9kdWN0aW9uJyl7cmV0dXJuIG51bGw7fWNvbnN0IGFtcERldkZpbGVzPVsuLi5idWlsZE1hbmlmZXN0LmRldkZpbGVzLC4uLmJ1aWxkTWFuaWZlc3QucG9seWZpbGxGaWxlcywuLi5idWlsZE1hbmlmZXN0LmFtcERldkZpbGVzXTtyZXR1cm4vKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChfcmVhY3QuZGVmYXVsdC5GcmFnbWVudCxudWxsLGRpc2FibGVSdW50aW1lSlM/bnVsbDovKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLHtpZDpcIl9fTkVYVF9EQVRBX19cIix0eXBlOlwiYXBwbGljYXRpb24vanNvblwiLG5vbmNlOnRoaXMucHJvcHMubm9uY2UsY3Jvc3NPcmlnaW46dGhpcy5wcm9wcy5jcm9zc09yaWdpbnx8cHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTixkYW5nZXJvdXNseVNldElubmVySFRNTDp7X19odG1sOk5leHRTY3JpcHQuZ2V0SW5saW5lU2NyaXB0U291cmNlKHRoaXMuY29udGV4dCl9LFwiZGF0YS1hbXBkZXZtb2RlXCI6dHJ1ZX0pLGFtcERldkZpbGVzLm1hcChmaWxlPT4vKiNfX1BVUkVfXyovX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLHtrZXk6ZmlsZSxzcmM6YCR7YXNzZXRQcmVmaXh9L19uZXh0LyR7ZmlsZX0ke2Rldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nfWAsbm9uY2U6dGhpcy5wcm9wcy5ub25jZSxjcm9zc09yaWdpbjp0aGlzLnByb3BzLmNyb3NzT3JpZ2lufHxwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOLFwiZGF0YS1hbXBkZXZtb2RlXCI6dHJ1ZX0pKSk7fWlmKHByb2Nlc3MuZW52Lk5PREVfRU5WIT09J3Byb2R1Y3Rpb24nKXtpZih0aGlzLnByb3BzLmNyb3NzT3JpZ2luKWNvbnNvbGUud2FybignV2FybmluZzogYE5leHRTY3JpcHRgIGF0dHJpYnV0ZSBgY3Jvc3NPcmlnaW5gIGlzIGRlcHJlY2F0ZWQuIGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL2RvYy1jcm9zc29yaWdpbi1kZXByZWNhdGVkJyk7fWNvbnN0IGZpbGVzPWdldERvY3VtZW50RmlsZXModGhpcy5jb250ZXh0LmJ1aWxkTWFuaWZlc3QsdGhpcy5jb250ZXh0Ll9fTkVYVF9EQVRBX18ucGFnZSxpbkFtcE1vZGUpO3JldHVybi8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdC5kZWZhdWx0LkZyYWdtZW50LG51bGwsIWRpc2FibGVSdW50aW1lSlMmJmJ1aWxkTWFuaWZlc3QuZGV2RmlsZXM/YnVpbGRNYW5pZmVzdC5kZXZGaWxlcy5tYXAoZmlsZT0+LyojX19QVVJFX18qL19yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIix7a2V5OmZpbGUsc3JjOmAke2Fzc2V0UHJlZml4fS9fbmV4dC8ke2VuY29kZVVSSShmaWxlKX0ke2Rldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nfWAsbm9uY2U6dGhpcy5wcm9wcy5ub25jZSxjcm9zc09yaWdpbjp0aGlzLnByb3BzLmNyb3NzT3JpZ2lufHxwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOfSkpOm51bGwsZGlzYWJsZVJ1bnRpbWVKUz9udWxsOi8qI19fUFVSRV9fKi9fcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIse2lkOlwiX19ORVhUX0RBVEFfX1wiLHR5cGU6XCJhcHBsaWNhdGlvbi9qc29uXCIsbm9uY2U6dGhpcy5wcm9wcy5ub25jZSxjcm9zc09yaWdpbjp0aGlzLnByb3BzLmNyb3NzT3JpZ2lufHxwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOLGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOntfX2h0bWw6TmV4dFNjcmlwdC5nZXRJbmxpbmVTY3JpcHRTb3VyY2UodGhpcy5jb250ZXh0KX19KSxkaXNhYmxlT3B0aW1pemVkTG9hZGluZyYmIWRpc2FibGVSdW50aW1lSlMmJnRoaXMuZ2V0UG9seWZpbGxTY3JpcHRzKCksZGlzYWJsZU9wdGltaXplZExvYWRpbmcmJiFkaXNhYmxlUnVudGltZUpTJiZ0aGlzLmdldFByZU5leHRTY3JpcHRzKCksZGlzYWJsZU9wdGltaXplZExvYWRpbmcmJiFkaXNhYmxlUnVudGltZUpTJiZ0aGlzLmdldER5bmFtaWNDaHVua3MoZmlsZXMpLGRpc2FibGVPcHRpbWl6ZWRMb2FkaW5nJiYhZGlzYWJsZVJ1bnRpbWVKUyYmdGhpcy5nZXRTY3JpcHRzKGZpbGVzKSk7fX1leHBvcnRzLk5leHRTY3JpcHQ9TmV4dFNjcmlwdDtOZXh0U2NyaXB0LmNvbnRleHRUeXBlPV9kb2N1bWVudENvbnRleHQuRG9jdW1lbnRDb250ZXh0O05leHRTY3JpcHQucHJvcFR5cGVzPXtub25jZTpfcHJvcFR5cGVzLmRlZmF1bHQuc3RyaW5nLGNyb3NzT3JpZ2luOl9wcm9wVHlwZXMuZGVmYXVsdC5zdHJpbmd9O05leHRTY3JpcHQuc2FmYXJpTm9tb2R1bGVGaXg9JyFmdW5jdGlvbigpe3ZhciBlPWRvY3VtZW50LHQ9ZS5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO2lmKCEoXCJub01vZHVsZVwiaW4gdCkmJlwib25iZWZvcmVsb2FkXCJpbiB0KXt2YXIgbj0hMTtlLmFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmVsb2FkXCIsZnVuY3Rpb24oZSl7aWYoZS50YXJnZXQ9PT10KW49ITA7ZWxzZSBpZighZS50YXJnZXQuaGFzQXR0cmlidXRlKFwibm9tb2R1bGVcIil8fCFuKXJldHVybjtlLnByZXZlbnREZWZhdWx0KCl9LCEwKSx0LnR5cGU9XCJtb2R1bGVcIix0LnNyYz1cIi5cIixlLmhlYWQuYXBwZW5kQ2hpbGQodCksdC5yZW1vdmUoKX19KCk7JztmdW5jdGlvbiBnZXRBbXBQYXRoKGFtcFBhdGgsYXNQYXRoKXtyZXR1cm4gYW1wUGF0aHx8YCR7YXNQYXRofSR7YXNQYXRoLmluY2x1ZGVzKCc/Jyk/JyYnOic/J31hbXA9MWA7fVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9X2RvY3VtZW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2V4cG9ydHMuX19lc01vZHVsZT10cnVlO2V4cG9ydHMuaHRtbEVzY2FwZUpzb25TdHJpbmc9aHRtbEVzY2FwZUpzb25TdHJpbmc7Ly8gVGhpcyB1dGlsaXR5IGlzIGJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS96ZXJ0b3NoL2h0bWxlc2NhcGVcbi8vIExpY2Vuc2U6IGh0dHBzOi8vZ2l0aHViLmNvbS96ZXJ0b3NoL2h0bWxlc2NhcGUvYmxvYi8wNTI3Y2E3MTU2YTUyNGQyNTYxMDFiYjMxMGE5Zjk3MGY2MzA3OGFkL0xJQ0VOU0VcbmNvbnN0IEVTQ0FQRV9MT09LVVA9eycmJzonXFxcXHUwMDI2JywnPic6J1xcXFx1MDAzZScsJzwnOidcXFxcdTAwM2MnLCdcXHUyMDI4JzonXFxcXHUyMDI4JywnXFx1MjAyOSc6J1xcXFx1MjAyOSd9O2NvbnN0IEVTQ0FQRV9SRUdFWD0vWyY+PFxcdTIwMjhcXHUyMDI5XS9nO2Z1bmN0aW9uIGh0bWxFc2NhcGVKc29uU3RyaW5nKHN0cil7cmV0dXJuIHN0ci5yZXBsYWNlKEVTQ0FQRV9SRUdFWCxtYXRjaD0+RVNDQVBFX0xPT0tVUFttYXRjaF0pO31cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWh0bWxlc2NhcGUuanMubWFwIiwiZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgYXJyMltpXSA9IGFycltpXTtcbiAgfVxuXG4gIHJldHVybiBhcnIyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheUxpa2VUb0FycmF5OyIsImZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRoSG9sZXM7IiwidmFyIGFycmF5TGlrZVRvQXJyYXkgPSByZXF1aXJlKFwiLi9hcnJheUxpa2VUb0FycmF5XCIpO1xuXG5mdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KGFycik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5V2l0aG91dEhvbGVzOyIsImZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2Fzc2VydFRoaXNJbml0aWFsaXplZDsiLCJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7XG4gIHRyeSB7XG4gICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVqZWN0KGVycm9yKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoaW5mby5kb25lKSB7XG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKF9uZXh0LCBfdGhyb3cpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgZ2VuID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG5cbiAgICAgIGZ1bmN0aW9uIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gX3Rocm93KGVycikge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwidGhyb3dcIiwgZXJyKTtcbiAgICAgIH1cblxuICAgICAgX25leHQodW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXN5bmNUb0dlbmVyYXRvcjsiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0NhbGxDaGVjazsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NyZWF0ZUNsYXNzOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCJmdW5jdGlvbiBfZXh0ZW5kcygpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2V4dGVuZHM7IiwiZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICAgIHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7XG4gIH07XG4gIHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2dldFByb3RvdHlwZU9mOyIsInZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuL3NldFByb3RvdHlwZU9mXCIpO1xuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBzZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2luaGVyaXRzOyIsImZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQ7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoaXRlcikpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXk7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjtcbiAgdmFyIF9hcnIgPSBbXTtcbiAgdmFyIF9uID0gdHJ1ZTtcbiAgdmFyIF9kID0gZmFsc2U7XG4gIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kID0gdHJ1ZTtcbiAgICBfZSA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXlMaW1pdDsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVJlc3Q7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVTcHJlYWQ7IiwidmFyIG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgPSByZXF1aXJlKFwiLi9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlXCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCk7XG4gIHZhciBrZXksIGk7XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICB2YXIgc291cmNlU3ltYm9sS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VTeW1ib2xLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBrZXkgPSBzb3VyY2VTeW1ib2xLZXlzW2ldO1xuICAgICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHNvdXJjZSwga2V5KSkgY29udGludWU7XG4gICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzOyIsImZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpIHtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307XG4gIHZhciB0YXJnZXQgPSB7fTtcbiAgdmFyIHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuICB2YXIga2V5LCBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAga2V5ID0gc291cmNlS2V5c1tpXTtcbiAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlOyIsInZhciBfdHlwZW9mID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgYXNzZXJ0VGhpc0luaXRpYWxpemVkID0gcmVxdWlyZShcIi4vYXNzZXJ0VGhpc0luaXRpYWxpemVkXCIpO1xuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG4gIGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgcmV0dXJuIGNhbGw7XG4gIH1cblxuICByZXR1cm4gYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuOyIsImZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgby5fX3Byb3RvX18gPSBwO1xuICAgIHJldHVybiBvO1xuICB9O1xuXG4gIHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mOyIsInZhciBhcnJheVdpdGhIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aEhvbGVzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5TGltaXQgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdFwiKTtcblxudmFyIHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5ID0gcmVxdWlyZShcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXlcIik7XG5cbnZhciBub25JdGVyYWJsZVJlc3QgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVJlc3RcIik7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NsaWNlZFRvQXJyYXk7IiwidmFyIGFycmF5V2l0aG91dEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRob3V0SG9sZXNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXkgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlcIik7XG5cbnZhciB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSA9IHJlcXVpcmUoXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5XCIpO1xuXG52YXIgbm9uSXRlcmFibGVTcHJlYWQgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVNwcmVhZFwiKTtcblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3RvQ29uc3VtYWJsZUFycmF5OyIsImZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZjsiLCJ2YXIgYXJyYXlMaWtlVG9BcnJheSA9IHJlcXVpcmUoXCIuL2FycmF5TGlrZVRvQXJyYXlcIik7XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZ2VuZXJhdG9yLXJ1bnRpbWVcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL2NvbnN0YW50cy5qc1wiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi9kb2N1bWVudC1jb250ZXh0LmpzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL2hlYWQtbWFuYWdlci1jb250ZXh0LmpzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL3V0aWxzLmpzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvc2VydmVyL2dldC1wYWdlLWZpbGVzLmpzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvc2VydmVyL3V0aWxzLmpzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcm9wLXR5cGVzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVnZW5lcmF0b3ItcnVudGltZVwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3R5bGVkLWpzeC9zZXJ2ZXJcIik7OyJdLCJzb3VyY2VSb290IjoiIn0=