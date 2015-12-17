window.nar.api.TBA = (function( window ){
  var obj = {
    'current_version' : '0.1',
    'team'            : 'frc3128',
    'app_identifier'  : 'team-analysis',
  };

  obj.version = function(){
    return 'Currently running version ' + obj.current_version + ' of TBA API';
  }

  obj.getTeam = function( number, type, callback ) {

    if ( typeof number === "undefined" ) {
      throw "Invalid number argument given.";
    }

    if ( typeof type === "function" ) {
      callback = type;
      type = undefined;
    }

    if ( typeof type === "undefined" ) {
      type = "frc";
    }

    var team_key = type + number;
    http_get( "https://www.thebluealliance.com/api/v2/team/" + team_key, {}, callback );
    
  }

  function http_get(url, options, callback )
  {
    // Allow options to be optional
    if ( typeof options === "function" && options !== undefined ) {
      callback = options;
      options = {};
    }

    if ( typeof options !== "object" ) {
      throw 'Invalid options argument given.';
    }

    var resource = new XMLHttpRequest();
    resource.onreadystatechange = function() {
        if (resource.readyState == 4 && resource.status == 200) {
            var data = JSON.parse(resource.responseText);
            callback( data );
        }
    }

    var indentifier = obj.team + ':' + obj.app_identifier + ':' + obj.current_version;
    if ( url.indexOf( '?') === -1 ) {
      url = url + "?X-TBA-App-Id=" + indentifier;
    } else {
      url = url + "&X-TBA-App-Id=" + indentifier;
    }

    resource.open( "GET", url, true );
    resource.send();
  }

  return obj;
})(window);
