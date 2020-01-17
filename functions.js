var boChecker = opening.concat(archers);
var bos = ['archers', 'scoutArchers', 'scoutSkirms', 'scoutCastle', 'maaArchers', 'maaTowers', 'fcBoom', 'fcKnights', 'fcUU', 'fI'];
var popCap = 5;
var loom = false;
var age = 'Dark';
var dba = false;
var horsecollar = false;
var bowsaw = false;
var fletching = false;
var wheelbarrow = false;
var turnCount = 0;
var advancing = false;
var military = 1;
var villagers = {
    'idle': 3,
    'builder': 0,
    'housebuilder': 0,
    'hunter': 0,
    'farmer': 0,
    'forager': 0,
    'lumberjack': 0,
    'goldminer': 0,
    'stoneminer': 0
}

var activityMapping = {
 l: 'Loom',
 a: 'Advance',
 dba: 'Double-bit Axe',
 hc: 'Horse Collar',
 bs: 'Bow Saw',
 fl: 'Fletching',
 wb: 'Wheelbarrow',
 i: 'Idles',
 b: 'Builders',
 h: 'Hunter/shepherds',
 lj: 'Lumberjacks',
 fa: 'Farmers',
 fo: 'Foragers',
 gm: 'Gold Miners',
 sm: 'Stone Miners',
 m: 'Military',
}
var ages = ['Dark', 'Feudal', 'Castle', 'Imperial'];
function verify(){
    for (var index in bos) {
        var boName = bos[index];
        var boArray = opening.concat(window[boName]);
        var lastVillPop = 3;
        var lastMilPop = 1;
        var maxPop = 5;
        var lToggled = false;
        var wbToggled = false;
        var hcToggled = false;
        var dbaToggled = false;
        var bsToggled = false;
        var flToggled = false;
        for (var i in boArray) {
            var check = boArray[i];
            if (check['l']) lToggled = true;
            if (check['wb']) wbToggled = true;
            if (check['hc']) hcToggled = true;
            if (check['dba']) dbaToggled = true;
            if (check['bs']) bsToggled = true;
            if (check['fl']) flToggled = true;
            if (lToggled && !check['l']) console.log('l untoggled');
            if (wbToggled && !check['wb']) console.log('wb untoggled');
            if (hcToggled && !check['hc']) console.log('hc untoggled');
            if (dbaToggled && !check['dba']) console.log('dba untoggled');
            if (bsToggled && !check['bs']) console.log('bs untoggled');
            if (flToggled && !check['fl']) console.log('fl untoggled');
            var currentvillpop = (check['b'] || 0) +(check['hb'] || 0) + (check['h'] || 0) + (check['fo'] || 0) + (check['fa'] || 0) + (check['lj'] || 0) + (check['gm'] || 0) + (check['sm'] || 0) + (check['i'] || 0);
            if (currentvillpop != lastVillPop && currentvillpop != lastVillPop + 1) {
                console.log(boName + ': Pop unacceptable row ' + i);
            }
            lastVillPop = currentvillpop;
            var currentmilpop = check['m'] || 0;
            if (currentmilpop < lastMilPop) {
                console.log(boName + ': Military pop unaccecptable row ' + i);
            }
            lastMilPop = currentmilpop;
            if (check['hb']) {
                maxPop += check['hb']*5;
            }
        }
    }
}



