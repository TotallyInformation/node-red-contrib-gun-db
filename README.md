# node-red-contrib-gun-db

Unfortunately, GunDB did not prove as robust and useful as anticipated for Node-RED and so this repo will not be developed further and so is being archived. Please feel free to fork if you wish.

----

<!--
[![NPM Version](https://camo.githubusercontent.com/4c90eaa8a890de58911a9ab804e264c0e428bb8c/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f6e6f64652d7265642d636f6e747269622d75696275696c6465722e737667)](https://www.npmjs.com/package/node-red-contrib-gun-db) [![NPM Total Downloads](https://camo.githubusercontent.com/6d2d2db333d5a151d765e5b0c34d95906b276b43/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f64742f6e6f64652d7265642d636f6e747269622d75696275696c6465722e737667)](https://www.npmjs.com/package/node-red-contrib-gun-db) [![NPM Downloads per month](https://camo.githubusercontent.com/fc35858dda2f3b36b0e63a82d9070c3a4b6f833f/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f646d2f6e6f64652d7265642d636f6e747269622d75696275696c6465722e737667)](https://www.npmjs.com/package/node-red-contrib-gun-db) [![GitHub last commit](https://camo.githubusercontent.com/56f9d3e15172510307195b28b9fb73fdbb993c77/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6173742d636f6d6d69742f746f74616c6c79696e666f726d6174696f6e2f6e6f64652d7265642d636f6e747269622d75696275696c6465722e737667)](https://github.com/TotallyInformation/node-red-contrib-gun-db) [![GitHub stars](https://camo.githubusercontent.com/dc8687b7bf750f5b0d84c19917f3fa01ea0c317c/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f73746172732f546f74616c6c79496e666f726d6174696f6e2f6e6f64652d7265642d636f6e747269622d75696275696c6465722e737667)](https://github.com/TotallyInformation/node-red-contrib-gun-db/watchers) [![GitHub watchers](https://camo.githubusercontent.com/be97c29236f2ad1d9aea3b533cfea3cf8ebe62bb/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f77617463686572732f546f74616c6c79496e666f726d6174696f6e2f6e6f64652d7265642d636f6e747269622d75696275696c6465722e737667)](https://github.com/TotallyInformation/node-red-contrib-gun-db/stargazers) [![GitHub license](https://camo.githubusercontent.com/caea2f14fae50a7442a17db1c20130712763a49a/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f546f74616c6c79496e666f726d6174696f6e2f6e6f64652d7265642d636f6e747269622d75696275696c6465722e737667)](https://github.com/TotallyInformation/node-red-contrib-gun-db/blob/master/LICENSE) [![Min Node Version](https://camo.githubusercontent.com/eba6230f7c25fdd44ae5f02e709717eef52d9414/68747470733a2f2f696d672e736869656c64732e696f2f6e6f64652f762f6e6f64652d7265642d636f6e747269622d75696275696c6465722e737667)](https://www.npmjs.com/package/node-red-contrib-gun-db) [![Package Quality](https://camo.githubusercontent.com/2c253ca59dad96fcf47718dba08ec8ee36367b65/687474703a2f2f6e706d2e7061636b6167657175616c6974792e636f6d2f736869656c642f6e6f64652d7265642d636f6e747269622d75696275696c6465722e706e67)](http://packagequality.com/#?package=node-red-contrib-gun-db) [![Dependencies](https://camo.githubusercontent.com/455961923673270c19f0470f1ffa48f78d6d69c1/68747470733a2f2f696d672e736869656c64732e696f2f64617669642f546f74616c6c79496e666f726d6174696f6e2f6e6f64652d7265642d636f6e747269622d75696275696c6465722e737667)](https://github.com/TotallyInformation/node-red-contrib-gun-db) [![Open Issues](https://camo.githubusercontent.com/6967feb2800a451032073200fc9ddd8941c343dc/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6973737565732d7261772f546f74616c6c79496e666f726d6174696f6e2f6e6f64652d7265642d636f6e747269622d75696275696c6465722e737667)](https://github.com/TotallyInformation/node-red-contrib-gun-db/issues) [![Closed Issues](https://camo.githubusercontent.com/ca66ebdf4e4ffdfbfacf7f73d5551e5e9e56dc5e/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6973737565732d636c6f7365642d7261772f546f74616c6c79496e666f726d6174696f6e2f6e6f64652d7265642d636f6e747269622d75696275696c6465722e737667)](https://github.com/TotallyInformation/node-red-contrib-gun-db/issues?q=is%3Aissue+is%3Aclosed)
-->

Collection of nodes to use Gun.js with Node-RED

Based on a suggestion from [thinkbig1979](https://discourse.nodered.org/u/thinkbig1979) in the [Node-RED Forum](https://discourse.nodered.org/t/gunjs-nodes-anyone-with-experience/26919).

## Prerequisites

To use this Node, you will need to:

* use at least Node-RED v1
* use a recent browser (not IE)

## Installation

Install production versions from Node-RED's palette manager.

Install development versions from GitHub:

```
cd ~/.node-red
npm install TotallyInformation/node-red-contrib-gub-db
```

## What Works

* Use the `Gun Listen` node to listen for any changes to or beneath the given path. Uses Gun's `.on()` or `.open()` functions.
* Use the `Gun Out` node to trigger a one-off output based on fixed settings or using the `msg.topic` to set the path. Uses Gun's `.once()` or `.load()` functions.
* Use the `Gun Update` node to add or change data. Uses Gun's `.put()` or `.set()` functions.
* Use the `Gun Cofig` configuration node to specify a new instance of Gun.js that is used by the other nodes. Each instance creates a new physical database locally and, optionally, is able to link to a remote instance for peer-to-peer synchronisation.

## To Do

* See the To Do sections for the nodes as well.

* Add a Gun server
  
  So that Node-RED can be used as a Gun backend as well. In this case, you would add GunJS to your front-end (browser) code and connect it to the Node-RED server so that data is automatically synchronised.

  Will also need to try to implement the `.bye()` handling.

* Find a better way at handling JavaScript Array's & functions to make the output better able to handle random JavaScript data.

* Add more of Gun.js's features:

   * Add an `unset` feature to allow removal of unordered data added via `set`.
   * Gun.js user handling
   * `gun.later(cb, seconds)`
   * Utils: `Gun.node.is(data)`, `Gun.node.soul(data)`, `Gun.node.ify(json)`

* Still more (note these will probably never be implemented unless someone really wants to ask for them or is able to help with coding and testing)

   * SEA, RAD, JOY API's
   * Use other data adapters rather than just the filing system
   * Proper delete function (don't think this is possible with current Gun.js API's)

## Use Cases

2 distinct use-cases here at least:

1.  A server that allows front-end's (whether data driven from Node-RED or otherwise) to sync/share data.
2.  A DB for Node-RED itself to use. Which doesn't, of course, need the server component.

Both have significant potential benefits. Especially given the ability to subscribe to changes.

Potentially also useful for a Node-RED datastore. (Maybe. The two weaknesses listed below may yet preclude this. TBD).

## Strengths

- Lightweight
- NoSQL, document style, eventually consistent
- Use stand-alone or in peer-to-peer sync, no central server required
- Use in browser and/or node.js
- Subscribe to data changes.
- Partial document updates
- Capable of graph data structures.
- Can handle JavaScript circular data references

## Weaknesses

- No proper delete function - difficult to completely clean out data
  
  To properly delete an entire hierarchy, you would have to manually walk the data and nullify each element.

  To actually delete data, you would have to delete from the filing system.

- Cannot handle all native JavaScript object types (e.g. array's)

   You cannot simply throw a random JavaScript object at Gun.js's `put` or `set` function.

- Inconsistent and unexpected behaviours

   The Gun.js documentation has a significant number of comments about unexpected behaviours.

   Here are a couple of the worst that I found during development:

   - No delete
      
      Covered this already but the worst thing is that if you have a deep hierarchy of nodes and then
      set one of the nodes to `null` as suggested in the documentation, you can still access data lower
      in the hierarchy since that hasn't been removed. Whilst this is obviously very fast, it makes
      Gun.js totally unsuitable for some uses.

   - Creating a deep entry does not create intermediate nodes
     
      Using something like `Gun.get('DB/some/deep/path').put({a:1,b:2})` does **NOT** create the intermediate nodes!

      So you cannot then do `Gun.get('DB/some').once((data, key) => {console.log(key,data)})` because this will
      return `undefined` for the data.

      To get a more anticipated outcome, you have to do `Gun.get('DB').get('some').get('deep').get('path').put({a:1,b:2})`.

   - SET allows you to add a string/number/true/false/null to the data but PUT does not
   
   - If you use SET to add a string/number/true/false/null to the data, you cannot directly query the added data

     If the added data was at `DB/some/deep/path/kb5b6jxu3lnlClU` for example, you cannot do `Gun.get('DB/some/deep/path/kb5b6jxu3lnlClU').once((data, key) => {console.log(key,data)})`
     as this will return undefined as the data. Instead you have to query the parent and then reference the property
     `Gun.get('DB/some/deep/path').once((data, key) => {console.log(key,data.kb5b6jxu3lnlClU)})`

     However, if you use SET to add an Object, you **CAN** query it directly!
   
   - UNSET is inconsistent with everything else!
      
      I still have not found a way to use it without keeping a reference to the way you created it as in the only single example code I've found.
      This is OK if the entry is an object because you can GET it. But if it isn't, there appears to be no way to get a reference.

      Without it, there doesn't appear to be any way to remove something added via SET.

## Installation

Install from npm using Node-RED's Palette Manager or from the command line using npm.

## Nodes

### Gun: Out - `get-once`

Uses the `.once` Gun function to output data from a given path.

You can choose to output a msg for each property of the given db/path or a single message. 

Note that, by default, Gun only directly returns a single level of the hierarchy and references to the next level. Should you want the whole hierarchy, you can choose the "Output the whole hierarchy" option.

Additionally, you can choose whether to include Gun's metadata (the `_` property) or not. If outputting the whole hierarchy, the metadata is not available.

### Gun: Listen - `get`

Listen for new or changed data on or below the given path. Uses the Gun `.on` function.

### Gun: Update - `put`, `set`

Put data to the specified path. Optionally use `.set` instead of `.put`.

#### To do

* Output a warning if anything but an object is `put`
* Output a warning if an Array being `set`
* _Consider_ adding a flag that does a `once` after a put/set and returns the data in the output msg
* _Consider_ an option that, if the input is an array, offers to loop over the array doing a `put` or `set` for each entry.
  
### Gun Config

Configuration node primarily to give common access to the `Gun()` instance. Optionally, create a Gun.js server instance.

#### To Do

- Ensure that every config instance uses a different physical storage location.

## Other Info

The Gun data is set to `<userDir>/_gun/`.

All the main nodes (not the config node) require a "Db" to be set. This is a top-level Gun element. This forces all user data to be stored below the top-level of the hierarchy which Gun treats slightly differently.

## References

- [Gun.js](https://gun.eco/docs)
- [Gun.js GitHub](https://github.com/amark/gun)
- [Gun.js questions on StackOverflow](https://stackoverflow.com/questions/tagged/gun)
- Couple of useful articles about Gun.js on Medium. [1](https://medium.com/@ajmeyghani/gundb-a-graph-database-in-javascript-3860a08d873c), [2](https://medium.com/@ajmeyghani/data-modeling-with-gundb-15220cbfb8da)


--- 

<a href="https://stackexchange.com/users/1375993/julian-knight"><img src="https://stackexchange.com/users/flair/1375993.png" width="208" height="58" alt="profile for Julian Knight on Stack Exchange, a network of free, community-driven Q&amp;A sites" title="profile for Julian Knight on Stack Exchange, a network of free, community-driven Q&amp;A sites" /></a>

Please also check out my blog, [Much Ado About IT](https://it.knightnet.org.uk), it has information about all sorts of topics, mainly IT related, including Node-RED.
