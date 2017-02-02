var sha1 = require('sha1');
var request = require('sync-request');

function Dopamine()
{

  var self = this;

  self.credentials = {
    appID: "",
    key: {
      production: "",
      development: "",
      inProduction: false
    },
    token: "",
    versionID: ""
  };

  self.rewardFunctions = [];
  self.feedbackFunctions = [];
  self.build = "";
  self.actionPairings = [];
  self.actionNames = [];

  self.config = function(appID, productionKey, developmentKey, inProduction, token, versionID) {
    self.credentials.appID = appID;
    self.credentials.token = token;
    self.credentials.versionID = versionID;
    self.credentials.key.production = productionKey;
    self.credentials.key.development = developmentKey;
    self.credentials.key.inProduction = inProduction;
  };

  self.pairReinforcement = function (pairing)
  {
    if(self.actionNames.indexOf(pairing.action) === -1)
    {
      self.actionNames.push(pairing.action);
      var newActionPairing = {
        actionName: pairing.action,
        reinforcers:[]
      };
      for(var i=0; i<pairing.rewardFunctions.length; i++)
      {
        if(self.rewardFunctions.indexOf(pairing.rewardFunctions[i]) === -1)
        {
          self.rewardFunctions.push(pairing.rewardFunctions[i]);
          newActionPairing.reinforcers.push({
            functionName: pairing.rewardFunctions[i],
            type:"Reward",
            constraint:[],
            objective:[]
          });
        }
      }
      for(var i=0; i<pairing.feedbackFunctions.length; i++)
      {
        if(self.feedbackFunctions.indexOf(pairing.feedbackFunctions[i]) === -1)
        {
          self.feedbackFunctions.push(pairing.feedbackFunctions[i]);
          newActionPairing.reinforcers.push({
            functionName: pairing.feedbackFunctions[i],
            type:"Feedback",
            constraint:[],
            objective:[]
          });
        }
      }
      self.actionPairings.push(newActionPairing);
    }
  }

  self.init = function()
  {
    console.log('init returns', sendCall(buildPayload('init', null, [{user:'INIT'}], null), 'init'));
  }

  self.reinforce = function(eventName, identity, metaData)
  {
    var response = sendCall(buildPayload('reinforce', eventName, identity, metaData), 'reinforce');
    if(response.status === 200)
    {
      return response.reinforcementFunction.function;
    }
    else {
      console.log(response);
      throw new Error('DOPAMINE had trouble talking to our server');
    }
  }

  self.track = function(eventName, identity, metaData)
  {
    var response = sendCall(buildPayload('track', eventName, identity, metaData), 'track');
  }

  function buildPayload(type, event, identity, metaData)
  {

    var payload = {
      'token' : self.credentials.token,
      'versionID': self.credentials.versionID,
      'build': sha1(JSON.stringify(self.actionPairings)),
      'identity':JSON.stringify(identity),
      'UTC': Date.now(),
      'localTime': Date.now(),
      'ClientOS':'Node',
      'ClientOSVersion': String(process.version),
      'ClientAPIVersion' : '1.0.0'
    };

    if(type === 'init')
    {
        payload.feedbackFunctions = JSON.stringify(self.feedbackFunctions);
        payload.rewardFunctions = JSON.stringify(self.rewardFunctions);
        payload.actionPairings = JSON.stringify(self.actionPairings);
    }
    else
    {
        payload.eventName = event;
        if(metaData !== null)
        {
          payload.metaData = metaData;
        }
    }

    if(self.credentials.key.inProduction)
    {
      payload.key = self.credentials.key.production;
    }
    else
    {
      payload.key = self.credentials.key.development;
    }
    return payload;
  }

  function sendCall(data, type)
  {
    var req = request('POST', 'https://api.usedopamine.com/v3/app/' + '/' + type + '/', {json:data});
    return JSON.parse(String(req.body));
  }
}


module.exports = exports = new Dopamine();
