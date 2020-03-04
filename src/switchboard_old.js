var _switchboard = {
  config: {
    url_parameter: "switchboard",
    expiration: "",
    clean_up_list: []
  },
  getParam: function() {
    var paramString = window.location.search.substring(1);
    var paramsArray = paramString.split("&");

    for (var i = 0; i < paramsArray.length; i++) {
      var keyValues = paramsArray[i].split("=");
      if (keyValues[0] === _switchboard.config.url_parameter) {
        this.key = keyValues[1];
      }
    }
  }
};

// Grab the current path to the JS file
_switchboard.script_dir = getRelativePath();

// Determine the path to the current script
function getRelativePath() {
  var scripts = document.getElementsByTagName("script");
  var absolutePath = scripts[scripts.length - 1].src;
  var filename_split = absolutePath.split("/");
  filename_split.pop();
  return filename_split.join("/");
}

// Wait for the DOM to fully load
document.onreadystatechange = function() {
  if (document.readyState === "complete") {
    getJSON("switchboard_config.json", loadConfig);
    getJSON("switchboard_table.json", loadTable);
    _switchboard.getParam();

    // 1. Check if there's a switchboard URL parameter
    if (_switchboard.key) {
      // If there is, run through all the storage items.
      saveSwitchboard(_switchboard.key);
      saveExpiration(_switchboard.config.expiration);
    } else {
      readSwitchboard();
      readExpiration();
    }
  }
};

// Grab switchboard from local storage
function readSwitchboard() {
  _switchboard.key = localStorage.getItem("_switchboard");
}

// Grab expiration date from local storage
function readExpiration() {
  _switchboard.expiration = localStorage.getItem("_switchboard-expiration");
}

// Retrieves a JSON file from the current script directory and run callback
function getJSON(filename, callback) {
  var request = new XMLHttpRequest();
  request.overrideMimeType("application/json");
  request.open("GET", _switchboard.script_dir + "/" + filename, true);
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == "200") {
      callback(request.responseText);
    }
  };
  request.send(null);
}

// Load the config settings
function loadConfig(json_config) {
  var config = JSON.parse(json_config);
  for (var property in config) {
    _switchboard.config[property] = config[property];
  }
}

// Load the number table
function loadTable(json_table) {
  var table = JSON.parse(json_table);
  if (table[_switchboard.key]) {
    _switchboard.table = table;
  }
}

// 2. Check if a switchboard ID is in local storage
// 3. If there's a switchboard ID, check the switchboard_expiration in local storage
// 4. If the switchboard ID is older than now, then delete all local storage data
// 5. Else, look up the data tables
// 6. If the data isn't found, delete all of the local storage data
// 7. Else find all tel links and replace with updated numbers

// To Do:
// Get switched values from switchboard_table.json
function setNumbers(key) {
  if (_switchboard.table[key]) {
    _switchboard.find = _switchboard.table[key].find;
    _switchboard.replace = _switchboard.table[key].replace;
  }
}

// Store expiration in localStorage
function saveExpiration(timestamp) {
  var now = Date.now();
  console.log(now);
  localStorage.setItem("switchboard_expiration", timestamp);
}

// Replace tel:links with matching numbers

// Save the swapped numbers and expiration timestamp to local storage
function saveSwitchboard(key) {
  // CONTINUE AFTER WORKING THROUGH SWITCHBOARD_TABLE LOGIC
  localStorage.setItem("_switchboard", key);
}
