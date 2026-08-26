/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

/* Custom PowerFox prefpanel (C)2016 Cameron Kaiser */

Components.utils.import("resource://gre/modules/AppConstants.jsm");
Components.utils.import("resource://gre/modules/Services.jsm");

const GLOBAL_UA_PREF = "network.http.useragent.global_override";

var gPowerFoxPane = {

  init: function ()
  {
    function setEventListener(aId, aEventType, aCallback)
    {
      document.getElementById(aId)
              .addEventListener(aEventType, aCallback.bind(gPowerFoxPane));
    }

    setEventListener("siteSpecificUAs", "command", gPowerFoxPane.showSSUAs);
    setEventListener("autoReaderView", "command", gPowerFoxPane.showAutoRV);
  },

  showSSUAs: function ()
  {
    let bundle = document.getElementById("powerFoxBundle");
    let params = { blockVisible   : true,
                   sessionVisible : true,
                   allowVisible   : true,
                   prefilledHost  : "",
                   type           : "ssua",
                   windowTitle    : bundle.getString("TFFsiteSpecificUAs.title"),
                   introText      : bundle.getString("TFFsiteSpecificUAs.prompt") };
    gSubDialog.open("chrome://browser/content/preferences/powerfox-ssua.xul",
                    null, params);
  },

  showAutoRV: function ()
  {
    let bundle = document.getElementById("powerFoxBundle");
    let params = { blockVisible   : true,
                   sessionVisible : true,
                   allowVisible   : true,
                   prefilledHost  : "",
                   type           : "autorv",
                   windowTitle    : bundle.getString("TFFautoReaderView.title"),
                   introText      : bundle.getString("TFFautoReaderView.prompt") };
    gSubDialog.open("chrome://browser/content/preferences/powerfox-autorv.xul",
                    null, params);
  },


  // We have to invert the sense for the pdfjs.disabled pref, since true equals DISabled.

  readPDFjs: function ()
  {
    var pref = document.getElementById("pdfjs.disabled");
    return (!(pref.value));
  },
  writePDFjs: function ()
  {
    var nupref = document.getElementById("pdfJsCheckbox");
    return (!(nupref.checked));
  },

  // Find and set the appropriate UA string based on the UA template.
  // Keep in sync with powerfox-ssua.xul and powerfox.xul
  validUA : {
      "fx" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:52.0) Gecko/20100101 Firefox/52.0",
      "fx60" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:60.0) Gecko/20100101 Firefox/60.0",
      "fx68" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:68.0) Gecko/20100101 Firefox/68.0",
      "fx78" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:78.0) Gecko/20100101 Firefox/78.0",
      "fx91" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0",
      "fx102" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:102.0) Gecko/20100101 Firefox/102.0",
      "fx115" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:115.0) Gecko/20100101 Firefox/115.0",
      "fx128" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:128.0) Gecko/20100101 Firefox/128.0",
      "ipad" : "Mozilla/5.0 (iPad; CPU OS 18_7_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1",
      "iphone" : "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1",
      "kaios4" : "Mozilla/5.0 (Mobile; rv:123.0) Gecko/123.0 Firefox/123.0 KAIOS/4.0"
  },
  readUA: function ()
  {
    var pref = document.getElementById("tenfourfox.ua.template");
    if (!pref) return "";

    // Synchronize the pref on entry in case it's stale.
    pref = pref.value;
    if (this.validUA[pref]) {
        Services.prefs.setCharPref(GLOBAL_UA_PREF, this.validUA[pref]);
        return pref;
    }
    return "";
  },
  writeUA : function()
  {
    var nupref = document.getElementById("uaBox").value;
    if (this.validUA[nupref]) {
        Services.prefs.setCharPref(GLOBAL_UA_PREF, this.validUA[nupref]);
        return nupref;
    }
    if (Services.prefs.prefHasUserValue(GLOBAL_UA_PREF)) {
      Services.prefs.clearUserPref(GLOBAL_UA_PREF);
    }
    return "";
  },
};
