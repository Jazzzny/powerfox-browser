# PowerFox Browser Changelog

## 26.4.0
* Implemented support for Mac OS X 10.3 Panther. Builds are available for PowerPC G3, G4 7400, G4 7450, and G5 processors
* Implemented performance enhancements, correctness improvements, and crash fixes in the IonPower JavaScript JIT
* Implemented OpenGL acceleration on 10.4 builds. Acceleration is available on GeForce FX series or newer and Radeon 9500 series or newer
* Implemented 40+ AltiVec optimizations across the browser for improved performance on PowerPC builds
* Implemented GPU accelerated H264 decoding on 10.6 builds
* Implemented further SSE and AltiVec optimizations in H264, VP8, and VP9 decoders on all builds
* Implemented font sanitizer in 10.4 and 10.5 builds to load previously unsupported fonts and prevent crashes
* Implemented built-in uBlock Origin and h264ify extensions. Thank you to UCyborg, uBlock Origin developers, WindClan, and h264ify developers for their contributions
* Implemented refreshed browser about page
* Implemented KaiOS user agent option in PowerFox settings tab
* Fixed OpenGL acceleration for GeForce FX series GPUs
* Fixed various OpenGL rendering issues on 10.4 and 10.5 builds
* Fixed keyboard shortcuts and other input issues on 10.4 builds
* Fixed WebRTC issues on 10.5 builds
* Fixed video playback issues on 10.4 builds
* Fixed video playback issues on machines that do not support browser OpenGL acceleration
* Fixed WebGL issues on 10.5 and 10.6 Intel builds
* Fixed GitHub website issues through built-in Private Elements extension. Thank you to Private Elements developers for their contributions
* Fixed various browser UI issues
* Updated FFmpeg library to 7.1.5
* Updated NSS security library to 3.90.13 (UXP)
* Synced with UXP@ca36b1f452 for HTML, CSS, JavaScript engine improvements and security fixes
* Addressed security vulnerabilities: CVE-2026-16353, CVE-2026-16408, CVE-2026-16389 and many others that do not have a CVE designation.

## 26.3.0
* Implemented IonPower JavaScript JIT compiler for significant performance improvements on PowerPC builds
* Enabled Skia graphics backend for improved rendering performance on all builds
* Enabled WebRTC support for 10.5+
* Implemented automatic update notifications for all builds
* Implemented AltiVec optimizations in VP9 decoder for PowerPC builds
* Added PowerFox settings tab
* Fixed WebGL support for 10.5 Intel builds
* Fixed Cloudflare Turnstile issues
* Fixed various crashes on 10.6 builds
* Fixed keyboard shortcuts and other input issues on 10.4 builds
* PDF viewer improvements and bug fixes
* Stability improvements on 10.4/10.5 Intel builds
* Updated NSS security library to 3.90.12 (UXP)
* Synced with UXP@ddf5d6256e for HTML, CSS, JavaScript engine improvements and security fixes
* Addressed security vulnerabilities: CVE-2026-12318 (CWE-125), CVE-2026-12322, CVE-2026-12292, CVE-2026-4707, CVE-2026-4690, CVE-2026-4727, CVE-2026-2806, CVE-2026-2758, CVE-2026-2804, CVE-2026-2787, CVE-2026-2757, CVE-2026-2773, CVE-2026-2779, CVE-2026-2775, and several others that do not have a CVE designation.

## 26.2.2
> Available on Mac OS X 10.4 PowerPC, Intel only
* Beta release for Mac OS X 10.4 Tiger
* Fixed instability on G3 systems

## 26.2.1 (Tiger Beta)
> Available on Mac OS X 10.4 PowerPC, Intel only
* Initial beta release for Mac OS X 10.4 Tiger

## 26.2.1
> Available on Mac OS X 10.5 PowerPC, Intel only
* Fixed OpenGL acceleration on ATI X1000 series GPUs
* Fixed black window issue on GeForce FX series GPUs
* Fixed crash on launch on non-QECI GPUs (i.e. Radeon 9200, GeForce 4MX, etc.)
* Fixed blue hue on videos when the browser is running without OpenGL acceleration

## 26.2.0
> Available on Mac OS X 10.5 PowerPC only
* Initial beta release for PowerPC Mac OS X 10.5 Leopard

## 26.1.0
> Available on Mac OS X 10.6 only
* Initial Release
