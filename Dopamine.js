function Dopamine() 
{
  var self = this;

  self.credentials = {
    appID: "",
    secret: {
      production: "",
      development: "",
      inProduction: false
    },
    versionID: "",
  };

  self.config = function(appID, productionSecret, developmentSecret, inProduction, versionID) {
    self.credentials.appID = appID;
    self.credentials.secret.production = productionSecret;
    self.credentials.secret.development = developmentSecret;
    self.credentials.secret.inProduction = inProduction;
    self.credentials.versionID = versionID;
  };

  self.reinforce = function(actionID, identity, metaData)
  {
    var response = sendCall(buildPayload('reinforce', actionID, identity, metaData), 'reinforce');
    
    if(response.status === 200)
    {
      // Good status
      return response.reinforcementDecision;
    }
    else{
      // Bad status
      return response.error;
    }

  }

  self.track = function(actionID, identity, metaData)
  {
    var response = sendCall(buildPayload('track', actionID, identity, metaData), 'track');
  }

  function buildPayload(type, actionID, identity, metaData)
  {

    var payload = {
      'appID' : self.credentials.appID,
      'secret' : (self.credentials.secret.inProduction ? self.credentials.secret.production : self.credentials.secret.development),
      'versionID': self.credentials.versionID,
      'primaryIdentity':identity,
      'UTC': Date.now(),
      'localTime': Date.now(),
      'actionID': actionID,
      'clientOS':'Node',
      'clientOSVersion': '1',
      'clientSDKVersion' : '2.0.0',
      'metaData' : metaData
    };

    return payload;
  }

  function sendCall(data, type)
  {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", 'https://staging-api.usedopamine.com/v3/app/' + type + '/', false);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(data));

    // return response string as JSON object
    return JSON.parse(xhttp.responseText);
  }


  return self;
}