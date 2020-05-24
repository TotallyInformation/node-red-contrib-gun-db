var Gun = require('gun')
var gun = Gun()

TestTwo()

function TestTwo() {
    // https://github.com/amark/gun/wiki/Graphs
    var alice = gun.get('person/alice').put({name: 'alice', age: 22})
    var bob = gun.get('person/bob').put({name: 'bob', age: 24})
    var carl = gun.get('person/carl').put({name: 'carl', age: 16})
    var dave = gun.get('person/dave').put({name: 'dave', age: 42})

    alice.on(function(node){
        log('SUBSCRIBED TO ALICE!', node)
    })
      
    gun.get('person/bob').once(function(node){
        log('BOB!', node)
    })

    // Create a SET - "think of this as a table in relational databases or a collection in NoSQL databases"
    var people = gun.get('people')
    people.set(alice)
    people.set(bob)
    people.set(carl)
    people.set(dave)

    people.map().once(function(person){
        log('THE PERSON IS: ', person)
    })

    var company = gun.get('startup/hype').put({
        name: 'hype',
        profitable: false,
        address: {
            street: '123 Hipster Lane',
            city: 'San Francisco',
            state: 'CA',
            country: 'USA'
        }
    })

    company.once(function(startup){
        log('THE STARTUP:', startup)
    })

    var employees = company.get('employees')
    employees.set(dave)
    employees.set(alice)
    employees.set(bob)

    alice.get('spouse').put(bob)
    bob.get('spouse').put(alice)

    alice.get('spouse').get('employer').put(company)
    alice.get('employer').put(company)

    dave.get('kids').set(carl)
    carl.get('dad').put(dave)

    carl.get('friends').set(alice)
    carl.get('friends').set(bob)

    // gun.get('person/alice').get('spouse').get('employer').get('employees').map().get('name').once(function(data, key){
    //     console.log('THE EMPLOYEES ', key, '= ', data)
    // })

    //console.log(gun.get('person/alice').get('spouse').get('employer').get('employees'))
}

function TestOne() {
    //populate
    for (var i=0;i<10;++i) {  gun.get('db').get('test1').set(i) }

    //verify: 
    // gun.get('db').get('test1').on( (value,key) => {
    //     console.log( 'Key=', key, ', Value=', value)
    // })
    gun.get('db').get('test1').once(console.log)

    //delete:
    // gun.get('db').get('test1').map().once( function(value,key) { 
    //     this.put(null)
    // })
    setTimeout(() => {
        gun.get('db').get('test1').put(null)
    }, 500)

    //verify: 
    setTimeout(() => {
        console.log('================================')
        //gun.get('db').get('test1').once(console.log)
        gun.get('db').once(console.log)
    }, 5000)

    //seems ok
}

function log(txt, value, maxdepth=3, currdepth=0) {
    //if (currdepth>0) console.log(value)

    //msg.payload = Object.assign({}, value)
    const payload = {}
    Object.entries(value).forEach( ([key, val]) => {
        if (key === '_') return
        //console.log(key, value)
        if (Object.prototype.toString.call(val) === '[object Object]') {
            // Recurse if needed
            if ( (currdepth < maxdepth) && (val['#']) ) {
                gun.get(val['#']).once( function(newval) {
                    payload[key] = log(txt, newval, maxdepth, currdepth+1)
                })
                
            }
        } else {
            payload[key] = val
        }
    })

    //delete msg.payload._
    if (currdepth === 0) {
        const msg = {
            topic:value['_']['#'], 
            payload: payload
        }

        console.log(txt, msg)

        return msg
    } else {
        return payload
    }
}
