function initialize() {
  var keys = Object.keys(strategies);
  var select =  document.getElementById('civ_picker');
  var opp_select =  document.getElementById('opposition_picker');
  for (var i = 0; i < keys.length; i++) {
      var opt = document.createElement('option');
      opt.value = i;
      opt.innerHTML = keys[i];
      select.appendChild(opt);
      if (civs.includes(keys[i])) {
          opp_select.appendChild(opt.cloneNode(true));
      }
  }
  random_civ();
  select.focus();
}

function random_civ() {
    var idx = Math.floor(civs.length * Math.random());
    pick_civ(idx);
    var select = document.getElementById('civ_picker');
    select.value = idx;
}
function switch_civ() {
  var idx =  document.getElementById('civ_picker').value;
  pick_civ(idx);
}

function switch_strategy() {
    var keys = Object.keys(strategies);
    var civ_name = document.getElementById('civ').innerHTML
    var to_main = document.getElementById('alt_strategy').innerHTML == "Alternate Strategy";
    var civ_info = strategies[civ_name];
    if (to_main){
        document.getElementById('alt_strategy').innerHTML = 'Main Strategy';
        load_strategy(civ_info["alt"]);
    } else {
        document.getElementById('alt_strategy').innerHTML = 'Alternate Strategy';
        load_strategy(civ_info);
    }
}

function switch_opposition() {
  var civ_idx =  document.getElementById('opposition_picker').value;
  var keys = Object.keys(strategies);
  if (civ_idx in keys){
    var civ_name = keys[civ_idx];
    var civ_info = strategies[civ_name];
    document.getElementById('antiheader').innerHTML = civ_name;
    document.getElementById('antiproduction').innerHTML = civ_info['production'];
    document.getElementById('opp_glwr').src = "arabia_glwrs/" + civ_name + ".png";
  } else {
    document.getElementById('antiheader').innerHTML = "Opposition";
    document.getElementById('antiproduction').innerHTML = "";
    document.getElementById('opp_glwr').src = "";
  }
}

function pick_civ(civ_idx) {
    var keys = Object.keys(strategies);
    if (!(civ_idx in keys)) {
        return random_civ();
    }
    var civ_name = keys[civ_idx];
    var civ_info = strategies[civ_name];
    if (civ_info["alt"]) {
        document.getElementById('alt_strategy').style.display = 'inline';
    } else {
        document.getElementById('alt_strategy').style.display = 'none';
        document.getElementById('alt_strategy').innerHTML = 'Alternate Strategy';
    }
    load_strategy(civ_info);
    document.getElementById('bonuses').innerHTML = civ_info['bonuses'];
    document.getElementById('uniques').innerHTML = civ_info['uniques'];
    document.getElementById('production').innerHTML = civ_info['production'];
    document.getElementById('civ').innerHTML = civ_name;
    if (civs.includes(civ_name)) {
        document.getElementById('glwr').src = "arabia_glwrs/" + civ_name + ".png";
    } else {
        document.getElementById('glwr').src = "";
    }
};

function load_strategy(civ_info) {
  resetFields();
  for (var i = 0; i < civ_info['dark_headers'].length; i++) {
      document.getElementById('dark_headers').innerHTML += '<th>' + civ_info['dark_headers'][i] + '</th>';
      document.getElementById('dark_values').innerHTML += '<td>' + civ_info['dark_values'][i] + '</td>';
  }
  document.getElementById('dark_headers').innerHTML += '<th>Up</th>';
  document.getElementById('dark_values').innerHTML += '<td class="instructions">' + civ_info['fup_instructions'] + '</td>';
  document.getElementById('feudal_headers').innerHTML += '<th>Buildings</th>';
  document.getElementById('feudal_values').innerHTML += '<td class="buildings">' + civ_info['feudal_instructions'] + '</td>';
  for (var i = 0; i < civ_info['feudal_headers'].length; i++) {
      document.getElementById('feudal').style.display = 'block';
      document.getElementById('feudal_headers').innerHTML += '<th>' + civ_info['feudal_headers'][i] + '</th>';
      document.getElementById('feudal_values').innerHTML += '<td>' + civ_info['feudal_values'][i] + '</td>';
  }
  if (civ_info['cup_instructions']) {
    document.getElementById('feudal_headers').innerHTML += '<th>Up</th>';
    document.getElementById('feudal_values').innerHTML += '<td class="instructions">' + civ_info['cup_instructions'] + '</td>';
  }
  document.getElementById('dark_instructions').innerHTML = civ_info['dark_instructions'];
  document.getElementById('castle_instructions').innerHTML = civ_info['castle_instructions'];
  document.getElementById('strategy').innerHTML = civ_info['strategy'];
  document.getElementById('opening').innerHTML = civ_info['opening'];
  document.getElementById('transition').innerHTML = civ_info['transition'];
  document.getElementById('castle_age').innerHTML = civ_info['castle'];
  document.getElementById('imperial_age').innerHTML = civ_info['imp'];
  if (civ_info['important_techs']){
    document.getElementById('important_techs').innerHTML = "<b>Important techs:</b> " + civ_info['important_techs'];
  }
}

function resetFields() {
    document.getElementById('dark_headers').innerHTML = '';
    document.getElementById('dark_values').innerHTML = '';
    document.getElementById('feudal').style.display = 'block';
    document.getElementById('feudal_headers').innerHTML = '';
    document.getElementById('feudal_values').innerHTML = '';
    document.getElementById('castle_instructions').style.display = 'block';
    document.getElementById('important_techs').innerHTML = '';
}

function toggleHelp() {
    var helpDiv = document.getElementById('help');
    if (helpDiv.style.display == 'none') {
        helpDiv.style.display = 'block';
    } else {
        helpDiv.style.display = 'none';
    }
}
