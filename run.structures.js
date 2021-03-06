var classBase = require('class.base');

module.exports = {
    run: function(){
        for (var structure in Game.structures) {
            var building=Game.structures[structure];
            if(building.structureType == STRUCTURE_TOWER) {
                var closestDamagedStructure = building.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL
                    && structure.structureType != STRUCTURE_RAMPART
                    && !(structure.pos.lookFor(LOOK_FLAGS, {
                    filter: (flag) => flag.color == COLOR_RED}).length)}); //should be limitedd to red flags 
                var closestHostile = building.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                

                if(closestHostile) {
                    building.attack(closestHostile);
                    //building.room.controller.activateSafeMode();
                }
                else if(closestDamagedStructure) {
                    building.repair(closestDamagedStructure);
                }
            }
        }
    }

};