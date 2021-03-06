var classBase = require('class.base');

module.exports = {

    run: function(creep, base){
        
        if (base.sourceContainers.length>0){
            if (base.sourceContainers.length>1){
                if (creep.pos.isEqualTo(base.sourceContainers[1])){
                    creep.harvest(base.sources[1]);
                    return;
                }
            }
            if (creep.pos.isEqualTo(base.sourceContainers[0])){
                creep.harvest(base.sources[0]);
                return;
            }
            else  if (base.sourceContainers[0].pos.lookFor(LOOK_CREEPS) ==''  || base.sourceContainers[0].pos.lookFor(LOOK_CREEPS)[0].memory.role != 'miner'){
                creep.moveTo(base.sourceContainers[0].pos);
                return;
            }
        }
        if (base.sourceContainers.length>1) {
            if (base.sourceContainers[1].pos.lookFor(LOOK_CREEPS) ==''  || base.sourceContainers[1].pos.lookFor(LOOK_CREEPS)[0].memory.role != 'miner'){
                creep.moveTo(base.sourceContainers[1].pos);
                return;
            }
            else if (creep.pos.isEqualTo(base.sourceContainers[1])){
                creep.harvest(base.sources[1]);
                return;
            }
        }
    }
};