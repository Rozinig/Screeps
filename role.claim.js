var classBase = require('class.base');

module.exports = {
    run: function(creep){
        const post = new RoomPosition(34, 6, 'E23N4');
        if (!creep.pos.isEqualTo(post)){
            creep.moveTo(post);
        }
        else {
            creep.claimController(creep.room.controller);
        }
    }

};