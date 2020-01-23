var opening = [
    {a: 'Dark', b: 1, hb: 2, builderDone: true, m: 1},
    {a: 'Dark', h: 4, m: 1},
    {a: 'Dark', h: 5, m: 1},
    {a: 'Dark', h: 6, m: 1},
    {a: 'Dark', h: 6, lj: 1, m: 1},
    {a: 'Dark', h: 6, lj: 2, m: 1},
    {a: 'Dark', h: 6, lj: 3, m: 1},
];
var archers = opening.concat(
    {a: 'Dark', h: 6, lj: 4, m: 1},
    {a: 'Dark', h: 7, lj: 4, m: 1},
    {a: 'Dark', h: 8, lj: 4, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 1, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 2, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 3, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 4, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 4, fa: 1, m: 1},
    {a: 'Dark', h: 8, lj: 5, fo: 4, fa: 1, m: 1},
    {a: 'Dark', h: 8, lj: 6, fo: 4, fa: 1, message: 'Boar done', m: 1},
    {a: 'Dark', h: 3, lj: 9, fo: 4, fa: 1, gm: 3, m: 1},
    {a: 'Dark', h: 3, lj: 10, fo: 4, fa: 1, gm: 3, m: 1},
    {l: true, a: 'Dark', h: 3, lj: 11, fo: 4, fa: 1, gm: 3, m: 1},
    {l: true, a: 'Feudal', h: 3, lj: 11, fo: 4, fa: 1, gm: 3, m: 1},
    {l: true, a: 'Feudal', h: 3, lj: 11, fo: 4, fa: 1, gm: 3, m: 1},
    {l: true, a: 'Feudal', h: 3, lj: 10, fo: 4, fa: 1, gm: 3, b: 1, m: 1},
    {l: true, a: 'Feudal', h: 3, lj: 10, fo: 4, fa: 1, gm: 3, b: 1, builderDone: true, m: 1, message: 'Barracks complete'},
    {l: true, a: 'Feudal', h: 3, lj: 10, fo: 4, fa: 1, gm: 3, hb: 1, m: 1, newAge: true},
    {l: true, a: 'Feudal', dba: true, h: 3, lj: 9, fo: 4, fa: 1, gm: 3, b: 2, m: 1},
    {l: true, a: 'Feudal', dba: true, h: 3, lj: 9, fo: 4, fa: 1, gm: 4, b: 2, builderDone: true, m: 1, message: 'Ranges complete'},
    {l: true, a: 'Feudal', dba: true, h: 3, lj: 10, fo: 4, fa: 1, gm: 5, b: 1, m: 1},
    {l: true, a: 'Feudal', dba: true, h: 3, lj: 10, fo: 4, fa: 1, gm: 6, b: 1, builderDone: true, sheepDone: true, m: 3, message: 'Blacksmith complete'},
    {l: true, a: 'Feudal', dba: true, hc: true, fl: true, lj: 11, fo: 4, fa: 4, gm: 7, m: 5},
    {l: true, a: 'Feudal', dba: true, hc: true, fl: true, lj: 11, fo: 4, fa: 4, gm: 8, m: 5},
    {l: true, a: 'Feudal', dba: true, hc: true, fl: true, lj: 11, fa: 5, fo: 4, gm: 8, berriesDone: true, m: 7},
    {l: true, a: 'Feudal', dba: true, hc: true, fl: true, lj: 11, fa: 10, gm: 8, m: 9},
    {l: true, a: 'Feudal', dba: true, hc: true, fl: true, lj: 11, fa: 11, gm: 8, m: 11},
    {l: true, a: 'Feudal', dba: true, hc: true, fl: true, lj: 11, fa: 12, gm: 8, m: 11},
    {l: true, a: 'Feudal', dba: true, hc: true, fl: true, lj: 11, fa: 13, gm: 8, m: 13},
    {l: true, a: 'Feudal', dba: true, hc: true, fl: true, lj: 11, fa: 14, gm: 8, m: 15},
    {l: true, a: 'Feudal', dba: true, hc: true, fl: true, lj: 11, fa: 15, gm: 8, m: 15},
    {l: true, a: 'Feudal', dba: true, hc: true, fl: true, lj: 11, fa: 16, gm: 8, m: 17},
    {l: true, a: 'Feudal', dba: true, hc: true, fl: true, lj: 11, fa: 17, gm: 8, m: 19},
    {l: true, a: 'Feudal', dba: true, hc: true, fl: true, wb: true, lj: 11, fa: 18, gm: 8, m: 21},
    {l: true, a: 'Feudal', dba: true, hc: true, fl: true, wb: true, lj: 11, fa: 18, gm: 8, m: 23},
    {l: true, a: 'Feudal', dba: true, hc: true, fl: true, wb: true, lj: 11, fa: 18, gm: 8, m: 25, message: 'Wheelbarrow complete'},
    {l: true, a: 'Castle', dba: true, hc: true, fl: true, wb: true, lj: 11, fa: 18, gm: 8, m: 27},
);

