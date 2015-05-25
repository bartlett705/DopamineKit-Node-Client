// // Require
// // require the dopamine package

var dopamine = require('/usr/local/lib/node_modules/dopamine');

// // Configure:
// // configure your app with the API

dopamine.config(appID, productionKey, developmentKey, inProductionFlag, appToken, versionID);

// // Pair your actions to reinforcement functions
// // So the API knows what to reinforce and how to reinforce it
// // Call this once for each action you want to reinforce. Actions and Reinforcement Functions have a many-to-many mapping

dopamine.pairReinforcement({action: "testAction", rewardFunctions:["reward1", "reward2"], feedbackFunctions:["neutral1"]});

// // Initialize
// // initialize your app with the Dopamine API 
// // *** remember to do this with your inProductionFlag set to false EACH TIME you make any changes to anything happening in dopamine.pairReinforcement( ) ***

dopamine.init();


// // Your Reinforcement Functions:
// // These are what you'll actually use to reinforce your users! Make them whatever and however you want so long as you're consistent with naming (ie: the name you give the functions matches the name you submit via dopamine.pairReinforcement( ) and the name you put below in your switch cases). Check out http://blog.usedopamine.com or email me at ramsay@usedopamine.com for advice and consulting on how to get the most out of your Reward and Feedback Functions

// function rewardFunction1()
// {
// 	console.log("WOOT!");
// }

// function rewardFunction2()
// {
// 	console.log("AWESOME!");
// }

// function neutralFunction1()
// {
// 	console.log("Received");
// }


// // Reinforce: 
// // reinfore the 'testAction' action for userID 1138:

// switch(String(dopamine.reinforce("testAction", [{userID:'1138'}], {metaDataKeyName: "metaDataValue"})))
// {
// 	case 'reward1':
// 		rewardFunction1();
// 		break;
// 	case 'reward2':
// 		rewardFunction2();
// 		break;
// 	case 'neutral1':
// 		neutralFunction1();
// 		break;
// }


// // Track:
// // track an event so Dopamine can better learn how reinforcement affects your users' behavior

// dopamine.track("someTrackedEvent", [{userID:'1138'}], {metaDataKeyName: "metaDataValue"});