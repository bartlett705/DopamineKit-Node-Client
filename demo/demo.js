const dopamine = require('../Dopamine');

// declare reward and neutral feedback feedback Functions

function rewardFunction1() { console.log("WOOT!"); }

function rewardFunction2() { console.log("AWESOME!"); }

function neutralFunction1() { console.log("Received"); }

// register feedback functions with dopamine

// dopamine.pairReinforcement({action: "testAction", rewardFunctions:["reward1", "reward2"], feedbackFunctions:["neutral1"]});

// configure dopamine
dopamine.config("570ffc491b4c6e9869482fbf", "20af24a85fa00938a5247709fed395c31c89b142", "d388c7074d8a283bff1f01eb932c1c9e6bec3b10", false, "testing");

dopamine.init();

// Run a test and store the result
var s = dopamine.reinforce("taskCompleted", "userIdentityValue");

console.log('Result: ', s);