var scouts = opening.concat(
    {a: 'Dark', h: 7, lj: 3, m: 1},
    {a: 'Dark', h: 8, lj: 3, m: 1},
    {a: 'Dark', h: 8, lj: 3, fo: 1, m: 1},
    {a: 'Dark', h: 8, lj: 3, fo: 2, m: 1},
    {a: 'Dark', h: 8, lj: 3, fo: 3, m: 1},
    {a: 'Dark', h: 8, lj: 3, fo: 4, m: 1},
    {a: 'Dark', h: 8, lj: 3, fo: 4, fa: 1, m: 1},
    {a: 'Dark', h: 8, lj: 3, fo: 4, fa: 2, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 4, fa: 2, m: 1},
    {a: 'Dark', h: 8, lj: 5, fo: 4, fa: 2, m: 1},
    {a: 'Dark', h: 8, lj: 6, fo: 4, fa: 2, m: 1},
    {l: true, a: 'Dark', h: 8, lj: 7, fo: 4, fa: 2, message: '5th sheep done', m: 1},
    {l: true, a: 'Feudal', h: 5, lj: 10, fo: 4, fa: 2, m: 1},
    {l: true, a: 'Feudal', h: 4, lj: 10, fo: 4, fa: 2, b: 1, builderDone: true, m: 1, message: 'Barracks complete'},
    {l: true, a: 'Feudal', h: 5, lj: 10, fo: 4, fa: 2, m: 1},
    {l: true, a: 'Feudal', dba: true, hc: true, h: 3, lj: 10, fo: 4, fa: 3, b: 2, builderDone: true, m: 1, message: 'Stable complete'},
    {l: true, a: 'Feudal', dba: true, hc: true, h: 3, lj: 10, fo: 4, fa: 6, m: 1},
    {l: true, a: 'Feudal', dba: true, hc: true, h: 3, lj: 10, fo: 4, fa: 7, m: 1},
    {l: true, a: 'Feudal', dba: true, hc: true, h: 3, lj: 10, fo: 4, fa: 8, sheepDone: true, m: 2},
    {l: true, a: 'Feudal', dba: true, hc: true, lj: 10, fo: 4, fa: 12, m: 3},
    {l: true, a: 'Feudal', dba: true, hc: true, lj: 10, fo: 4, fa: 13, m: 4},
    {l: true, a: 'Feudal', dba: true, hc: true, lj: 10, fo: 4, fa: 14, m: 5},
);

var scoutArchers = scouts.concat(
    {l: true, a: 'Feudal', dba: true, hc: true, lj: 9, fo: 2, fa: 14, b: 1, gm: 3, m: 5},
    {l: true, a: 'Feudal', dba: true, hc: true, lj: 9, fo: 2, fa: 14, builderDone: true, b: 1, gm: 4, m: 6, message: 'Range complete'},
    {l: true, a: 'Feudal', dba: true, hc: true, lj: 9, fo: 2, fa: 14, b: 1, gm: 5, m: 6},
    {l: true, a: 'Feudal', dba: true, hc: true, lj: 9, fo: 2, fa: 14, builderDone: true, b: 1, gm: 6, m: 7, message: 'Range complete'},
    {l: true, a: 'Feudal', dba: true, hc: true, lj: 10, fo: 2, fa: 14, gm: 7, m: 8},
    {l: true, a: 'Feudal', dba: true, hc: true, wb: true, lj: 9, fo: 2, fa: 14, b: 1, gm: 8, berriesDone: true, builderDone: true, m: 9, message: 'Blacksmith complete'},
    {l: true, a: 'Feudal', dba: true, hc: true, fl: true, wb: true, lj: 10, fa: 17, gm: 8, m: 15},
    {l: true, a: 'Castle', dba: true, hc: true, fl: true, wb: true, lj: 10, fa: 18, gm: 8, m: 17},
);

