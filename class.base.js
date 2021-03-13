module.exports = {
    base: class {
        constructor(room){
            this.room = room;
            this.sources = room.find(FIND_SOURCES);
            this.buildSites = room.find(FIND_CONSTRUCTION_SITES);
            this.sourceContainers = room.find(FIND_STRUCTURES, { filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) && (structure.pos.isNearTo(this.sources[0]) || 
                structure.pos.isNearTo(this.sources[1])|| 
                structure.pos.isNearTo(this.sources[2])|| 
                structure.pos.isNearTo(this.sources[3]) );}});
            if (room.controller){
                this.sinkContainers = room.find(FIND_STRUCTURES, { filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) && structure.pos.inRangeTo(room.controller.pos,3);}});
            }
            else {
                this.sinkContainers=[];
            }
            this.extensions = room.find(FIND_STRUCTURES, { filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION);}});
            this.disSites = room.find(FIND_STRUCTURES, {
                    filter: (structure) =>  { return( structure.pos.lookFor(LOOK_FLAGS, {
                    filter: (flag) => flag.color == COLOR_RED}).length>0)}});
            this.hostiles = room.find(FIND_HOSTILE_CREEPS);
            this.hostileBodyParts =0;
            for (var creep of this.hostiles){
                this.hostileBodyParts= this.hostileBodyParts + creep.body.length;
            } 
            this.energySinks = room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN||
                    structure.structureType == STRUCTURE_TOWER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) || 
                    (structure.structureType == STRUCTURE_STORAGE && structure.store.getUsedCapacity() <1000));
                }
            });
            this.energySinksSize= [];
            for (var structure of this.energySinks){
                this.energySinksSize.push(structure.store.getFreeCapacity(RESOURCE_ENERGY));
            }
            this.repairSites = room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && structure.hits <100000 
                && !(structure.pos.lookFor(LOOK_FLAGS, {
                filter: (flag) => flag.color == COLOR_RED}).length)}); 
        }
    }
};