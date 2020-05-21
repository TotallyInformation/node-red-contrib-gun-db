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
const nodeName = 'gun-get-once'

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
        node.gunconfig  = config.gunconfig || '' // Reference to a gun configuration node
        node.soul  = config.soul || '' // Name of the soul to use
        node.singleOut  = config.singleOut

        // Retrieve the reference to the Gun factory function
        node.Gun = RED.nodes.getNode(node.gunconfig).Gun

        /** Handler function for node flow input events (when a node instance receives a msg from the flow)
         * @see https://nodered.org/blog/2019/09/20/node-done 
         * @param {Object} msg The msg object received.
         * @param {function} send Per msg send function, node-red v1+
         * @param {function} done Per msg finish function, node-red v1+
         **/
        function nodeInputHandler(msg, send, done) {
            
            // If this is pre-1.0, 'send' will be undefined, so fallback to node.send
            send = send || function() { node.send.apply(node,arguments) }
            // If this is pre-1.0, 'done' will be undefined, so fallback to dummy function
            done = done || function() { if (arguments.length>0) node.error.apply(node,arguments) }

            // Retrieve the reference to the Gun factory function
            node.Gun = RED.nodes.getNode(node.gunconfig).Gun

            // If msg is null, nothing will be sent
            if ( msg !== null ) {
                if (node.Gun) {
                    if ( node.singleOut === true ) {
                        // Create a one time output & listen for future additions only - re-running will replace the previous listener
                        // NB: Adding a new doc will produce TWO outputs. 1 for the soul and one for the new document.
                        node.Gun.get(node.soul).once(function(value, key){
                            send({
                                'topic': node.soul,
                                //TODO Probably need to allow this to be configured in the front-end
                                'payload': {
                                    'soul': node.soul,
                                    'key': key,
                                    'value': value,
                                },
                            })
                        })
                    } else {
                        // Create a one time output & listen for future additions only - re-running will replace the previous listener
                        node.Gun.get(node.soul).map().once(function(value, key){
                            send({
                                'topic': node.soul,
                                //TODO Probably need to allow this to be configured in the front-end
                                'payload': {
                                    'soul': node.soul,
                                    'key': key,
                                    'value': value,
                                },
                            })
                        })
                    }
                } else {
                    console.log('GUN-GET-ONCE No Gun Factory', node.Gun)
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
