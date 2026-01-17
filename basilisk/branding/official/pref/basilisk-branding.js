/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#filter substitution
#filter emptyLines

// Set defines to construct URLs
#define BRANDING_BASEURL powerfox.jazzzny.me
#define BRANDING_SITEURL @BRANDING_BASEURL@

// Shared Branding Preferences
// XXX: These should REALLY go back to application preferences
#include ../../shared/preferences.inc

// Branding Specific Preferences
pref("startup.homepage_override_url", "");
pref("startup.homepage_welcome_url", "powerfox.jazzzny.me/welcome.html");
pref("startup.homepage_welcome_url.additional", "");

// Version release notes
pref("app.releaseNotesURL", "about:blank");

// Vendor home page
pref("app.vendorURL", "powerfox.jazzzny.me");

pref("app.update.url", "");

// URL user can browse to manually if for some reason all update installation
// attempts fail.
pref("app.update.url.manual", "about:");
// A default value for the "More information about this update" link
// supplied in the "An update is available" page of the update wizard.
pref("app.update.url.details", "about:");

// Switch Application Updates off for unofficial branding
pref("app.update.enabled", false);

// Shared User Agent Overrides
#include ../../shared/uaoverrides.inc
