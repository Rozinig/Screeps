var classBase = require('class.base');

module.exports = {
    run: function(creep, base){
        var energydrop = creep.room.find(FIND_DROPPED_RESOURCES, {filter: (resource) => {
            return resource.pos.isNearTo(base.sinkContainers[0]);}});
        creep.pickup(energydrop[0]);
        
        if (!creep.pos.isNearTo(base.sinkContainers[0]) && creep.store.getUsedCapacity()==0){
            creep.moveTo(base.sinkContainers[0].pos);
        }
        
        creep.withdraw(base.sinkContainers[0], RESOURCE_ENERGY);
        if (creep.upgradeController(creep.room.controller)==ERR_NOT_IN_RANGE){
            creep.moveTo(creep.room.controller);
        }
    }
};