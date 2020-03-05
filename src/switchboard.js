// Switchboard object
var _switchboard = {
  config: {
    param: "switchboard",
    expiration: 2592000000
  },
  table: {
    gcg: {
      find: "858-555-1234",
      replace: "817-555-9876",
      oldDisplay: "858-555-1234",
      newDisplay: "817-555-9876"
    },
    fbcam: {
      find: "858-555-1234",
      replace: "123-555-9876",
      oldDisplay: "858-555-1234",
      newDisplay: "123-555-9876"
    }
  },
  key: null,
  expiration: null,
  setExpiration: function() {
    this.expiration = Date.now() + this.config.expiration;
    this.saveLocalExpiration();
  },
  readLocalStorage: function() {
    this.key = localStorage.getItem("_switchboard");
    this.expiration = parseInt(localStorage.getItem("_switchboard-expiration"));
  },
  saveLocalKey: function() {
    localStorage.setItem("_switchboard", this.key);
  },
  saveLocalExpiration: function() {
    localStorage.setItem("_switchboard-expiration", this.expiration);
  },
  deleteLocalStorage: function() {
    localStorage.removeItem("_switchboard");
    localStorage.removeItem("_switchboard-expiration");
  },
  getParam: function() {
    var paramString = window.location.search.substring(1);
    var paramsArray = paramString.split("&");

    for (var i = 0; i < paramsArray.length; i++) {
      var keyValues = paramsArray[i].split("=");
      if (keyValues[0] === this.config.param) {
        console.log("Ran");
        this.key = keyValues[1];
        this.saveLocalKey();
        this.setExpiration();
      }
    }
  },
  swap: function() {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
      if (
        _switchboard.table.hasOwnProperty(_switchboard.key) &&
        links[i].href === "tel:" + _switchboard.table[_switchboard.key].find
      ) {
        links[i].href = "tel:" + _switchboard.table[_switchboard.key].replace;
        links[i].innerHTML = links[i].innerHTML.replace(
          _switchboard.table[_switchboard.key].oldDisplay,
          _switchboard.table[_switchboard.key].newDisplay
        );
      }
    }
  }
};

// DOM Loaded

document.onreadystatechange = function() {
  if (document.readyState === "complete") {
    if (
      localStorage.getItem("_switchboard-expiration") &&
      localStorage.getItem("_switchboard-expiration") < Date.now()
    ) {
      _switchboard.deleteLocalStorage();
    }
    _switchboard.getParam();
    if (_switchboard.key) {
      // Loop through tel items
    } else {
      // Check local storage
      _switchboard.readLocalStorage();
    }
    _switchboard.swap();
  }
};
