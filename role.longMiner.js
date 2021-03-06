

module.exports = {

    run: function(creep, base){
        const target = new RoomPosition(creep.memory.target.x,creep.memory.target.y,creep.memory.target.roomName);
        
        if (creep.room.name == target.roomName){
            if (!base.sourceContainers.length){
                if (!creep.pos.isNearTo(target)){
                    creep.moveTo(target,{reusePath:15});
                }
                else if (base.buildSites.length && creep.store.getUsedCapacity() > 25){
                    if (creep.pos.inRangeTo(base.buildSites[0],3)){
                        creep.build(base.buildSites[0]);
                    }
                }
                else {
                    creep.harvest(base.sources[0], RESOURCE_ENERGY);
                }
            }
            else{
                if (!creep.pos.isEqualTo(base.sourceContainers[0].pos)){
                    creep.moveTo(base.sourceContainers[0].pos);
                }
                else if (base.sourceContainers[0].hits < base.sourceContainers[0].hitsMax && creep.store.getUsedCapacity() > 0){
                    creep.repair(base.sourceContainers[0]);
                }
                else {
                    creep.harvest(base.sources[0], RESOURCE_ENERGY);
                }
            }
        }
        else{
            creep.moveTo(target,{reusePath:15});
        }
    }

};