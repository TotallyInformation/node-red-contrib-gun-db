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
//require('gun/lib/unset.js')
const gunOptions = {
    //peers: {},
    //radisk: true,
    //localStorage: true,
    //uuid: function(){},
    //file: `${RED.settings.userDir}/_gun/`
}

// THIS FUNCTION IS EXECUTED ONLY ONCE AS NODE-RED IS LOADING
module.exports = function(RED) {
    'use strict'

    // Force the local gun db into the userDir
    gunOptions.file = `${RED.settings.userDir}/_gun/`

    /** RED, parent object set by Node-RED
     * @external RED
     * @see https://nodered.org/docs/creating-nodes/node-js
     **/
    
    /** The node's instance definition.
     * THIS FUNCTION IS RUN ON (RE)DEPLOYMENT - FOR EACH INSTANCE OF THIS NODE TYPE
     * this/node var is rebuilt on every redeployment
     * @param {object} config - The config vars defined in the matching html file used in the Editor admin interface
     */
    function nodeDefnConfig(config) {

        // Create the node instance
        RED.nodes.createNode(this, config)

        // copy 'this' object in case we need it in context of callbacks of other functions.
        const node = this

        /** Create local copies of the node configuration (as defined in the .html file)
         *  NB: Best to use defaults here as well as in the html file for safety
         **/
        node.server = config.server || ''

        if (node.server !== '') {
            gunOptions.peers = {}
            node.server.split(',').forEach(server => {
                gunOptions.peers[server] = {}
            })
        }

        // Keep the reference to Gun
        node.Gun = Gun(gunOptions)
        // just for reference
        node.gunOptions = gunOptions
        // debugging
        // var heating = node.Gun.get('heating')
        // var update = heating.get('update')
    
        // heating.once(function(data, key) {
        //     console.log('HEATING', key, data)
        // })
        node.debug = node.Gun.get('heating/update/System')
        // node.Gun.get('heating/update/System').once(function(data, key) {
        //     console.log('HEATING/UPDATE/SYSTEM', key, data)
        // })

    } // ---- End of nodeDefnConfig (initialised node instance) ---- //

    /** Register the node by name. This must be called before overriding any of the node functions.
     * @param {string} nodeName - Name used in the matching html file that defines the admin ui
     **/
    RED.nodes.registerType(nodeNameConfig, nodeDefnConfig)

} // ---- End of module.exports ---- //

// EOF
