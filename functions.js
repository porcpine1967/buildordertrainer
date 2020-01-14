var boChecker = archers;
var unallocatedBuilders = 0;
var popCap = 5;
var loom = false;
var age = 'Dark';
var dba = false;
var horsecollar = false;
var bowsaw = false;
var fletching = false;
var wheelbarrow = false;
var turnCount = 0;
var villagers = {
    'idle': 3,
    'builder': 0,
    'housebuilder': 0,
    'hunter': 0,
    'farmer': 0,
    'forager': 0,
    'lumberjack': 0,
    'miner': 0
}

var activityMapping = {
 i: 'Idles',
 hb: 'House Builders',
 b: 'Builders',
 h: 'Hunter/shepherds',
 lj: 'Lumberjacks',
 fa: 'Farmers',
 fo: 'Foragers',
 m: 'Miners',
}
function verify(){
    var lastPop = 3;
    var maxPop = 5;
    for (var i = 0; i < boChecker.length; i++) {
        var check = boChecker[i];
        if (check['p'] != maxPop) {
            console.log('Max pop error row ' + i);
        }
        var currentpop = (check['b'] || 0) +(check['hb'] || 0) + (check['h'] || 0) + (check['fo'] || 0) + (check['fa'] || 0) + (check['lj'] || 0) + (check['m'] || 0) + (check['i'] || 0);
        if (currentpop != lastPop && currentpop != lastPop + 1) {
            console.log('Pop unacceptable row ' + i);
        }
        lastPop = currentpop;
        if (check['hb']) {
            maxPop += check['hb']*5;
        }
    }
}



