module.exports = {
    run: function(creep) {
        // creep.say("healy");

        // Rally to most recent flag
        const flags = creep.room.find(FIND_FLAGS);
        if (flags.length > 0) {
            // flags[flags.length-1].color == 1
            // flags[flags.length-1].secondarycolor == 1
            creep.moveTo(flags[flags.length-1]);
        }
        
        let triage = function(targets) {
            let healtarget = targets[0];
            let movetarget = targets[0];
            for (let target of targets) {
                if (target.hits / target.hitsMax < movetarget.hits / movetarget.hitsMax) {
                    movetarget = target;
                    if (creep.pos.getRangeTo(target) <= 1) {
                        if (target.hits / target.hitsMax < healtarget.hits / healtarget.hitsMax) {
                            healtarget = target;
                        }
                    }
                }
            }
            creep.heal(healtarget);
            if (movetarget.hits != movetarget.hitsMax) {
                creep.moveTo(movetarget);
            }
        }

        const friendlies = creep.room.find(FIND_MY_CREEPS);
        triage(friendlies);
	}
};