function validateBuildOrder() {
    var check = boChecker[turnCount];
    if (expectedVillagerPopulation(turnCount) == 3 && villagers['housebuilder'] == 3) {
        villagers['housebuilder'] = 2;
        villagers['builder'] = 1;
    }
    var hbCount = villagers['housebuilder'];
    var errors = {};
    errors['l'] = check['l'] != loom; 
    errors['a'] = check['a'] != age;
    errors['dba'] = check['dba'] != dba;
    errors['hc'] = check['hc'] != horsecollar;
    errors['bs'] = check['bs'] != bowsaw;
    errors['fl'] = check['fl'] != fletching;
    errors['wb'] = check['wb'] != wheelbarrow;
    errors['i'] = (check['i'] || 0) - villagers['idle'];
    errors['b'] = (check['b'] || 0) - villagers['builder'];
    errors['h'] = (check['h'] || 0) - villagers['hunter'];
    errors['fo'] = (check['fo'] || 0) - villagers['forager'];
    errors['fa'] = (check['fa'] || 0) - villagers['farmer'];
    errors['lj'] = (check['lj'] || 0) - villagers['lumberjack'];
    errors['gm'] = (check['gm'] || 0) - villagers['goldminer'];
    errors['sm'] = (check['sm'] || 0) - villagers['stoneminer'];
    var valid = true;
    var should_click = [];
    var not_click = [];
    var should_toggle = [];
    var too_many_list = [];
    var not_enough_list = [];
    if (!advancing && expectedPopulation(turnCount + 2) >= popCap && villagers['housebuilder'] == 0) {
        valid = false;
        not_enough_list.push('House Builders');
    }
    for (var key in errors) {
        if (errors[key] === true) {
            if (['l', 'wb'].includes(key)) {
                if (check[key]) {
                    should_click.push(activityMapping[key]);
                } else {
                    not_click.push(activityMapping[key]);
                }
            } else if (key == 'a') {
                if (ages.indexOf(age) < ages.indexOf(check['a'])) {
                    should_click.push(activityMapping[key]);
                } else {
                    not_click.push(activityMapping[key]);
                }
            } else {
                should_toggle.push(activityMapping[key]);
            }
            valid = false;
        } else if (errors[key] > 0) {
            if (hbCount >= errors[key] && key != 'm' && key != 'b') {
                hbCount -= errors[key];
            } else {
                not_enough_list.push(activityMapping[key]);
                valid = false;
            }
        } else if (errors[key] < 0) {
          too_many_list.push(activityMapping[key]);
          valid = false;
        }
    }
    if (valid) {
        if (boChecker.length <= turnCount + 1 ) {
            reset();
            document.getElementById('messages').style.color = 'green';
            updateUI('Success!');
            return false;
        } else {
            if (expectedVillagerPopulation(turnCount + 1) > expectedVillagerPopulation(turnCount)) {
                advancing = false;
            }
            document.getElementById('messages').style.color = 'blue';
            return check['message'] || '&nbsp;';
        }
    } else {
        var msg = [];
        if (should_click.length > 0) {
          msg.push('Should click ' + should_click.join(', '));
        }
        if (not_click.length > 0) {
          msg.push('Should not click ' + not_click.join(', '));
        }
        if (should_toggle.length > 0) {
          msg.push('Should toggle ' + should_toggle.join(', '));
        }
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
    military = boChecker[turnCount]['m'];
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
    var pc = military;
    for (var state in villagers) {
        pc += villagers[state];
    }
    return pc;
}
function updateUI(msg='&nbsp;') {
    if (advancing) {
        document.getElementById('age').style.color = 'gray';
        document.getElementById('addVillager').disabled = true;
        document.getElementById('advance').disabled = true;
    } else {
        document.getElementById('age').style.color = 'black';
        document.getElementById('addVillager').disabled = false;
        document.getElementById('advance').disabled = false;
    }
    document.getElementById('age').innerHTML = age + ' Age';
    document.getElementById('totalVillagers').innerHTML = populationCount();
    document.getElementById('popCap').innerHTML = popCap;
    document.getElementById('totalIdle').innerHTML = villagers['idle'];
    document.getElementById('totalHouseBuilders').innerHTML = villagers['housebuilder'];
    document.getElementById('totalBuilders').innerHTML = villagers['builder'];
    document.getElementById('totalHunters').innerHTML = villagers['hunter'];
    document.getElementById('totalForagers').innerHTML = villagers['forager'];
    document.getElementById('totalFarmers').innerHTML = villagers['farmer'];
    document.getElementById('totalLumberjacks').innerHTML = villagers['lumberjack'];
    document.getElementById('totalGoldMiners').innerHTML = villagers['goldminer'];
    document.getElementById('totalStoneMiners').innerHTML = villagers['stoneminer'];
    document.getElementById('totalMilitary').innerHTML = military;
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
        updateUI();
    } else {
        errorMessage('No idle villagers to allocate');
    }
}
function expectedVillagerPopulation(turn) {
    var check = boChecker[turn];
    return (check['b'] || 0) +(check['hb'] || 0) + (check['h'] || 0) + (check['fo'] || 0) + (check['fa'] || 0) + (check['lj'] || 0) + (check['gm'] || 0) + (check['sm'] || 0);
}
function expectedPopulation(turn) {
    var index = turn;
    if (index + 1 > boChecker.length) {
        index = boChecker.length - 1;
    }
    var check = boChecker[index];
    return (check['b'] || 0) +(check['hb'] || 0) + (check['h'] || 0) + (check['fo'] || 0) + (check['fa'] || 0) + (check['lj'] || 0) + (check['gm'] || 0) + (check['sm'] || 0) + check['m'];
}
function addIdleVillager() {
    var orderMessage = validateBuildOrder();
    if (popCap <= populationCount()) {
        errorMessage('You are housed');
    } else if (populationCount() - military < expectedVillagerPopulation(turnCount)) {
        villagers['idle'] += 1;
        updateUI();
    } else if (turnCount + 1 >= boChecker.length || expectedVillagerPopulation(turnCount) == expectedVillagerPopulation(turnCount + 1)) {
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
    var orderMessage = '';
    if (age == 'Castle') {
        age = 'Imperial';
        orderMessage = validateBuildOrder();
        if (orderMessage) {
            reset();
            turnCount += 1;
            advancing = true;
            updateUI(orderMessage);
        } else {
            age = 'Castle';
        }
    }
    if (age == 'Feudal') {
        age = 'Castle';
        orderMessage = validateBuildOrder();
        if (orderMessage) {
            document.getElementById('bowsaw').disabled = false;
            reset();
            turnCount += 1;
            advancing = true;
            updateUI(orderMessage);
        } else {
            age = 'Feudal';
        }
    }
    if (age == 'Dark') {
        age = 'Feudal';
        orderMessage = validateBuildOrder();
        if (orderMessage) {
            document.getElementById('horsecollar').disabled = false;
            document.getElementById('dba').disabled = false;
            document.getElementById('fletching').disabled = false;
            document.getElementById('wheelbarrow').disabled = false;
            reset();
            turnCount += 1;
            advancing = true;
            updateUI(orderMessage);
        } else {
            age = 'Dark';
        }
    }
}
function toggleHorseCollar() {
    horsecollarElement = document.getElementById('horsecollar');
    if (horsecollar) {
        horsecollar = false;
        horsecollarElement.innerHTML = 'Horse Collar';
    } else {
        horsecollar = true;
        horsecollarElement.innerHTML = 'Undo Horse Collar';
    }
}
function toggleDoubleBitAxe() {
    dbaElement = document.getElementById('dba');
    if (dba) {
        dba = false;
        dbaElement.innerHTML = 'Double-bit Axe';
    } else {
        dba = true;
        dbaElement.innerHTML = 'Undo Double-bit Axe';
    }
}
function toggleBowsaw() {
    bowsawElement = document.getElementById('bowsaw');
    if (bowsaw) {
        bowsaw = false;
        bowsawElement.innerHTML = 'Bow Saw';
    } else {
        bowsaw = true;
        bowsawElement.innerHTML = 'Undo Bow Saw';
    }
}
function toggleFletching() {
    fletchingElement = document.getElementById('fletching');
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
    if (bos.includes(boName)) {
        boChecker = opening.concat(window[boName]);
    } else {
        errorMessage('Something wonky: no such build order ' + boName);
        return;
    }
    document.getElementById('loom').disabled = false;
    horsecollar = false;
    document.getElementById('horsecollar').innerHTML = 'Horse Collar';
    dba = false;
    document.getElementById('dba').innerHTML = 'Double Bit Axe';
    bowsaw = false;
    document.getElementById('bowsaw').innerHTML = 'Bow Saw';
    fletching = false;
    document.getElementById('fletching').innerHTML = 'Fletching';
    popCap = 5;
    loom = false;
    age = 'Dark';
    dba = false;
    horsecollar = false;
    bowsaw = false;
    fletching = false;
    wheelbarrow = false;
    turnCount = 0;
    advancing = false;
    military = 1;
    villagers = {
        'idle': 3,
        'builder': 0,
        'housebuilder': 0,
        'hunter': 0,
        'farmer': 0,
        'forager': 0,
        'lumberjack': 0,
        'goldminer': 0,
        'stoneminer': 0
    };
    updateUI();
}
