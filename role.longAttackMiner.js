

module.exports = {

    run: function(creep, base){
        const target = new RoomPosition(creep.memory.target.x,creep.memory.target.y,creep.memory.target.roomName);
        var keeper = creep.room.find(FIND_HOSTILE_CREEPS, { filter: (creeper) => {return creeper.pos.inRangeTo(creep,20);}});
        var sources = creep.room.find(FIND_SOURCES, { filter: (source) => {return source.pos.inRangeTo(target,2);}});
        var sourceContainer = creep.room.find(FIND_STRUCTURES, { filter: (structure) => {return structure.structureType==STRUCTURE_CONTAINER && structure.pos.inRangeTo(target,2);}});
        var buildSite = creep.room.find(FIND_CONSTRUCTION_SITES, { filter: (constructionSite) => {return constructionSite.pos.inRangeTo(target,2);}});
        
    
        if (creep.room.name == target.roomName){
            if (keeper.length >0 && creep.getActiveBodyparts(ATTACK)>0){
                
                if (creep.attack(keeper[0])== ERR_NOT_IN_RANGE){
                    creep.moveTo(keeper[0]);
                }
            }
            else if (!(sourceContainer.length)){
                if (!creep.pos.isNearTo(target)){
                    creep.moveTo(target,{reusePath:15});
                }
                else if (buildSite.length && creep.store.getUsedCapacity() >= (creep.getActiveBodyparts(WORK)*5)){
                    if (creep.pos.inRangeTo(buildSite[0],3)){
                        creep.build(buildSite[0]);
                    }
                }
                else {
                    creep.harvest(sources[0], RESOURCE_ENERGY);
                }
            }
            else{
                if (!creep.pos.isEqualTo(sourceContainer[0])){
                    creep.moveTo(sourceContainer[0].pos);
                }
                else if (sourceContainer[0].hits < sourceContainer[0].hitsMax && creep.store.getUsedCapacity() > 0){
                    creep.repair(sourceContainer[0]);
                }
                else {
                    creep.harvest(sources[0], RESOURCE_ENERGY);
                }
            }
        }
        else{
            creep.moveTo(target,{reusePath:15});
        }
    }

};