var scoutSkirms =  scouts.concat(
    {l: true, a: 'Feudal', dba: true, hc: true, lj: 10, fo: 4, fa: 14, b: 1, m: 5},
    {l: true, a: 'Feudal', dba: true, hc: true, lj: 11, fo: 2, fa: 14, builderDone: true, b: 1, gm: 2, m: 6, message: 'Range complete'},
    {l: true, a: 'Feudal', dba: true, hc: true, lj: 12, fo: 2, fa: 14, b: 1, gm: 2, m: 7},
    {l: true, a: 'Feudal', dba: true, hc: true, wb: true, lj: 12, fo: 2, fa: 14, builderDone: true, b: 1, gm: 3, m: 11, message: 'Blacksmith complete'},
    {l: true, a: 'Feudal', dba: true, hc: true, fl: true, wb: true, lj: 12, fo: 2, fa: 15, gm: 4, berriesDone: true, m: 12},
    {l: true, a: 'Castle', dba: true, hc: true, fl: true, wb: true, lj: 12, fa: 18, gm: 4, m: 14},
);

var scoutCastle = scouts.concat(
    {l: true, a: 'Feudal', dba: true, hc: true, lj: 10, fo: 4, fa: 14, b: 1, m: 5},
    {l: true, a: 'Feudal', dba: true, hc: true, lj: 10, fo: 2, fa: 15, builderDone: true, b: 1, gm: 2, m: 6, message: 'Blacksmith complete'},
    {l: true, a: 'Feudal', dba: true, hc: true, lj: 10, fo: 2, fa: 16, gm: 3, m: 6},
    {l: true, a: 'Feudal', dba: true, hc: true, lj: 10, fo: 2, fa: 16, gm: 4, m: 6},
    {l: true, a: 'Feudal', dba: true, hc: true, wb: true, lj: 10, fo: 2, fa: 16, gm: 5, m: 6},
    {l: true, a: 'Castle', dba: true, hc: true, wb: true, lj: 10, fo: 2, fa: 16, gm: 5, m: 6},
);

var maa = opening.concat(
    {a: 'Dark', h: 6, lj: 4, m: 1},
    {a: 'Dark', h: 7, lj: 4, m: 1},
    {a: 'Dark', h: 8, lj: 4, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 1, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 2, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 3, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 4, m: 1},
    {a: 'Dark', h: 9, lj: 4, fo: 4, m: 1},
    {a: 'Dark', h: 10, lj: 4, fo: 4, m: 1},
    {a: 'Dark', h: 10, lj: 4, fo: 4, b: 1, m: 1},
    {a: 'Dark', h: 10, lj: 4, fo: 4, gm: 1, b: 1, m: 1},
    {l: true, a: 'Dark', h: 10, lj: 4, fo: 4, gm: 2, b: 1, builderDone: true, m: 1, message: 'Barracks complete'},
);

