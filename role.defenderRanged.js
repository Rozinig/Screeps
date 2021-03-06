var classBase = require('class.base');

module.exports = {
    run: function(creep){
        var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile){
            if (!creep.pos.isNearTo(closestHostile,3)){
                creep.moveTo(closestHostile);
            }
            else{
                creep.rangedAttack(closestHostile);
            }
        }
    }
};