function validateBuildOrder() {
    var check = boChecker[turnCount];
    var errors = {};
    errors['p'] = check['p'] - popCap; 
    errors['l'] = check['l'] - loom; 
    errors['a'] = check['a'] - age;
    errors['dba'] = check['dba'] - dba;
    errors['hc'] = check['hc'] - horsecollar;
    errors['bs'] = check['bs'] - bowsaw;
    errors['fl'] = check['fl'] - fletching;
    errors['wb'] = check['wb'] - wheelbarrow;
    errors['i'] = (check['i'] || 0) - villagers['idle'];
    errors['hb'] = (check['hb'] || 0) - villagers['housebuilder'];
    errors['b'] = (check['b'] || 0) - villagers['builder'];
    errors['h'] = (check['h'] || 0) - villagers['hunter'];
    errors['fo'] = (check['fo'] || 0) - villagers['forager'];
    errors['fa'] = (check['fa'] || 0) - villagers['farmer'];
    errors['lj'] = (check['lj'] || 0) - villagers['lumberjack'];
    errors['m'] = (check['m'] || 0) - villagers['miner'];
    var valid = true;
    var too_many_list = [];
    var not_enough_list = [];
    for (key in errors) {
        if (errors[key] > 0) {
            not_enough_list.push(activityMapping[key]);
            valid = false;
        } else if (errors[key] < 0) {
            too_many_list.push(activityMapping[key]);
            valid = false;
        }
    }
    if (valid) {
        if (boChecker.length <= turnCount + 1 ) {
            document.getElementById('messages').style.color = 'green';
            document.getElementById('messages').innerHTML = 'Success!';
            return false;
        } else {
            document.getElementById('messages').style.color = 'blue';
            return check['message'] || '&nbsp;';
        }
    } else {
        var msg = [];
        if (too_many_list.length > 0) {
          msg.push('Too many ' + too_many_list.join(', '));
        }
        if (not_enough_list.length > 0) {
          msg.push('Not enough ' + not_enough_list.join(', '));
        }
        errorMessage(msg.join('<br/>'));
        return false;
    }
}
function reset() {
    popCap += villagers['housebuilder']*5;
    villagers['idle'] += villagers['housebuilder'];
    villagers['housebuilder'] = 0;
    if (boChecker[turnCount]['builderDone']) {
        villagers['idle'] += villagers['builder'];
        villagers['builder'] = 0;
    }
}
function errorMessage(str) {
    document.getElementById('messages').style.color = 'red';
    document.getElementById('messages').innerHTML = str;
}
function populationCount() {
    var vc = 1;
    for (var state in villagers) {
        vc += villagers[state];
    }
    return vc;
}
function updateUI(msg='&nbsp;') {
    document.getElementById('age').innerHTML = age;
    document.getElementById('totalVillagers').innerHTML = populationCount();
    document.getElementById('popCap').innerHTML = popCap;
    document.getElementById('totalIdle').innerHTML = villagers['idle'];
    document.getElementById('totalHouseBuilders').innerHTML = villagers['housebuilder'];
    document.getElementById('totalBuilders').innerHTML = villagers['builder'];
    document.getElementById('totalHunters').innerHTML = villagers['hunter'];
    document.getElementById('totalForagers').innerHTML = villagers['forager'];
    document.getElementById('totalFarmers').innerHTML = villagers['farmer'];
    document.getElementById('totalLumberjacks').innerHTML = villagers['lumberjack'];
    document.getElementById('totalMiners').innerHTML = villagers['miner'];
    document.getElementById('messages').innerHTML = msg;
}
function removeVillager(state) {
    if (villagers[state] > 0) {
        villagers[state] -= 1;
        villagers['idle'] += 1;
        updateUI();
    }
}     
function addVillager(state) {
    if (villagers['idle'] > 0){
        villagers['idle'] -= 1;
        villagers[state] += 1;
        if (state == 'builder') {
            unallocatedBuilders += 1;
        }
        updateUI();
    }
}
function populationToCheck(turn) {
    var check = boChecker[turn];
    return (check['b'] || 0) +(check['hb'] || 0) + (check['h'] || 0) + (check['fo'] || 0) + (check['fa'] || 0) + (check['lj'] || 0) + (check['m'] || 0);
}
function addIdleVillager() {
    var orderMessage = validateBuildOrder();
    if (popCap <= populationCount()) {
        errorMessage('You are housed');
    } else if (populationCount() - 1 < populationToCheck(turnCount)) {
        villagers['idle'] += 1;
        updateUI();
    } else if (turnCount + 1 >= boChecker.length || populationCount() - 1 == populationToCheck(turnCount + 1)) {
        errorMessage('You should not add a villager now');
    } else if (orderMessage) {
        reset();
        villagers['idle'] += 1;
        turnCount += 1;
        updateUI(orderMessage);
    }
}
function toggleLoom() {
    loom = true;
    var orderMessage = validateBuildOrder();
    if (orderMessage) {
        document.getElementById('loom').disabled = true;
        reset();
        turnCount += 1;
        updateUI(orderMessage);
    } else {
        loom = false;
    }
}
function toggleWheelbarrow() {
    wheelbarrow = true;
    var orderMessage = validateBuildOrder();
    if (orderMessage) {
        document.getElementById('wheelbarrow').disabled = true;
        reset();
        turnCount += 1;
        updateUI(orderMessage);
    } else {
        wheelbarrow = false;
    }
}
function advance() {
    if (age == 'Feudal') {
        age = 'Castle';
        var orderMessage = validateBuildOrder();
        if (orderMessage) {
            document.getElementById('bowsaw').disabled = false;
            reset();
            turnCount += 1;
            updateUI(orderMessage);
        } else {
            age = 'Feudal';
        }
    }
    if (age == 'Dark') {
        age = 'Feudal';
        var orderMessage = validateBuildOrder();
        if (orderMessage) {
            document.getElementById('horsecollar').disabled = false;
            document.getElementById('dba').disabled = false;
            document.getElementById('fletching').disabled = false;
            document.getElementById('wheelbarrow').disabled = false;
            reset();
            turnCount += 1;
            updateUI(orderMessage);
        } else {
            age = 'Dark';
        }
    }
}
function toggleHorseCollar() {
    horsecollarElement = document.getElementById('horsecollar')
    if (horsecollar) {
        horsecollar = false;
        horsecollarElement.innerHTML = 'Horse Collar';
    } else {
        horsecollar = true;
        horsecollarElement.innerHTML = 'Undo Horse Collar';
    }
}
function toggleDoubleBitAxe() {
    dbaElement = document.getElementById('dba')
    if (dba) {
        dba = false;
        dbaElement.innerHTML = 'Double-bit Axe';
    } else {
        dba = true;
        dbaElement.innerHTML = 'Undo Double-bit Axe';
    }
}
function toggleBowsaw() {
    bowsawElement = document.getElementById('bowsaw')
    if (bowsaw) {
        bowsaw = false;
        bowsawElement.innerHTML = 'Bow Saw';
    } else {
        bowsaw = true;
        bowsawElement.innerHTML = 'Undo Bow Saw';
    }
}
function toggleFletching() {
    fletchingElement = document.getElementById('fletching')
    if (fletching) {
        fletching = false;
        fletchingElement.innerHTML = 'Fletching';
    } else {
        fletching = true;
        fletchingElement.innerHTML = 'Undo Fletching';
    }
}
function nextTurn() {
    var orderMessage = validateBuildOrder();
    if (orderMessage) {
        reset();
        turnCount += 1;
        updateUI(orderMessage);
    }
}
function changeChecker() {
    var boName = document.getElementById('selectBo').value;
    if (['archers', 'scoutArchers', 'scoutSkirms', 'scoutCastle', 'maaArchers', 'maaTowers', 'fcBoom', 'fcKnights', 'fcUU'].includes(boName)) {
        boChecker = window[boName]
    } else {
        errorMessage('Something wonky: no such build order ' + boName);
        return;
    }
    verify();
    document.getElementById('loom').disabled = false;
    horsecollar = false;
    document.getElementById('horsecollar').innerHTML = 'Horse Collar';
    dba = false;
    document.getElementById('dba').innerHTML = 'Double Bit Axe';
    bowsaw = false;
    document.getElementById('bowsaw').innerHTML = 'Bow Saw';
    fletching = false;
    document.getElementById('fletching').innerHTML = 'Fletching';
    turnCount = 0;
    popCap = 5;
    loom = false;
    age = 'Dark';
    dba = false;
    horsecollar = false;
    bowsaw = false;
    fletching = false;
    wheelbarrow = false;
    turnCount = 0;
    villagers = {
        'idle': 3,
        'builder': 0,
        'housebuilder': 0,
        'hunter': 0,
        'farmer': 0,
        'forager': 0,
        'lumberjack': 0,
        'miner': 0
    }
    updateUI();
}
