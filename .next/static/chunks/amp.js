(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["amp"],{

/***/ "./node_modules/next/dist/client/dev/amp-dev.js":
/*!******************************************************!*\
  !*** ./node_modules/next/dist/client/dev/amp-dev.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


var _regeneratorRuntime = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/next/node_modules/@babel/runtime/regenerator/index.js");

var _asyncToGenerator = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/asyncToGenerator */ "./node_modules/next/node_modules/@babel/runtime/helpers/asyncToGenerator.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _eventSourcePolyfill = _interopRequireDefault(__webpack_require__(/*! ./event-source-polyfill */ "./node_modules/next/dist/client/dev/event-source-polyfill.js"));

var _eventsource = __webpack_require__(/*! ./error-overlay/eventsource */ "./node_modules/next/dist/client/dev/error-overlay/eventsource.js");

var _onDemandEntriesUtils = __webpack_require__(/*! ./on-demand-entries-utils */ "./node_modules/next/dist/client/dev/on-demand-entries-utils.js");

var _fouc = __webpack_require__(/*! ./fouc */ "./node_modules/next/dist/client/dev/fouc.js");
/* globals __webpack_hash__ */


if (!window.EventSource) {
  window.EventSource = _eventSourcePolyfill["default"];
}

var data = JSON.parse(document.getElementById('__NEXT_DATA__').textContent);
var assetPrefix = data.assetPrefix,
    page = data.page;
assetPrefix = assetPrefix || '';
var mostRecentHash = null;
/* eslint-disable-next-line */

var curHash = __webpack_require__.h();
var hotUpdatePath = assetPrefix + (assetPrefix.endsWith('/') ? '' : '/') + '_next/static/webpack/'; // Is there a newer version of this code available?

function isUpdateAvailable() {
  // __webpack_hash__ is the hash of the current compilation.
  // It's a global variable injected by Webpack.

  /* eslint-disable-next-line */
  return mostRecentHash !== __webpack_require__.h();
} // Webpack disallows updates in other states.


function canApplyUpdates() {
  return module.hot.status() === 'idle';
} // This function reads code updates on the fly and hard
// reloads the page when it has changed.


function tryApplyUpdates() {
  return _tryApplyUpdates.apply(this, arguments);
}

function _tryApplyUpdates() {
  _tryApplyUpdates = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var res, jsonData, curPage, pageUpdated;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!isUpdateAvailable() || !canApplyUpdates())) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            _context.prev = 2;
            _context.next = 5;
            return fetch(typeof __webpack_require__.j !== 'undefined' ? // eslint-disable-next-line no-undef
            "".concat(hotUpdatePath).concat(curHash, ".").concat(__webpack_require__.j, ".hot-update.json") : "".concat(hotUpdatePath).concat(curHash, ".hot-update.json"));

          case 5:
            res = _context.sent;
            _context.next = 8;
            return res.json();

          case 8:
            jsonData = _context.sent;
            curPage = page === '/' ? 'index' : page; // webpack 5 uses an array instead

            pageUpdated = (Array.isArray(jsonData.c) ? jsonData.c : Object.keys(jsonData.c)).some(function (mod) {
              return mod.indexOf("pages".concat(curPage.substr(0, 1) === '/' ? curPage : "/".concat(curPage))) !== -1 || mod.indexOf("pages".concat(curPage.substr(0, 1) === '/' ? curPage : "/".concat(curPage)).replace(/\//g, '\\')) !== -1;
            });

            if (pageUpdated) {
              document.location.reload(true);
            } else {
              curHash = mostRecentHash;
            }

            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](2);
            console.error('Error occurred checking for update', _context.t0);
            document.location.reload(true);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 14]]);
  }));
  return _tryApplyUpdates.apply(this, arguments);
}

(0, _eventsource.addMessageListener)(function (event) {
  if (event.data === "\uD83D\uDC93") {
    return;
  }

  try {
    var message = JSON.parse(event.data);

    if (message.action === 'sync' || message.action === 'built') {
      if (!message.hash) {
        return;
      }

      mostRecentHash = message.hash;
      tryApplyUpdates();
    } else if (message.action === 'reloadPage') {
      document.location.reload(true);
    }
  } catch (ex) {
    console.warn('Invalid HMR message: ' + event.data + '\n' + ex);
  }
});
(0, _onDemandEntriesUtils.setupPing)(assetPrefix, function () {
  return page;
});
(0, _fouc.displayContent)();

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ }),

/***/ "./node_modules/next/dist/client/dev/error-overlay/eventsource.js":
/*!************************************************************************!*\
  !*** ./node_modules/next/dist/client/dev/error-overlay/eventsource.js ***!
  \************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


exports.__esModule = true;
exports.addMessageListener = addMessageListener;
exports.getEventSourceWrapper = getEventSourceWrapper;
var eventCallbacks = [];

function EventSourceWrapper(options) {
  var source;
  var lastActivity = new Date();
  var listeners = [];

  if (!options.timeout) {
    options.timeout = 20 * 1000;
  }

  init();
  var timer = setInterval(function () {
    if (new Date() - lastActivity > options.timeout) {
      handleDisconnect();
    }
  }, options.timeout / 2);

  function init() {
    source = new window.EventSource(options.path);
    source.onopen = handleOnline;
    source.onerror = handleDisconnect;
    source.onmessage = handleMessage;
  }

  function handleOnline() {
    if (options.log) console.log('[HMR] connected');
    lastActivity = new Date();
  }

  function handleMessage(event) {
    lastActivity = new Date();

    for (var i = 0; i < listeners.length; i++) {
      listeners[i](event);
    }

    eventCallbacks.forEach(function (cb) {
      if (!cb.unfiltered && event.data.indexOf('action') === -1) return;
      cb(event);
    });
  }

  function handleDisconnect() {
    clearInterval(timer);
    source.close();
    setTimeout(init, options.timeout);
  }

  return {
    close: function close() {
      clearInterval(timer);
      source.close();
    },
    addMessageListener: function addMessageListener(fn) {
      listeners.push(fn);
    }
  };
}

_c = EventSourceWrapper;

function addMessageListener(cb) {
  eventCallbacks.push(cb);
}

function getEventSourceWrapper(options) {
  return EventSourceWrapper(options);
}

var _c;

$RefreshReg$(_c, "EventSourceWrapper");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ }),

/***/ "./node_modules/next/dist/client/dev/event-source-polyfill.js":
/*!********************************************************************!*\
  !*** ./node_modules/next/dist/client/dev/event-source-polyfill.js ***!
  \********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


exports.__esModule = true;
exports.default = void 0;
/* eslint-disable */
// Improved version of https://github.com/Yaffle/EventSource/
// Available under MIT License (MIT)
// Only tries to support IE11 and nothing below

var document = window.document;
var Response = window.Response;
var TextDecoder = window.TextDecoder;
var TextEncoder = window.TextEncoder;
var AbortController = window.AbortController;

if (AbortController == undefined) {
  AbortController = function AbortController() {
    this.signal = null;

    this.abort = function () {};
  };
}

function TextDecoderPolyfill() {
  this.bitsNeeded = 0;
  this.codePoint = 0;
}

_c = TextDecoderPolyfill;

TextDecoderPolyfill.prototype.decode = function (octets) {
  function valid(codePoint, shift, octetsCount) {
    if (octetsCount === 1) {
      return codePoint >= 0x0080 >> shift && codePoint << shift <= 0x07ff;
    }

    if (octetsCount === 2) {
      return codePoint >= 0x0800 >> shift && codePoint << shift <= 0xd7ff || codePoint >= 0xe000 >> shift && codePoint << shift <= 0xffff;
    }

    if (octetsCount === 3) {
      return codePoint >= 0x010000 >> shift && codePoint << shift <= 0x10ffff;
    }

    throw new Error();
  }

  function octetsCount(bitsNeeded, codePoint) {
    if (bitsNeeded === 6 * 1) {
      return codePoint >> 6 > 15 ? 3 : codePoint > 31 ? 2 : 1;
    }

    if (bitsNeeded === 6 * 2) {
      return codePoint > 15 ? 3 : 2;
    }

    if (bitsNeeded === 6 * 3) {
      return 3;
    }

    throw new Error();
  }

  var REPLACER = 0xfffd;
  var string = '';
  var bitsNeeded = this.bitsNeeded;
  var codePoint = this.codePoint;

  for (var i = 0; i < octets.length; i += 1) {
    var octet = octets[i];

    if (bitsNeeded !== 0) {
      if (octet < 128 || octet > 191 || !valid(codePoint << 6 | octet & 63, bitsNeeded - 6, octetsCount(bitsNeeded, codePoint))) {
        bitsNeeded = 0;
        codePoint = REPLACER;
        string += String.fromCharCode(codePoint);
      }
    }

    if (bitsNeeded === 0) {
      if (octet >= 0 && octet <= 127) {
        bitsNeeded = 0;
        codePoint = octet;
      } else if (octet >= 192 && octet <= 223) {
        bitsNeeded = 6 * 1;
        codePoint = octet & 31;
      } else if (octet >= 224 && octet <= 239) {
        bitsNeeded = 6 * 2;
        codePoint = octet & 15;
      } else if (octet >= 240 && octet <= 247) {
        bitsNeeded = 6 * 3;
        codePoint = octet & 7;
      } else {
        bitsNeeded = 0;
        codePoint = REPLACER;
      }

      if (bitsNeeded !== 0 && !valid(codePoint, bitsNeeded, octetsCount(bitsNeeded, codePoint))) {
        bitsNeeded = 0;
        codePoint = REPLACER;
      }
    } else {
      bitsNeeded -= 6;
      codePoint = codePoint << 6 | octet & 63;
    }

    if (bitsNeeded === 0) {
      if (codePoint <= 0xffff) {
        string += String.fromCharCode(codePoint);
      } else {
        string += String.fromCharCode(0xd800 + (codePoint - 0xffff - 1 >> 10));
        string += String.fromCharCode(0xdc00 + (codePoint - 0xffff - 1 & 0x3ff));
      }
    }
  }

  this.bitsNeeded = bitsNeeded;
  this.codePoint = codePoint;
  return string;
}; // Firefox < 38 throws an error with stream option


var supportsStreamOption = function supportsStreamOption() {
  try {
    return new TextDecoder().decode(new TextEncoder().encode('test'), {
      stream: true
    }) === 'test';
  } catch (error) {
    console.log(error);
  }

  return false;
}; // IE, Edge


if (TextDecoder == undefined || TextEncoder == undefined || !supportsStreamOption()) {
  TextDecoder = TextDecoderPolyfill;
}

var k = function k() {};

function XHRWrapper(xhr) {
  this.withCredentials = false;
  this.responseType = '';
  this.readyState = 0;
  this.status = 0;
  this.statusText = '';
  this.responseText = '';
  this.onprogress = k;
  this.onreadystatechange = k;
  this._contentType = '';
  this._xhr = xhr;
  this._sendTimeout = 0;
  this._abort = k;
}

_c2 = XHRWrapper;

XHRWrapper.prototype.open = function (method, url) {
  this._abort(true);

  var that = this;
  var xhr = this._xhr;
  var state = 1;
  var timeout = 0;

  this._abort = function (silent) {
    if (that._sendTimeout !== 0) {
      clearTimeout(that._sendTimeout);
      that._sendTimeout = 0;
    }

    if (state === 1 || state === 2 || state === 3) {
      state = 4;
      xhr.onload = k;
      xhr.onerror = k;
      xhr.onabort = k;
      xhr.onprogress = k;
      xhr.onreadystatechange = k; // IE 8 - 9: XDomainRequest#abort() does not fire any event
      // Opera < 10: XMLHttpRequest#abort() does not fire any event

      xhr.abort();

      if (timeout !== 0) {
        clearTimeout(timeout);
        timeout = 0;
      }

      if (!silent) {
        that.readyState = 4;
        that.onreadystatechange();
      }
    }

    state = 0;
  };

  var onStart = function onStart() {
    if (state === 1) {
      // state = 2;
      var status = 0;
      var statusText = '';
      var contentType = undefined;

      if (!('contentType' in xhr)) {
        try {
          status = xhr.status;
          statusText = xhr.statusText;
          contentType = xhr.getResponseHeader('Content-Type');
        } catch (error) {
          // IE < 10 throws exception for `xhr.status` when xhr.readyState === 2 || xhr.readyState === 3
          // Opera < 11 throws exception for `xhr.status` when xhr.readyState === 2
          // https://bugs.webkit.org/show_bug.cgi?id=29121
          status = 0;
          statusText = '';
          contentType = undefined; // Firefox < 14, Chrome ?, Safari ?
          // https://bugs.webkit.org/show_bug.cgi?id=29658
          // https://bugs.webkit.org/show_bug.cgi?id=77854
        }
      } else {
        status = 200;
        statusText = 'OK';
        contentType = xhr.contentType;
      }

      if (status !== 0) {
        state = 2;
        that.readyState = 2;
        that.status = status;
        that.statusText = statusText;
        that._contentType = contentType;
        that.onreadystatechange();
      }
    }
  };

  var onProgress = function onProgress() {
    onStart();

    if (state === 2 || state === 3) {
      state = 3;
      var responseText = '';

      try {
        responseText = xhr.responseText;
      } catch (error) {// IE 8 - 9 with XMLHttpRequest
      }

      that.readyState = 3;
      that.responseText = responseText;
      that.onprogress();
    }
  };

  var onFinish = function onFinish() {
    // Firefox 52 fires "readystatechange" (xhr.readyState === 4) without final "readystatechange" (xhr.readyState === 3)
    // IE 8 fires "onload" without "onprogress"
    onProgress();

    if (state === 1 || state === 2 || state === 3) {
      state = 4;

      if (timeout !== 0) {
        clearTimeout(timeout);
        timeout = 0;
      }

      that.readyState = 4;
      that.onreadystatechange();
    }
  };

  var onReadyStateChange = function onReadyStateChange() {
    if (xhr != undefined) {
      // Opera 12
      if (xhr.readyState === 4) {
        onFinish();
      } else if (xhr.readyState === 3) {
        onProgress();
      } else if (xhr.readyState === 2) {
        onStart();
      }
    }
  };

  var onTimeout = function onTimeout() {
    timeout = setTimeout(function () {
      onTimeout();
    }, 500);

    if (xhr.readyState === 3) {
      onProgress();
    }
  }; // XDomainRequest#abort removes onprogress, onerror, onload


  xhr.onload = onFinish;
  xhr.onerror = onFinish; // improper fix to match Firefox behavior, but it is better than just ignore abort
  // see https://bugzilla.mozilla.org/show_bug.cgi?id=768596
  // https://bugzilla.mozilla.org/show_bug.cgi?id=880200
  // https://code.google.com/p/chromium/issues/detail?id=153570
  // IE 8 fires "onload" without "onprogress

  xhr.onabort = onFinish; // https://bugzilla.mozilla.org/show_bug.cgi?id=736723

  if (!('sendAsBinary' in XMLHttpRequest.prototype) && !('mozAnon' in XMLHttpRequest.prototype)) {
    xhr.onprogress = onProgress;
  } // IE 8 - 9 (XMLHTTPRequest)
  // Opera < 12
  // Firefox < 3.5
  // Firefox 3.5 - 3.6 - ? < 9.0
  // onprogress is not fired sometimes or delayed
  // see also #64


  xhr.onreadystatechange = onReadyStateChange;

  if ('contentType' in xhr) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + 'padding=true';
  }

  xhr.open(method, url, true);

  if ('readyState' in xhr) {
    // workaround for Opera 12 issue with "progress" events
    // #91
    timeout = setTimeout(function () {
      onTimeout();
    }, 0);
  }
};