var maaArchers = maa.concat(
    {l: true, a: 'Feudal', h: 10, lj: 5, fo: 4, gm: 2, m: 2, message: '5th sheep done'},
    {l: true, a: 'Feudal', h: 4, lj: 7, fo: 6, fa: 2, gm: 2, sheepDone: true, m: 3},
    {l: true, a: 'Feudal', maa: true, dba: true, lj: 12, fo: 6, fa: 2, gm: 2, m: 4},
    {l: true, a: 'Feudal', maa: true, dba: true, lj: 12, fo: 4, b: 2, fa: 2, gm: 3, m: 4},
    {l: true, a: 'Feudal', maa: true, dba: true, lj: 12, fo: 4, builderDone: true, b: 2, fa: 2, gm: 4, m: 4, message: 'Ranges complete'},
    {l: true, a: 'Feudal', maa: true, dba: true, lj: 12, fo: 5, b: 1, fa: 2, gm: 5, m: 4},
    {l: true, a: 'Feudal', maa: true, dba: true, lj: 12, fo: 5, builderDone: true, b: 1, fa: 2, gm: 6, m: 6, message: 'Blacksmith complete'},
    {l: true, a: 'Feudal', maa: true, dba: true, fl: true, lj: 12, fo: 6, fa: 2, gm: 7, berriesDone: true, m: 8},
    {l: true, a: 'Feudal', maa: true, dba: true, fl: true, lj: 12, fa: 8, gm: 8, m: 8},
    {l: true, a: 'Feudal', maa: true, dba: true, fl: true, lj: 12, fa: 9, gm: 8, m: 10},
    {l: true, a: 'Feudal', maa: true, dba: true, fl: true, lj: 12, fa: 10, gm: 8, m: 12},
    {l: true, a: 'Feudal', maa: true, dba: true, fl: true, lj: 12, fa: 11, gm: 8, m: 14},
    {l: true, a: 'Feudal', maa: true, dba: true, fl: true, lj: 12, fa: 12, gm: 8, m: 14},
    {l: true, a: 'Feudal', maa: true, dba: true, fl: true, lj: 12, fa: 13, gm: 8, m: 16},
    {l: true, a: 'Feudal', maa: true, dba: true, fl: true, lj: 12, fa: 14, gm: 8, m: 18},
    {l: true, a: 'Feudal', maa: true, dba: true, fl: true, lj: 12, fa: 15, gm: 8, m: 20},
    {l: true, a: 'Feudal', maa: true, dba: true, fl: true, lj: 12, fa: 16, gm: 8, m: 22},
    {l: true, a: 'Feudal', maa: true, dba: true, fl: true, lj: 12, fa: 17, gm: 8, m: 24},
    {l: true, a: 'Feudal', maa: true, dba: true, fl: true, wb: true, lj: 12, fa: 18, gm: 8, m: 24},
    {l: true, a: 'Castle', maa: true, dba: true, fl: true, wb: true, lj: 12, fa: 18, gm: 8, m: 28},
);

var maaTowers = maa.concat(
    {l: true, a: 'Feudal', h: 9, lj: 4, fo: 6, gm: 2, message: '40g maa upgrade collected', m: 3},
    {l: true, a: 'Feudal', h: 1, lj: 4, fo: 6, sm: 5, i: 5, m: 4},
);

var fcBoom = opening.concat(
    {a: 'Dark', h: 6, lj: 4, m: 1},
    {a: 'Dark', h: 7, lj: 4, m: 1},
    {a: 'Dark', h: 8, lj: 4, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 1, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 2, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 3, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 4, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 4, fa: 1, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 4, fa: 2, m: 1},
    {a: 'Dark', h: 8, lj: 5, fo: 4, fa: 2, m: 1},
    {a: 'Dark', h: 8, lj: 6, fo: 4, fa: 2, m: 1},
    {a: 'Dark', h: 8, lj: 7, fo: 4, fa: 2, m: 1},
    {a: 'Dark', h: 8, lj: 8, fo: 4, fa: 2, m: 1},
    {a: 'Dark', h: 8, lj: 9, fo: 4, fa: 2, m: 1},
    {a: 'Dark', h: 8, lj: 9, fo: 4, fa: 2, gm: 1, m: 1},
    {a: 'Dark', h: 8, lj: 9, fo: 4, fa: 2, gm: 2, m: 1},
    {l: true, a: 'Dark', h: 8, lj: 9, fo: 4, fa: 2, gm: 3, m: 1},
    {l: true, a: 'Feudal', h: 8, lj: 9, fo: 4, fa: 2, gm: 3, sheepDone: true, m: 1},
    {l: true, a: 'Feudal', lj: 9, fo: 6, fa: 8, gm: 3, m: 1},
    {l: true, a: 'Feudal', lj: 8, fo: 5, fa: 8, gm: 3, b: 3, m: 1},
    {l: true, a: 'Castle', lj: 9, fo: 5, fa: 8, gm: 3, builderDone: true, b: 3, m: 1, message: 'Blacksmith and Market complete'},
    {l: true, a: 'Castle', dba: true, hc: true, lj: 14, fo: 3, fa: 8, gm: 3, m: 1},
);

