// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// ==UserScript==
// @name         Intl.RelativeTimeFormat formatToParts Polyfill
// @namespace    internal-userscripts
// @description  Adds formatToParts() to native Intl.RelativeTimeFormat implementations that lack it.
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
(function () {
  "use strict";

  if (
    typeof Intl !== "object" ||
    typeof Intl.RelativeTimeFormat !== "function" ||
    typeof Intl.RelativeTimeFormat.prototype.formatToParts === "function"
  ) {
    return;
  }

  function formatToParts(value, unit) {
    var number = Number(value);
    var formatted = this.format(number, unit);
    var canonicalUnit = String(unit).replace(/s$/, "");
    var resolved = this.resolvedOptions();
    var numberOptions = {
      maximumFractionDigits: 3,
    };

    if (resolved.numberingSystem) {
      numberOptions.numberingSystem = resolved.numberingSystem;
    }

    var numberFormat = new Intl.NumberFormat(resolved.locale, numberOptions);
    var numberParts;
    if (typeof numberFormat.formatToParts === "function") {
      numberParts = numberFormat.formatToParts(Math.abs(number));
    } else {
      numberParts = [
        { type: "integer", value: numberFormat.format(Math.abs(number)) },
      ];
    }

    var numberText = numberParts
      .map(function (part) {
        return part.value;
      })
      .join("");
    var numberIndex = formatted.indexOf(numberText);

    // numeric: "auto" may produce a word such as "yesterday" with no number.
    if (numberIndex === -1) {
      return [{ type: "literal", value: formatted }];
    }

    var parts = [];
    if (numberIndex > 0) {
      parts.push({ type: "literal", value: formatted.slice(0, numberIndex) });
    }
    numberParts.forEach(function (part) {
      parts.push({ type: part.type, value: part.value, unit: canonicalUnit });
    });
    if (numberIndex + numberText.length < formatted.length) {
      parts.push({
        type: "literal",
        value: formatted.slice(numberIndex + numberText.length),
      });
    }
    return parts;
  }

  Object.defineProperty(
    Intl.RelativeTimeFormat.prototype,
    "formatToParts",
    {
      configurable: true,
      writable: true,
      value: formatToParts,
    },
  );

  window.__internalUserscriptsIntlRelativeTimeFormatFormatToPartsPolyfill = true;
})();
