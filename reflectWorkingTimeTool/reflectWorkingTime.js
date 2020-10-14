javascript:(function(){
  var workingTimeTbl = document.getElementById("appID");
  var thisCellData = '';
  var status = '';
  var applicationStatus = '';
  for (var i = 1, rowlen = workingTimeTbl.rows.length-2; i < rowlen; i++) {
      thisCellData = workingTimeTbl.rows[i].cells[7].innerText;
      status = workingTimeTbl.rows[i].cells[4].innerText.trim();
      applicationStatus = workingTimeTbl.rows[i].cells[5].getElementsByTagName('span')[0].innerText;
      if (thisCellData != 'AAA' && applicationStatus == "BBB" && status == '') {
          var timesContainsBlank = thisCellData.split('--');
          var times = timesContainsBlank.map(time => time.trim());
          times = times.filter(time => time != "");
          workingTimeTbl.rows[i].cells[8].children[1].children[0].value = times[0];
          workingTimeTbl.rows[i].cells[8].children[0].getElementsByTagName('input')[0].value = times[0].split(':')[0];
          workingTimeTbl.rows[i].cells[8].children[0].getElementsByTagName('input')[1].value = times[0].split(':')[1];
          if (times.length == 2) {
            workingTimeTbl.rows[i].cells[8].children[3].children[0].value = times[1];
            workingTimeTbl.rows[i].cells[8].children[2].getElementsByTagName('input')[0].value = times[1].split(':')[0];
            workingTimeTbl.rows[i].cells[8].children[2].getElementsByTagName('input')[1].value = times[1].split(':')[1];
          }
      }
  }
})();