var classBase = require('class.base');
var tasks = require('role.tasks');

module.exports = {

    /** tells upgrade creep what to do**/
    run: function(creep, base) {
        //Check whether or not it is currently upgrading so it doens't try to get more energy after one upgrade tick
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading=true;
            creep.say('🚧 Upgrade');
        }	
        
        // If its not upgrading then go get energy
        if(!creep.memory.upgrading) {
            tasks.getEnergy(creep, base, true);
        }
        // if its not getting energy then upgrade the controller
        else {
            tasks.upgradeControl(creep, base);
        }
	}
};

