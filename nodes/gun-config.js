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
const nodeNameConfig = 'gun-config'

const Gun = require('gun')

console.log('GUN-CONFIG 1')

// THIS FUNCTION IS EXECUTED ONLY ONCE AS NODE-RED IS LOADING
module.exports = function(RED) {
    'use strict'

    /** RED, parent object set by Node-RED
     * @external RED
     * @see https://nodered.org/docs/creating-nodes/node-js
     **/

    console.log('GUN-CONFIG 2')
    
    /** The node's instance definition.
     * THIS FUNCTION IS RUN ON (RE)DEPLOYMENT - FOR EACH INSTANCE OF THIS NODE TYPE
     * this/node var is rebuilt on every redeployment
     * @param {object} config - The config vars defined in the matching html file used in the Editor admin interface
     */
    function nodeDefnConfig(config) {

        // Create the node instance
        RED.nodes.createNode(this, config)

        console.log('GUN-CONFIG 3')

        // copy 'this' object in case we need it in context of callbacks of other functions.
        const node = this

        /** Create local copies of the node configuration (as defined in the .html file)
         *  NB: Best to use defaults here as well as in the html file for safety
         **/
        // node.protocol   = config.protocol || 'http'
        // node.host  = config.host || ''
        // node.port  = config.port || ''
        node.soul  = config.soul || ''

        try {
            // Get reference to the required "Soul"
            if ( node.soul !== '' ) node.soulRef = Gun().get(node.soul)
            //else node.soulRef = Gun().get()
            
            node.soulRef.map().on(function(item, itemId){
                node.log(`[GUN:Config] ${node.soul}: ${itemId}=`, item)
            })
        } catch (e) {
            console.log('GUN-CONFIG 3 error ', e)
        }

    } // ---- End of nodeGo (initialised node instance) ---- //

    /** Register the node by name. This must be called before overriding any of the node functions.
     * @param {string} nodeName - Name used in the matching html file that defines the admin ui
     **/
    RED.nodes.registerType(nodeNameConfig, nodeDefnConfig)

} // ---- End of module.exports ---- //

// EOF
