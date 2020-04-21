function choose_civ() {
  var keys = Object.keys(civs);
  var civ_idx = Math.floor(keys.length * Math.random());
  var civ_name = keys[civ_idx];
  var civ_info = civs[civ_name];
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
  document.getElementById('strategy').innerHTML = civ_info['strategy'];
};

function toggleHelp() {
    var helpDiv = document.getElementById('help');
    if (helpDiv.style.display == 'none') {
        helpDiv.style.display = 'block';
    } else {
        helpDiv.style.display = 'none';
    }
}