var fcKnights = opening.concat(
    {a: 'Dark', h: 6, lj: 4, m: 1},
    {a: 'Dark', h: 7, lj: 4, m: 1},
    {a: 'Dark', h: 8, lj: 4, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 1, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 2, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 3, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 4, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 4, fa: 1, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 4, fa: 2, m: 1},
    {a: 'Dark', h: 8, lj: 5, fo: 4, fa: 2, m: 1},
    {a: 'Dark', h: 8, lj: 6, fo: 4, fa: 2, m: 1},
    {a: 'Dark', h: 8, lj: 7, fo: 4, fa: 2, m: 1},
    {a: 'Dark', h: 8, lj: 8, fo: 4, fa: 2, m: 1},
    {a: 'Dark', h: 8, lj: 9, fo: 4, fa: 2, m: 1},
    {a: 'Dark', h: 8, lj: 10, fo: 4, fa: 2, m: 1},
    {a: 'Dark', h: 8, lj: 10, fo: 4, fa: 2, gm: 1, m: 1},
    {a: 'Dark', h: 8, lj: 10, fo: 4, fa: 2, gm: 2, m: 1},
    {l: true, a: 'Dark', h: 8, lj: 10, fo: 4, fa: 2, gm: 3, m: 1},
    {l: true, a: 'Feudal', h: 8, lj: 10, fo: 4, fa: 2, gm: 3, sheepDone: true, m: 1},
    {l: true, a: 'Feudal', lj: 10, fo: 5, fa: 8, gm: 3, builderDone: true, b: 1, m: 1, message: 'Barracks complete', skipHouse: true},
    {l: true, a: 'Feudal', lj: 8, fo: 5, fa: 8, gm: 4, b: 3, m: 1},
    {l: true, a: 'Castle', lj: 8, fo: 5, fa: 8, gm: 5, builderDone: true, b: 3, m: 1, message: 'Blacksmith and Stable complete'},
    {l: true, a: 'Castle', dba: true, hc: true, lj: 10, fo: 3, fa: 10, gm: 6, m: 1},
    {l: true, a: 'Castle', dba: true, hc: true, lj: 10, fo: 2, fa: 10, gm: 6, builderDone: true, b: 1, m: 1, message: 'Stable complete'},
    {l: true, a: 'Castle', dba: true, hc: true, lj: 10, fo: 3, fa: 10, gm: 6, m: 1},
);

var fcUU = opening.concat(
    {a: 'Dark', h: 6, lj: 4, m: 1},
    {a: 'Dark', h: 7, lj: 4, m: 1},
    {a: 'Dark', h: 8, lj: 4, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 1, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 2, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 3, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 4, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 4, fa: 1, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 4, fa: 2, m: 1},
    {a: 'Dark', h: 8, lj: 5, fo: 4, fa: 2, m: 1},
    {a: 'Dark', h: 8, lj: 6, fo: 4, fa: 2, m: 1},
    {a: 'Dark', h: 8, lj: 7, fo: 4, fa: 2, m: 1},
    {a: 'Dark', h: 8, lj: 8, fo: 4, fa: 2, m: 1},
    {a: 'Dark', h: 8, lj: 9, fo: 4, fa: 2, m: 1},
    {a: 'Dark', h: 8, lj: 9, fo: 4, fa: 2, gm: 1, m: 1},
    {a: 'Dark', h: 8, lj: 9, fo: 4, fa: 2, gm: 2, m: 1},
    {a: 'Dark', h: 8, lj: 9, fo: 4, fa: 2, gm: 2, sm: 1, m: 1},
    {l: true, a: 'Dark', h: 8, lj: 9, fo: 4, fa: 2, gm: 2, sm: 2, m: 1},
    {l: true, a: 'Feudal', h: 8, lj: 9, fo: 4, fa: 2, gm: 2, sm: 2, sheepDone: true, m: 1},
    {l: true, a: 'Feudal', lj: 9, fo: 4, fa: 8, gm: 2, sm: 4, m: 1, skipHouse: true},
    {l: true, a: 'Feudal', lj: 7, fo: 3, fa: 8, gm: 2, sm:5, b: 3, m: 1},
    {l: true, a: 'Castle', lj: 7, fo: 3, fa: 8, gm: 2, sm: 6, builderDone: true, b: 3, m: 1},
    {l: true, a: 'Castle', dba: true, hc: true, lj: 9, fo: 4, fa: 8, gm: 2, sm: 6, m: 1},
);

