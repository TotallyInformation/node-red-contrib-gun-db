# node-red-contrib-gun-db
<!--
[![NPM Version](https://camo.githubusercontent.com/4c90eaa8a890de58911a9ab804e264c0e428bb8c/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f6e6f64652d7265642d636f6e747269622d75696275696c6465722e737667)](https://www.npmjs.com/package/node-red-contrib-gun-db) [![NPM Total Downloads](https://camo.githubusercontent.com/6d2d2db333d5a151d765e5b0c34d95906b276b43/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f64742f6e6f64652d7265642d636f6e747269622d75696275696c6465722e737667)](https://www.npmjs.com/package/node-red-contrib-gun-db) [![NPM Downloads per month](https://camo.githubusercontent.com/fc35858dda2f3b36b0e63a82d9070c3a4b6f833f/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f646d2f6e6f64652d7265642d636f6e747269622d75696275696c6465722e737667)](https://www.npmjs.com/package/node-red-contrib-gun-db) [![GitHub last commit](https://camo.githubusercontent.com/56f9d3e15172510307195b28b9fb73fdbb993c77/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6173742d636f6d6d69742f746f74616c6c79696e666f726d6174696f6e2f6e6f64652d7265642d636f6e747269622d75696275696c6465722e737667)](https://github.com/TotallyInformation/node-red-contrib-gun-db) [![GitHub stars](https://camo.githubusercontent.com/dc8687b7bf750f5b0d84c19917f3fa01ea0c317c/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f73746172732f546f74616c6c79496e666f726d6174696f6e2f6e6f64652d7265642d636f6e747269622d75696275696c6465722e737667)](https://github.com/TotallyInformation/node-red-contrib-gun-db/watchers) [![GitHub watchers](https://camo.githubusercontent.com/be97c29236f2ad1d9aea3b533cfea3cf8ebe62bb/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f77617463686572732f546f74616c6c79496e666f726d6174696f6e2f6e6f64652d7265642d636f6e747269622d75696275696c6465722e737667)](https://github.com/TotallyInformation/node-red-contrib-gun-db/stargazers) [![GitHub license](https://camo.githubusercontent.com/caea2f14fae50a7442a17db1c20130712763a49a/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f546f74616c6c79496e666f726d6174696f6e2f6e6f64652d7265642d636f6e747269622d75696275696c6465722e737667)](https://github.com/TotallyInformation/node-red-contrib-gun-db/blob/master/LICENSE) [![Min Node Version](https://camo.githubusercontent.com/eba6230f7c25fdd44ae5f02e709717eef52d9414/68747470733a2f2f696d672e736869656c64732e696f2f6e6f64652f762f6e6f64652d7265642d636f6e747269622d75696275696c6465722e737667)](https://www.npmjs.com/package/node-red-contrib-gun-db) [![Package Quality](https://camo.githubusercontent.com/2c253ca59dad96fcf47718dba08ec8ee36367b65/687474703a2f2f6e706d2e7061636b6167657175616c6974792e636f6d2f736869656c642f6e6f64652d7265642d636f6e747269622d75696275696c6465722e706e67)](http://packagequality.com/#?package=node-red-contrib-gun-db) [![Dependencies](https://camo.githubusercontent.com/455961923673270c19f0470f1ffa48f78d6d69c1/68747470733a2f2f696d672e736869656c64732e696f2f64617669642f546f74616c6c79496e666f726d6174696f6e2f6e6f64652d7265642d636f6e747269622d75696275696c6465722e737667)](https://github.com/TotallyInformation/node-red-contrib-gun-db) [![Open Issues](https://camo.githubusercontent.com/6967feb2800a451032073200fc9ddd8941c343dc/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6973737565732d7261772f546f74616c6c79496e666f726d6174696f6e2f6e6f64652d7265642d636f6e747269622d75696275696c6465722e737667)](https://github.com/TotallyInformation/node-red-contrib-gun-db/issues) [![Closed Issues](https://camo.githubusercontent.com/ca66ebdf4e4ffdfbfacf7f73d5551e5e9e56dc5e/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6973737565732d636c6f7365642d7261772f546f74616c6c79496e666f726d6174696f6e2f6e6f64652d7265642d636f6e747269622d75696275696c6465722e737667)](https://github.com/TotallyInformation/node-red-contrib-gun-db/issues?q=is%3Aissue+is%3Aclosed)
-->

Collection of nodes to use Gun.js with Node-RED **WARNING: CONCEPT STAGE ONLY**

Based on a suggestion from [thinkbig1979](https://discourse.nodered.org/u/thinkbig1979) in the [Node-RED Forum](https://discourse.nodered.org/t/gunjs-nodes-anyone-with-experience/26919).

## Use Cases

2 distinct use-cases here at least:

1.  A server that allows front-end's (whether data driven from Node-RED or otherwise) to sync/share data.
2.  A DB for Node-RED itself to use. Which doesn't, of course, need the server component.

Both have significant potential benefits. Especially given the ability to subscribe to changes.

Potentially also useful for a Node-RED datastore.

## Strengths

- Lightweight
- NoSQL, document style, eventually consistent
- Use stand-alone or in peer-to-peer sync, no central server required
- Use in browser and/or node.js
- Subscribe to data changes.
- Partial document updates
- Capable of graph data structures.
- Can handle JavaScript circular data references

## Nodes

### Gun Config

Configuration node primarily to give common access to the `Gun()` instance. Optionally, create a Gun.js server instance.

### Soul

Create a reference to a new/existing "Soul". Souls are Gun.js's root data structures.

### 