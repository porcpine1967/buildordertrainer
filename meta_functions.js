var currentCiv = aztecs;

function changeCiv() {
    var boName = document.getElementById('selectCiv').value;
    if (civilizations.includes(boName)) {
        currentCiv = window[boName];
        updateUI();
    } else {
        console.log('Something wonky: no such build order ' + boName);
        return;
    }
}

function updateUI() {
    document.getElementById('messages').innerHTML = '&nbsp;';
    document.getElementById('civ').innerHTML = currentCiv.name;
    var disabled = currentCiv.disabled || [];
    for (var key in base) {
        if (disabled.includes(key)) {
            document.getElementById(key).style.display = 'none';
        } else {
            document.getElementById(key).style.display = 'block';
        }
        var element = document.getElementById(key + 'Text');
        if (element) {
            if (currentCiv.truncations.hasOwnProperty(key)) {
                element.innerHTML = currentCiv.truncations[key];
            } else {
                element.innerHTML = base[key];
            }
        }
    }
    document.getElementById('UUText').innerHTML = currentCiv['UU'];
    var cbs = checkBoxes();
    for (var cbidx in cbs) {
        cbs[cbidx].checked = false;
    }
}

function checkBoxes() {
    var returnable = [];
    var inputs = document.getElementsByTagName('input');

    for (var i = 0; i < inputs.length; i++) {
        if(inputs[i].type.toLowerCase() == 'checkbox') {
            returnable.push(inputs[i]);
        }
    }
    return returnable;
}

function checkCiv() {
    var cbs = checkBoxes();
    var checked = [];
    for (var cbidx in cbs) {
        var cb = cbs[cbidx];
        if (cb.checked) {
            checked.push(cb.name);
        }
    }
    if (arraysEqual(checked, currentCiv.composition)) {
        document.getElementById('messages').innerHTML = 'Correct!';
    } else {
        document.getElementById('messages').innerHTML = 'Sorry, this is not correct';
    }
    return checked;
};

function showCorrect() {
    var cbs = checkBoxes();
    for (var cbidx in cbs) {
        var cb = cbs[cbidx];
        if (currentCiv.composition.includes(cb.name)) {
            cb.checked = true;
        } else {
            cb.checked = false;
        }
    }
}

function verify() {
    for (var key in base) {
        if (!options.includes(key)) {
            console.log('Bad base key: ' + key);
        }
    }
    for(var idx in civilizations) {
        var civName = civilizations[idx];
        var civ = window[civName];
        if (!civ) {
            console.log('No such civ name: ' + civName);
            continue;
        }
        for (var compIdx in civ.composition) {
            if (!options.includes(civ.composition[compIdx])) {
                console.log('Bad composition item: ' + civ.composition[compIdx]);
            }
        }
    }
}
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}