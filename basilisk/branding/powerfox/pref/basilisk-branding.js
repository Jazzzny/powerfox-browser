/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#filter substitution
#filter emptyLines

// Set defines to construct URLs
#define BRANDING_BASEURL powerfox.org
#define BRANDING_SITEURL @BRANDING_BASEURL@
#define POWERFOX_UPDATER_BASEURL https://powerfox-updater.jazzzny.me

// Shared Branding Preferences
// XXX: These should REALLY go back to application preferences
#include ../../shared/preferences.inc

// Branding Specific Preferences
pref("startup.homepage_override_url", "");
pref("startup.homepage_welcome_url", "https://powerfox.org/welcome.html");
pref("startup.homepage_welcome_url.additional", "");

// Version release notes
pref("app.releaseNotesURL", "@POWERFOX_UPDATER_BASEURL@/releases/latest");

// Vendor home page
pref("app.vendorURL", "https://powerfox.org");

pref("app.update.url", "@POWERFOX_UPDATER_BASEURL@/update/6/%PRODUCT%/%VERSION%/%BUILD_ID%/%BUILD_TARGET%/%LOCALE%/%CHANNEL%/%OS_VERSION%/%DISTRIBUTION%/%DISTRIBUTION_VERSION%/update.xml");

// URL user can browse to manually if for some reason all update installation
// attempts fail.
pref("app.update.url.manual", "@POWERFOX_UPDATER_BASEURL@/");
// A default value for the "More information about this update" link
// supplied in the "An update is available" page of the update wizard.
pref("app.update.url.details", "@POWERFOX_UPDATER_BASEURL@/releases/%VERSION%");

// PowerFox updates are presented as manual downloads from GitHub releases.
pref("app.update.enabled", true);
pref("app.update.auto", false);
pref("app.update.staging.enabled", false);

// Shared User Agent Overrides
#include ../../shared/uaoverrides.inc
