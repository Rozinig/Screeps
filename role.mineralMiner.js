var classBase = require('class.base');

module.exports = {

    run: function(creep, base){
        
        if (base.mineralContainers.length>0){
            if (creep.pos.isEqualTo(base.mineralContainers[0])){
                creep.harvest(base.minerals[0]);
                return;
            }
            else {
                creep.moveTo(base.mineralContainers[0].pos);
                return;
            }
        }
    }
};