XHRWrapper.prototype.abort = function () {
  this._abort(false);
};

XHRWrapper.prototype.getResponseHeader = function (name) {
  return this._contentType;
};

XHRWrapper.prototype.setRequestHeader = function (name, value) {
  var xhr = this._xhr;

  if ('setRequestHeader' in xhr) {
    xhr.setRequestHeader(name, value);
  }
};

XHRWrapper.prototype.getAllResponseHeaders = function () {
  return this._xhr.getAllResponseHeaders != undefined ? this._xhr.getAllResponseHeaders() : '';
};

XHRWrapper.prototype.send = function () {
  // loading indicator in Safari < ? (6), Chrome < 14, Firefox
  if (!('ontimeout' in XMLHttpRequest.prototype) && document != undefined && document.readyState != undefined && document.readyState !== 'complete') {
    var that = this;
    that._sendTimeout = setTimeout(function () {
      that._sendTimeout = 0;
      that.send();
    }, 4);
    return;
  }

  var xhr = this._xhr; // withCredentials should be set after "open" for Safari and Chrome (< 19 ?)

  xhr.withCredentials = this.withCredentials;
  xhr.responseType = this.responseType;

  try {
    // xhr.send(); throws "Not enough arguments" in Firefox 3.0
    xhr.send(undefined);
  } catch (error1) {
    // Safari 5.1.7, Opera 12
    throw error1;
  }
};

function toLowerCase(name) {
  return name.replace(/[A-Z]/g, function (c) {
    return String.fromCharCode(c.charCodeAt(0) + 0x20);
  });
}

function HeadersPolyfill(all) {
  // Get headers: implemented according to mozilla's example code: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders#Example
  var map = Object.create(null);
  var array = all.split('\r\n');

  for (var i = 0; i < array.length; i += 1) {
    var line = array[i];
    var parts = line.split(': ');
    var name = parts.shift();
    var value = parts.join(': ');
    map[toLowerCase(name)] = value;
  }

  this._map = map;
}

_c3 = HeadersPolyfill;

HeadersPolyfill.prototype.get = function (name) {
  return this._map[toLowerCase(name)];
};

function XHRTransport() {}

_c4 = XHRTransport;

XHRTransport.prototype.open = function (xhr, onStartCallback, onProgressCallback, onFinishCallback, url, withCredentials, headers) {
  xhr.open('GET', url);
  var offset = 0;

  xhr.onprogress = function () {
    var responseText = xhr.responseText;
    var chunk = responseText.slice(offset);
    offset += chunk.length;
    onProgressCallback(chunk);
  };

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 2) {
      var status = xhr.status;
      var statusText = xhr.statusText;
      var contentType = xhr.getResponseHeader('Content-Type');
      var headers = xhr.getAllResponseHeaders();
      onStartCallback(status, statusText, contentType, new HeadersPolyfill(headers), function () {
        xhr.abort();
      });
    } else if (xhr.readyState === 4) {
      onFinishCallback();
    }
  };

  xhr.withCredentials = withCredentials;
  xhr.responseType = 'text';

  for (var name in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, name)) {
      xhr.setRequestHeader(name, headers[name]);
    }
  }

  xhr.send();
};

function HeadersWrapper(headers) {
  this._headers = headers;
}

_c5 = HeadersWrapper;

HeadersWrapper.prototype.get = function (name) {
  return this._headers.get(name);
};

function FetchTransport() {}

_c6 = FetchTransport;

FetchTransport.prototype.open = function (xhr, onStartCallback, onProgressCallback, onFinishCallback, url, withCredentials, headers) {
  var controller = new AbortController();
  var signal = controller.signal; // see #120

  var textDecoder = new TextDecoder();
  fetch(url, {
    headers: headers,
    credentials: withCredentials ? 'include' : 'same-origin',
    signal: signal,
    cache: 'no-store'
  }).then(function (response) {
    var reader = response.body.getReader();
    onStartCallback(response.status, response.statusText, response.headers.get('Content-Type'), new HeadersWrapper(response.headers), function () {
      controller.abort();
      reader.cancel();
    });
    return new Promise(function (resolve, reject) {
      var readNextChunk = function readNextChunk() {
        reader.read().then(function (result) {
          if (result.done) {
            // Note: bytes in textDecoder are ignored
            resolve(undefined);
          } else {
            var chunk = textDecoder.decode(result.value, {
              stream: true
            });
            onProgressCallback(chunk);
            readNextChunk();
          }
        })['catch'](function (error) {
          reject(error);
        });
      };

      readNextChunk();
    });
  }).then(function (result) {
    onFinishCallback();
    return result;
  }, function (error) {
    onFinishCallback();
    return Promise.reject(error);
  });
};

function EventTarget() {
  this._listeners = Object.create(null);
}

_c7 = EventTarget;

function throwError(e) {
  setTimeout(function () {
    throw e;
  }, 0);
}

EventTarget.prototype.dispatchEvent = function (event) {
  event.target = this;
  var typeListeners = this._listeners[event.type];

  if (typeListeners != undefined) {
    var length = typeListeners.length;

    for (var i = 0; i < length; i += 1) {
      var listener = typeListeners[i];

      try {
        if (typeof listener.handleEvent === 'function') {
          listener.handleEvent(event);
        } else {
          listener.call(this, event);
        }
      } catch (e) {
        throwError(e);
      }
    }
  }
};

EventTarget.prototype.addEventListener = function (type, listener) {
  type = String(type);
  var listeners = this._listeners;
  var typeListeners = listeners[type];

  if (typeListeners == undefined) {
    typeListeners = [];
    listeners[type] = typeListeners;
  }

  var found = false;

  for (var i = 0; i < typeListeners.length; i += 1) {
    if (typeListeners[i] === listener) {
      found = true;
    }
  }

  if (!found) {
    typeListeners.push(listener);
  }
};

EventTarget.prototype.removeEventListener = function (type, listener) {
  type = String(type);
  var listeners = this._listeners;
  var typeListeners = listeners[type];

  if (typeListeners != undefined) {
    var filtered = [];

    for (var i = 0; i < typeListeners.length; i += 1) {
      if (typeListeners[i] !== listener) {
        filtered.push(typeListeners[i]);
      }
    }

    if (filtered.length === 0) {
      delete listeners[type];
    } else {
      listeners[type] = filtered;
    }
  }
};

function Event(type) {
  this.type = type;
  this.target = undefined;
}

_c8 = Event;

function MessageEvent(type, options) {
  Event.call(this, type);
  this.data = options.data;
  this.lastEventId = options.lastEventId;
}

_c9 = MessageEvent;
MessageEvent.prototype = Object.create(Event.prototype);

function ConnectionEvent(type, options) {
  Event.call(this, type);
  this.status = options.status;
  this.statusText = options.statusText;
  this.headers = options.headers;
}

_c10 = ConnectionEvent;
ConnectionEvent.prototype = Object.create(Event.prototype);
var WAITING = -1;
var CONNECTING = 0;
var OPEN = 1;
var CLOSED = 2;
var AFTER_CR = -1;
var FIELD_START = 0;
var FIELD = 1;
var VALUE_START = 2;
var VALUE = 3;
var contentTypeRegExp = /^text\/event\-stream;?(\s*charset\=utf\-8)?$/i;
var MINIMUM_DURATION = 1000;
var MAXIMUM_DURATION = 18000000;

var parseDuration = function parseDuration(value, def) {
  var n = parseInt(value, 10);

  if (n !== n) {
    n = def;
  }

  return clampDuration(n);
};

var clampDuration = function clampDuration(n) {
  return Math.min(Math.max(n, MINIMUM_DURATION), MAXIMUM_DURATION);
};

var fire = function fire(that, f, event) {
  try {
    if (typeof f === 'function') {
      f.call(that, event);
    }
  } catch (e) {
    throwError(e);
  }
};

function EventSourcePolyfill(url, options) {
  EventTarget.call(this);
  this.onopen = undefined;
  this.onmessage = undefined;
  this.onerror = undefined;
  this.url = undefined;
  this.readyState = undefined;
  this.withCredentials = undefined;
  this._close = undefined;
  start(this, url, options);
}

_c11 = EventSourcePolyfill;
var isFetchSupported = fetch != undefined && Response != undefined && 'body' in Response.prototype;

function start(es, url, options) {
  url = String(url);
  var withCredentials = options != undefined && Boolean(options.withCredentials);
  var initialRetry = clampDuration(1000);
  var heartbeatTimeout = options != undefined && options.heartbeatTimeout != undefined ? parseDuration(options.heartbeatTimeout, 45000) : clampDuration(45000);
  var lastEventId = '';
  var retry = initialRetry;
  var wasActivity = false;
  var headers = options != undefined && options.headers != undefined ? JSON.parse(JSON.stringify(options.headers)) : undefined;
  var CurrentTransport = options != undefined && options.Transport != undefined ? options.Transport : XMLHttpRequest;
  var xhr = isFetchSupported && !(options != undefined && options.Transport != undefined) ? undefined : new XHRWrapper(new CurrentTransport());
  var transport = xhr == undefined ? new FetchTransport() : new XHRTransport();
  var cancelFunction = undefined;
  var timeout = 0;
  var currentState = WAITING;
  var dataBuffer = '';
  var lastEventIdBuffer = '';
  var eventTypeBuffer = '';
  var textBuffer = '';
  var state = FIELD_START;
  var fieldStart = 0;
  var valueStart = 0;

  var onStart = function onStart(status, statusText, contentType, headers, cancel) {
    if (currentState === CONNECTING) {
      cancelFunction = cancel;

      if (status === 200 && contentType != undefined && contentTypeRegExp.test(contentType)) {
        currentState = OPEN;
        wasActivity = true;
        retry = initialRetry;
        es.readyState = OPEN;
        var event = new ConnectionEvent('open', {
          status: status,
          statusText: statusText,
          headers: headers
        });
        es.dispatchEvent(event);
        fire(es, es.onopen, event);
      } else {
        var message = '';

        if (status !== 200) {
          if (statusText) {
            statusText = statusText.replace(/\s+/g, ' ');
          }

          message = "EventSource's response has a status " + status + ' ' + statusText + ' that is not 200. Aborting the connection.';
        } else {
          message = "EventSource's response has a Content-Type specifying an unsupported type: " + (contentType == undefined ? '-' : contentType.replace(/\s+/g, ' ')) + '. Aborting the connection.';
        }

        throwError(new Error(message));
        close();
        var event = new ConnectionEvent('error', {
          status: status,
          statusText: statusText,
          headers: headers
        });
        es.dispatchEvent(event);
        fire(es, es.onerror, event);
      }
    }
  };

  var onProgress = function onProgress(textChunk) {
    if (currentState === OPEN) {
      var n = -1;

      for (var i = 0; i < textChunk.length; i += 1) {
        var c = textChunk.charCodeAt(i);

        if (c === '\n'.charCodeAt(0) || c === '\r'.charCodeAt(0)) {
          n = i;
        }
      }

      var chunk = (n !== -1 ? textBuffer : '') + textChunk.slice(0, n + 1);
      textBuffer = (n === -1 ? textBuffer : '') + textChunk.slice(n + 1);

      if (chunk !== '') {
        wasActivity = true;
      }

      for (var position = 0; position < chunk.length; position += 1) {
        var c = chunk.charCodeAt(position);

        if (state === AFTER_CR && c === '\n'.charCodeAt(0)) {
          state = FIELD_START;
        } else {
          if (state === AFTER_CR) {
            state = FIELD_START;
          }

          if (c === '\r'.charCodeAt(0) || c === '\n'.charCodeAt(0)) {
            if (state !== FIELD_START) {
              if (state === FIELD) {
                valueStart = position + 1;
              }

              var field = chunk.slice(fieldStart, valueStart - 1);
              var value = chunk.slice(valueStart + (valueStart < position && chunk.charCodeAt(valueStart) === ' '.charCodeAt(0) ? 1 : 0), position);

              if (field === 'data') {
                dataBuffer += '\n';
                dataBuffer += value;
              } else if (field === 'id') {
                lastEventIdBuffer = value;
              } else if (field === 'event') {
                eventTypeBuffer = value;
              } else if (field === 'retry') {
                initialRetry = parseDuration(value, initialRetry);
                retry = initialRetry;
              } else if (field === 'heartbeatTimeout') {
                heartbeatTimeout = parseDuration(value, heartbeatTimeout);

                if (timeout !== 0) {
                  clearTimeout(timeout);
                  timeout = setTimeout(function () {
                    onTimeout();
                  }, heartbeatTimeout);
                }
              }
            }

            if (state === FIELD_START) {
              if (dataBuffer !== '') {
                lastEventId = lastEventIdBuffer;

                if (eventTypeBuffer === '') {
                  eventTypeBuffer = 'message';
                }

                var event = new MessageEvent(eventTypeBuffer, {
                  data: dataBuffer.slice(1),
                  lastEventId: lastEventIdBuffer
                });
                es.dispatchEvent(event);

                if (eventTypeBuffer === 'message') {
                  fire(es, es.onmessage, event);
                }

                if (currentState === CLOSED) {
                  return;
                }
              }

              dataBuffer = '';
              eventTypeBuffer = '';
            }

            state = c === '\r'.charCodeAt(0) ? AFTER_CR : FIELD_START;
          } else {
            if (state === FIELD_START) {
              fieldStart = position;
              state = FIELD;
            }

            if (state === FIELD) {
              if (c === ':'.charCodeAt(0)) {
                valueStart = position + 1;
                state = VALUE_START;
              }
            } else if (state === VALUE_START) {
              state = VALUE;
            }
          }
        }
      }
    }
  };

  var onFinish = function onFinish() {
    if (currentState === OPEN || currentState === CONNECTING) {
      currentState = WAITING;

      if (timeout !== 0) {
        clearTimeout(timeout);
        timeout = 0;
      }

      timeout = setTimeout(function () {
        onTimeout();
      }, retry);
      retry = clampDuration(Math.min(initialRetry * 16, retry * 2));
      es.readyState = CONNECTING;
      var event = new Event('error');
      es.dispatchEvent(event);
      fire(es, es.onerror, event);
    }
  };

  var close = function close() {
    currentState = CLOSED;

    if (cancelFunction != undefined) {
      cancelFunction();
      cancelFunction = undefined;
    }

    if (timeout !== 0) {
      clearTimeout(timeout);
      timeout = 0;
    }

    es.readyState = CLOSED;
  };

  var onTimeout = function onTimeout() {
    timeout = 0;

    if (currentState !== WAITING) {
      if (!wasActivity && cancelFunction != undefined) {
        throwError(new Error('No activity within ' + heartbeatTimeout + ' milliseconds. Reconnecting.'));
        cancelFunction();
        cancelFunction = undefined;
      } else {
        wasActivity = false;
        timeout = setTimeout(function () {
          onTimeout();
        }, heartbeatTimeout);
      }

      return;
    }

    wasActivity = false;
    timeout = setTimeout(function () {
      onTimeout();
    }, heartbeatTimeout);
    currentState = CONNECTING;
    dataBuffer = '';
    eventTypeBuffer = '';
    lastEventIdBuffer = lastEventId;
    textBuffer = '';
    fieldStart = 0;
    valueStart = 0;
    state = FIELD_START; // https://bugzilla.mozilla.org/show_bug.cgi?id=428916
    // Request header field Last-Event-ID is not allowed by Access-Control-Allow-Headers.

    var requestURL = url;

    if (url.slice(0, 5) !== 'data:' && url.slice(0, 5) !== 'blob:') {
      if (lastEventId !== '') {
        requestURL += (url.indexOf('?') === -1 ? '?' : '&') + 'lastEventId=' + encodeURIComponent(lastEventId);
      }
    }

    var requestHeaders = {};
    requestHeaders['Accept'] = 'text/event-stream';

    if (headers != undefined) {
      for (var name in headers) {
        if (Object.prototype.hasOwnProperty.call(headers, name)) {
          requestHeaders[name] = headers[name];
        }
      }
    }

    try {
      transport.open(xhr, onStart, onProgress, onFinish, requestURL, withCredentials, requestHeaders);
    } catch (error) {
      close();
      throw error;
    }
  };

  es.url = url;
  es.readyState = CONNECTING;
  es.withCredentials = withCredentials;
  es._close = close;
  onTimeout();
}

