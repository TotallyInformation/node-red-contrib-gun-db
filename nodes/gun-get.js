/**
 * Copyright (c) 2020 Julian Knight (Totally Information)
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

'use strict'

// Node name must match this nodes html file name AND the nodeType in the html file
const nodeName = 'gun-get'

//const Gun = require('gun') // Not required, we use a single reference in the configuration node

// THIS FUNCTION IS EXECUTED ONLY ONCE AS NODE-RED IS LOADING
module.exports = function(RED) {
    'use strict'

    /** RED, parent object set by Node-RED
     * @external RED
     * @see https://nodered.org/docs/creating-nodes/node-js
     **/
    
    /** The node's instance definition.
     * THIS FUNCTION IS RUN ON (RE)DEPLOYMENT - FOR EACH INSTANCE OF THIS NODE TYPE
     * this/node var is rebuilt on every redeployment
     * @param {object} config - The config vars defined in the matching html file used in the Editor admin interface
     */
    function nodeDefn(config) {

        // Create the node instance
        RED.nodes.createNode(this, config)

        // copy 'this' object in case we need it in context of callbacks of other functions.
        const node = this

        /** Create local copies of the node configuration (as defined in the .html file)
         *  NB: Best to use defaults here as well as in the html file for safety
         **/
        // Just a name, show in Editor if used. No impact on processing.
        node.name = config.name || ''
        // Reference to config node - gives access to Gun() reference
        node.gunconfig = config.gunconfig
        // Specify top-level element to target
        node.db = config.db || ''
        // slash path added to db to specify the "soul" to target
        node.path = config.path || ''
        // Single output msg or multiple?
        node.singleOut  = config.singleOut // default = false
        // Show raw Gun return data in payload or remove the _ object (default?
        node.rawOut = config.rawOut // default = false

        // Add full soul reference
        node.soul = node.path !== '' ? `${node.db}/${node.path}` : node.db

        // Retrieve the reference to the Gun factory function
        node.Gun = RED.nodes.getNode(node.gunconfig).Gun

        if (node.Gun) {
            node.data = node.Gun.get(node.db);

            function contextChain(key, index, contextArray){
              if (key) node.data = node.data.get(key);
            }
            var contextLst = node.path.split("/");
            contextLst.forEach(contextChain);

            if ( node.singleOut === true ) {
                node.data.on(function(value, key){
                    var payload;
                    if (value !== null && typeof value === 'object'){
                      // remove deleted values from payload
                      payload = {};
                      Object.keys(value).forEach((k) => value[k] ? payload[k] = value[k]: "");
                      if (!node.rawOut) delete payload["_"];
                    }
                    else{
                      payload = value;
                    } 
                    node.send({topic:node.soul, payload: payload});
                })
            } else {
                node.data.map().on(function(value, key){
                    node.send({topic: node.soul+"/"+key, payload: value});
                })
            }
        } else {
            console.log('GUN-GET No Gun Factory', node.Gun)
        }

        this.on('close', function(removed, done){
          node.data.off();
          done();
         });

    } // ---- End of nodeDefn (initialised node instance) ---- //

    /** Register the node by name. This must be called before overriding any of the node functions.
     * @param {string} nodeName - Name used in the matching html file that defines the admin ui
     **/
    RED.nodes.registerType(nodeName, nodeDefn)


} // ---- End of module.exports ---- //

// EOF
