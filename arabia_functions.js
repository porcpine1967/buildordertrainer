function initialize() {
  var keys = Object.keys(civs);
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
  var keys = Object.keys(civs);
  pick_civ(Math.floor(keys.length * Math.random()));
}

function switch_civ() {
  var idx =  document.getElementById('civ_picker').value;
  pick_civ(idx);
}

function pick_civ(civ_idx) {
  var vs_civ = allCivs[Math.floor(allCivs.length * Math.random())];
  var keys = Object.keys(civs);
  var civ_name = keys[civ_idx];
  var civ_info = civs[civ_name];
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
  for (var i = 0; i < civ_info['castle_headers'].length; i++) {
      document.getElementById('castle').style.display = 'block';
      document.getElementById('castle_headers').innerHTML += '<th>' + civ_info['castle_headers'][i] + '</th>';
      document.getElementById('castle_values').innerHTML += '<td>' + civ_info['castle_values'][i] + '</td>';
  }
  document.getElementById('dark_instructions').innerHTML = civ_info['dark_instructions'];
  document.getElementById('fup_instructions').innerHTML = civ_info['fup_instructions'];
  document.getElementById('feudal_instructions').innerHTML = civ_info['feudal_instructions'];
  document.getElementById('cup_instructions').innerHTML = civ_info['cup_instructions'];
  document.getElementById('castle_instructions').innerHTML = civ_info['castle_instructions'];
  document.getElementById('civ').innerHTML = civ_name;
  document.getElementById('vsCiv').innerHTML = vs_civ;
  document.getElementById('strategy').innerHTML = civ_info['strategy'];
  document.getElementById('opening').innerHTML = civ_info['opening'];
  document.getElementById('transition').innerHTML = civ_info['transition'];
  document.getElementById('castle_age').innerHTML = civ_info['castle'];
  document.getElementById('imperial_age').innerHTML = civ_info['imp'];
  document.getElementById('eco').innerHTML = civ_info['eco'];
  document.getElementById('military').innerHTML = civ_info['military'];
  document.getElementById('team').innerHTML = civ_info['team'];
  document.getElementById('uu').innerHTML = civ_info['uu'];
  document.getElementById('utech').innerHTML = civ_info['utech'];
};

function resetFields() {
    document.getElementById('dark_headers').innerHTML = '';
    document.getElementById('dark_values').innerHTML = '';
    document.getElementById('feudal').style.display = 'block';
    document.getElementById('feudal_headers').innerHTML = '';
    document.getElementById('feudal_values').innerHTML = '';
    document.getElementById('castle').style.display = 'block';
    document.getElementById('castle_headers').innerHTML = '';
    document.getElementById('castle_values').innerHTML = '';
}

function toggleHelp() {
    var helpDiv = document.getElementById('help');
    if (helpDiv.style.display == 'none') {
        helpDiv.style.display = 'block';
    } else {
        helpDiv.style.display = 'none';
    }
}
