function initialize() {
  var keys = Object.keys(strategies);
  var select =  document.getElementById('civ_picker');
  for (var i = 0; i < keys.length; i++) {
      var opt = document.createElement('option');
      opt.value = i;
      opt.innerHTML = keys[i];
      select.appendChild(opt);
  }
  choose_civ();
}

function choose_civ() {
  var keys = civs;
  var idx = Math.floor(keys.length * Math.random());
  pick_civ(idx);
}

function switch_civ() {
  var idx =  document.getElementById('civ_picker').value;
  pick_civ(idx);
}

function pick_civ(civ_idx) {
  var keys = Object.keys(strategies);
  var civ_name = keys[civ_idx];
  var civ_info = strategies[civ_name];
  resetFields();
  for (var i = 0; i < civ_info['dark_headers'].length; i++) {
      document.getElementById('dark_headers').innerHTML += '<th>' + civ_info['dark_headers'][i] + '</th>';
      document.getElementById('dark_values').innerHTML += '<td>' + civ_info['dark_values'][i] + '</td>';
  }
  for (var i = 0; i < civ_info['feudal_headers'].length; i++) {
      document.getElementById('feudal').style.display = 'block';
      document.getElementById('feudal_headers').innerHTML += '<th>' + civ_info['feudal_headers'][i] + '</th>';
      document.getElementById('feudal_values').innerHTML += '<td>' + civ_info['feudal_values'][i] + '</td>';
  }
  document.getElementById('dark_instructions').innerHTML = civ_info['dark_instructions'];
  document.getElementById('fup_instructions').innerHTML = civ_info['fup_instructions'];
  document.getElementById('feudal_instructions').innerHTML = civ_info['feudal_instructions'];
  document.getElementById('cup_instructions').innerHTML = civ_info['cup_instructions'];
  document.getElementById('castle_instructions').innerHTML = civ_info['castle_instructions'];
  document.getElementById('civ').innerHTML = civ_name;
  document.getElementById('strategy').innerHTML = civ_info['strategy'];
  document.getElementById('opening').innerHTML = civ_info['opening'];
  document.getElementById('transition').innerHTML = civ_info['transition'];
  document.getElementById('castle_age').innerHTML = civ_info['castle'];
  document.getElementById('imperial_age').innerHTML = civ_info['imp'];
  document.getElementById('bonuses').innerHTML = civ_info['bonuses'];
  document.getElementById('uniques').innerHTML = civ_info['uniques'];
  document.getElementById('production').innerHTML = civ_info['production'];
};

function resetFields() {
    document.getElementById('dark_headers').innerHTML = '';
    document.getElementById('dark_values').innerHTML = '';
    document.getElementById('feudal').style.display = 'block';
    document.getElementById('feudal_headers').innerHTML = '';
    document.getElementById('feudal_values').innerHTML = '';
    document.getElementById('castle_instructions').style.display = 'block';
}

function toggleHelp() {
    var helpDiv = document.getElementById('help');
    if (helpDiv.style.display == 'none') {
        helpDiv.style.display = 'block';
    } else {
        helpDiv.style.display = 'none';
    }
}
