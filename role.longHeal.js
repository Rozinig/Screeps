module.exports = {
    run: function(creep, base){
        const target = new RoomPosition(creep.memory.target.x,creep.memory.target.y,creep.memory.target.roomName);
        var keeper = creep.room.find(FIND_HOSTILE_CREEPS, { filter: (creeper) => {return creeper.pos.inRangeTo(creep,3);}});
        var healTargets = creep.room.find(FIND_MY_CREEPS, { filter: (creeper) => {
                return creeper.hits <creeper.hitsMax && creeper.pos.isNearTo(creep);}});
        if (healTargets.length ){
            creep.heal(healTargets[0]);
        }
        else {
            var healTargets = creep.room.find(FIND_MY_CREEPS, { filter: (creeper) => {
                return creeper.hits <creeper.hitsMax && creeper.pos.inRangeTo(creep,3);}});
            if ( healTargets.length ){
                creep.rangedHeal(healTargets[0]);
            }
            
        }
        //if () not in target room a
        if (creep.room.name != target.roomName ){
            // go to target room
            creep.moveTo(target); //, {reusePath:15});
            
        }
        
        else if (keeper.length){
            creep.move(keeper[0].pos.getDirectionTo(creep));
        }
        else {
            var miner = creep.room.find(FIND_MY_CREEPS,{filter: (creeper)=> {return creeper.memory.target.x == target.x 
            && creeper.memory.target.y == target.y && creeper.memory.role == 'longAttackMiner'}});
            if (miner.length){
                if (!creep.pos.isNearTo(miner[0])){
                    creep.moveTo(miner[0]);
                }
            }
        }
    }

};