var classBase = require('class.base');

module.exports = {
    run: function(creep){
        const target = new RoomPosition(creep.memory.target.x,creep.memory.target.y,creep.memory.target.roomName);
        if (creep.room.name != target.roomName){
            creep.moveTo(target);
        }
        else{
            var heals= creep.pos.findClosestByRange(FIND_MY_CREEPS, {filter: (creep)=> {return creep.hits<creep.hitsMax}});
            if (heals){
                if (heals.pos.isNearTo(creep)){
                    creep.heal(heals);
                }
                else if (heals.pos.inRangeTo(creep,3)){
                    creep.rangedHeal(heals);
                }
            }
            var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: (creep)=> {return creep.getActiveBodyparts(HEAL)>0}});
            if (!closestHostile){
                closestHostile =creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            }
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
        
    }
};