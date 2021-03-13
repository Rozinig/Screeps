module.exports = {
    run: function(creep, base){
        const target = new RoomPosition(creep.memory.target.x,creep.memory.target.y,creep.memory.target.roomName);
        //if () not in target room a
        if (creep.room.name != target.roomName ){
            // go to target room
            creep.moveTo(target, {reusePath:15});
            
        }
        
        else if (creep.room.controller.reservation == undefined || creep.room.controller.reservation.username =='Rozinig'){
            if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            if (creep.attackController(creep.room.controller) == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller);
            }
        }
    }

};