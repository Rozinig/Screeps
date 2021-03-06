var classBase = require('class.base');

module.exports = {
    run: function(creep){
        var point = new RoomPosition(8, 44, 'E24N6');
        var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile){
            if (!creep.pos.isNearTo(closestHostile)){
                creep.moveTo(closestHostile);
            }
            else{
                creep.attack(closestHostile);
            }
        }
        else if (creep.pos.isNearTo(point)){
            creep.moveTo(point);
        }
};