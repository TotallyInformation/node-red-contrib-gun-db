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
const nodeName = 'gun-put-set'

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
        // use set instead of put?
        node.set = config.set // default = false

        // Add full soul reference
        node.soul = node.path !== '' ? `${node.db}/${node.path}` : node.db
        // Add update type
        node.type = node.set !== true ? 'PUT' : 'SET'

        // Retrieve the reference to the Gun factory function
        node.Gun = RED.nodes.getNode(node.gunconfig).Gun

        /** Handler function for node flow input events (when a node instance receives a msg from the flow)
         * @see https://nodered.org/blog/2019/09/20/node-done 
         * @param {Object} msg The msg object received.
         * @param {function} send Per msg send function, node-red v1+
         * @param {function} done Per msg finish function, node-red v1+
         **/
        function nodeInputHandler(msg, send, done) {

            // If incoming msg has topic and node.path is blank, use the msg.topic as the path
            if ( msg.topic && node.path === '') {
                //   If db is included in msg.topic, make sure it doesn't get double counted
                let leadingDb = new RegExp(`^${node.db}`)
                node.path = msg.topic.replace(leadingDb,'')
            }
            
            // Add full soul reference
            node.soul = node.path !== '' ? `${node.db}/${node.path}` : node.db
            
            // If msg is null, nothing will be sent
            if ( msg !== null ) {

                if (node.Gun) {

                    /**
                     * WARNING: Unless you do a `get` on EVERY level of the hierarchy,
                     *          you will not get the expected results because Gun.js
                     *          will not automatically create the intermediate paths
                     */
                    var guns = node.Gun
                    var splitSoul = node.soul.split('/')
                    if ( ! Array.isArray(splitSoul) ) splitSoul = new Array(splitSoul)
                    // Walk down the hierarchy
                    splitSoul.forEach((step) => {
                        // Save the latest gun.get object
                        guns = guns.get(step)
                    })
                    
                    let lastPath = ''
                    if ( node.set !== true ) {
                        /** Put values cannot be an array or a scalar (must be an object)
                         * TODO Force this to be an object
                         * Object.prototype.toString.call(objectToTest)
                         */
                        guns.put(msg.payload)
                    } else {
                        // Use SET instead of PUT - TODO: payload cannot be an array
                        // Save the output to Get the random ID that was just added & add it to the output topic
                        lastPath = guns.set(msg.payload)
                    }

                    // If SET was used, add the new random ID that Gun created
                    msg.topic = lastPath === '' ? node.soul : `${node.soul}/${lastPath._.has}`
                    msg.updateType = node.type
                    send(msg)

                } else {

                    console.log('GUN-PUT-GET No Gun Factory', node.Gun)

                }

            }

            done()

        } // -- end of flow msg received processing -- //

        // Process inbound messages
        node.on('input', nodeInputHandler)

    } // ---- End of nodeDefn (initialised node instance) ---- //

    /** Register the node by name. This must be called before overriding any of the node functions.
     * @param {string} nodeName - Name used in the matching html file that defines the admin ui
     **/
    RED.nodes.registerType(nodeName, nodeDefn)


} // ---- End of module.exports ---- //

// EOF
