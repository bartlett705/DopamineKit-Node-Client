Dopamine
=========

Make your node.js app habit-forming using the Dopamine API.

Get your free API key at http://dev.usedopamine.com/signup.php.
Learn more at http://demo.usedopamine.com.


## Installation

  `npm install dopamine`

## Usage

  This npm module connects your node.js app with the Dopamine API. Use it in conjunction with our step-by-step integration dashboard at http://dev.usedopamine.com.

  We've included a `demo/demo.js` file to show you how to get started quickly. You can copypasta that code directly into your app to get up and running immediately.

  This npm module lets your app do 5 critical actions with the Dopamine API:

  1. Configure your app
  2. Pair user actions to potential reinforcements
  2. Initialize your app with the API
  3. Send tracking calls about app behavior / user behavior to the API for analysis
  4. Reinforce your users with the API.

Here's a brief word about each:

####Configure your API calls:
First, `require` the dopamine module:

`var dopamine = require('dopamine');`

Your app sends some authentication and versioning info with each API call. We provide a really simple way to configure that info:

`dopamine.config(appID, productionKey, developmentKey, inProductionFlag, appToken, versionID);`

Where:
* `appID (string)`: get this from your Developer Dashboard at http://dev.usedopamine.com
* `productionKey / developmentKey (string)` : get this from your Developer Dashboard. You'll receive your productionKey as you progress through the integration process. While in development you can just pass `null` in here.
* `inProductionFlag (boolean)`: when you're happy with how you're integrating Dopamine and ready to launch set this argument to `true`. This will activate optimized reinforcement and start your billing cycle. While set to `false` your app will receive dummy reinforcement, new users will not be registered with our system, and no billing occurs.
* `appToken (string)`: get this from your Developer Dashboard. It's intimately linked with your billing profile. Keep it secret!
* `versionID (string)`: this is a unique identifier that you choose that marks this implementation as unique in our system. This could be something like 'summer2015Implementation' or 'ClinicalTrial4' or 'version3_real_this_time_no_Im_serious'. Your `versionID` is what we use to keep track of what users are exposed to what reinforcement and how to best optimize that.


####Pair user actions to potential reinforcements

Dopamine helps your app determine the best ways and times to reinforce users. This hacks their brains' habit-forming circuitry and leads them to transform the actions you reinforce into long-term habits.

You decide how your app will potentially reward users and how it will potentially provide them with neutral feedback. We help you understand when to do each of these unique to each user.

To do this, we need to know what actions in your app you want to reinforce and what possible reinforcement (both positive and neutral) that you want to give them. Use the `dopamine.pairReinforcement( )` method to tell us this information.

For example, in our `demo/demo.js` file we have 2 "Reward Functions" and one "Neutral Feedback Function". These 3 functions are collectively called "Reinforcement Functions":


`function rewardFunction1()
{ console.log("WOOT!"); }`

`function rewardFunction2()
{ console.log("AWESOME!"); }`

`function neutralFunction1()
{ console.log("Received"); }`


These are cartoon examples. Some of apps that use Dopamine have made Reward Functions that display encouraging messages to the user. Others have included in-app enhancements that get the user excited. Users respond well to rewards that appeal to their sense of community, their desire for personal gain and accomplishment, and their drive for self-fulfillment. For more information about what makes a great reward and great feedback, check out our blog at http://blog.usedopamine.com.

Here's how we pair these functions to an action we want to reinforce called 'testAction':

`dopamine.pairReinforcement({action: "testAction", rewardFunctions:["reward1", "reward2"], feedbackFunctions:["neutral1"]});`

You can reinforce as many actions as you want: just call `dopamine.pairReinforcement( )` for each action. Actions and Reinforcement Functions have a many-to-many mapping (you can recycle them).


####Initialize your app with the API

Use the `dopamine.init( )` method to initialize your freshly-configured app with the API. Make sure you've used the `dopamine.config( )` and `dopamine.pairReinforcement( )` methods first.

When you initialize your app using your `development` API key, your config and reinforcement info are sent to the API. We make sure that everything looks kosher, update our system to match how you've told use you're going to use reinforcement (via your pairReinforcement( ) arguments), and return a response. 

You must call `dopamine.init( )` at least once using your `development` API key each time you implement a new `versionID` or a new set of action->reinforcement pairings (as specified using `dopamine.pairReinforcement( )`). Once you're in production mode (ie: your `dopamine.config( )` `inProductionFlag` set to `true`), you don't need to call `dopamine.init( )` unless you change how you're using the API.


Want to change which function you use to reinforce an action? Which function you use to provide neutral feedback? Which actions to reinforce? Totally cool! Just call `dopamine.init( )` again with your `dopamine.config( )` `inProductionFlag` set to `false` so we know you're still in development mode.


####Send tracking calls about app behavior / user behavior to the API for analysis

The Dopamine API learns how to reinforce your users faster when you use it to track their behavior. Use it just like you would MixPanel or any Google Analytics. Drop this code anywhere in your app where a user does something worth tracking:

`dopamine.track(eventName, userIdentity, metaData);`

Where:
* `eventName (string)`: A unique name for this event. Does NOT need to be pre-specified in `pairReinforcement( )`.
* `userIdentity ( [ { id_type: uniqueID } ] )` : A unique identifier for this user. 
* `metaData (object)` : metadata about the event passed in as a key-value object.

The `userIdentity` should be formatted as an array with at least one object in it. Each object must have a unique id_type as its key and a uniqueID value unique to that user. There are no restrictions on what type of id_type you can use, just make sure it's a string. For example, some apps use things like `{"facebookID": "1236628810872"}`, others use `{"userNumber": "1138"}`, and still more use things like `{"DEVICE_ID": "8483952fbb761c43"}` and `{"email":"user@host.com"}`. Whatever you use, just put at least one user identity object in the array.


####Reinforce your users with the API.

When you call the API we determine whether or not a reward or neutral feedback would be the best way to reinforce this particular user. The API response will tell your app which Reinforcement Function to run. Sometimes it will return the name of a Reward Function, sometimes the name of a Feedback Function. Every time it will be optimized to exactly what that particular user needs. 

Use the `dopamine.reinforce( )` method in a switch statement as shown in `demo/demo.js`. The `case` values will match the names of the actions your paired using the `dopamine.pairReinforcement( )` method. For example:

`switch(dopamine.reinforce(eventName, userIdentity));`

Where:
* `eventName (string)`: A unique name for this event. This DOES need to match an action specified in `pairReinforcement( )`.
* `userIdentity ( [ { id_type: uniqueID } ] )` : A unique identifier for this user.
* `metaData (object)` : metadata about the event passed in as a key-value object.

Each `case( )` value should match a name of a Reinforcement Function (both Reward Functions and Feedback Functions) you specified in `dopamine.pairReinforcement( )`. The content of each case should call the Reinforcement Function you wrote that will deliver the user a delightful reward or neutral feedback!


## Contributing

We like forks, pull requests, and IPAs. Wink.

Want to go down the Behavior Design rabbit hole with us? 
Email us at ramsay@usedopamine.com.

## Release History

* 0.1.0 Initial release. 
Pardon the dust. Half-written at 11PM on the I-5 Fwy over a janky wifi tether.