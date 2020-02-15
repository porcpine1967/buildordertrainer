civilizations = ['aztecs', 'britons', 'byzantine', 'celts', 'chinese', 'franks', 'goths', 'huns', 'japanese', 'koreans', 'mayans', 'mongols', 'persians', 'saracens', 'spanish', 'teutons', 'turks', 'vikings'];
options = ['archer', 'skirmisher', 'ca', 'hc', 'militia', 'spear', 'eagle', 'scout', 'knight', 'camel', 'mangonel', 'ram', 'scorpion', 'bbc', 'treb', 'monk', 'UU'];
base = {
    archer: 'Arbalester',
    skirmisher: 'Elite Skirmisher', 
    hc: 'Hand Cannoneer',
    ca: 'Heavy Cavalry Archer',
    militia: 'Champion',
    spear: 'Halberdier',
    eagle: 'Elite Eagle Warrior',
    scout: 'Hussar',
    knight: 'Paladin',
    camel: 'Heavy Camel Rider',
    mangonel: 'Siege Onager',
    ram: 'Siege Ram',
    scorpion: 'Heavy Scorpion',
    bbc: 'Bombard Cannon',
    treb: 'Trebuchet',
    monk: 'Monk',
    UU: ''
};
stable = ['ca', 'scout', 'knight', 'camel'];
aztecs = {
    name: 'aztecs',
    UU: 'Jaguar Warrior',
    composition: ['spear', 'eagle', 'mangonel', 'monk', 'UU'],
    truncations: {spear: 'Pikeman', scorpion: 'Scorpion'},
    disabled: stable.concat('hc', 'bbc')
};
britons = {
    name: 'britons',
    UU: 'Longbow',
    composition: ['militia', 'spear', 'treb', 'UU'],
    truncations: {scout: 'Light Cavalry', knight: 'Cavalier', mangonel: 'Onager', ram: 'Capped Ram'},
    disabled: ['hc', 'eagle', 'camel', 'bbc']
}
byzantine = {
    name: 'byzantine',
    UU: 'Cataphract',
    composition: ['skirmisher', 'spear', 'camel', 'bbc', 'UU'],
    truncations: {scorpion: 'Scorpion', mangonel: 'Onager'},
    disabled: ['eagle']
};
celts = {
    name: 'celts',
    UU: 'Woad Raider',
    composition: ['mangonel', 'ram', 'scorpion', 'UU'],
    truncations: {archer: 'Crossbowman'},
    disabled: ['hc', 'eagle', 'camel', 'bbc']

};
chinese = {
    name: 'chinese',
    UU: 'Chu Ko Nu',
    composition: ['militia', 'scout', 'knight', 'ram', 'UU'],
    truncations: {scout: 'Light Cavalry', knight: 'Cavalier'},
    disabled: ['hc', 'eagle', 'bbc']

};
franks = {
    name: 'franks',
    UU: 'Throwing Axeman',
    composition: ['knight', 'bbc', 'UU'],
    truncations: {archer: 'Crossbowman', scout: 'Light Cavalry', mangonel: 'Onager', ram: 'Capped Ram'},
    disabled: ['eagle', 'camel']

};
goths = {
    name: 'goths',
    UU: 'Huskarl',
    composition: ['hc', 'militia', 'spear', 'bbc', 'treb', 'UU'],
    truncations: {archer: 'Crossbowman', knight: 'Cavalier', mangonel: 'Onager', ram: 'Capped Ram'},
    disabled: ['eagle', 'camel']

};
huns = {
    name: 'huns',
    UU: 'Tarkan',
    composition: ['ca', 'spear', 'knight', 'ram'],
    truncations: {archer: 'Crossbowman', militia: 'Two-Handed Swordsman', mangonel: 'Mangonel', scorpion: 'Scorpion'},
    disabled: ['hc', 'eagle', 'camel', 'bbc']

};
japanese = {
    name: 'japanese',
    UU: 'Samurai',
    composition: ['archer', 'militia', 'treb'],
    truncations: {scout: 'Light Cavalry', knight: 'Cavalier', mangonel: 'Onager', ram: 'Capped Ram'},
    disabled: ['eagle', 'camel', 'bbc']

};
koreans = {
    name: 'koreans',
    UU: 'War Wagon',
    composition: ['hc', 'spear', 'mangonel', 'bbc', 'UU'],
    truncations: {knight: 'Cavalier', ram: 'Capped Ram', scorpion: 'Scorpion'},
    disabled: ['eagle', 'camel']

};
mayans = {
    name: 'mayans',
    UU: 'Plumed Archer',
    composition: ['spear', 'eagle', 'ram', 'UU'],
    truncations: {militia: 'Two-Handed Swordsman', mangonel: 'Onager'},
    disabled: stable.concat('hc', 'bbc')

};
mongols = {
    name: 'mongols',
    UU: 'Mangudai',
    composition: ['scout', 'camel', 'ram', 'UU'],
    truncations: {spear: 'Pikeman', knight: 'Cavalier'},
    disabled: ['hc', 'eagle', 'bbc']

};
persians = {
    name: 'persians',
    UU: 'War Elephant',
    composition: ['hc', 'scout', 'knight', 'camel', 'ram', 'UU'],
    truncations: {archer: 'Crossbowman', militia: 'Long Swordsman', mangonel: 'Onager'},
    disabled: ['eagle']

};
saracens = {
    name: 'saracens',
    UU: 'Mameluke',
    composition: ['archer', 'scout', 'mangonel', 'bbc', 'UU'],
    truncations: {spear: 'Pikeman', knight: 'Knight', scorpion: 'Scorpion'},
    disabled: ['eagle']

};
spanish = {
    name: 'spanish',
    UU: 'Conquistador',
    composition: ['knight', 'mangonel', 'bbc', 'UU'],
    truncations: {archer: 'Archer', mangonel: 'Onager', scorpion: 'Scorpion'},
    disabled: ['eagle', 'camel']
};
teutons = {
    name: 'teutons',
    UU: 'Teutonic Knight',
    composition: ['hc', 'militia', 'scout', 'knight', 'mangonel', 'bbc'],
    truncations: {archer: 'Crossbowman', ca: 'Cavalry Archer', scout: 'Scout', ram: 'Capped Ram'},
    disabled: ['eagle', 'camel']

};
turks = {
    name: 'turks',
    UU: 'Janissary',
    composition: ['hc', 'scout', 'knight', 'camel', 'ram', 'bbc', 'UU'],
    truncations: {archer: 'Crossbowman', skirmisher: 'Skirmisher', spear: 'Spearman', knight: 'Cavalier', mangonel: 'Mangonel'},
    disabled: ['eagle']

};
vikings = {
    name: 'vikings',
    UU: 'Berserker',
    composition: ['archer', 'militia', 'spear', 'ram'],
    truncations: {ca: 'Cavalry Archer', spear: 'Pikeman', scout: 'Light Cavalry', knight: 'Cavalier', mangonel: 'Onager'},
    disabled: ['hc', 'eagle', 'camel', 'bbc']

};
