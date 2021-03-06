var classBase = require('class.base');
var tasks = require('role.tasks');

module.exports = {
    run: function(creep, base){
        var fruit = creep.room.find(FIND_DROPPED_RESOURCES, {filter: (resource) => {
            return resource.pos.isNearTo(creep.pos);}});
        if (fruit.length){
            creep.pickup(fruit[0]);
        }
        if(creep.memory.delivering && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.delivering = false;
        }
        
        if(!creep.memory.delivering && creep.store.getFreeCapacity() == 0) {
            creep.memory.delivering = true;
        }
        
        if (!creep.memory.delivering){
            tasks.getEnergy(creep, base, creep.memory.far);
        }
        else {
            tasks.deliverEnergy(creep, base);
            
        }
    }
};