// Hope to auto build bases by setting construction sites needs lots of work.
module.exports = {
    run: function(room) {
        //Sets maximum or available for each structure based on Room level
        var roomLevel = room.controller.level;
        var maxExtensions;
        switch (roomLevel){
            case 0:
                maxSpawns=0;
                maxExtensions=0;
                maxTowers = 0;
                maxLinks =0;
                maxlabs=0;
                rampartsAvailable = false;
                wallsAvailable = false;
                storageAvailable = false;
                extractorAvailable = false;
                terminalAvailable = false;
                observerAvailable = false;
                powerSpawnAvailable = false;
                break;
            case 1:
                maxSpawns=1;
                maxExtensions=0;
                maxTowers = 0;
                maxLinks =0;
                maxlabs=0;
                rampartsAvailable = false;
                wallsAvailable = false;
                storageAvailable = false;
                extractorAvailable = false;
                terminalAvailable = false;
                observerAvailable = false;
                powerSpawnAvailable = false;
                break;
            case 2:
                maxSpawns=1;
                maxExtensions=5;
                maxTowers = 0;
                maxLinks =0;
                maxlabs=0;
                rampartsAvailable = true;
                wallsAvailable = true;
                storageAvailable = false;
                extractorAvailable = false;
                terminalAvailable = false;
                observerAvailable = false;
                powerSpawnAvailable = false;
                break;
            case 3:
                maxSpawns=1;
                maxExtensions=10;
                maxTowers = 1;
                maxLinks =0;
                maxlabs=0;
                rampartsAvailable = true;
                wallsAvailable = true;
                storageAvailable = false;
                extractorAvailable = false;
                terminalAvailable = false;
                observerAvailable = false;
                powerSpawnAvailable = false;
                break;
            case 4:
                maxSpawns=1;
                maxExtensions=20;
                maxTowers = 1;
                maxLinks =0;
                maxlabs=0;
                rampartsAvailable = true;
                wallsAvailable = true;
                storageAvailable = true;
                extractorAvailable = false;
                terminalAvailable = false;
                observerAvailable = false;
                powerSpawnAvailable = false;
                break;
            case 5:
                maxSpawns=1;
                maxExtensions=30;
                maxTowers = 2;
                maxLinks = 2;
                maxlabs=0;
                rampartsAvailable = true;
                wallsAvailable = true;
                storageAvailable = true;
                extractorAvailable = false;
                terminalAvailable = false;
                observerAvailable = false;
                powerSpawnAvailable = false;
                break;
            case 6:
                maxSpawns=1;
                maxExtensions=40;
                maxTowers = 2;
                maxLinks = 3;
                maxlabs=3;
                rampartsAvailable = true;
                wallsAvailable = true;
                storageAvailable = true;
                extractorAvailable = true;
                terminalAvailable = true;
                observerAvailable = false;
                powerSpawnAvailable = false;
                break;
            case 7:
                maxSpawns=2;
                maxExtensions=50;
                maxTowers = 3;
                maxLinks = 4;
                maxlabs=6;
                rampartsAvailable = true;
                wallsAvailable = true;
                storageAvailable = true;
                extractorAvailable = true;
                terminalAvailable = true;
                observerAvailable = false;
                powerSpawnAvailable = false;
                break;
            case 8:
                maxSpawns=3;
                maxExtensions=60;
                maxTowers = 6;
                maxLinks =6;
                maxlabs=10;
                rampartsAvailable = true;
                wallsAvailable = true;
                storageAvailable = true;
                extractorAvailable = true;
                terminalAvailable = true;
                observerAvailable = true;
                powerSpawnAvailable = true;
                break;
                
        }
        maxContainers =5;
        
        
        //adds new Extension construction site
        var extensions = room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION )}});
        if (extensions.length < maxExtensions){
            
            room.createConstructionSite(22,21,STRUCTURE_EXTENSION, ['Extension'+Game.time]);
        }
        
    }
};