var fI = opening.concat(
    {a: 'Dark', h: 6, lj: 4, m: 1},
    {a: 'Dark', h: 7, lj: 4, m: 1},
    {a: 'Dark', h: 8, lj: 4, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 1, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 2, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 3, m: 1},
    {a: 'Dark', h: 8, lj: 4, fo: 4, m: 1},
    {a: 'Dark', h: 8, lj: 5, fo: 4, m: 1},
    {a: 'Dark', h: 8, lj: 6, fo: 4, m: 1},
    {a: 'Dark', h: 8, lj: 7, fo: 4, m: 1},
    {a: 'Dark', h: 8, lj: 8, fo: 4, m: 1},
    {a: 'Dark', h: 8, lj: 9, fo: 4, m: 1},
    {a: 'Dark', h: 8, lj: 10, fo: 4, m: 1},
    {a: 'Dark', h: 9, lj: 10, fo: 4, m: 1},
    {a: 'Dark', h: 10, lj: 10, fo: 4, m: 1},
    {a: 'Dark', h: 11, lj: 10, fo: 4, m: 1},
    {a: 'Dark', h: 12, lj: 10, fo: 4, sheepDone: true, m: 1},
    {a: 'Dark', fa: 12, lj: 10, fo: 4, gm: 1, m: 1},
    {a: 'Dark', fa: 12, lj: 10, fo: 4, gm: 2, m: 1},
    {a: 'Dark', fa: 12, lj: 10, fo: 4, gm: 3, m: 1},
    {l: true, a: 'Dark', fa: 12, lj: 10, fo: 4, gm: 4, m: 1},
    {l: true, a: 'Feudal', fa: 12, lj: 10, fo: 4, gm: 4, m: 1},
    {l: true, a: 'Feudal', fa: 12, lj: 8, fo: 4, gm: 6, m: 1},
    {l: true, a: 'Feudal', fa: 12, lj: 6, fo: 3, gm: 7, b: 3, m: 1},
    {l: true, a: 'Castle', fa: 12, lj: 6, fo: 3, gm: 8, b: 3, builderDone: true, m: 1, message: 'Blacksmith and Market complete'},
    {l: true, a: 'Castle', dba: true, fa: 14, lj: 8, fo: 2, gm: 8, m: 1, skipHouse: true},
    {l: true, a: 'Castle', dba: true, fa: 14, lj: 6, fo: 1, gm: 9, b: 3, m: 1, message: 'Monastery and Siege Workshop will be complete'},
    {l: true, a: 'Imperial', dba: true, fa: 14, lj: 6, fo: 1, gm: 10, b: 3, builderDone: true, m: 1},
);

