var classBase = require('class.base');

//Pulls in all role modules
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleMineralMiner = require('role.mineralMiner');
var roleUpgraderContainer = require('role.upgraderContainer');
var roleHauler = require('role.hauler');
var roleHauler2 = require('role.hauler2');
var roleLongHarvest = require('role.longHarvest');
var roleLongMiner = require('role.longMiner');
var roleLongHauler = require('role.longHauler');
var roleLongClaim = require('role.longClaim');
var roleLongAttackMiner = require('role.longAttackMiner');
var roleLongHeal = require('role.longHeal');
var roleLongDefender = require('role.longDefender');
var roleDisassemble = require('role.disassemble');
var roleLongDisassemble = require('role.longDisassemble');
var roleDefenderMelee = require('role.defenderMelee');
var roleDefenderHeals = require('role.defenderHeals');
var roleDefenderRanged = require('role.defenderRanged');
var roleClaim = require('role.claim');
var roleSpawnBuilder = require('role.spawnBuilder');


//Spawns creeps in order of need
module.exports = {

    run: function() {
        
        /*var longSources = [];
        var longRoom = [];
        var allSpawns = [];
        for (var name in Game.spawns){
            allSpawns.push(Game.spawns[name]);
        }
        for (var name in Game.flags){
            flag =Game.flags[name];
            if (flag.color == COLOR_YELLOW){
                longSources.push(flag);
                //console.log(flag.pos.findPathTo(allSpawns[0]).length);
            }
        }
        console.log(longSources);*/
            
        // Room Loop
        
        for(var name in Game.rooms){
            var room = Game.rooms[name];
            
            var base = new classBase.base(room);
            
            //current max creeps by type
            var harvesterCount =2;
            var builderCount =2;
            var upgraderCount = 4;
            var conUpgraderCount =3;
            var haulerCount =3;
            var hauler2Count = 4;
            var disassemblersCount=2;
            var longHarvestersCount=3;
            var longHarvestArray = [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
            var longHarvestArray2 = [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
            
            //Count all current creep types
            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name ==room.name);
            var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name ==room.name);
            var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room.name ==room.name);
            var miners = _.filter(Game.creeps, (creep) => creep.memory.role =='miner' && creep.room.name ==room.name);
            var mineralMiners = _.filter(Game.creeps, (creep) => creep.memory.role =='mineralMiner' && creep.room.name ==room.name);
            var conUpgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgraderContainer' && creep.room.name ==room.name && creep.ticksToLive > 75);
            var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler' && creep.room.name ==room.name && creep.memory.far);
            var hauler2s = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler' && creep.room.name ==room.name && !creep.memory.far);
            var disassemblers = _.filter(Game.creeps, (creep) => creep.memory.role == 'disassemble' && creep.room.name ==room.name);
            var defendersMelee = _.filter(Game.creeps, (creep) => creep.memory.role == 'defenderMelee' && creep.room.name ==room.name);
            var defendersHeals = _.filter(Game.creeps, (creep) => creep.memory.role == 'defenderHeals' && creep.room.name ==room.name);
            var defendersRanged = _.filter(Game.creeps, (creep) => creep.memory.role == 'defenderRanged' && creep.room.name ==room.name);
            if (haulers.length>0){
                harvesterCount=1;
            }
            
            
            // Start spawn loop
            
            var spawners = room.find(FIND_MY_SPAWNS);
            for (var spawn of spawners){
                
                //Count and Spawn Harvesters as necessary
                if((harvesters.length < harvesterCount)) {
                    var newName = 'Harvester' + Game.time;
                    if(room.energyAvailable>400){
                        spawn.spawnCreep([WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName, 
                            {memory: {role: 'harvester'}});
                    }
                    else {
                        spawn.spawnCreep([WORK,CARRY,MOVE], newName, 
                            {memory: {role: 'harvester'}});
                    }
                        harvesterCount--;
                }
                
                //Miners
                else if (miners.length <base.sourceContainers.length || (minerticks(base.sourceContainers, miners) && miners.length <(base.sourceContainers+1))){ //there is a conatiner next to a source without a creep on of of role miner and miner.length < source Contrainers.length 
                    var newName = 'Miner' + Game.time;
                        spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE], newName, 
                        {memory: {role: 'miner'}}); 
                } 
                
                // Count sites and builders Spawn builders if necessary
                else if(builders.length < builderCount && (base.buildSites.length > 0 || base.repairSites.length >0) && (harvesters.length >= harvesterCount || haulers.length>0) ) {
                    var newName = 'Builder' + Game.time;
                    if (room.energyCapacityAvailable>=950){
                        spawn.spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
                            {memory: {role: 'builder'}});    
                            builderCount--;
                    }
                    else if(room.energyCapacityAvailable>=750){
                        spawn.spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
                            {memory: {role: 'builder'}});    
                            builderCount--;
                    }
                    else {
                        spawn.spawnCreep([WORK,CARRY,MOVE], newName, 
                            {memory: {role: 'builder'}});    
                            builderCount--;
                    }
                }
                
                //Cound and Spawn Upgraders as necessary
                else if(upgraders.length < upgraderCount && harvesters.length>=harvesterCount && base.sinkContainers.length <1) {
                    var newName = 'Upgrader' + Game.time;
                    if (room.energyCapacityAvailable>=550){
                        spawn.spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
                            {memory: {role: 'upgrader'}});      
                    }
                    else{
                        spawn.spawnCreep([WORK,CARRY,MOVE], newName, 
                            {memory: {role: 'upgrader'}});      
                    }
                        upgraderCount--;
                }
                
                //container upgrader
                else if((conCap(base.sinkContainers,0,0) && conUpgraders.length < 1) || ( conCap(base.sinkContainers,0,1700) && conUpgraders.length < conUpgraderCount && conUpgraders[conUpgraders.length-1].ticksToLive <1400)) {
                    if (room.energyCapacityAvailable>=1200){
                        var newName = 'conUpgrader' + Game.time;
                        spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, 
                            {memory: {role: 'upgraderContainer'}});        
                            conUpgraderCount--;
                    }
                    else{
                        var newName = 'conUpgrader' + Game.time;
                        spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], newName, 
                            {memory: {role: 'upgraderContainer'}});        
                            conUpgraderCount--;
                    }
                }
                    
                // Hauler2
                else if (miners.length > 1 && hauler2s.length< hauler2Count && (haulers.length <1 || (conCap(base.sourceContainers, 1, 1500) && haulers[haulers.length-1].ticksToLive <1400))) {
                    var newName = 'Hauler2' + Game.time;
                    spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
                        {memory: {role: 'hauler', far: false}});        
                        hauler2Count--;
                }
                
                // Hauler
                else if ( miners.length > 0 && haulers.length< haulerCount && (haulers.length <1 || (conCap(base.sourceContainers, 0, 1700) && haulers[haulers.length-1].ticksToLive <1400))) {
                    var newName = 'Hauler' + Game.time;
                    spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
                        {memory: {role: 'hauler', far: true}});        
                        haulerCount--;
                }
                
                //Disassemblers
                /*else if (disassemblers <disassemblersCount && base.disSites.length>0){
                    var newName = 'Disasseble' + Game.time;
                    spawn.spawnCreep([WORK,WORK,WORK, WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
                        {memory: {role: 'disassemble'}});        
                        disassemblersCount--;
                }*/
                
                // Melee Defenders
                else if (defendersMelee.length <((base.hostileBodyParts-100)/20) && base.hostiles.length>0){
                    var newName = 'DefenderMelee' + Game.time;
                    spawn.spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
                        {memory: {role: 'defenderMelee'}});        
                }
                
                // Mineral Miners
                /*else if (mineralMiners.length <base.mineralContainers.length || (minerticks(base.mineralContainers, mineralMiners) && miners.length <(base.mineralContainers+1))){ //there is a conatiner next to a source without a creep on of of role miner and miner.length < source Contrainers.length 
                    var newName = 'MineralMiner' + Game.time;
                        spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE], newName, 
                        {memory: {role: 'mineralMiner'}}); 
                } */
                
                
                // Long Harvest
                else {
                    if(spawn.memory.safeLongHarvestTargets){
                        for ( var pos of spawn.memory.safeLongHarvestTargets){
                            var longHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'longHarvest' && targetRoom(creep,pos));
                            if (longHarvesters.length<longHarvestersCount) {
                                var newName = 'LongHarvest' + Game.time;
                                spawn.spawnCreep(longHarvestArray, newName, 
                                    {memory: {role: 'longHarvest',target: pos, home: spawn.pos}}); 
                            }
                        }
                    
                    }
                
                    // Long Miner
                    if(spawn.memory.safeLongMinerTargets){
                        for ( let temp of spawn.memory.safeLongMinerTargets){
                            var pos=new RoomPosition(temp.x, temp.y, temp.roomName);
                            var longMiners = _.filter(Game.creeps, (creep) => creep.memory.role == 'longMiner' && targetRoom(creep,pos) && creep.ticksToLive>120);
                            var longHaulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'longHauler' && targetRoom(creep,pos) && creep.ticksToLive >60);
                            var longClaim = _.filter(Game.creeps, (creep) => creep.memory.role == 'longClaim' && targetRoom(creep,pos));
                            var longDefenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'longDefender' && targetRoom(creep,pos));
                            if ((hostileBuildingCheck(pos) || hostileCreepCheck(pos,0)) && longDefenders <1){
                                var newName = 'LongDefender' + Game.time;
                                spawn.spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,HEAL,HEAL], newName, 
                                    {memory: {role: 'longDefender',target: pos}}); 
                                    break;
                            }
                            else if (longMiners.length < 1 ){
                                var newName = 'LongMiner' + Game.time;
                                spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
                                    {memory: {role: 'longMiner',target: pos}}); 
                                    break;
                            }
                            else if (longHaulers.length < 2 ){
                                var newName = 'LongHauler' + Game.time;
                                spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
                                //spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
                                    {memory: {role: 'longHauler',target: pos, home: spawn.pos}}); 
                                    break;
                            }
                            else if (longClaim.length<1 && reserveCheck(Game.rooms[pos.roomName].controller)){
                                var newName = 'LongClaim' + Game.time;
                                spawn.spawnCreep([CLAIM,CLAIM,CLAIM,MOVE,MOVE,MOVE], newName, 
                                    {memory: {role: 'longClaim',target: pos}}); 
                                    break;
                            }
                        }
                    }
                
                
                    // Long Miner Source Keep Room
                    if(spawn.memory.sourceKeeperTargets){
                        for ( let temp of spawn.memory.sourceKeeperTargets){
                            var pos=new RoomPosition(temp.x, temp.y, temp.roomName);
                            var longAttackMiners = _.filter(Game.creeps, (creep) => creep.memory.role == 'longAttackMiner' && targetRoom(creep,pos) && creep.ticksToLive > 200);
                            var longHaulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'longHauler' && targetRoom(creep,pos) && creep.ticksToLive >75);
                            var longHeal = _.filter(Game.creeps, (creep) => creep.memory.role == 'longHeal' && targetRoom(creep,pos) && creep.ticksToLive > 100);
                            if (pos.y ==3){
                                var longHaulerCount=3;
                            }
                            else {
                                var longHaulerCount=2;
                            }
                            if (hostileBuildingCheck(pos) || hostileCreepCheck(pos,4)){
                                
                            }
                            else if (longAttackMiners.length < 1 ){
                                var newName = 'LongAttackMiner' + Game.time;
                                spawn.spawnCreep([TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,
                                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE], newName, 
                                    {memory: {role: 'longAttackMiner',target: pos}}); 
                                    break;
                            }
                            else if (longHeal.length<1){
                                var newName = 'LongHeal' + Game.time;
                                spawn.spawnCreep([MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,MOVE,HEAL], newName, 
                                    {memory: {role: 'longHeal',target: pos}}); 
                                    break;
                            }
                            else if (longHaulers.length < longHaulerCount ){
                                var newName = 'LongHauler' + Game.time;
                                //spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
                                spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
                                    {memory: {role: 'longHauler',target: pos, home: spawn.pos}});
                                    break; 
                            }
                        }
                    }
                }
                
                
            
                //Nice little text that says whats spawning
                if(spawn.spawning) { 
                    var spawningCreep = Game.creeps[spawn.spawning.name];
                    spawn.room.visual.text(
                        '🛠️' + spawningCreep.memory.role,
                        spawn.pos.x + 1, 
                        spawn.pos.y, 
                        {align: 'left', opacity: 0.8});
                }
            }
            //end Spawn loop
            
             //var start = Game.cpu.getUsed();
            
            //run creeps in room
            var creepers = room.find(FIND_MY_CREEPS);
            for(var creep of creepers) {
                if(creep.memory.role == 'harvester') {
                    roleHarvester.run(creep, base);
                }
                else if(creep.memory.role == 'upgrader') {
                    roleUpgrader.run(creep, base);
                }
                else if(creep.memory.role == 'builder') {
                    roleBuilder.run(creep, base);
                }
                else if (creep.memory.role == 'miner'){
                    roleMiner.run(creep, base);
                }
                else if (creep.memory.role == 'mineralMiner'){
                    roleMineralMiner.run(creep, base);
                }
                else if (creep.memory.role == 'hauler2'){
                    roleHauler2.run(creep, base);
                }
                else if (creep.memory.role == 'hauler'){
                    roleHauler.run(creep, base);
                }
                else if (creep.memory.role == 'longHarvest'){
                    roleLongHarvest.run(creep, base);
                }
                else if (creep.memory.role == 'longMiner'){
                    roleLongMiner.run(creep, base);
                }
                else if (creep.memory.role == 'longHauler'){
                    roleLongHauler.run(creep, base);
                }
                else if (creep.memory.role == 'longClaim'){
                    roleLongClaim.run(creep, base);
                }
                else if (creep.memory.role == 'longAttackMiner'){
                    roleLongAttackMiner.run(creep, base);
                }
                else if (creep.memory.role == 'longHeal'){
                    roleLongHeal.run(creep, base);
                }
                else if (creep.memory.role == 'longDefender'){
                    roleLongDefender.run(creep, base);
                }
                else if (creep.memory.role == 'disassemble'){
                    roleDisassemble.run(creep, base);
                }
                else if (creep.memory.role == 'longDisassemble'){
                    roleLongDisassemble.run(creep, base);
                }
                else if (creep.memory.role == 'defenderMelee'){
                    roleDefenderMelee.run(creep, base);
                }
                else if (creep.memory.role == 'defenderHeals'){
                    roleDefenderHeals.run(creep, base);
                }
                else if (creep.memory.role == 'defenderRanged'){
                    roleDefenderRanged.run(creep, base);
                }
                else if (creep.memory.role == 'claim'){
                    roleClaim.run(creep, base);
                }
                else if (creep.memory.role == 'spawnBuilder'){
                    roleSpawnBuilder.run(creep, base);
                }
                if (base.sinkContainers.length){ 
                    if (creep.memory.role == 'upgraderContainer'){
                        roleUpgraderContainer.run(creep, base);
                    }
                }
            }
                
            //console.log(room, Game.cpu.getUsed()-start);
        } 
    }
};

