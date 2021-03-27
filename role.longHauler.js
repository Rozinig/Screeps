var classBase = require('class.base');

module.exports = {

    run: function(creep, base){
        const home = new RoomPosition(creep.memory.home.x, creep.memory.home.y, creep.memory.home.roomName);
        const target = new RoomPosition(creep.memory.target.x,creep.memory.target.y,creep.memory.target.roomName);
        var sourceContainer = creep.room.find(FIND_STRUCTURES, { filter: (structure) => {return structure.structureType==STRUCTURE_CONTAINER && structure.pos.inRangeTo(target,2);}});
        var sourceCon = creep.pos.findClosestByPath(base.sourceContainers.concat(base.sinkContainers));
        var fruit = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {filter: (resource) => {
            return resource.pos.inRangeTo(creep.pos,6);}});
            //console.log(creep);
            //console.log(sourceCon);
        if (fruit && !(sour(creep,sourceCon) && creep.room.name== home.roomName) && creep.store.getFreeCapacity()>0){
            if (creep.pickup(fruit)==ERR_NOT_IN_RANGE){
                creep.moveTo(fruit);
            }
        }
        //if () not in target room and have no resource
        else if (creep.room.name != target.roomName && creep.store.getUsedCapacity() ==0){
            // go to target room
            creep.moveTo(target);//, {reusePath:2});
            
        }
        
        // if not in target room and have resource
        else if (creep.room.name != target.roomName && creep.store.getUsedCapacity() >0){
            if (creep.room.name != home.roomName){
                creep.moveTo(home);
            }
            // deliever resource
            else{
                var attempt = creep.transfer(sourceCon, RESOURCE_ENERGY)
                if (attempt == ERR_NOT_IN_RANGE){
                    creep.moveTo(sourceCon);
                }
                else if (attempt ==ERR_FULL){
                    creep.drop(RESOURCE_ENERGY);
                }
            }
            
        }
        // if not in home room and have full resouce 
        else if (creep.room.name != home.roomName && creep.store.getFreeCapacity()==0){
            //  go to home room
            creep.moveTo(home);//,{reusePath:15});
        }
        
        // if in target room and not full resouce 
        else if (creep.room.name == target.roomName && creep.store.getFreeCapacity()>0){
            // pick up resouce
            if (sourceContainer.length){
                if (creep.pos.isEqualTo(sourceContainer[0])){
                    creep.moveTo(home);
                }
                else if (!creep.pos.isNearTo(sourceContainer[0])){
                    creep.moveTo(sourceContainer[0],{reusePath:15});
                }
                else {
                    creep.withdraw(sourceContainer[0], RESOURCE_ENERGY,creep.store.getFreeCapacity());
                }
            }
            else {
                creep.moveTo(target);
            }
            
        }
    }

};

function sour(creep, sourceCon){
    if (sourceCon){
        return creep.pos.inRangeTo(sourceCon,6);
    }
    return false;
}