var fGalley = opening.concat(
    {a: 'Dark', h: 6, lj: 4, m: 1},
    {a: 'Dark', h: 7, lj: 4, m: 1},
    {a: 'Dark', h: 7, lj: 4, m: 1, b: 1},
    {a: 'Dark', h: 7, lj: 5, m: 1, b: 1, builderDone: true, message: 'Dock built'},
    {a: 'Dark', h: 9, lj: 5, f: 1, m: 1},
    {a: 'Dark', h: 10, lj: 5, f: 2, m: 1},
    {a: 'Dark', h: 11, lj: 5, f: 3, m: 1, skipHouse: true},
    {a: 'Dark', h: 12, lj: 5, f: 4, m: 1},
    {a: 'Dark', h: 13, lj: 5, f: 4, m: 1},
    {a: 'Dark', h: 14, lj: 5, f: 4, m: 1},
    {a: 'Dark', l: true, h: 15, lj: 5, f: 4, m: 1},
    {a: 'Feudal', l: true, h: 15, lj: 5, f: 4, m: 1, skipHouse: false},
    {a: 'Feudal', l: true, lj: 14, f: 4, m: 1, gm: 5, b: 1, builderDone: true, message: 'Dock built'},
    {a: 'Feudal', l: true, hb: 1, lj: 14, f: 4, gm: 5, m: 1},
    {a: 'Feudal', l: true, hb: 1, lj: 14, f: 4, gm: 5, m: 1},
    {a: 'Feudal', dba: true, l: true, lj: 14, f: 4, gm: 6, b: 1, m: 1},
    {a: 'Feudal', dba: true, l: true, h: 1, lj: 14, f: 4, gm: 6, b: 1, m: 1, builderDone: true, message: 'Dock built'},
    {a: 'Feudal', dba: true, l: true, h: 3, lj: 14, f: 4, gm: 6, m: 3},
    {a: 'Feudal', dba: true, l: true, h: 4, lj: 14, f: 4, gm: 6, m: 3},
    {a: 'Feudal', dba: true, l: true, h: 5, lj: 14, f: 4, gm: 6, m: 3, sheepDone: true},
    {a: 'Feudal', dba: true, l: true, fo: 6, lj: 14, f: 4, gm: 6, m: 6},
    {a: 'Feudal', dba: true, l: true, fo: 7, lj: 14, f: 4, gm: 6, m: 6},
    {a: 'Feudal', dba: true, l: true, fo: 8, lj: 14, f: 4, gm: 6, m: 9},
    {a: 'Feudal', dba: true, hc: true, l: true, fa: 1, fo: 8, lj: 14, f: 4, gm: 6, m: 9},
    {a: 'Feudal', dba: true, hc: true, l: true, fa: 1, fo: 8, lj: 14, f: 4, gm: 6, b: 1, m: 9},
    {a: 'Feudal', dba: true, hc: true, l: true, fa: 2, fo: 8, lj: 14, f: 4, gm: 6, b: 1, m: 12, builderDone: true, message: 'Blacksmith built'},
    {a: 'Feudal', fl: true, dba: true, hc: true, l: true, fa: 3, fo: 8, lj: 14, f: 4, gm: 6, b: 1, m: 12},
    {a: 'Feudal', fl: true, dba: true, hc: true, l: true, fa: 4, fo: 8, lj: 14, f: 4, gm: 6, b: 1, m: 15, builderDone: true, message: 'Market built'},
    {a: 'Feudal', fl: true, dba: true, hc: true, l: true, fa: 6, fo: 8, lj: 14, f: 4, gm: 6, m: 15},
    {a: 'Feudal', fl: true, dba: true, hc: true, l: true, fa: 6, fo: 8, lj: 14, f: 4, gm: 7, m: 18},
    {a: 'Feudal', fl: true, dba: true, hc: true, l: true, fa: 6, fo: 8, lj: 14, f: 4, gm: 8, m: 18},
    {a: 'Feudal', fl: true, dba: true, hc: true, l: true, fa: 7, fo: 8, lj: 14, f: 4, gm: 8, m: 18},
    {a: 'Feudal', fl: true, dba: true, hc: true, l: true, fa: 8, fo: 8, lj: 14, f: 4, gm: 8, m: 21},
    {a: 'Feudal', fl: true, dba: true, hc: true, l: true, fa: 8, fo: 8, lj: 15, f: 4, gm: 8, m: 21},
    {a: 'Castle', fl: true, dba: true, hc: true, l: true, fa: 8, fo: 8, lj: 16, f: 4, gm: 8, m: 21, berriesDone: true},
    {a: 'Castle', fl: true, dba: true, hc: true, l: true, fa: 8, lj: 24, f: 4, gm: 8, m: 21},
);
