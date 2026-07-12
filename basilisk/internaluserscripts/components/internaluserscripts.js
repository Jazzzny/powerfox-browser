/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

if (typeof Cc === "undefined") {
  var Cc = Components.classes;
}
if (typeof Ci === "undefined") {
  var Ci = Components.interfaces;
}
if (typeof Cu === "undefined") {
  var Cu = Components.utils;
}

const { Services } = Cu.import("resource://gre/modules/Services.jsm", {});
const { XPCOMUtils } = Cu.import("resource://gre/modules/XPCOMUtils.jsm", {});

const PREF_ENABLED = "browser.internal-userscripts.enabled";

function InternalUserscriptsService() {
  this.wrappedJSObject = this;
}

InternalUserscriptsService.prototype = {
  classDescription: "Internal Userscripts Loader",
  classID: Components.ID("{d8b4bd27-b458-4417-8dfe-3b80bb6375bc}"),
  contractID: "@internaluserscripts.mozdev.org/service;1",

  QueryInterface: XPCOMUtils.generateQI([Ci.nsIObserver]),

  observe: function (subject, topic, data) {
    if (topic === "profile-after-change") {
      this._startup();
    } else if (topic === "quit-application") {
      this._shutdown();
    } else if (topic === "nsPref:changed" && data === PREF_ENABLED) {
      this._updateObserverState();
    } else if (topic === "document-element-inserted") {
      let win = subject && subject.defaultView;
      if (!win) {
        return;
      }
      let self = this;
      Services.tm.mainThread.dispatch(function () {
        self._inject(win);
      }, Ci.nsIThread.DISPATCH_NORMAL);
    }
  },

  _startup: function () {
    Services.obs.addObserver(this, "quit-application", false);
    Services.prefs.addObserver(PREF_ENABLED, this, false);
    this._updateObserverState();
  },

  _shutdown: function () {
    try {
      Services.obs.removeObserver(this, "document-element-inserted");
    } catch (e) {}
    try {
      Services.obs.removeObserver(this, "quit-application");
    } catch (e) {}
    try {
      Services.prefs.removeObserver(PREF_ENABLED, this);
    } catch (e) {}
    this._observingDocuments = false;
  },

  _updateObserverState: function () {
    let enabled = true;
    try {
      enabled = Services.prefs.getBoolPref(PREF_ENABLED, true);
    } catch (e) {}

    if (enabled && !this._observingDocuments) {
      Services.obs.addObserver(this, "document-element-inserted", false);
      this._observingDocuments = true;
    } else if (!enabled && this._observingDocuments) {
      try {
        Services.obs.removeObserver(this, "document-element-inserted");
      } catch (e) {}
      this._observingDocuments = false;
    }
  },

  _inject: function (win) {
    if (!Services.prefs.getBoolPref(PREF_ENABLED, true)) {
      return;
    }
    if (!win) {
      return;
    }
    try {
      let doc = win.document;
      let uri = doc && doc.documentURIObject;
      if (uri && (uri.schemeIs("chrome") || uri.schemeIs("resource"))) {
        return;
      }
    } catch (e) {}
    let contentWin = win.wrappedJSObject || win;
    let logPolyfill = function (name, source) {
      try {
        if (
          contentWin.console &&
          typeof contentWin.console.info === "function"
        ) {
          let suffix = source ? " (" + source + ")" : "";
          contentWin.console.info(
            "[internal userscripts] Loaded polyfill script: " + name + suffix,
          );
        }
      } catch (e) {}
    };

    try {
      Services.scriptloader.loadSubScript(
        "chrome://internaluserscripts/content/bundled-scripts/intl-displaynames-polyfill.user.js",
        contentWin,
      );
      if (contentWin.__internalUserscriptsIntlDisplayNamesPolyfill) {
        logPolyfill("Intl.DisplayNames", "bundled");
      }
    } catch (e) {
      // ignore
    }

    try {
      Services.scriptloader.loadSubScript(
        "chrome://internaluserscripts/content/bundled-scripts/intl-listformat-polyfill.user.js",
        contentWin,
      );
      if (contentWin.__internalUserscriptsIntlListFormatPolyfill) {
        logPolyfill("Intl.ListFormat", "bundled");
      }
    } catch (e) {
      // ignore
    }

    try {
      Services.scriptloader.loadSubScript(
        "chrome://internaluserscripts/content/bundled-scripts/intl-relativetimeformat-formattoparts-polyfill.user.js",
        contentWin,
      );
      if (
        contentWin.__internalUserscriptsIntlRelativeTimeFormatFormatToPartsPolyfill
      ) {
        logPolyfill("Intl.RelativeTimeFormat.formatToParts", "bundled");
      }
    } catch (e) {
      // ignore
    }

    try {
      Services.scriptloader.loadSubScript(
        "chrome://internaluserscripts/content/bundled-scripts/intl-segmenter-polyfill.user.js",
        contentWin,
      );
      if (contentWin.__internalUserscriptsIntlSegmenterPolyfill) {
        logPolyfill("Intl.Segmenter", "bundled");
      }
    } catch (e) {
      // ignore
    }

    try {
      Services.scriptloader.loadSubScript(
        "chrome://internaluserscripts/content/bundled-scripts/webauthn-microsoft-shim.user.js",
        contentWin,
      );
      if (contentWin.__internalUserscriptsWebAuthnMicrosoftShim) {
        logPolyfill("WebAuthn Microsoft unsupported shim", "bundled");
      }
    } catch (e) {
      // ignore
    }

    try {
      Services.scriptloader.loadSubScript(
        "chrome://internaluserscripts/content/bundled-scripts/elementfrompoint-finite-polyfill.user.js",
        contentWin,
      );
      if (contentWin.__internalUserscriptsElementFromPointFinitePolyfill) {
        logPolyfill("Document.elementFromPoint finite-args shim", "bundled");
      }
    } catch (e) {
      // ignore
    }

    try {
      Services.scriptloader.loadSubScript(
        "chrome://internaluserscripts/content/bundled-scripts/getanimations-polyfill.user.js",
        contentWin,
      );
      if (contentWin.__internalUserscriptsGetAnimationsPolyfill) {
        logPolyfill("getAnimations", "bundled");
      }
    } catch (e) {
      // ignore
    }

    try {
      Services.scriptloader.loadSubScript(
        "chrome://internaluserscripts/content/bundled-scripts/imagedecode-polyfill.user.js",
        contentWin,
      );
      if (contentWin.__internalUserscriptsImageDecodePolyfill) {
        logPolyfill("HTMLImageElement.decode", "bundled");
      }
    } catch (e) {
      // ignore
    }

    try {
      Services.scriptloader.loadSubScript(
        "chrome://internaluserscripts/content/bundled-scripts/transformstream-polyfill.user.js",
        contentWin,
      );
      if (contentWin.__internalUserscriptsTransformStreamPolyfill) {
        logPolyfill("TransformStream", "bundled");
      }
    } catch (e) {
      // ignore
    }

    try {
      Services.scriptloader.loadSubScript(
        "chrome://internaluserscripts/content/bundled-scripts/textencoderstream-polyfill.user.js",
        contentWin,
      );
      if (contentWin.__internalUserscriptsTextEncoderStreamPolyfill) {
        logPolyfill("TextEncoderStream", "bundled");
      }
    } catch (e) {
      // ignore
    }

    try {
      Services.scriptloader.loadSubScript(
        "chrome://internaluserscripts/content/bundled-scripts/textdecoderstream-polyfill.user.js",
        contentWin,
      );
      if (contentWin.__internalUserscriptsTextDecoderStreamPolyfill) {
        logPolyfill("TextDecoderStream", "bundled");
      }
    } catch (e) {
      // ignore
    }

    try {
      Services.scriptloader.loadSubScript(
        "chrome://internaluserscripts/content/bundled-scripts/readablestream-pipeto-polyfill.user.js",
        contentWin,
      );
      if (contentWin.__internalUserscriptsReadableStreamPipeToPolyfill) {
        logPolyfill("ReadableStream.pipeTo", "bundled");
      }
    } catch (e) {
      // ignore
    }

    try {
      Services.scriptloader.loadSubScript(
        "chrome://internaluserscripts/content/bundled-scripts/readablestream-pipethrough-polyfill.user.js",
        contentWin,
      );
      if (contentWin.__internalUserscriptsReadableStreamPipeThroughPolyfill) {
        logPolyfill("ReadableStream.pipeThrough", "bundled");
      }
    } catch (e) {
      // ignore
    }
  },
};

var NSGetFactory = XPCOMUtils.generateNSGetFactory([
  InternalUserscriptsService,
]);
