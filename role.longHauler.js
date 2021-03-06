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
        //if () not in target room and have no resource
        if (creep.room.name != target.roomName && creep.store.getUsedCapacity() ==0){
            // go to target room
            creep.moveTo(target, {reusePath:15});
            
        }
        
        // if not in target room and have resource
        else if (creep.room.name != target.roomName && creep.store.getUsedCapacity() >0){
            // deliever resource
            var sourceCon = creep.pos.findClosestByPath(base.sourceContainers);
            var attempt = creep.transfer(sourceCon, RESOURCE_ENERGY)
            if (attempt == ERR_NOT_IN_RANGE){
                creep.moveTo(sourceCon);
            }
            else if (attempt ==ERR_FULL){
                creep.drop(RESOURCE_ENERGY);
            }
            
        }
        // if not in home room and have full resouce 
        else if (creep.room.name != home.roomName && creep.store.getFreeCapacity()==0){
            //  go to home room
            creep.moveTo(home,{reusePath:15});
        }
        
        // if in target room and not full resouce 
        else if (creep.room.name == target.roomName && creep.store.getFreeCapacity()>0){
            // pick up resouce
            if (!creep.pos.isNearTo(base.sourceContainers[0])){
                creep.moveTo(base.sourceContainers[0],{reusePath:15});
            }
            else {
                creep.withdraw(base.sourceContainers[0], RESOURCE_ENERGY);
            }
            
        }
    }

};