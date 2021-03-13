var classBase = require('class.base');
var tasks = require('role.tasks');

module.exports = {

    /** Tell a harvester creep what to do**/
    run: function(creep, base) {
        //If it was working and is now out of energy reset the working tag so it can get more energy
        if(creep.memory.working && creep.store[RESOURCE_ENERGY]==0){
            creep.memory.working= false;
        }
        
        // If it is not working and doens't have full energy then go get energy
	    if(creep.store.getUsedCapacity() == 0 && !creep.memory.working) {
	        tasks.getEnergy(creep, base, true);
        }
        
        // If not getting energy then go do work!
        else if (tasks.deliverEnergy(creep, base)){  // Main piority check what needs energy and deliver
        }
        
        // If everyone has energy then help build construcion sites
        else if (tasks.buildSite(creep)){
            creep.memory.working=true;
        }
        
        // If nothing else upgrade teh controller
        else {
            tasks.upgradeControl(creep, base);
            creep.memory.working=true;
        }
	}
};