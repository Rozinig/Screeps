//import modules
var runStructures = require('run.structures');
var runCreeps = require('creeps');
var construction = require('construction');
var base = require('class.base');


module.exports.loop = function () {
    
        //Clears Memory of dead Creeps
        for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    //Run modules
    runCreeps.run();
    runStructures.run();
    //construction.run(Game.spawns['Spawn1'].room);
    if(Game.cpu.bucket == 10000) {
        Game.cpu.generatePixel();
    }
    //console.log(Game.cpu.bucket);
    //console.log(Game.rooms[(new RoomPosition(12,41,'E24N6')).roomName].find(FIND_CREEPS));
}