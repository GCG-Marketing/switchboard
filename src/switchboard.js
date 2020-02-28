// Scenarios
// How to handle removing a swapped tel number when it was originally stored indefinitely
// How to handle purging old url parameters when a new one is used
//// Perhaps concat the url parameter with 'switchboard_' for easy identification

// Wait for the DOM to fully load
document.onreadystatechange = function() {
  if (document.readyState === "complete") {
    getJSON("switchboard_config.json", loadConfig);
  }
};

var _switchboard = {};

// Set config defaults
_switchboard.config = {
  url_parameter: "switchboard",
  local_storage_expiration: "",
  clean_up_list: []
};

// Grab the current path to the JS file
var __scripts = document.getElementsByTagName("script");
_switchboard.script_dir = getRelativePath();

// Determine the path to the current script
function getRelativePath() {
  var scripts = document.getElementsByTagName("script");
  var absolutePath = scripts[scripts.length - 1].src;
  var filename_split = absolutePath.split("/");
  filename_split.pop();
  return filename_split.join("/");
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

// Retrieve the config settings from switchboard_config.json
function retrieveConfig(callback) {
  var request = new XMLHttpRequest();
  request.overrideMimeType("application/json");
  request.open(
    "GET",
    _switchboard.script_dir + "/switchboard_config.json",
    true
  );
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
