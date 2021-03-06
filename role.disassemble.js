var classBase = require('class.base');
var tasks = require('role.tasks');

module.exports = {
    run: function(creep, base){
        
        if(creep.memory.working && creep.store[RESOURCE_ENERGY]==0){
            creep.memory.working= false;
        }
        if (creep.store.getFreeCapacity()>0 && !creep.memory.working){
            if (creep.dismantle(base.disSites[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(base.disSites[0]);
            }
        }
        else{
            creep.memory.working=true;
            tasks.deliverEnergy(creep, base);
        }
    }

};