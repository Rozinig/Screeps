var classBase = require('class.base');

module.exports = {
    run: function(creep){
        var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile){
            if (!creep.pos.isNearTo(closestHostile)){
                creep.moveTo(closestHostile);
                return;
            }
            else{
                creep.attack(closestHostile);
                return;
            }
        }
        var closestBuilding =creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES);
        if (closestBuilding){
            if (!creep.pos.isNearTo(closestBuilding)){
                creep.moveTo(closestBuilding);
                return;
            }
            else{
                creep.attack(closestBuilding);
                return;
            }
        }
        
    }
};