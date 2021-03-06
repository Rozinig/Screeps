var classBase = require('class.base');
var tasks = require('role.tasks');

module.exports  = {

    /**  Defines how a builder role creep acts**/
    run: function(creep, base) {

        //Sets whether or not the builder is currently building so that it doesn't try to refill energery after one build tick
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        // If its building then go through task list
        if(!creep.memory.building) {
            tasks.getEnergy(creep, base, true); // If its all out of energy go get more
        }
        
        else if (tasks.buildSite(creep)){ //Find construction sites and build
        }
        
        // If there are no active construction sites do other useful tasks
        else if (tasks.deliverEnergy(creep, base)){ // If not building check and see if anything needs energy and deliver it
        }
        
        // If there are not construction site and nothing needs energy then upgrader the controller
        else{
            tasks.upgradeControl(creep, base);
        }
    }
};
