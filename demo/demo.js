var dopamine = require('/usr/local/lib/node_modules/dopamine');

//configure your app
dopamine.config("556350ce84a8d6f40f6865ef", "bc58729809fcde0bd8437b7ba914e62364f458a1", "ca2ba2184c7b40c629054ef4f53480b48278d9ab", true, "27529639401473105556350ce84a8d6f40f6865ef", "test001");

//pair reinforcement (both neutral and rewarding) to an action 
dopamine.pairReinforcement({action: "testAction", rewardFunctions:["reward1", "reward2"], feedbackFunctions:["neutral1"]});

//initialize your app with the Dopamine API (remember to do this with your development key first: dopamine.config(.., .., .., false, .., ..);)
dopamine.init();


//reward functions:
function rewardFunction1()
{
	console.log("WOOT!");
}

function rewardFunction2()
{
	console.log("BOMB!");
}

function neutralFunction1()
{
	console.log("Received");
}


//reinforce the 'testAction' action for userID 1138:
switch(String(dopamine.reinforce("testAction", [{userID:'1138'}], {data1: "woohoo"})))
{
	case 'reward1':
		rewardFunction1();
		break;
	case 'reward2':
		rewardFunction2();
		break;
	case 'neutral1':
		neutralFunction1();
		break;
}

//track an event
// dopamine.track("someTrackedEvent", [{userID:'443'}]);