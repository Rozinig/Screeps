var classBase = require('class.base');

module.exports = {

    run: function(creep, base){
        const home = new RoomPosition(creep.memory.home.x, creep.memory.home.y, creep.memory.home.roomName);
        const target = new RoomPosition(creep.memory.target.x,creep.memory.target.y,creep.memory.target.roomName);
        
        var fruit = creep.room.find(FIND_DROPPED_RESOURCES, {filter: (resource) => {
            return resource.pos.isNearTo(creep.pos);}});
        if (fruit.length){
            creep.pickup(fruit[0]);
        }
        var sources = creep.room.find(FIND_SOURCES);
        if ((creep.store.getFreeCapacity()>0 && creep.room.name == target.roomName) || creep.store.getUsedCapacity()==0){
            if (!creep.pos.isNearTo(target)){
                creep.moveTo(target,{reusePath:15});
            }
            else {
                if (base.buildSites.length && creep.store.getUsedCapacity()>20){
                    creep.build(base.buildSites[0]);
                }
                else {
                    creep.harvest(sources[0], RESOURCE_ENERGY);
                }
            }
            return;
        }
        else if (creep.room.name != home.roomName){
            creep.moveTo(home,{reusePath:15});
            return;
        }
        var sourceCon = creep.pos.findClosestByPath(base.sourceContainers);
        var attempt = creep.transfer(sourceCon, RESOURCE_ENERGY)
        if (attempt == ERR_NOT_IN_RANGE){
            creep.moveTo(sourceCon);
        }
        else if (attempt ==ERR_FULL){
            creep.drop(RESOURCE_ENERGY);
        }
    }

};