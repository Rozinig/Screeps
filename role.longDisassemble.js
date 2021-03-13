var classBase = require('class.base');
var tasks = require('role.tasks');

module.exports = {
    run: function(creep, base){
        if (creep.room.name != 'E23N5'){
            creep.moveTo(new RoomPosition(44,25,'E23N5'));
        }
        else{
            
        var closestBuilding =creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES);
        if (closestBuilding){
            if (!creep.pos.isNearTo(closestBuilding)){
                creep.moveTo(closestBuilding);
                return;
            }
            else{
                console.log(creep.dismantle(closestBuilding));
                return;
            }
        }
        }
    }

};