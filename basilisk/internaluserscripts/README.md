# Internal Userscripts (Polyfills Only)

This directory contains a minimal, built-in userscript loader used to ship polyfill user scripts with Basilisk. This originally started as a fork of GreaseMonkey, however at this point very little of GreaseMonkey remains.

## How it works
- The XPCOM component `@internaluserscripts.mozdev.org/service;1` observes document creation and, when `browser.internal-userscripts.enabled` is true, injects bundled polyfill scripts into each page.
- Bundled scripts live in `basilisk/internaluserscripts/bundled-scripts/` and are packaged into the app. They are loaded in the page principal and can override missing APIs.
- The only default pref is `browser.internal-userscripts.enabled` (default: true). Toggle to disable all injection.

## Bundled polyfills
- `elementfrompoint-finite-polyfill.user.js`: wraps `Document.elementFromPoint()` and `Document.elementsFromPoint()` to return `null`/`[]` when coordinates are not finite, avoiding page-breaking `TypeError`s from non-finite inputs. It exposes `window.__internalUserscriptsElementFromPointFinitePolyfill = true` for verification.
- `getanimations-polyfill.user.js`: minimal `getAnimations()` shim for `Document`, `Element`, and `CSSPseudoElement` that returns an empty array when native support is unavailable. It exposes `window.__internalUserscriptsGetAnimationsPolyfill = true` for verification.
- `imagedecode-polyfill.user.js`: best-effort `HTMLImageElement.decode()` shim that resolves on load and rejects on error. It exposes `window.__internalUserscriptsImageDecodePolyfill = true` for verification.
- `intl-displaynames-polyfill.user.js`: minimal Intl.DisplayNames shim that validates options and returns the input code when display data is unavailable. It exposes `window.__internalUserscriptsIntlDisplayNamesPolyfill = true` for verification.
- `intl-listformat-polyfill.user.js`: minimal Intl.ListFormat shim supporting `format()` and `formatToParts()` with simple fallback separators. It exposes `window.__internalUserscriptsIntlListFormatPolyfill = true` for verification.
- `intl-relativetimeformat-formattoparts-polyfill.user.js`: adds `formatToParts()` to native Intl.RelativeTimeFormat implementations that lack it. It exposes `window.__internalUserscriptsIntlRelativeTimeFormatFormatToPartsPolyfill = true` for verification.
- `intl-segmenter-polyfill.user.js`: minimal Intl.Segmenter shim supporting `segment()`, `resolvedOptions()`, and `supportedLocalesOf()` with best-effort grapheme/word/sentence segmentation. It exposes `window.__internalUserscriptsIntlSegmenterPolyfill = true` for verification.
- `readablestream-pipethrough-polyfill.user.js`: best-effort ReadableStream `pipeThrough` implementation backed by `pipeTo` or reader/writer pumping. It exposes `window.__internalUserscriptsReadableStreamPipeThroughPolyfill = true` for verification.
- `readablestream-pipeto-polyfill.user.js`: best-effort ReadableStream `pipeTo` implementation using reader/writer pumping. It exposes `window.__internalUserscriptsReadableStreamPipeToPolyfill = true` for verification.
- `textencoderstream-polyfill.user.js`: best-effort TextEncoderStream implementation backed by TransformStream. It exposes `window.__internalUserscriptsTextEncoderStreamPolyfill = true` for verification.
- `textdecoderstream-polyfill.user.js`: best-effort TextDecoderStream implementation backed by TransformStream. It exposes `window.__internalUserscriptsTextDecoderStreamPolyfill = true` for verification.
- `transformstream-polyfill.user.js`: minimal TransformStream polyfill backed by ReadableStream with a lightweight WritableStream shim. It exposes `window.__internalUserscriptsTransformStreamPolyfill = true` for verification.
- `webauthn-microsoft-shim.user.js`: Microsoft-domain WebAuthn capability shim that reports WebAuthn as unsupported by providing rejecting `navigator.credentials.create/get` stubs (when `navigator.credentials` is missing) and a `PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()` fallback that resolves `false`. It exposes `window.__internalUserscriptsWebAuthnMicrosoftShim = true` for verification.

## Adding new polyfills
1. Drop a `*.user.js` file into `bundled-scripts/` with the appropriate header.
2. List it in `moz.build` under `FINAL_TARGET_FILES['internal-userscripts']`.
3. The loader will inject it automatically when enabled.
