var civs = {
    aztecs: { strategy: 'Meso eagles; imp add monks vs cavalry',
              dark_headers: ['Sheep', 'Wood', 'Boar', 'Berries', 'Boar to farms', 'Wood'],
              dark_values: [6, 4, 2, 4, 2, '3 (7)'],
              dark_instructions: '',
              fup_instructions: 'While advancing: 4 sheep to gold, build 2 barracks',
              feudal_headers: ['Wood', 'Gold', 'Farms'],
              feudal_values: ['3 (10)', '2 (4)', '+'],
              feudal_instructions: 'build blacksmith',
              cup_instructions: '',
              castle_headers: [],
              castle_values: [],
              castle_instructions: '',
            },
    britons:  { strategy: 'Archers with CA pikes; trebs for siege',
                dark_headers: ['Sheep', 'Wood', 'Boar', 'Berries', 'Boar to farms', 'Wood'],
                dark_values: [5, 4, 2, 4, 1, '5 (9)'],
                dark_instructions: '',
                fup_instructions: 'While advancing: 2 sheep to wood (11), 3 to gold; build 1 barracks',
                feudal_headers: ['Gold', 'Farms', 'Wheelbarrow'],
                feudal_values: ['5 (8)', '10 (18)', '+'],
                feudal_instructions: 'build 2 ranges then blacksmith',
                cup_instructions: '',
                castle_headers: [],
                castle_values: [],
                castle_instructions: '',
              },
    celts:  { strategy: 'Men-at-arms to Fast Castle; Pikes guarding siege; onagers vs archers',
              dark_headers: ['Sheep', 'Wood', 'Boar', 'Berries', 'Gold to Wood', 'Barracks to Houses', 'Wood', 'Sheep to Farms'],
              dark_values: [6, 3, 1, 4, 1, 1, '3 (7)', '8 (8 farms)'],
              dark_instructions: '',
              fup_instructions: 'Sheep gone: 4 sheep to gold, 2 to berries',
              feudal_headers: ['Wood',],
              feudal_values: ['2 (9)',],
              feudal_instructions: 'build blacksmith and market',
              cup_instructions: '',
              castle_headers: [],
              castle_values: [],
              castle_instructions: '<h4>Castle Age</h4>4 Siege Workshops',
            },
    chinese:  { strategy: 'Scout to Skirms; Elite Chu Ko Nu post imp',
                dark_headers: ['Loom','Sheep', 'Wood', 'Boar', 'Berries', 'Boar to farms', 'Wood'],
                dark_values: ['+', 7, 3, 1, 4, 2, '4 (7)'],
                dark_instructions: '',
                fup_instructions: 'While advancing: 3 sheep to wood, build 1 barracks',
                feudal_headers: ['Farms', 'Wood', 'Gold', 'Wheelbarrow', 'Farms'],
                feudal_values: ['8 (14)', '2 (12)', 2, '+', '4 (18)'],
                feudal_instructions: 'build stable with 2 vills, Range and Blacksmith after 6 scouts, move 2 berries to gold',
                cup_instructions: '',
                castle_headers: [],
                castle_values: [],
                castle_instructions: '',
              },
    franks: { strategy: 'Fast Castle to Knight Rush; map control with castles; bbc to open bases',
              dark_headers: ['Sheep', 'Wood', 'Boar', 'Berries', 'Boar to farms', 'Wood', 'Gold'],
              dark_values: [6, 4, 2, 4, 2, '6 (10)', 3],
              dark_instructions: '',
              fup_instructions: 'Sheep done: 6 (8) to farms, 2 (6) to berries, build 1 barracks',
              feudal_headers: ['Gold',],
              feudal_values: ['2 (5)',],
              feudal_instructions: 'build stable, blacksmith',
              cup_instructions: 'While advancing: 1 berries to gold (6), 2 berries to farms (10), build stable',
              castle_headers: [],
              castle_values: [],
              castle_instructions: '',
            },
    huns: { strategy: 'Man-at-arms to Fast Castle; Cav Archers or spears/knights',
            dark_headers: ['Sheep', 'Wood', 'Boar', 'Berries', 'Gold to Wood', 'Barracks to Houses', 'Wood', 'Sheep to Farms'],
            dark_values: [6, 4, 1, 4, 1, 1, '3 (8)', '8 (8 farms)'],
            dark_instructions: '',
            fup_instructions: 'Sheep gone: 4 sheep to gold, 2 to berries',
            feudal_headers: ['Wood',],
            feudal_values: ['2 (10)',],
            feudal_instructions: 'build blacksmith and range or stable',
            cup_instructions: '',
            castle_headers: [],
            castle_values: [],
            castle_instructions: '',
          },
    japanese: { strategy: 'Archers to Castle Age infantry counter, trebs',
                dark_headers: ['Sheep', 'Wood', 'Boar', 'Berries', 'Boar to farms', 'Wood'],
                dark_values: [6, 4, 2, 4, 1, '5 (9)'],
                dark_instructions: '',
                fup_instructions: 'While advancing: 2 sheep to wood (11), 3 to gold; build 1 barracks',
                feudal_headers: ['Gold', 'Farms', 'Wheelbarrow'],
                feudal_values: ['5 (8)', '10 (18)', '+'],
                feudal_instructions: 'build 2 ranges then blacksmith',
                cup_instructions: '',
                castle_headers: [],
                castle_values: [],
                castle_instructions: '',
              },
    magyars: { strategy: 'Scouts to Archers; tech into huszar if siege',
                dark_headers: ['Sheep', 'Wood', 'Boar', 'Berries', 'Boar to farms', 'Wood'],
               dark_values: [6, 3, 2, 4, 2, '4 (7)'],
               dark_instructions: '',
               fup_instructions: 'On advance move 3 sheep to wood (10); build barracks',
               feudal_headers: ['Farms', 'Gold', 'Wheelbarrow', 'Farms'],
               feudal_values: ['8 (14)', '6 (+2 from berries)', '+', '2 (18)',],
               feudal_instructions: 'build stable, then 2 ranges and Blacksmith',
               cup_instructions: '',
               castle_headers: [],
               castle_values: [],
               castle_instructions: '',
            },
    mayans: { strategy: 'Archers to Castle Age Plumes and/or Eagles; add halb and tech archers as siege',
              dark_headers: ['Sheep', 'Wood', 'Boar', 'Berries', 'Boar to farms', 'Wood'],
              dark_values: [6, 4, 2, 4, 1, '5 (9)'],
              dark_instructions: '',
              fup_instructions: 'While advancing: 2 sheep to wood (11), 3 to gold; build 1 barracks',
              feudal_headers: ['Gold', 'Farms', 'Wheelbarrow'],
              feudal_values: ['5 (8)', '10 (18)', '+'],
              feudal_instructions: 'build 2 ranges then blacksmith',
              cup_instructions: '',
              castle_headers: [],
              castle_values: [],
              castle_instructions: '',
            },
    mongols: { strategy: 'Scouts to skirms; castle age cav archers/light cav; imp rams/champs',
               dark_headers: ['Sheep', 'Wood', 'Boar', 'Deer to berries', 'Boar/sheep'],
               dark_values: [6, 3, 2, 4, '3 (11)'],
               dark_instructions: '',
               fup_instructions: 'On advance move 5 sheep to wood (8); build barracks',
               feudal_headers: [],
               feudal_values: [],
               feudal_instructions: '<h4>Feudal Age</h4>build stable',
               cup_instructions: '',
               castle_headers: [],
               castle_values: [],
               castle_instructions: '',
             },
    persians: { strategy: 'Scouts into Knights; add elephants/hc/scorps/scouts',
                dark_headers: ['Sheep', 'Wood', 'Boar', 'Berries', 'Boar to farms', 'Wood'],
                dark_values: [6, 3, 2, 4, 2, '3 (7)'],
                dark_instructions: '',
                fup_instructions: 'While advancing: 3 sheep to wood, build 1 barracks',
                feudal_headers: ['Farms', 'Gold', 'Farms', 'Wheelbarrow',],
                feudal_values: ['8 (14)', '4 (6)', '1 (15)', '+',],
                feudal_instructions: 'build stable with 2 vills; after farms build Blacksmith, move 2 berries to gold',
                cup_instructions: 'While advancing, build second stable',
                castle_headers: [],
                castle_values: [],
                castle_instructions: '',
              },
    slavs: { strategy: 'Man-at-arms rush with 2 barracks, followed by mangonels or rams; monks/mangonels/rams; hussars post imp',
             dark_headers: ['Sheep', 'Wood', 'Boar', 'Berries', 'Boar to farms', 'Barracks', 'Gold'],
             dark_values: [6, 4, 2, 4, 2, 1, 2],
             dark_instructions: '',
             fup_instructions: 'While advancing: 3 sheep to wood, build another barracks',
             feudal_headers: ['Farms',],
             feudal_values: ['+',],
             feudal_instructions: '',
             cup_instructions: '',
             castle_headers: [],
             castle_values: [],
             castle_instructions: '',
           },
};
var allCivs = [
    'Aztecs', 'Berbers', 'Britons', 'Burmese', 'Byzantines', 'Celts', 'Chinese', 'Ethiopians', 'Franks', 'Goths', 'Huns', 'Incas', 'Indians', 'Italians', 'Japanese', 'Khmer', 'Koreans', 'Magyars', 'Malay', 'Malians', 'Mayans', 'Mongols', 'Persians', 'Portuguese', 'Saracens', 'Slavs', 'Spanish', 'Teutons', 'Turks', 'Vietnamese', 'Vikings',
];