function conCap(Containers, i, cap){
    if (Containers.length){
        return (Containers[i].store.getUsedCapacity() > cap);
    } 
    else{
        return false;
    }
}

function minerticks(sourceContainers, miners){
    if (sourceContainers.length){
        var creep = sourceContainers[0].pos.lookFor(LOOK_CREEPS);
        if (creep){
            if(creep.ticksToLive < 40){
                return true;
            }
        }
    }
    if (sourceContainers.length>1){
        var creep = sourceContainers[1].pos.lookFor(LOOK_CREEPS);
        if (creep){
            if(creep.ticksToLive<100){
                return true;
            }
        }
    }
    return false;
}

function targetRoom(creep, pos){
    if (creep.memory.target){
        if (creep.memory.target.x == pos.x && creep.memory.target.y == pos.y && creep.memory.target.roomName == pos.roomName)
        return true;
    }
    return false;
}

function reserveCheck(controller){
    if (!controller){
        return true;
    }
    else if (!controller.reservation){
        return true;
    }
    else if (controller.reservation.username == 'Rozinig' && controller.reservation.ticksToEnd <2500){
        return true;
    }
    else if (controller.reservation.username == 'Invader' ){
        return true;
    }
    else {
        return false;
    }
}

function hostileBuildingCheck(pos){
    if (pos.roomName in Game.rooms){
        var buildings = Game.rooms[pos.roomName].find(FIND_HOSTILE_STRUCTURES);
        if (buildings.length>0){
            return true;
        }
    }
    return false;
}

function hostileCreepCheck(pos, count){
    if (pos.roomName in Game.rooms){
        var creeps = Game.rooms[pos.roomName].find(FIND_HOSTILE_CREEPS);
        if (creeps.length>count){
            return true;
        }
    }
    return false;
}