EventSourcePolyfill.prototype = Object.create(EventTarget.prototype);
EventSourcePolyfill.prototype.CONNECTING = CONNECTING;
EventSourcePolyfill.prototype.OPEN = OPEN;
EventSourcePolyfill.prototype.CLOSED = CLOSED;

EventSourcePolyfill.prototype.close = function () {
  this._close();
};

EventSourcePolyfill.CONNECTING = CONNECTING;
EventSourcePolyfill.OPEN = OPEN;
EventSourcePolyfill.CLOSED = CLOSED;
EventSourcePolyfill.prototype.withCredentials = undefined;
var _default = EventSourcePolyfill;
exports.default = _default;

var _c, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;

$RefreshReg$(_c, "TextDecoderPolyfill");
$RefreshReg$(_c2, "XHRWrapper");
$RefreshReg$(_c3, "HeadersPolyfill");
$RefreshReg$(_c4, "XHRTransport");
$RefreshReg$(_c5, "HeadersWrapper");
$RefreshReg$(_c6, "FetchTransport");
$RefreshReg$(_c7, "EventTarget");
$RefreshReg$(_c8, "Event");
$RefreshReg$(_c9, "MessageEvent");
$RefreshReg$(_c10, "ConnectionEvent");
$RefreshReg$(_c11, "EventSourcePolyfill");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ }),

/***/ "./node_modules/next/dist/client/dev/fouc.js":
/*!***************************************************!*\
  !*** ./node_modules/next/dist/client/dev/fouc.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


exports.__esModule = true;
exports.displayContent = displayContent; // This function is used to remove Next.js' no-FOUC styles workaround for using
// `style-loader` in development. It must be called before hydration, or else
// rendering won't have the correct computed values in effects.

function displayContent(callback) {
  ;
  (window.requestAnimationFrame || setTimeout)(function () {
    for (var x = document.querySelectorAll('[data-next-hide-fouc]'), i = x.length; i--;) {
      x[i].parentNode.removeChild(x[i]);
    }

    if (callback) {
      callback();
    }
  });
}

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ }),

/***/ "./node_modules/next/dist/client/dev/on-demand-entries-utils.js":
/*!**********************************************************************!*\
  !*** ./node_modules/next/dist/client/dev/on-demand-entries-utils.js ***!
  \**********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


exports.__esModule = true;
exports.closePing = closePing;
exports.setupPing = setupPing;
exports.currentPage = void 0;

var _eventsource = __webpack_require__(/*! ./error-overlay/eventsource */ "./node_modules/next/dist/client/dev/error-overlay/eventsource.js");
/* global location */


var evtSource;
var currentPage;
exports.currentPage = currentPage;

function closePing() {
  if (evtSource) evtSource.close();
  evtSource = null;
}

function setupPing(assetPrefix, pathnameFn, retry) {
  var pathname = pathnameFn(); // Make sure to only create new EventSource request if page has changed

  if (pathname === currentPage && !retry) return;
  exports.currentPage = currentPage = pathname; // close current EventSource connection

  closePing();
  evtSource = (0, _eventsource.getEventSourceWrapper)({
    path: "".concat(assetPrefix, "/_next/webpack-hmr?page=").concat(currentPage),
    timeout: 5000
  });
  evtSource.addMessageListener(function (event) {
    if (event.data.indexOf('{') === -1) return;

    try {
      var payload = JSON.parse(event.data);

      if (payload.invalid) {
        // Payload can be invalid even if the page does not exist.
        // So, we need to make sure it exists before reloading.
        fetch(location.href, {
          credentials: 'same-origin'
        }).then(function (pageRes) {
          if (pageRes.status === 200) {
            location.reload();
          }
        });
      }
    } catch (err) {
      console.error('on-demand-entries failed to parse response', err);
    }
  });
}

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


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

