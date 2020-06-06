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
// Needed to allow this node to load the whole hierarchy - https://gun.eco/docs/API#-a-name-open-a-gun-open-callback-
require('gun/lib/open.js')

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
        // Return full hierarchy or not (default)?
        node.allOut = config.allOut // default = false

        // Retrieve the reference to the Gun factory function
        node.Gun = RED.nodes.getNode(node.gunconfig).Gun

        // Add full soul reference
        node.soul = node.path !== '' ? `${node.db}/${node.path}` : node.db

        if (node.Gun) {
            let msg = {}

            if ( node.allOut === true ) {
                        
                // Output the full hierarchy
                node.Gun.get(node.soul).load(function(value){
                    msg.topic = node.soul
                    msg.payload = value
                    node.send(msg)
                })

            } else if ( node.singleOut === true ) {

                // Create a one time output & listen for future additions only - re-running will replace the previous listener
                node.Gun.get(node.soul).on(function(value){
                    msg.topic = node.soul
                    msg.payload = node.rawOut !== true ? removeGunUnderscore(value) : value
                    node.send(msg)
                })

            } else {

                // Create a one time output & listen for future additions only - re-running will replace the previous listener
                node.Gun.get(node.soul).map().on(function(value, key){
                    msg.topic = `${node.soul}/${key}`
                    msg.payload = node.rawOut !== true ? removeGunUnderscore(value) : value
                    node.send(msg)
                })

            }

            // Remove listener when node removed, redeployed or Node-RED ends
            this.on('close', function() {
                if ( (node.singleOut === true) || (node.allOut === true) ) {
                    node.Gun.get(node.soul).off()
                } else {
                    node.Gun.get(node.soul).map().off()
                }
            })

        } else {
            console.log('GUN-GET No Gun Factory', node.Gun)
        }

    } // ---- End of nodeDefn (initialised node instance) ---- //

    /** Register the node by name. This must be called before overriding any of the node functions.
     * @param {string} nodeName - Name used in the matching html file that defines the admin ui
     **/
    RED.nodes.registerType(nodeName, nodeDefn)


} // ---- End of module.exports ---- //

/** Remove Gun.js `_` object from returned data
 * @param {*} data Data returned from a Gun.js ON or ONCE function
 * @returns {*} Data with _ property removed
 */
function removeGunUnderscore(data) {
    let payload = {}
    // If input is an object, remove a top-level property called "_"
    if (Object.prototype.toString.call(data) === '[object Object]') {
        Object.entries(data).forEach( ([key, value]) => {
            if (key !== '_') {
                payload[key] = value
            }
        })
    } else {
        payload = data
    }

    return payload
}

// EOF
