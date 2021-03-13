var classBase = require('class.base');

module.exports = {
    // Task to fill creep with energy
    getEnergy: function(creep,base, far){
        var size =lowFruit(creep);
        
            var miners = _.filter(Game.creeps, (creeper) => creeper.memory.role =='miner' && creeper.room.name ==creep.room.name);
        if (base.sourceContainers.length>0 && miners.length>0){
            if (far){
                var sourceCon = creep.pos.findClosestByPath(base.sourceContainers);
            }
            else{
                if (base.sourceContainers.length>1){
                var sourceCon = base.sourceContainers[1];
                }
                else{
                    var sourceCon = base.sourceContainers[0];
                }
            }
            
            if (sourceCon){
                if (creep.withdraw(sourceCon, RESOURCE_ENERGY, creep.store.getFreeCapacity()-size)== ERR_NOT_IN_RANGE){
                        creep.moveTo(sourceCon);
                }
            }
            
            
            if (creep.pos.isEqualTo(base.sourceContainers[0].pos)){
                creep.move(TOP);
            }
            return;
        }
        var sources = creep.pos.findClosestByPath(FIND_SOURCES);
        if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        
    },
    
    // Task to take energy in creep to structure that does not have full energy
    deliverEnergy: function(creep, base){
        lowFruit(creep);
        var target = creep.pos.findClosestByPath(base.energySinks);
        if(target) {
            var i = base.energySinks.indexOf(target);
            if (creep.store.getUsedCapacity() > base.energySinksSize[i]){
                base.energySinks.splice(i,1);
                base.energySinksSize.splice(i,1);
            }
            else {
                base.energySinksSize[i]=base.energySinksSize[i]-creep.store.getUsedCapacity();
            }
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        }
        else if (base.sinkContainers.length){
            if (creep.transfer(base.sinkContainers[0], RESOURCE_ENERGY)== ERR_NOT_IN_RANGE ){
                creep.moveTo(base.sinkContainers[0]);
            return true;
            }
        }
        
        return false;
    },
    
    // Task to build construction sites
    buildSite: function(creep){
        lowFruit(creep);
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(targets.length>0) {
            if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        }
        const repairAmount = [1000, 2000, 10000, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000,5000000]
        var repairs=null;
        for (i=0; repairs== null && i < repairAmount.length; i++){
            repairs = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) =>  repairList(structure, repairAmount[i])});
            repairsHere = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) =>  repairList(structure, repairAmount[i+1])});
            if (repairsHere){
                if (creep.pos.inRangeTo(repairsHere.pos,3)){
                    repairs = repairsHere;
                }
            }
        }
        if (repairs!=null){
            if (creep.repair(repairs) == ERR_NOT_IN_RANGE){
                creep.moveTo(repairs, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        }
        return false;

    },
    
    //Task to upgrade room controller
    upgradeControl: function(creep, base){
            lowFruit(creep);
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
    }
};

function lowFruit(creep){
    var fruit = creep.room.find(FIND_DROPPED_RESOURCES, {filter: (resource) => {
        return resource.pos.isNearTo(creep.pos);}});
    if (fruit.length){
        creep.pickup(fruit[0]);
        return fruit[0].amount;
    }
    return 0;
    
}
function repairList(structure, hitLimit){
    return (structure.hits < structure.hitsMax && structure.hits< hitLimit && (structure.hitsMax-structure.hits)>1000  && !(structure.pos.lookFor(LOOK_FLAGS, {
                filter: (flag) => flag.color == COLOR_RED}).length));
}