/***/ "./node_modules/next/node_modules/@babel/runtime/regenerator/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/regenerator/index.js ***!
  \****************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ (function(module) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ // runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__("./node_modules/next/dist/client/dev/amp-dev.js"));
/******/ _N_E = __webpack_exports__;
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jbGllbnQvZGV2L2FtcC1kZXYuanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvY2xpZW50L2Rldi9lcnJvci1vdmVybGF5L2V2ZW50c291cmNlLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC9kZXYvZXZlbnQtc291cmNlLXBvbHlmaWxsLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC9kZXYvZm91Yy5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jbGllbnQvZGV2L29uLWRlbWFuZC1lbnRyaWVzLXV0aWxzLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvbmV4dC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvbmV4dC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9uZXh0L25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyJdLCJuYW1lcyI6WyJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIl9ldmVudFNvdXJjZVBvbHlmaWxsIiwiX2V2ZW50c291cmNlIiwiX29uRGVtYW5kRW50cmllc1V0aWxzIiwiX2ZvdWMiLCJ3aW5kb3ciLCJFdmVudFNvdXJjZSIsImRhdGEiLCJKU09OIiwicGFyc2UiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwidGV4dENvbnRlbnQiLCJhc3NldFByZWZpeCIsInBhZ2UiLCJtb3N0UmVjZW50SGFzaCIsImN1ckhhc2giLCJfX3dlYnBhY2tfaGFzaF9fIiwiaG90VXBkYXRlUGF0aCIsImVuZHNXaXRoIiwiaXNVcGRhdGVBdmFpbGFibGUiLCJjYW5BcHBseVVwZGF0ZXMiLCJtb2R1bGUiLCJzdGF0dXMiLCJ0cnlBcHBseVVwZGF0ZXMiLCJmZXRjaCIsIl9fd2VicGFja19ydW50aW1lX2lkX18iLCJyZXMiLCJqc29uIiwianNvbkRhdGEiLCJjdXJQYWdlIiwicGFnZVVwZGF0ZWQiLCJBcnJheSIsImlzQXJyYXkiLCJjIiwiT2JqZWN0Iiwia2V5cyIsInNvbWUiLCJtb2QiLCJpbmRleE9mIiwic3Vic3RyIiwicmVwbGFjZSIsImxvY2F0aW9uIiwicmVsb2FkIiwiY29uc29sZSIsImVycm9yIiwiYWRkTWVzc2FnZUxpc3RlbmVyIiwiZXZlbnQiLCJtZXNzYWdlIiwiYWN0aW9uIiwiaGFzaCIsImV4Iiwid2FybiIsInNldHVwUGluZyIsImRpc3BsYXlDb250ZW50IiwiZXhwb3J0cyIsImdldEV2ZW50U291cmNlV3JhcHBlciIsImV2ZW50Q2FsbGJhY2tzIiwiRXZlbnRTb3VyY2VXcmFwcGVyIiwib3B0aW9ucyIsInNvdXJjZSIsImxhc3RBY3Rpdml0eSIsIkRhdGUiLCJsaXN0ZW5lcnMiLCJ0aW1lb3V0IiwiaW5pdCIsInRpbWVyIiwic2V0SW50ZXJ2YWwiLCJoYW5kbGVEaXNjb25uZWN0IiwicGF0aCIsIm9ub3BlbiIsImhhbmRsZU9ubGluZSIsIm9uZXJyb3IiLCJvbm1lc3NhZ2UiLCJoYW5kbGVNZXNzYWdlIiwibG9nIiwiaSIsImxlbmd0aCIsImZvckVhY2giLCJjYiIsInVuZmlsdGVyZWQiLCJjbGVhckludGVydmFsIiwiY2xvc2UiLCJzZXRUaW1lb3V0IiwiZm4iLCJwdXNoIiwiUmVzcG9uc2UiLCJUZXh0RGVjb2RlciIsIlRleHRFbmNvZGVyIiwiQWJvcnRDb250cm9sbGVyIiwidW5kZWZpbmVkIiwic2lnbmFsIiwiYWJvcnQiLCJUZXh0RGVjb2RlclBvbHlmaWxsIiwiYml0c05lZWRlZCIsImNvZGVQb2ludCIsInByb3RvdHlwZSIsImRlY29kZSIsIm9jdGV0cyIsInZhbGlkIiwic2hpZnQiLCJvY3RldHNDb3VudCIsIkVycm9yIiwiUkVQTEFDRVIiLCJzdHJpbmciLCJvY3RldCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsInN1cHBvcnRzU3RyZWFtT3B0aW9uIiwiZW5jb2RlIiwic3RyZWFtIiwiayIsIlhIUldyYXBwZXIiLCJ4aHIiLCJ3aXRoQ3JlZGVudGlhbHMiLCJyZXNwb25zZVR5cGUiLCJyZWFkeVN0YXRlIiwic3RhdHVzVGV4dCIsInJlc3BvbnNlVGV4dCIsIm9ucHJvZ3Jlc3MiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJfY29udGVudFR5cGUiLCJfeGhyIiwiX3NlbmRUaW1lb3V0IiwiX2Fib3J0Iiwib3BlbiIsIm1ldGhvZCIsInVybCIsInRoYXQiLCJzdGF0ZSIsInNpbGVudCIsImNsZWFyVGltZW91dCIsIm9ubG9hZCIsIm9uYWJvcnQiLCJvblN0YXJ0IiwiY29udGVudFR5cGUiLCJnZXRSZXNwb25zZUhlYWRlciIsIm9uUHJvZ3Jlc3MiLCJvbkZpbmlzaCIsIm9uUmVhZHlTdGF0ZUNoYW5nZSIsIm9uVGltZW91dCIsIlhNTEh0dHBSZXF1ZXN0IiwibmFtZSIsInNldFJlcXVlc3RIZWFkZXIiLCJ2YWx1ZSIsImdldEFsbFJlc3BvbnNlSGVhZGVycyIsInNlbmQiLCJlcnJvcjEiLCJ0b0xvd2VyQ2FzZSIsImNoYXJDb2RlQXQiLCJIZWFkZXJzUG9seWZpbGwiLCJhbGwiLCJtYXAiLCJjcmVhdGUiLCJhcnJheSIsInNwbGl0IiwibGluZSIsInBhcnRzIiwiam9pbiIsIl9tYXAiLCJnZXQiLCJYSFJUcmFuc3BvcnQiLCJvblN0YXJ0Q2FsbGJhY2siLCJvblByb2dyZXNzQ2FsbGJhY2siLCJvbkZpbmlzaENhbGxiYWNrIiwiaGVhZGVycyIsIm9mZnNldCIsImNodW5rIiwic2xpY2UiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJIZWFkZXJzV3JhcHBlciIsIl9oZWFkZXJzIiwiRmV0Y2hUcmFuc3BvcnQiLCJjb250cm9sbGVyIiwidGV4dERlY29kZXIiLCJjcmVkZW50aWFscyIsImNhY2hlIiwidGhlbiIsInJlc3BvbnNlIiwicmVhZGVyIiwiYm9keSIsImdldFJlYWRlciIsImNhbmNlbCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVhZE5leHRDaHVuayIsInJlYWQiLCJyZXN1bHQiLCJkb25lIiwiRXZlbnRUYXJnZXQiLCJfbGlzdGVuZXJzIiwidGhyb3dFcnJvciIsImUiLCJkaXNwYXRjaEV2ZW50IiwidGFyZ2V0IiwidHlwZUxpc3RlbmVycyIsInR5cGUiLCJsaXN0ZW5lciIsImhhbmRsZUV2ZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImZvdW5kIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImZpbHRlcmVkIiwiRXZlbnQiLCJNZXNzYWdlRXZlbnQiLCJsYXN0RXZlbnRJZCIsIkNvbm5lY3Rpb25FdmVudCIsIldBSVRJTkciLCJDT05ORUNUSU5HIiwiT1BFTiIsIkNMT1NFRCIsIkFGVEVSX0NSIiwiRklFTERfU1RBUlQiLCJGSUVMRCIsIlZBTFVFX1NUQVJUIiwiVkFMVUUiLCJjb250ZW50VHlwZVJlZ0V4cCIsIk1JTklNVU1fRFVSQVRJT04iLCJNQVhJTVVNX0RVUkFUSU9OIiwicGFyc2VEdXJhdGlvbiIsImRlZiIsIm4iLCJwYXJzZUludCIsImNsYW1wRHVyYXRpb24iLCJNYXRoIiwibWluIiwibWF4IiwiZmlyZSIsImYiLCJFdmVudFNvdXJjZVBvbHlmaWxsIiwiX2Nsb3NlIiwic3RhcnQiLCJpc0ZldGNoU3VwcG9ydGVkIiwiZXMiLCJCb29sZWFuIiwiaW5pdGlhbFJldHJ5IiwiaGVhcnRiZWF0VGltZW91dCIsInJldHJ5Iiwid2FzQWN0aXZpdHkiLCJzdHJpbmdpZnkiLCJDdXJyZW50VHJhbnNwb3J0IiwiVHJhbnNwb3J0IiwidHJhbnNwb3J0IiwiY2FuY2VsRnVuY3Rpb24iLCJjdXJyZW50U3RhdGUiLCJkYXRhQnVmZmVyIiwibGFzdEV2ZW50SWRCdWZmZXIiLCJldmVudFR5cGVCdWZmZXIiLCJ0ZXh0QnVmZmVyIiwiZmllbGRTdGFydCIsInZhbHVlU3RhcnQiLCJ0ZXN0IiwidGV4dENodW5rIiwicG9zaXRpb24iLCJmaWVsZCIsInJlcXVlc3RVUkwiLCJlbmNvZGVVUklDb21wb25lbnQiLCJyZXF1ZXN0SGVhZGVycyIsIl9kZWZhdWx0IiwiY2FsbGJhY2siLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ4IiwicXVlcnlTZWxlY3RvckFsbCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImNsb3NlUGluZyIsImV2dFNvdXJjZSIsImN1cnJlbnRQYWdlIiwicGF0aG5hbWVGbiIsInBhdGhuYW1lIiwicGF5bG9hZCIsImludmFsaWQiLCJocmVmIiwicGFnZVJlcyIsImVyciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhOzs7Ozs7QUFBQSxJQUFJQSxzQkFBc0IsR0FBQ0MsbUJBQU8sQ0FBQyxzSUFBRCxDQUFsQzs7QUFBbUYsSUFBSUMsb0JBQW9CLEdBQUNGLHNCQUFzQixDQUFDQyxtQkFBTyxDQUFDLDZGQUFELENBQVIsQ0FBL0M7O0FBQW9GLElBQUlFLFlBQVksR0FBQ0YsbUJBQU8sQ0FBQyxxR0FBRCxDQUF4Qjs7QUFBd0QsSUFBSUcscUJBQXFCLEdBQUNILG1CQUFPLENBQUMsaUdBQUQsQ0FBakM7O0FBQStELElBQUlJLEtBQUssR0FBQ0osbUJBQU8sQ0FBQywyREFBRCxDQUFqQjtBQUE0Qjs7O0FBQThCLElBQUcsQ0FBQ0ssTUFBTSxDQUFDQyxXQUFYLEVBQXVCO0FBQUNELFFBQU0sQ0FBQ0MsV0FBUCxHQUFtQkwsb0JBQW9CLFdBQXZDO0FBQWlEOztBQUFBLElBQU1NLElBQUksR0FBQ0MsSUFBSSxDQUFDQyxLQUFMLENBQVdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixlQUF4QixFQUF5Q0MsV0FBcEQsQ0FBWDtBQUE0RSxJQUFJ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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxXQUFXO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0NBQW9DLGNBQWM7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLGtCQUFrQjtBQUNuRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxLQUEwQixvQkFBb0IsQ0FBRTtBQUNsRDs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic3RhdGljL2NodW5rcy9hbXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjt2YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdD1yZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7dmFyIF9ldmVudFNvdXJjZVBvbHlmaWxsPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vZXZlbnQtc291cmNlLXBvbHlmaWxsXCIpKTt2YXIgX2V2ZW50c291cmNlPXJlcXVpcmUoXCIuL2Vycm9yLW92ZXJsYXkvZXZlbnRzb3VyY2VcIik7dmFyIF9vbkRlbWFuZEVudHJpZXNVdGlscz1yZXF1aXJlKFwiLi9vbi1kZW1hbmQtZW50cmllcy11dGlsc1wiKTt2YXIgX2ZvdWM9cmVxdWlyZShcIi4vZm91Y1wiKTsvKiBnbG9iYWxzIF9fd2VicGFja19oYXNoX18gKi9pZighd2luZG93LkV2ZW50U291cmNlKXt3aW5kb3cuRXZlbnRTb3VyY2U9X2V2ZW50U291cmNlUG9seWZpbGwuZGVmYXVsdDt9Y29uc3QgZGF0YT1KU09OLnBhcnNlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdfX05FWFRfREFUQV9fJykudGV4dENvbnRlbnQpO2xldHthc3NldFByZWZpeCxwYWdlfT1kYXRhO2Fzc2V0UHJlZml4PWFzc2V0UHJlZml4fHwnJztsZXQgbW9zdFJlY2VudEhhc2g9bnVsbDsvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgKi9sZXQgY3VySGFzaD1fX3dlYnBhY2tfaGFzaF9fO2NvbnN0IGhvdFVwZGF0ZVBhdGg9YXNzZXRQcmVmaXgrKGFzc2V0UHJlZml4LmVuZHNXaXRoKCcvJyk/Jyc6Jy8nKSsnX25leHQvc3RhdGljL3dlYnBhY2svJzsvLyBJcyB0aGVyZSBhIG5ld2VyIHZlcnNpb24gb2YgdGhpcyBjb2RlIGF2YWlsYWJsZT9cbmZ1bmN0aW9uIGlzVXBkYXRlQXZhaWxhYmxlKCl7Ly8gX193ZWJwYWNrX2hhc2hfXyBpcyB0aGUgaGFzaCBvZiB0aGUgY3VycmVudCBjb21waWxhdGlvbi5cbi8vIEl0J3MgYSBnbG9iYWwgdmFyaWFibGUgaW5qZWN0ZWQgYnkgV2VicGFjay5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSAqL3JldHVybiBtb3N0UmVjZW50SGFzaCE9PV9fd2VicGFja19oYXNoX187fS8vIFdlYnBhY2sgZGlzYWxsb3dzIHVwZGF0ZXMgaW4gb3RoZXIgc3RhdGVzLlxuZnVuY3Rpb24gY2FuQXBwbHlVcGRhdGVzKCl7cmV0dXJuIG1vZHVsZS5ob3Quc3RhdHVzKCk9PT0naWRsZSc7fS8vIFRoaXMgZnVuY3Rpb24gcmVhZHMgY29kZSB1cGRhdGVzIG9uIHRoZSBmbHkgYW5kIGhhcmRcbi8vIHJlbG9hZHMgdGhlIHBhZ2Ugd2hlbiBpdCBoYXMgY2hhbmdlZC5cbmFzeW5jIGZ1bmN0aW9uIHRyeUFwcGx5VXBkYXRlcygpe2lmKCFpc1VwZGF0ZUF2YWlsYWJsZSgpfHwhY2FuQXBwbHlVcGRhdGVzKCkpe3JldHVybjt9dHJ5e2NvbnN0IHJlcz1hd2FpdCBmZXRjaCh0eXBlb2YgX193ZWJwYWNrX3J1bnRpbWVfaWRfXyE9PSd1bmRlZmluZWQnPy8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuYCR7aG90VXBkYXRlUGF0aH0ke2N1ckhhc2h9LiR7X193ZWJwYWNrX3J1bnRpbWVfaWRfX30uaG90LXVwZGF0ZS5qc29uYDpgJHtob3RVcGRhdGVQYXRofSR7Y3VySGFzaH0uaG90LXVwZGF0ZS5qc29uYCk7Y29uc3QganNvbkRhdGE9YXdhaXQgcmVzLmpzb24oKTtjb25zdCBjdXJQYWdlPXBhZ2U9PT0nLyc/J2luZGV4JzpwYWdlOy8vIHdlYnBhY2sgNSB1c2VzIGFuIGFycmF5IGluc3RlYWRcbmNvbnN0IHBhZ2VVcGRhdGVkPShBcnJheS5pc0FycmF5KGpzb25EYXRhLmMpP2pzb25EYXRhLmM6T2JqZWN0LmtleXMoanNvbkRhdGEuYykpLnNvbWUobW9kPT57cmV0dXJuIG1vZC5pbmRleE9mKGBwYWdlcyR7Y3VyUGFnZS5zdWJzdHIoMCwxKT09PScvJz9jdXJQYWdlOmAvJHtjdXJQYWdlfWB9YCkhPT0tMXx8bW9kLmluZGV4T2YoYHBhZ2VzJHtjdXJQYWdlLnN1YnN0cigwLDEpPT09Jy8nP2N1clBhZ2U6YC8ke2N1clBhZ2V9YH1gLnJlcGxhY2UoL1xcLy9nLCdcXFxcJykpIT09LTE7fSk7aWYocGFnZVVwZGF0ZWQpe2RvY3VtZW50LmxvY2F0aW9uLnJlbG9hZCh0cnVlKTt9ZWxzZXtjdXJIYXNoPW1vc3RSZWNlbnRIYXNoO319Y2F0Y2goZXJyKXtjb25zb2xlLmVycm9yKCdFcnJvciBvY2N1cnJlZCBjaGVja2luZyBmb3IgdXBkYXRlJyxlcnIpO2RvY3VtZW50LmxvY2F0aW9uLnJlbG9hZCh0cnVlKTt9fSgwLF9ldmVudHNvdXJjZS5hZGRNZXNzYWdlTGlzdGVuZXIpKGV2ZW50PT57aWYoZXZlbnQuZGF0YT09PSdcXHVEODNEXFx1REM5Mycpe3JldHVybjt9dHJ5e2NvbnN0IG1lc3NhZ2U9SlNPTi5wYXJzZShldmVudC5kYXRhKTtpZihtZXNzYWdlLmFjdGlvbj09PSdzeW5jJ3x8bWVzc2FnZS5hY3Rpb249PT0nYnVpbHQnKXtpZighbWVzc2FnZS5oYXNoKXtyZXR1cm47fW1vc3RSZWNlbnRIYXNoPW1lc3NhZ2UuaGFzaDt0cnlBcHBseVVwZGF0ZXMoKTt9ZWxzZSBpZihtZXNzYWdlLmFjdGlvbj09PSdyZWxvYWRQYWdlJyl7ZG9jdW1lbnQubG9jYXRpb24ucmVsb2FkKHRydWUpO319Y2F0Y2goZXgpe2NvbnNvbGUud2FybignSW52YWxpZCBITVIgbWVzc2FnZTogJytldmVudC5kYXRhKydcXG4nK2V4KTt9fSk7KDAsX29uRGVtYW5kRW50cmllc1V0aWxzLnNldHVwUGluZykoYXNzZXRQcmVmaXgsKCk9PnBhZ2UpOygwLF9mb3VjLmRpc3BsYXlDb250ZW50KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YW1wLWRldi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtleHBvcnRzLl9fZXNNb2R1bGU9dHJ1ZTtleHBvcnRzLmFkZE1lc3NhZ2VMaXN0ZW5lcj1hZGRNZXNzYWdlTGlzdGVuZXI7ZXhwb3J0cy5nZXRFdmVudFNvdXJjZVdyYXBwZXI9Z2V0RXZlbnRTb3VyY2VXcmFwcGVyO2NvbnN0IGV2ZW50Q2FsbGJhY2tzPVtdO2Z1bmN0aW9uIEV2ZW50U291cmNlV3JhcHBlcihvcHRpb25zKXt2YXIgc291cmNlO3ZhciBsYXN0QWN0aXZpdHk9bmV3IERhdGUoKTt2YXIgbGlzdGVuZXJzPVtdO2lmKCFvcHRpb25zLnRpbWVvdXQpe29wdGlvbnMudGltZW91dD0yMCoxMDAwO31pbml0KCk7dmFyIHRpbWVyPXNldEludGVydmFsKGZ1bmN0aW9uKCl7aWYobmV3IERhdGUoKS1sYXN0QWN0aXZpdHk+b3B0aW9ucy50aW1lb3V0KXtoYW5kbGVEaXNjb25uZWN0KCk7fX0sb3B0aW9ucy50aW1lb3V0LzIpO2Z1bmN0aW9uIGluaXQoKXtzb3VyY2U9bmV3IHdpbmRvdy5FdmVudFNvdXJjZShvcHRpb25zLnBhdGgpO3NvdXJjZS5vbm9wZW49aGFuZGxlT25saW5lO3NvdXJjZS5vbmVycm9yPWhhbmRsZURpc2Nvbm5lY3Q7c291cmNlLm9ubWVzc2FnZT1oYW5kbGVNZXNzYWdlO31mdW5jdGlvbiBoYW5kbGVPbmxpbmUoKXtpZihvcHRpb25zLmxvZyljb25zb2xlLmxvZygnW0hNUl0gY29ubmVjdGVkJyk7bGFzdEFjdGl2aXR5PW5ldyBEYXRlKCk7fWZ1bmN0aW9uIGhhbmRsZU1lc3NhZ2UoZXZlbnQpe2xhc3RBY3Rpdml0eT1uZXcgRGF0ZSgpO2Zvcih2YXIgaT0wO2k8bGlzdGVuZXJzLmxlbmd0aDtpKyspe2xpc3RlbmVyc1tpXShldmVudCk7fWV2ZW50Q2FsbGJhY2tzLmZvckVhY2goY2I9PntpZighY2IudW5maWx0ZXJlZCYmZXZlbnQuZGF0YS5pbmRleE9mKCdhY3Rpb24nKT09PS0xKXJldHVybjtjYihldmVudCk7fSk7fWZ1bmN0aW9uIGhhbmRsZURpc2Nvbm5lY3QoKXtjbGVhckludGVydmFsKHRpbWVyKTtzb3VyY2UuY2xvc2UoKTtzZXRUaW1lb3V0KGluaXQsb3B0aW9ucy50aW1lb3V0KTt9cmV0dXJue2Nsb3NlOigpPT57Y2xlYXJJbnRlcnZhbCh0aW1lcik7c291cmNlLmNsb3NlKCk7fSxhZGRNZXNzYWdlTGlzdGVuZXI6ZnVuY3Rpb24oZm4pe2xpc3RlbmVycy5wdXNoKGZuKTt9fTt9ZnVuY3Rpb24gYWRkTWVzc2FnZUxpc3RlbmVyKGNiKXtldmVudENhbGxiYWNrcy5wdXNoKGNiKTt9ZnVuY3Rpb24gZ2V0RXZlbnRTb3VyY2VXcmFwcGVyKG9wdGlvbnMpe3JldHVybiBFdmVudFNvdXJjZVdyYXBwZXIob3B0aW9ucyk7fVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXZlbnRzb3VyY2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZXhwb3J0cy5fX2VzTW9kdWxlPXRydWU7ZXhwb3J0cy5kZWZhdWx0PXZvaWQgMDsvKiBlc2xpbnQtZGlzYWJsZSAqLyAvLyBJbXByb3ZlZCB2ZXJzaW9uIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9ZYWZmbGUvRXZlbnRTb3VyY2UvXG4vLyBBdmFpbGFibGUgdW5kZXIgTUlUIExpY2Vuc2UgKE1JVClcbi8vIE9ubHkgdHJpZXMgdG8gc3VwcG9ydCBJRTExIGFuZCBub3RoaW5nIGJlbG93XG52YXIgZG9jdW1lbnQ9d2luZG93LmRvY3VtZW50O3ZhciBSZXNwb25zZT13aW5kb3cuUmVzcG9uc2U7dmFyIFRleHREZWNvZGVyPXdpbmRvdy5UZXh0RGVjb2Rlcjt2YXIgVGV4dEVuY29kZXI9d2luZG93LlRleHRFbmNvZGVyO3ZhciBBYm9ydENvbnRyb2xsZXI9d2luZG93LkFib3J0Q29udHJvbGxlcjtpZihBYm9ydENvbnRyb2xsZXI9PXVuZGVmaW5lZCl7QWJvcnRDb250cm9sbGVyPWZ1bmN0aW9uKCl7dGhpcy5zaWduYWw9bnVsbDt0aGlzLmFib3J0PWZ1bmN0aW9uKCl7fTt9O31mdW5jdGlvbiBUZXh0RGVjb2RlclBvbHlmaWxsKCl7dGhpcy5iaXRzTmVlZGVkPTA7dGhpcy5jb2RlUG9pbnQ9MDt9VGV4dERlY29kZXJQb2x5ZmlsbC5wcm90b3R5cGUuZGVjb2RlPWZ1bmN0aW9uKG9jdGV0cyl7ZnVuY3Rpb24gdmFsaWQoY29kZVBvaW50LHNoaWZ0LG9jdGV0c0NvdW50KXtpZihvY3RldHNDb3VudD09PTEpe3JldHVybiBjb2RlUG9pbnQ+PTB4MDA4MD4+c2hpZnQmJmNvZGVQb2ludDw8c2hpZnQ8PTB4MDdmZjt9aWYob2N0ZXRzQ291bnQ9PT0yKXtyZXR1cm4gY29kZVBvaW50Pj0weDA4MDA+PnNoaWZ0JiZjb2RlUG9pbnQ8PHNoaWZ0PD0weGQ3ZmZ8fGNvZGVQb2ludD49MHhlMDAwPj5zaGlmdCYmY29kZVBvaW50PDxzaGlmdDw9MHhmZmZmO31pZihvY3RldHNDb3VudD09PTMpe3JldHVybiBjb2RlUG9pbnQ+PTB4MDEwMDAwPj5zaGlmdCYmY29kZVBvaW50PDxzaGlmdDw9MHgxMGZmZmY7fXRocm93IG5ldyBFcnJvcigpO31mdW5jdGlvbiBvY3RldHNDb3VudChiaXRzTmVlZGVkLGNvZGVQb2ludCl7aWYoYml0c05lZWRlZD09PTYqMSl7cmV0dXJuIGNvZGVQb2ludD4+Nj4xNT8zOmNvZGVQb2ludD4zMT8yOjE7fWlmKGJpdHNOZWVkZWQ9PT02KjIpe3JldHVybiBjb2RlUG9pbnQ+MTU/MzoyO31pZihiaXRzTmVlZGVkPT09NiozKXtyZXR1cm4gMzt9dGhyb3cgbmV3IEVycm9yKCk7fXZhciBSRVBMQUNFUj0weGZmZmQ7dmFyIHN0cmluZz0nJzt2YXIgYml0c05lZWRlZD10aGlzLmJpdHNOZWVkZWQ7dmFyIGNvZGVQb2ludD10aGlzLmNvZGVQb2ludDtmb3IodmFyIGk9MDtpPG9jdGV0cy5sZW5ndGg7aSs9MSl7dmFyIG9jdGV0PW9jdGV0c1tpXTtpZihiaXRzTmVlZGVkIT09MCl7aWYob2N0ZXQ8MTI4fHxvY3RldD4xOTF8fCF2YWxpZChjb2RlUG9pbnQ8PDZ8b2N0ZXQmNjMsYml0c05lZWRlZC02LG9jdGV0c0NvdW50KGJpdHNOZWVkZWQsY29kZVBvaW50KSkpe2JpdHNOZWVkZWQ9MDtjb2RlUG9pbnQ9UkVQTEFDRVI7c3RyaW5nKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGVQb2ludCk7fX1pZihiaXRzTmVlZGVkPT09MCl7aWYob2N0ZXQ+PTAmJm9jdGV0PD0xMjcpe2JpdHNOZWVkZWQ9MDtjb2RlUG9pbnQ9b2N0ZXQ7fWVsc2UgaWYob2N0ZXQ+PTE5MiYmb2N0ZXQ8PTIyMyl7Yml0c05lZWRlZD02KjE7Y29kZVBvaW50PW9jdGV0JjMxO31lbHNlIGlmKG9jdGV0Pj0yMjQmJm9jdGV0PD0yMzkpe2JpdHNOZWVkZWQ9NioyO2NvZGVQb2ludD1vY3RldCYxNTt9ZWxzZSBpZihvY3RldD49MjQwJiZvY3RldDw9MjQ3KXtiaXRzTmVlZGVkPTYqMztjb2RlUG9pbnQ9b2N0ZXQmNzt9ZWxzZXtiaXRzTmVlZGVkPTA7Y29kZVBvaW50PVJFUExBQ0VSO31pZihiaXRzTmVlZGVkIT09MCYmIXZhbGlkKGNvZGVQb2ludCxiaXRzTmVlZGVkLG9jdGV0c0NvdW50KGJpdHNOZWVkZWQsY29kZVBvaW50KSkpe2JpdHNOZWVkZWQ9MDtjb2RlUG9pbnQ9UkVQTEFDRVI7fX1lbHNle2JpdHNOZWVkZWQtPTY7Y29kZVBvaW50PWNvZGVQb2ludDw8NnxvY3RldCY2Mzt9aWYoYml0c05lZWRlZD09PTApe2lmKGNvZGVQb2ludDw9MHhmZmZmKXtzdHJpbmcrPVN0cmluZy5mcm9tQ2hhckNvZGUoY29kZVBvaW50KTt9ZWxzZXtzdHJpbmcrPVN0cmluZy5mcm9tQ2hhckNvZGUoMHhkODAwKyhjb2RlUG9pbnQtMHhmZmZmLTE+PjEwKSk7c3RyaW5nKz1TdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZGMwMCsoY29kZVBvaW50LTB4ZmZmZi0xJjB4M2ZmKSk7fX19dGhpcy5iaXRzTmVlZGVkPWJpdHNOZWVkZWQ7dGhpcy5jb2RlUG9pbnQ9Y29kZVBvaW50O3JldHVybiBzdHJpbmc7fTsvLyBGaXJlZm94IDwgMzggdGhyb3dzIGFuIGVycm9yIHdpdGggc3RyZWFtIG9wdGlvblxudmFyIHN1cHBvcnRzU3RyZWFtT3B0aW9uPWZ1bmN0aW9uIHN1cHBvcnRzU3RyZWFtT3B0aW9uKCl7dHJ5e3JldHVybiBuZXcgVGV4dERlY29kZXIoKS5kZWNvZGUobmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKCd0ZXN0Jykse3N0cmVhbTp0cnVlfSk9PT0ndGVzdCc7fWNhdGNoKGVycm9yKXtjb25zb2xlLmxvZyhlcnJvcik7fXJldHVybiBmYWxzZTt9Oy8vIElFLCBFZGdlXG5pZihUZXh0RGVjb2Rlcj09dW5kZWZpbmVkfHxUZXh0RW5jb2Rlcj09dW5kZWZpbmVkfHwhc3VwcG9ydHNTdHJlYW1PcHRpb24oKSl7VGV4dERlY29kZXI9VGV4dERlY29kZXJQb2x5ZmlsbDt9dmFyIGs9ZnVuY3Rpb24gaygpe307ZnVuY3Rpb24gWEhSV3JhcHBlcih4aHIpe3RoaXMud2l0aENyZWRlbnRpYWxzPWZhbHNlO3RoaXMucmVzcG9uc2VUeXBlPScnO3RoaXMucmVhZHlTdGF0ZT0wO3RoaXMuc3RhdHVzPTA7dGhpcy5zdGF0dXNUZXh0PScnO3RoaXMucmVzcG9uc2VUZXh0PScnO3RoaXMub25wcm9ncmVzcz1rO3RoaXMub25yZWFkeXN0YXRlY2hhbmdlPWs7dGhpcy5fY29udGVudFR5cGU9Jyc7dGhpcy5feGhyPXhocjt0aGlzLl9zZW5kVGltZW91dD0wO3RoaXMuX2Fib3J0PWs7fVhIUldyYXBwZXIucHJvdG90eXBlLm9wZW49ZnVuY3Rpb24obWV0aG9kLHVybCl7dGhpcy5fYWJvcnQodHJ1ZSk7dmFyIHRoYXQ9dGhpczt2YXIgeGhyPXRoaXMuX3hocjt2YXIgc3RhdGU9MTt2YXIgdGltZW91dD0wO3RoaXMuX2Fib3J0PWZ1bmN0aW9uKHNpbGVudCl7aWYodGhhdC5fc2VuZFRpbWVvdXQhPT0wKXtjbGVhclRpbWVvdXQodGhhdC5fc2VuZFRpbWVvdXQpO3RoYXQuX3NlbmRUaW1lb3V0PTA7fWlmKHN0YXRlPT09MXx8c3RhdGU9PT0yfHxzdGF0ZT09PTMpe3N0YXRlPTQ7eGhyLm9ubG9hZD1rO3hoci5vbmVycm9yPWs7eGhyLm9uYWJvcnQ9azt4aHIub25wcm9ncmVzcz1rO3hoci5vbnJlYWR5c3RhdGVjaGFuZ2U9azsvLyBJRSA4IC0gOTogWERvbWFpblJlcXVlc3QjYWJvcnQoKSBkb2VzIG5vdCBmaXJlIGFueSBldmVudFxuLy8gT3BlcmEgPCAxMDogWE1MSHR0cFJlcXVlc3QjYWJvcnQoKSBkb2VzIG5vdCBmaXJlIGFueSBldmVudFxueGhyLmFib3J0KCk7aWYodGltZW91dCE9PTApe2NsZWFyVGltZW91dCh0aW1lb3V0KTt0aW1lb3V0PTA7fWlmKCFzaWxlbnQpe3RoYXQucmVhZHlTdGF0ZT00O3RoYXQub25yZWFkeXN0YXRlY2hhbmdlKCk7fX1zdGF0ZT0wO307dmFyIG9uU3RhcnQ9ZnVuY3Rpb24gb25TdGFydCgpe2lmKHN0YXRlPT09MSl7Ly8gc3RhdGUgPSAyO1xudmFyIHN0YXR1cz0wO3ZhciBzdGF0dXNUZXh0PScnO3ZhciBjb250ZW50VHlwZT11bmRlZmluZWQ7aWYoISgnY29udGVudFR5cGUnaW4geGhyKSl7dHJ5e3N0YXR1cz14aHIuc3RhdHVzO3N0YXR1c1RleHQ9eGhyLnN0YXR1c1RleHQ7Y29udGVudFR5cGU9eGhyLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LVR5cGUnKTt9Y2F0Y2goZXJyb3Ipey8vIElFIDwgMTAgdGhyb3dzIGV4Y2VwdGlvbiBmb3IgYHhoci5zdGF0dXNgIHdoZW4geGhyLnJlYWR5U3RhdGUgPT09IDIgfHwgeGhyLnJlYWR5U3RhdGUgPT09IDNcbi8vIE9wZXJhIDwgMTEgdGhyb3dzIGV4Y2VwdGlvbiBmb3IgYHhoci5zdGF0dXNgIHdoZW4geGhyLnJlYWR5U3RhdGUgPT09IDJcbi8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0yOTEyMVxuc3RhdHVzPTA7c3RhdHVzVGV4dD0nJztjb250ZW50VHlwZT11bmRlZmluZWQ7Ly8gRmlyZWZveCA8IDE0LCBDaHJvbWUgPywgU2FmYXJpID9cbi8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0yOTY1OFxuLy8gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTc3ODU0XG59fWVsc2V7c3RhdHVzPTIwMDtzdGF0dXNUZXh0PSdPSyc7Y29udGVudFR5cGU9eGhyLmNvbnRlbnRUeXBlO31pZihzdGF0dXMhPT0wKXtzdGF0ZT0yO3RoYXQucmVhZHlTdGF0ZT0yO3RoYXQuc3RhdHVzPXN0YXR1czt0aGF0LnN0YXR1c1RleHQ9c3RhdHVzVGV4dDt0aGF0Ll9jb250ZW50VHlwZT1jb250ZW50VHlwZTt0aGF0Lm9ucmVhZHlzdGF0ZWNoYW5nZSgpO319fTt2YXIgb25Qcm9ncmVzcz1mdW5jdGlvbiBvblByb2dyZXNzKCl7b25TdGFydCgpO2lmKHN0YXRlPT09Mnx8c3RhdGU9PT0zKXtzdGF0ZT0zO3ZhciByZXNwb25zZVRleHQ9Jyc7dHJ5e3Jlc3BvbnNlVGV4dD14aHIucmVzcG9uc2VUZXh0O31jYXRjaChlcnJvcil7Ly8gSUUgOCAtIDkgd2l0aCBYTUxIdHRwUmVxdWVzdFxufXRoYXQucmVhZHlTdGF0ZT0zO3RoYXQucmVzcG9uc2VUZXh0PXJlc3BvbnNlVGV4dDt0aGF0Lm9ucHJvZ3Jlc3MoKTt9fTt2YXIgb25GaW5pc2g9ZnVuY3Rpb24gb25GaW5pc2goKXsvLyBGaXJlZm94IDUyIGZpcmVzIFwicmVhZHlzdGF0ZWNoYW5nZVwiICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkgd2l0aG91dCBmaW5hbCBcInJlYWR5c3RhdGVjaGFuZ2VcIiAoeGhyLnJlYWR5U3RhdGUgPT09IDMpXG4vLyBJRSA4IGZpcmVzIFwib25sb2FkXCIgd2l0aG91dCBcIm9ucHJvZ3Jlc3NcIlxub25Qcm9ncmVzcygpO2lmKHN0YXRlPT09MXx8c3RhdGU9PT0yfHxzdGF0ZT09PTMpe3N0YXRlPTQ7aWYodGltZW91dCE9PTApe2NsZWFyVGltZW91dCh0aW1lb3V0KTt0aW1lb3V0PTA7fXRoYXQucmVhZHlTdGF0ZT00O3RoYXQub25yZWFkeXN0YXRlY2hhbmdlKCk7fX07dmFyIG9uUmVhZHlTdGF0ZUNoYW5nZT1mdW5jdGlvbiBvblJlYWR5U3RhdGVDaGFuZ2UoKXtpZih4aHIhPXVuZGVmaW5lZCl7Ly8gT3BlcmEgMTJcbmlmKHhoci5yZWFkeVN0YXRlPT09NCl7b25GaW5pc2goKTt9ZWxzZSBpZih4aHIucmVhZHlTdGF0ZT09PTMpe29uUHJvZ3Jlc3MoKTt9ZWxzZSBpZih4aHIucmVhZHlTdGF0ZT09PTIpe29uU3RhcnQoKTt9fX07dmFyIG9uVGltZW91dD1mdW5jdGlvbiBvblRpbWVvdXQoKXt0aW1lb3V0PXNldFRpbWVvdXQoZnVuY3Rpb24oKXtvblRpbWVvdXQoKTt9LDUwMCk7aWYoeGhyLnJlYWR5U3RhdGU9PT0zKXtvblByb2dyZXNzKCk7fX07Ly8gWERvbWFpblJlcXVlc3QjYWJvcnQgcmVtb3ZlcyBvbnByb2dyZXNzLCBvbmVycm9yLCBvbmxvYWRcbnhoci5vbmxvYWQ9b25GaW5pc2g7eGhyLm9uZXJyb3I9b25GaW5pc2g7Ly8gaW1wcm9wZXIgZml4IHRvIG1hdGNoIEZpcmVmb3ggYmVoYXZpb3IsIGJ1dCBpdCBpcyBiZXR0ZXIgdGhhbiBqdXN0IGlnbm9yZSBhYm9ydFxuLy8gc2VlIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTc2ODU5NlxuLy8gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9ODgwMjAwXG4vLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MTUzNTcwXG4vLyBJRSA4IGZpcmVzIFwib25sb2FkXCIgd2l0aG91dCBcIm9ucHJvZ3Jlc3Ncbnhoci5vbmFib3J0PW9uRmluaXNoOy8vIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTczNjcyM1xuaWYoISgnc2VuZEFzQmluYXJ5J2luIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZSkmJiEoJ21vekFub24naW4gWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlKSl7eGhyLm9ucHJvZ3Jlc3M9b25Qcm9ncmVzczt9Ly8gSUUgOCAtIDkgKFhNTEhUVFBSZXF1ZXN0KVxuLy8gT3BlcmEgPCAxMlxuLy8gRmlyZWZveCA8IDMuNVxuLy8gRmlyZWZveCAzLjUgLSAzLjYgLSA/IDwgOS4wXG4vLyBvbnByb2dyZXNzIGlzIG5vdCBmaXJlZCBzb21ldGltZXMgb3IgZGVsYXllZFxuLy8gc2VlIGFsc28gIzY0XG54aHIub25yZWFkeXN0YXRlY2hhbmdlPW9uUmVhZHlTdGF0ZUNoYW5nZTtpZignY29udGVudFR5cGUnaW4geGhyKXt1cmwrPSh1cmwuaW5kZXhPZignPycpPT09LTE/Jz8nOicmJykrJ3BhZGRpbmc9dHJ1ZSc7fXhoci5vcGVuKG1ldGhvZCx1cmwsdHJ1ZSk7aWYoJ3JlYWR5U3RhdGUnaW4geGhyKXsvLyB3b3JrYXJvdW5kIGZvciBPcGVyYSAxMiBpc3N1ZSB3aXRoIFwicHJvZ3Jlc3NcIiBldmVudHNcbi8vICM5MVxudGltZW91dD1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7b25UaW1lb3V0KCk7fSwwKTt9fTtYSFJXcmFwcGVyLnByb3RvdHlwZS5hYm9ydD1mdW5jdGlvbigpe3RoaXMuX2Fib3J0KGZhbHNlKTt9O1hIUldyYXBwZXIucHJvdG90eXBlLmdldFJlc3BvbnNlSGVhZGVyPWZ1bmN0aW9uKG5hbWUpe3JldHVybiB0aGlzLl9jb250ZW50VHlwZTt9O1hIUldyYXBwZXIucHJvdG90eXBlLnNldFJlcXVlc3RIZWFkZXI9ZnVuY3Rpb24obmFtZSx2YWx1ZSl7dmFyIHhocj10aGlzLl94aHI7aWYoJ3NldFJlcXVlc3RIZWFkZXInaW4geGhyKXt4aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLHZhbHVlKTt9fTtYSFJXcmFwcGVyLnByb3RvdHlwZS5nZXRBbGxSZXNwb25zZUhlYWRlcnM9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5feGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycyE9dW5kZWZpbmVkP3RoaXMuX3hoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKTonJzt9O1hIUldyYXBwZXIucHJvdG90eXBlLnNlbmQ9ZnVuY3Rpb24oKXsvLyBsb2FkaW5nIGluZGljYXRvciBpbiBTYWZhcmkgPCA/ICg2KSwgQ2hyb21lIDwgMTQsIEZpcmVmb3hcbmlmKCEoJ29udGltZW91dCdpbiBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUpJiZkb2N1bWVudCE9dW5kZWZpbmVkJiZkb2N1bWVudC5yZWFkeVN0YXRlIT11bmRlZmluZWQmJmRvY3VtZW50LnJlYWR5U3RhdGUhPT0nY29tcGxldGUnKXt2YXIgdGhhdD10aGlzO3RoYXQuX3NlbmRUaW1lb3V0PXNldFRpbWVvdXQoZnVuY3Rpb24oKXt0aGF0Ll9zZW5kVGltZW91dD0wO3RoYXQuc2VuZCgpO30sNCk7cmV0dXJuO312YXIgeGhyPXRoaXMuX3hocjsvLyB3aXRoQ3JlZGVudGlhbHMgc2hvdWxkIGJlIHNldCBhZnRlciBcIm9wZW5cIiBmb3IgU2FmYXJpIGFuZCBDaHJvbWUgKDwgMTkgPylcbnhoci53aXRoQ3JlZGVudGlhbHM9dGhpcy53aXRoQ3JlZGVudGlhbHM7eGhyLnJlc3BvbnNlVHlwZT10aGlzLnJlc3BvbnNlVHlwZTt0cnl7Ly8geGhyLnNlbmQoKTsgdGhyb3dzIFwiTm90IGVub3VnaCBhcmd1bWVudHNcIiBpbiBGaXJlZm94IDMuMFxueGhyLnNlbmQodW5kZWZpbmVkKTt9Y2F0Y2goZXJyb3IxKXsvLyBTYWZhcmkgNS4xLjcsIE9wZXJhIDEyXG50aHJvdyBlcnJvcjE7fX07ZnVuY3Rpb24gdG9Mb3dlckNhc2UobmFtZSl7cmV0dXJuIG5hbWUucmVwbGFjZSgvW0EtWl0vZyxmdW5jdGlvbihjKXtyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjLmNoYXJDb2RlQXQoMCkrMHgyMCk7fSk7fWZ1bmN0aW9uIEhlYWRlcnNQb2x5ZmlsbChhbGwpey8vIEdldCBoZWFkZXJzOiBpbXBsZW1lbnRlZCBhY2NvcmRpbmcgdG8gbW96aWxsYSdzIGV4YW1wbGUgY29kZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1hNTEh0dHBSZXF1ZXN0L2dldEFsbFJlc3BvbnNlSGVhZGVycyNFeGFtcGxlXG52YXIgbWFwPU9iamVjdC5jcmVhdGUobnVsbCk7dmFyIGFycmF5PWFsbC5zcGxpdCgnXFxyXFxuJyk7Zm9yKHZhciBpPTA7aTxhcnJheS5sZW5ndGg7aSs9MSl7dmFyIGxpbmU9YXJyYXlbaV07dmFyIHBhcnRzPWxpbmUuc3BsaXQoJzogJyk7dmFyIG5hbWU9cGFydHMuc2hpZnQoKTt2YXIgdmFsdWU9cGFydHMuam9pbignOiAnKTttYXBbdG9Mb3dlckNhc2UobmFtZSldPXZhbHVlO310aGlzLl9tYXA9bWFwO31IZWFkZXJzUG9seWZpbGwucHJvdG90eXBlLmdldD1mdW5jdGlvbihuYW1lKXtyZXR1cm4gdGhpcy5fbWFwW3RvTG93ZXJDYXNlKG5hbWUpXTt9O2Z1bmN0aW9uIFhIUlRyYW5zcG9ydCgpe31YSFJUcmFuc3BvcnQucHJvdG90eXBlLm9wZW49ZnVuY3Rpb24oeGhyLG9uU3RhcnRDYWxsYmFjayxvblByb2dyZXNzQ2FsbGJhY2ssb25GaW5pc2hDYWxsYmFjayx1cmwsd2l0aENyZWRlbnRpYWxzLGhlYWRlcnMpe3hoci5vcGVuKCdHRVQnLHVybCk7dmFyIG9mZnNldD0wO3hoci5vbnByb2dyZXNzPWZ1bmN0aW9uKCl7dmFyIHJlc3BvbnNlVGV4dD14aHIucmVzcG9uc2VUZXh0O3ZhciBjaHVuaz1yZXNwb25zZVRleHQuc2xpY2Uob2Zmc2V0KTtvZmZzZXQrPWNodW5rLmxlbmd0aDtvblByb2dyZXNzQ2FsbGJhY2soY2h1bmspO307eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpe2lmKHhoci5yZWFkeVN0YXRlPT09Mil7dmFyIHN0YXR1cz14aHIuc3RhdHVzO3ZhciBzdGF0dXNUZXh0PXhoci5zdGF0dXNUZXh0O3ZhciBjb250ZW50VHlwZT14aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtVHlwZScpO3ZhciBoZWFkZXJzPXhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKTtvblN0YXJ0Q2FsbGJhY2soc3RhdHVzLHN0YXR1c1RleHQsY29udGVudFR5cGUsbmV3IEhlYWRlcnNQb2x5ZmlsbChoZWFkZXJzKSxmdW5jdGlvbigpe3hoci5hYm9ydCgpO30pO31lbHNlIGlmKHhoci5yZWFkeVN0YXRlPT09NCl7b25GaW5pc2hDYWxsYmFjaygpO319O3hoci53aXRoQ3JlZGVudGlhbHM9d2l0aENyZWRlbnRpYWxzO3hoci5yZXNwb25zZVR5cGU9J3RleHQnO2Zvcih2YXIgbmFtZSBpbiBoZWFkZXJzKXtpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaGVhZGVycyxuYW1lKSl7eGhyLnNldFJlcXVlc3RIZWFkZXIobmFtZSxoZWFkZXJzW25hbWVdKTt9fXhoci5zZW5kKCk7fTtmdW5jdGlvbiBIZWFkZXJzV3JhcHBlcihoZWFkZXJzKXt0aGlzLl9oZWFkZXJzPWhlYWRlcnM7fUhlYWRlcnNXcmFwcGVyLnByb3RvdHlwZS5nZXQ9ZnVuY3Rpb24obmFtZSl7cmV0dXJuIHRoaXMuX2hlYWRlcnMuZ2V0KG5hbWUpO307ZnVuY3Rpb24gRmV0Y2hUcmFuc3BvcnQoKXt9RmV0Y2hUcmFuc3BvcnQucHJvdG90eXBlLm9wZW49ZnVuY3Rpb24oeGhyLG9uU3RhcnRDYWxsYmFjayxvblByb2dyZXNzQ2FsbGJhY2ssb25GaW5pc2hDYWxsYmFjayx1cmwsd2l0aENyZWRlbnRpYWxzLGhlYWRlcnMpe3ZhciBjb250cm9sbGVyPW5ldyBBYm9ydENvbnRyb2xsZXIoKTt2YXIgc2lnbmFsPWNvbnRyb2xsZXIuc2lnbmFsOy8vIHNlZSAjMTIwXG52YXIgdGV4dERlY29kZXI9bmV3IFRleHREZWNvZGVyKCk7ZmV0Y2godXJsLHtoZWFkZXJzOmhlYWRlcnMsY3JlZGVudGlhbHM6d2l0aENyZWRlbnRpYWxzPydpbmNsdWRlJzonc2FtZS1vcmlnaW4nLHNpZ25hbDpzaWduYWwsY2FjaGU6J25vLXN0b3JlJ30pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe3ZhciByZWFkZXI9cmVzcG9uc2UuYm9keS5nZXRSZWFkZXIoKTtvblN0YXJ0Q2FsbGJhY2socmVzcG9uc2Uuc3RhdHVzLHJlc3BvbnNlLnN0YXR1c1RleHQscmVzcG9uc2UuaGVhZGVycy5nZXQoJ0NvbnRlbnQtVHlwZScpLG5ldyBIZWFkZXJzV3JhcHBlcihyZXNwb25zZS5oZWFkZXJzKSxmdW5jdGlvbigpe2NvbnRyb2xsZXIuYWJvcnQoKTtyZWFkZXIuY2FuY2VsKCk7fSk7cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXt2YXIgcmVhZE5leHRDaHVuaz1mdW5jdGlvbiByZWFkTmV4dENodW5rKCl7cmVhZGVyLnJlYWQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7aWYocmVzdWx0LmRvbmUpey8vIE5vdGU6IGJ5dGVzIGluIHRleHREZWNvZGVyIGFyZSBpZ25vcmVkXG5yZXNvbHZlKHVuZGVmaW5lZCk7fWVsc2V7dmFyIGNodW5rPXRleHREZWNvZGVyLmRlY29kZShyZXN1bHQudmFsdWUse3N0cmVhbTp0cnVlfSk7b25Qcm9ncmVzc0NhbGxiYWNrKGNodW5rKTtyZWFkTmV4dENodW5rKCk7fX0pWydjYXRjaCddKGZ1bmN0aW9uKGVycm9yKXtyZWplY3QoZXJyb3IpO30pO307cmVhZE5leHRDaHVuaygpO30pO30pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtvbkZpbmlzaENhbGxiYWNrKCk7cmV0dXJuIHJlc3VsdDt9LGZ1bmN0aW9uKGVycm9yKXtvbkZpbmlzaENhbGxiYWNrKCk7cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTt9KTt9O2Z1bmN0aW9uIEV2ZW50VGFyZ2V0KCl7dGhpcy5fbGlzdGVuZXJzPU9iamVjdC5jcmVhdGUobnVsbCk7fWZ1bmN0aW9uIHRocm93RXJyb3IoZSl7c2V0VGltZW91dChmdW5jdGlvbigpe3Rocm93IGU7fSwwKTt9RXZlbnRUYXJnZXQucHJvdG90eXBlLmRpc3BhdGNoRXZlbnQ9ZnVuY3Rpb24oZXZlbnQpe2V2ZW50LnRhcmdldD10aGlzO3ZhciB0eXBlTGlzdGVuZXJzPXRoaXMuX2xpc3RlbmVyc1tldmVudC50eXBlXTtpZih0eXBlTGlzdGVuZXJzIT11bmRlZmluZWQpe3ZhciBsZW5ndGg9dHlwZUxpc3RlbmVycy5sZW5ndGg7Zm9yKHZhciBpPTA7aTxsZW5ndGg7aSs9MSl7dmFyIGxpc3RlbmVyPXR5cGVMaXN0ZW5lcnNbaV07dHJ5e2lmKHR5cGVvZiBsaXN0ZW5lci5oYW5kbGVFdmVudD09PSdmdW5jdGlvbicpe2xpc3RlbmVyLmhhbmRsZUV2ZW50KGV2ZW50KTt9ZWxzZXtsaXN0ZW5lci5jYWxsKHRoaXMsZXZlbnQpO319Y2F0Y2goZSl7dGhyb3dFcnJvcihlKTt9fX19O0V2ZW50VGFyZ2V0LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyPWZ1bmN0aW9uKHR5cGUsbGlzdGVuZXIpe3R5cGU9U3RyaW5nKHR5cGUpO3ZhciBsaXN0ZW5lcnM9dGhpcy5fbGlzdGVuZXJzO3ZhciB0eXBlTGlzdGVuZXJzPWxpc3RlbmVyc1t0eXBlXTtpZih0eXBlTGlzdGVuZXJzPT11bmRlZmluZWQpe3R5cGVMaXN0ZW5lcnM9W107bGlzdGVuZXJzW3R5cGVdPXR5cGVMaXN0ZW5lcnM7fXZhciBmb3VuZD1mYWxzZTtmb3IodmFyIGk9MDtpPHR5cGVMaXN0ZW5lcnMubGVuZ3RoO2krPTEpe2lmKHR5cGVMaXN0ZW5lcnNbaV09PT1saXN0ZW5lcil7Zm91bmQ9dHJ1ZTt9fWlmKCFmb3VuZCl7dHlwZUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTt9fTtFdmVudFRhcmdldC5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lcj1mdW5jdGlvbih0eXBlLGxpc3RlbmVyKXt0eXBlPVN0cmluZyh0eXBlKTt2YXIgbGlzdGVuZXJzPXRoaXMuX2xpc3RlbmVyczt2YXIgdHlwZUxpc3RlbmVycz1saXN0ZW5lcnNbdHlwZV07aWYodHlwZUxpc3RlbmVycyE9dW5kZWZpbmVkKXt2YXIgZmlsdGVyZWQ9W107Zm9yKHZhciBpPTA7aTx0eXBlTGlzdGVuZXJzLmxlbmd0aDtpKz0xKXtpZih0eXBlTGlzdGVuZXJzW2ldIT09bGlzdGVuZXIpe2ZpbHRlcmVkLnB1c2godHlwZUxpc3RlbmVyc1tpXSk7fX1pZihmaWx0ZXJlZC5sZW5ndGg9PT0wKXtkZWxldGUgbGlzdGVuZXJzW3R5cGVdO31lbHNle2xpc3RlbmVyc1t0eXBlXT1maWx0ZXJlZDt9fX07ZnVuY3Rpb24gRXZlbnQodHlwZSl7dGhpcy50eXBlPXR5cGU7dGhpcy50YXJnZXQ9dW5kZWZpbmVkO31mdW5jdGlvbiBNZXNzYWdlRXZlbnQodHlwZSxvcHRpb25zKXtFdmVudC5jYWxsKHRoaXMsdHlwZSk7dGhpcy5kYXRhPW9wdGlvbnMuZGF0YTt0aGlzLmxhc3RFdmVudElkPW9wdGlvbnMubGFzdEV2ZW50SWQ7fU1lc3NhZ2VFdmVudC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShFdmVudC5wcm90b3R5cGUpO2Z1bmN0aW9uIENvbm5lY3Rpb25FdmVudCh0eXBlLG9wdGlvbnMpe0V2ZW50LmNhbGwodGhpcyx0eXBlKTt0aGlzLnN0YXR1cz1vcHRpb25zLnN0YXR1czt0aGlzLnN0YXR1c1RleHQ9b3B0aW9ucy5zdGF0dXNUZXh0O3RoaXMuaGVhZGVycz1vcHRpb25zLmhlYWRlcnM7fUNvbm5lY3Rpb25FdmVudC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShFdmVudC5wcm90b3R5cGUpO3ZhciBXQUlUSU5HPS0xO3ZhciBDT05ORUNUSU5HPTA7dmFyIE9QRU49MTt2YXIgQ0xPU0VEPTI7dmFyIEFGVEVSX0NSPS0xO3ZhciBGSUVMRF9TVEFSVD0wO3ZhciBGSUVMRD0xO3ZhciBWQUxVRV9TVEFSVD0yO3ZhciBWQUxVRT0zO3ZhciBjb250ZW50VHlwZVJlZ0V4cD0vXnRleHRcXC9ldmVudFxcLXN0cmVhbTs/KFxccypjaGFyc2V0XFw9dXRmXFwtOCk/JC9pO3ZhciBNSU5JTVVNX0RVUkFUSU9OPTEwMDA7dmFyIE1BWElNVU1fRFVSQVRJT049MTgwMDAwMDA7dmFyIHBhcnNlRHVyYXRpb249ZnVuY3Rpb24gcGFyc2VEdXJhdGlvbih2YWx1ZSxkZWYpe3ZhciBuPXBhcnNlSW50KHZhbHVlLDEwKTtpZihuIT09bil7bj1kZWY7fXJldHVybiBjbGFtcER1cmF0aW9uKG4pO307dmFyIGNsYW1wRHVyYXRpb249ZnVuY3Rpb24gY2xhbXBEdXJhdGlvbihuKXtyZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgobixNSU5JTVVNX0RVUkFUSU9OKSxNQVhJTVVNX0RVUkFUSU9OKTt9O3ZhciBmaXJlPWZ1bmN0aW9uIGZpcmUodGhhdCxmLGV2ZW50KXt0cnl7aWYodHlwZW9mIGY9PT0nZnVuY3Rpb24nKXtmLmNhbGwodGhhdCxldmVudCk7fX1jYXRjaChlKXt0aHJvd0Vycm9yKGUpO319O2Z1bmN0aW9uIEV2ZW50U291cmNlUG9seWZpbGwodXJsLG9wdGlvbnMpe0V2ZW50VGFyZ2V0LmNhbGwodGhpcyk7dGhpcy5vbm9wZW49dW5kZWZpbmVkO3RoaXMub25tZXNzYWdlPXVuZGVmaW5lZDt0aGlzLm9uZXJyb3I9dW5kZWZpbmVkO3RoaXMudXJsPXVuZGVmaW5lZDt0aGlzLnJlYWR5U3RhdGU9dW5kZWZpbmVkO3RoaXMud2l0aENyZWRlbnRpYWxzPXVuZGVmaW5lZDt0aGlzLl9jbG9zZT11bmRlZmluZWQ7c3RhcnQodGhpcyx1cmwsb3B0aW9ucyk7fXZhciBpc0ZldGNoU3VwcG9ydGVkPWZldGNoIT11bmRlZmluZWQmJlJlc3BvbnNlIT11bmRlZmluZWQmJidib2R5J2luIFJlc3BvbnNlLnByb3RvdHlwZTtmdW5jdGlvbiBzdGFydChlcyx1cmwsb3B0aW9ucyl7dXJsPVN0cmluZyh1cmwpO3ZhciB3aXRoQ3JlZGVudGlhbHM9b3B0aW9ucyE9dW5kZWZpbmVkJiZCb29sZWFuKG9wdGlvbnMud2l0aENyZWRlbnRpYWxzKTt2YXIgaW5pdGlhbFJldHJ5PWNsYW1wRHVyYXRpb24oMTAwMCk7dmFyIGhlYXJ0YmVhdFRpbWVvdXQ9b3B0aW9ucyE9dW5kZWZpbmVkJiZvcHRpb25zLmhlYXJ0YmVhdFRpbWVvdXQhPXVuZGVmaW5lZD9wYXJzZUR1cmF0aW9uKG9wdGlvbnMuaGVhcnRiZWF0VGltZW91dCw0NTAwMCk6Y2xhbXBEdXJhdGlvbig0NTAwMCk7dmFyIGxhc3RFdmVudElkPScnO3ZhciByZXRyeT1pbml0aWFsUmV0cnk7dmFyIHdhc0FjdGl2aXR5PWZhbHNlO3ZhciBoZWFkZXJzPW9wdGlvbnMhPXVuZGVmaW5lZCYmb3B0aW9ucy5oZWFkZXJzIT11bmRlZmluZWQ/SlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvcHRpb25zLmhlYWRlcnMpKTp1bmRlZmluZWQ7dmFyIEN1cnJlbnRUcmFuc3BvcnQ9b3B0aW9ucyE9dW5kZWZpbmVkJiZvcHRpb25zLlRyYW5zcG9ydCE9dW5kZWZpbmVkP29wdGlvbnMuVHJhbnNwb3J0OlhNTEh0dHBSZXF1ZXN0O3ZhciB4aHI9aXNGZXRjaFN1cHBvcnRlZCYmIShvcHRpb25zIT11bmRlZmluZWQmJm9wdGlvbnMuVHJhbnNwb3J0IT11bmRlZmluZWQpP3VuZGVmaW5lZDpuZXcgWEhSV3JhcHBlcihuZXcgQ3VycmVudFRyYW5zcG9ydCgpKTt2YXIgdHJhbnNwb3J0PXhocj09dW5kZWZpbmVkP25ldyBGZXRjaFRyYW5zcG9ydCgpOm5ldyBYSFJUcmFuc3BvcnQoKTt2YXIgY2FuY2VsRnVuY3Rpb249dW5kZWZpbmVkO3ZhciB0aW1lb3V0PTA7dmFyIGN1cnJlbnRTdGF0ZT1XQUlUSU5HO3ZhciBkYXRhQnVmZmVyPScnO3ZhciBsYXN0RXZlbnRJZEJ1ZmZlcj0nJzt2YXIgZXZlbnRUeXBlQnVmZmVyPScnO3ZhciB0ZXh0QnVmZmVyPScnO3ZhciBzdGF0ZT1GSUVMRF9TVEFSVDt2YXIgZmllbGRTdGFydD0wO3ZhciB2YWx1ZVN0YXJ0PTA7dmFyIG9uU3RhcnQ9ZnVuY3Rpb24gb25TdGFydChzdGF0dXMsc3RhdHVzVGV4dCxjb250ZW50VHlwZSxoZWFkZXJzLGNhbmNlbCl7aWYoY3VycmVudFN0YXRlPT09Q09OTkVDVElORyl7Y2FuY2VsRnVuY3Rpb249Y2FuY2VsO2lmKHN0YXR1cz09PTIwMCYmY29udGVudFR5cGUhPXVuZGVmaW5lZCYmY29udGVudFR5cGVSZWdFeHAudGVzdChjb250ZW50VHlwZSkpe2N1cnJlbnRTdGF0ZT1PUEVOO3dhc0FjdGl2aXR5PXRydWU7cmV0cnk9aW5pdGlhbFJldHJ5O2VzLnJlYWR5U3RhdGU9T1BFTjt2YXIgZXZlbnQ9bmV3IENvbm5lY3Rpb25FdmVudCgnb3Blbicse3N0YXR1czpzdGF0dXMsc3RhdHVzVGV4dDpzdGF0dXNUZXh0LGhlYWRlcnM6aGVhZGVyc30pO2VzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO2ZpcmUoZXMsZXMub25vcGVuLGV2ZW50KTt9ZWxzZXt2YXIgbWVzc2FnZT0nJztpZihzdGF0dXMhPT0yMDApe2lmKHN0YXR1c1RleHQpe3N0YXR1c1RleHQ9c3RhdHVzVGV4dC5yZXBsYWNlKC9cXHMrL2csJyAnKTt9bWVzc2FnZT1cIkV2ZW50U291cmNlJ3MgcmVzcG9uc2UgaGFzIGEgc3RhdHVzIFwiK3N0YXR1cysnICcrc3RhdHVzVGV4dCsnIHRoYXQgaXMgbm90IDIwMC4gQWJvcnRpbmcgdGhlIGNvbm5lY3Rpb24uJzt9ZWxzZXttZXNzYWdlPVwiRXZlbnRTb3VyY2UncyByZXNwb25zZSBoYXMgYSBDb250ZW50LVR5cGUgc3BlY2lmeWluZyBhbiB1bnN1cHBvcnRlZCB0eXBlOiBcIisoY29udGVudFR5cGU9PXVuZGVmaW5lZD8nLSc6Y29udGVudFR5cGUucmVwbGFjZSgvXFxzKy9nLCcgJykpKycuIEFib3J0aW5nIHRoZSBjb25uZWN0aW9uLic7fXRocm93RXJyb3IobmV3IEVycm9yKG1lc3NhZ2UpKTtjbG9zZSgpO3ZhciBldmVudD1uZXcgQ29ubmVjdGlvbkV2ZW50KCdlcnJvcicse3N0YXR1czpzdGF0dXMsc3RhdHVzVGV4dDpzdGF0dXNUZXh0LGhlYWRlcnM6aGVhZGVyc30pO2VzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO2ZpcmUoZXMsZXMub25lcnJvcixldmVudCk7fX19O3ZhciBvblByb2dyZXNzPWZ1bmN0aW9uIG9uUHJvZ3Jlc3ModGV4dENodW5rKXtpZihjdXJyZW50U3RhdGU9PT1PUEVOKXt2YXIgbj0tMTtmb3IodmFyIGk9MDtpPHRleHRDaHVuay5sZW5ndGg7aSs9MSl7dmFyIGM9dGV4dENodW5rLmNoYXJDb2RlQXQoaSk7aWYoYz09PSdcXG4nLmNoYXJDb2RlQXQoMCl8fGM9PT0nXFxyJy5jaGFyQ29kZUF0KDApKXtuPWk7fX12YXIgY2h1bms9KG4hPT0tMT90ZXh0QnVmZmVyOicnKSt0ZXh0Q2h1bmsuc2xpY2UoMCxuKzEpO3RleHRCdWZmZXI9KG49PT0tMT90ZXh0QnVmZmVyOicnKSt0ZXh0Q2h1bmsuc2xpY2UobisxKTtpZihjaHVuayE9PScnKXt3YXNBY3Rpdml0eT10cnVlO31mb3IodmFyIHBvc2l0aW9uPTA7cG9zaXRpb248Y2h1bmsubGVuZ3RoO3Bvc2l0aW9uKz0xKXt2YXIgYz1jaHVuay5jaGFyQ29kZUF0KHBvc2l0aW9uKTtpZihzdGF0ZT09PUFGVEVSX0NSJiZjPT09J1xcbicuY2hhckNvZGVBdCgwKSl7c3RhdGU9RklFTERfU1RBUlQ7fWVsc2V7aWYoc3RhdGU9PT1BRlRFUl9DUil7c3RhdGU9RklFTERfU1RBUlQ7fWlmKGM9PT0nXFxyJy5jaGFyQ29kZUF0KDApfHxjPT09J1xcbicuY2hhckNvZGVBdCgwKSl7aWYoc3RhdGUhPT1GSUVMRF9TVEFSVCl7aWYoc3RhdGU9PT1GSUVMRCl7dmFsdWVTdGFydD1wb3NpdGlvbisxO312YXIgZmllbGQ9Y2h1bmsuc2xpY2UoZmllbGRTdGFydCx2YWx1ZVN0YXJ0LTEpO3ZhciB2YWx1ZT1jaHVuay5zbGljZSh2YWx1ZVN0YXJ0Kyh2YWx1ZVN0YXJ0PHBvc2l0aW9uJiZjaHVuay5jaGFyQ29kZUF0KHZhbHVlU3RhcnQpPT09JyAnLmNoYXJDb2RlQXQoMCk/MTowKSxwb3NpdGlvbik7aWYoZmllbGQ9PT0nZGF0YScpe2RhdGFCdWZmZXIrPSdcXG4nO2RhdGFCdWZmZXIrPXZhbHVlO31lbHNlIGlmKGZpZWxkPT09J2lkJyl7bGFzdEV2ZW50SWRCdWZmZXI9dmFsdWU7fWVsc2UgaWYoZmllbGQ9PT0nZXZlbnQnKXtldmVudFR5cGVCdWZmZXI9dmFsdWU7fWVsc2UgaWYoZmllbGQ9PT0ncmV0cnknKXtpbml0aWFsUmV0cnk9cGFyc2VEdXJhdGlvbih2YWx1ZSxpbml0aWFsUmV0cnkpO3JldHJ5PWluaXRpYWxSZXRyeTt9ZWxzZSBpZihmaWVsZD09PSdoZWFydGJlYXRUaW1lb3V0Jyl7aGVhcnRiZWF0VGltZW91dD1wYXJzZUR1cmF0aW9uKHZhbHVlLGhlYXJ0YmVhdFRpbWVvdXQpO2lmKHRpbWVvdXQhPT0wKXtjbGVhclRpbWVvdXQodGltZW91dCk7dGltZW91dD1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7b25UaW1lb3V0KCk7fSxoZWFydGJlYXRUaW1lb3V0KTt9fX1pZihzdGF0ZT09PUZJRUxEX1NUQVJUKXtpZihkYXRhQnVmZmVyIT09Jycpe2xhc3RFdmVudElkPWxhc3RFdmVudElkQnVmZmVyO2lmKGV2ZW50VHlwZUJ1ZmZlcj09PScnKXtldmVudFR5cGVCdWZmZXI9J21lc3NhZ2UnO312YXIgZXZlbnQ9bmV3IE1lc3NhZ2VFdmVudChldmVudFR5cGVCdWZmZXIse2RhdGE6ZGF0YUJ1ZmZlci5zbGljZSgxKSxsYXN0RXZlbnRJZDpsYXN0RXZlbnRJZEJ1ZmZlcn0pO2VzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO2lmKGV2ZW50VHlwZUJ1ZmZlcj09PSdtZXNzYWdlJyl7ZmlyZShlcyxlcy5vbm1lc3NhZ2UsZXZlbnQpO31pZihjdXJyZW50U3RhdGU9PT1DTE9TRUQpe3JldHVybjt9fWRhdGFCdWZmZXI9Jyc7ZXZlbnRUeXBlQnVmZmVyPScnO31zdGF0ZT1jPT09J1xccicuY2hhckNvZGVBdCgwKT9BRlRFUl9DUjpGSUVMRF9TVEFSVDt9ZWxzZXtpZihzdGF0ZT09PUZJRUxEX1NUQVJUKXtmaWVsZFN0YXJ0PXBvc2l0aW9uO3N0YXRlPUZJRUxEO31pZihzdGF0ZT09PUZJRUxEKXtpZihjPT09JzonLmNoYXJDb2RlQXQoMCkpe3ZhbHVlU3RhcnQ9cG9zaXRpb24rMTtzdGF0ZT1WQUxVRV9TVEFSVDt9fWVsc2UgaWYoc3RhdGU9PT1WQUxVRV9TVEFSVCl7c3RhdGU9VkFMVUU7fX19fX19O3ZhciBvbkZpbmlzaD1mdW5jdGlvbiBvbkZpbmlzaCgpe2lmKGN1cnJlbnRTdGF0ZT09PU9QRU58fGN1cnJlbnRTdGF0ZT09PUNPTk5FQ1RJTkcpe2N1cnJlbnRTdGF0ZT1XQUlUSU5HO2lmKHRpbWVvdXQhPT0wKXtjbGVhclRpbWVvdXQodGltZW91dCk7dGltZW91dD0wO310aW1lb3V0PXNldFRpbWVvdXQoZnVuY3Rpb24oKXtvblRpbWVvdXQoKTt9LHJldHJ5KTtyZXRyeT1jbGFtcER1cmF0aW9uKE1hdGgubWluKGluaXRpYWxSZXRyeSoxNixyZXRyeSoyKSk7ZXMucmVhZHlTdGF0ZT1DT05ORUNUSU5HO3ZhciBldmVudD1uZXcgRXZlbnQoJ2Vycm9yJyk7ZXMuZGlzcGF0Y2hFdmVudChldmVudCk7ZmlyZShlcyxlcy5vbmVycm9yLGV2ZW50KTt9fTt2YXIgY2xvc2U9ZnVuY3Rpb24gY2xvc2UoKXtjdXJyZW50U3RhdGU9Q0xPU0VEO2lmKGNhbmNlbEZ1bmN0aW9uIT11bmRlZmluZWQpe2NhbmNlbEZ1bmN0aW9uKCk7Y2FuY2VsRnVuY3Rpb249dW5kZWZpbmVkO31pZih0aW1lb3V0IT09MCl7Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO3RpbWVvdXQ9MDt9ZXMucmVhZHlTdGF0ZT1DTE9TRUQ7fTt2YXIgb25UaW1lb3V0PWZ1bmN0aW9uIG9uVGltZW91dCgpe3RpbWVvdXQ9MDtpZihjdXJyZW50U3RhdGUhPT1XQUlUSU5HKXtpZighd2FzQWN0aXZpdHkmJmNhbmNlbEZ1bmN0aW9uIT11bmRlZmluZWQpe3Rocm93RXJyb3IobmV3IEVycm9yKCdObyBhY3Rpdml0eSB3aXRoaW4gJytoZWFydGJlYXRUaW1lb3V0KycgbWlsbGlzZWNvbmRzLiBSZWNvbm5lY3RpbmcuJykpO2NhbmNlbEZ1bmN0aW9uKCk7Y2FuY2VsRnVuY3Rpb249dW5kZWZpbmVkO31lbHNle3dhc0FjdGl2aXR5PWZhbHNlO3RpbWVvdXQ9c2V0VGltZW91dChmdW5jdGlvbigpe29uVGltZW91dCgpO30saGVhcnRiZWF0VGltZW91dCk7fXJldHVybjt9d2FzQWN0aXZpdHk9ZmFsc2U7dGltZW91dD1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7b25UaW1lb3V0KCk7fSxoZWFydGJlYXRUaW1lb3V0KTtjdXJyZW50U3RhdGU9Q09OTkVDVElORztkYXRhQnVmZmVyPScnO2V2ZW50VHlwZUJ1ZmZlcj0nJztsYXN0RXZlbnRJZEJ1ZmZlcj1sYXN0RXZlbnRJZDt0ZXh0QnVmZmVyPScnO2ZpZWxkU3RhcnQ9MDt2YWx1ZVN0YXJ0PTA7c3RhdGU9RklFTERfU1RBUlQ7Ly8gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NDI4OTE2XG4vLyBSZXF1ZXN0IGhlYWRlciBmaWVsZCBMYXN0LUV2ZW50LUlEIGlzIG5vdCBhbGxvd2VkIGJ5IEFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMuXG52YXIgcmVxdWVzdFVSTD11cmw7aWYodXJsLnNsaWNlKDAsNSkhPT0nZGF0YTonJiZ1cmwuc2xpY2UoMCw1KSE9PSdibG9iOicpe2lmKGxhc3RFdmVudElkIT09Jycpe3JlcXVlc3RVUkwrPSh1cmwuaW5kZXhPZignPycpPT09LTE/Jz8nOicmJykrJ2xhc3RFdmVudElkPScrZW5jb2RlVVJJQ29tcG9uZW50KGxhc3RFdmVudElkKTt9fXZhciByZXF1ZXN0SGVhZGVycz17fTtyZXF1ZXN0SGVhZGVyc1snQWNjZXB0J109J3RleHQvZXZlbnQtc3RyZWFtJztpZihoZWFkZXJzIT11bmRlZmluZWQpe2Zvcih2YXIgbmFtZSBpbiBoZWFkZXJzKXtpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaGVhZGVycyxuYW1lKSl7cmVxdWVzdEhlYWRlcnNbbmFtZV09aGVhZGVyc1tuYW1lXTt9fX10cnl7dHJhbnNwb3J0Lm9wZW4oeGhyLG9uU3RhcnQsb25Qcm9ncmVzcyxvbkZpbmlzaCxyZXF1ZXN0VVJMLHdpdGhDcmVkZW50aWFscyxyZXF1ZXN0SGVhZGVycyk7fWNhdGNoKGVycm9yKXtjbG9zZSgpO3Rocm93IGVycm9yO319O2VzLnVybD11cmw7ZXMucmVhZHlTdGF0ZT1DT05ORUNUSU5HO2VzLndpdGhDcmVkZW50aWFscz13aXRoQ3JlZGVudGlhbHM7ZXMuX2Nsb3NlPWNsb3NlO29uVGltZW91dCgpO31FdmVudFNvdXJjZVBvbHlmaWxsLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKEV2ZW50VGFyZ2V0LnByb3RvdHlwZSk7RXZlbnRTb3VyY2VQb2x5ZmlsbC5wcm90b3R5cGUuQ09OTkVDVElORz1DT05ORUNUSU5HO0V2ZW50U291cmNlUG9seWZpbGwucHJvdG90eXBlLk9QRU49T1BFTjtFdmVudFNvdXJjZVBvbHlmaWxsLnByb3RvdHlwZS5DTE9TRUQ9Q0xPU0VEO0V2ZW50U291cmNlUG9seWZpbGwucHJvdG90eXBlLmNsb3NlPWZ1bmN0aW9uKCl7dGhpcy5fY2xvc2UoKTt9O0V2ZW50U291cmNlUG9seWZpbGwuQ09OTkVDVElORz1DT05ORUNUSU5HO0V2ZW50U291cmNlUG9seWZpbGwuT1BFTj1PUEVOO0V2ZW50U291cmNlUG9seWZpbGwuQ0xPU0VEPUNMT1NFRDtFdmVudFNvdXJjZVBvbHlmaWxsLnByb3RvdHlwZS53aXRoQ3JlZGVudGlhbHM9dW5kZWZpbmVkO3ZhciBfZGVmYXVsdD1FdmVudFNvdXJjZVBvbHlmaWxsO2V4cG9ydHMuZGVmYXVsdD1fZGVmYXVsdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV2ZW50LXNvdXJjZS1wb2x5ZmlsbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtleHBvcnRzLl9fZXNNb2R1bGU9dHJ1ZTtleHBvcnRzLmRpc3BsYXlDb250ZW50PWRpc3BsYXlDb250ZW50Oy8vIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byByZW1vdmUgTmV4dC5qcycgbm8tRk9VQyBzdHlsZXMgd29ya2Fyb3VuZCBmb3IgdXNpbmdcbi8vIGBzdHlsZS1sb2FkZXJgIGluIGRldmVsb3BtZW50LiBJdCBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgaHlkcmF0aW9uLCBvciBlbHNlXG4vLyByZW5kZXJpbmcgd29uJ3QgaGF2ZSB0aGUgY29ycmVjdCBjb21wdXRlZCB2YWx1ZXMgaW4gZWZmZWN0cy5cbmZ1bmN0aW9uIGRpc3BsYXlDb250ZW50KGNhbGxiYWNrKXs7KHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHNldFRpbWVvdXQpKGZ1bmN0aW9uKCl7Zm9yKHZhciB4PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW5leHQtaGlkZS1mb3VjXScpLGk9eC5sZW5ndGg7aS0tOyl7eFtpXS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHhbaV0pO31pZihjYWxsYmFjayl7Y2FsbGJhY2soKTt9fSk7fVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Zm91Yy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtleHBvcnRzLl9fZXNNb2R1bGU9dHJ1ZTtleHBvcnRzLmNsb3NlUGluZz1jbG9zZVBpbmc7ZXhwb3J0cy5zZXR1cFBpbmc9c2V0dXBQaW5nO2V4cG9ydHMuY3VycmVudFBhZ2U9dm9pZCAwO3ZhciBfZXZlbnRzb3VyY2U9cmVxdWlyZShcIi4vZXJyb3Itb3ZlcmxheS9ldmVudHNvdXJjZVwiKTsvKiBnbG9iYWwgbG9jYXRpb24gKi9sZXQgZXZ0U291cmNlO2xldCBjdXJyZW50UGFnZTtleHBvcnRzLmN1cnJlbnRQYWdlPWN1cnJlbnRQYWdlO2Z1bmN0aW9uIGNsb3NlUGluZygpe2lmKGV2dFNvdXJjZSlldnRTb3VyY2UuY2xvc2UoKTtldnRTb3VyY2U9bnVsbDt9ZnVuY3Rpb24gc2V0dXBQaW5nKGFzc2V0UHJlZml4LHBhdGhuYW1lRm4scmV0cnkpe2NvbnN0IHBhdGhuYW1lPXBhdGhuYW1lRm4oKTsvLyBNYWtlIHN1cmUgdG8gb25seSBjcmVhdGUgbmV3IEV2ZW50U291cmNlIHJlcXVlc3QgaWYgcGFnZSBoYXMgY2hhbmdlZFxuaWYocGF0aG5hbWU9PT1jdXJyZW50UGFnZSYmIXJldHJ5KXJldHVybjtleHBvcnRzLmN1cnJlbnRQYWdlPWN1cnJlbnRQYWdlPXBhdGhuYW1lOy8vIGNsb3NlIGN1cnJlbnQgRXZlbnRTb3VyY2UgY29ubmVjdGlvblxuY2xvc2VQaW5nKCk7ZXZ0U291cmNlPSgwLF9ldmVudHNvdXJjZS5nZXRFdmVudFNvdXJjZVdyYXBwZXIpKHtwYXRoOmAke2Fzc2V0UHJlZml4fS9fbmV4dC93ZWJwYWNrLWhtcj9wYWdlPSR7Y3VycmVudFBhZ2V9YCx0aW1lb3V0OjUwMDB9KTtldnRTb3VyY2UuYWRkTWVzc2FnZUxpc3RlbmVyKGV2ZW50PT57aWYoZXZlbnQuZGF0YS5pbmRleE9mKCd7Jyk9PT0tMSlyZXR1cm47dHJ5e2NvbnN0IHBheWxvYWQ9SlNPTi5wYXJzZShldmVudC5kYXRhKTtpZihwYXlsb2FkLmludmFsaWQpey8vIFBheWxvYWQgY2FuIGJlIGludmFsaWQgZXZlbiBpZiB0aGUgcGFnZSBkb2VzIG5vdCBleGlzdC5cbi8vIFNvLCB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSBpdCBleGlzdHMgYmVmb3JlIHJlbG9hZGluZy5cbmZldGNoKGxvY2F0aW9uLmhyZWYse2NyZWRlbnRpYWxzOidzYW1lLW9yaWdpbid9KS50aGVuKHBhZ2VSZXM9PntpZihwYWdlUmVzLnN0YXR1cz09PTIwMCl7bG9jYXRpb24ucmVsb2FkKCk7fX0pO319Y2F0Y2goZXJyKXtjb25zb2xlLmVycm9yKCdvbi1kZW1hbmQtZW50cmllcyBmYWlsZWQgdG8gcGFyc2UgcmVzcG9uc2UnLGVycik7fX0pO31cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9uLWRlbWFuZC1lbnRyaWVzLXV0aWxzLmpzLm1hcCIsImZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWplY3QoZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpbmZvLmRvbmUpIHtcbiAgICByZXNvbHZlKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcblxuICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgfVxuXG4gICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hc3luY1RvR2VuZXJhdG9yOyIsImZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQ7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVnZW5lcmF0b3ItcnVudGltZVwiKTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqW2tleV07XG4gIH1cbiAgdHJ5IHtcbiAgICAvLyBJRSA4IGhhcyBhIGJyb2tlbiBPYmplY3QuZGVmaW5lUHJvcGVydHkgdGhhdCBvbmx5IHdvcmtzIG9uIERPTSBvYmplY3RzLlxuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gZGVmaW5lKFxuICAgIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLFxuICAgIHRvU3RyaW5nVGFnU3ltYm9sLFxuICAgIFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICApO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIGRlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGRlZmluZShnZW5GdW4sIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpO1xuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IsIFByb21pc2VJbXBsKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2VJbXBsKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICBpZiAoUHJvbWlzZUltcGwgPT09IHZvaWQgMCkgUHJvbWlzZUltcGwgPSBQcm9taXNlO1xuXG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLFxuICAgICAgUHJvbWlzZUltcGxcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcblxufShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fVxuKSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==