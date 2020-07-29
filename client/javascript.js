$(document).ready(function() {
  console.log('document ready');


  $('#form_submit').click(function(event) {
    event.preventDefault();
    console.log('submit data button clicked');

    var JSONData = ($('#inputbox').val())
    var JSONCSV = ('this is def not right!!' + JSON.stringify(JSONData));
    console.log(JSONCSV);
    // var json = JSONData.employee
    // var headers = [];
    // for (var key of json) {
    // }
    // var fields = Object.keys(json[0])
    // var replacer = function(key, value) {
    //   return value === null ? '' : value
    // }
    // var csv = json.map(function(row){
    //   return fields.map(function(fieldName){
    //     return JSON.stringify(row[fieldName], replacer)
    //   }).join(',')
    // })
    // csv.unshift(fields.join(','))
    // csv = csv.join('\r\n');

    $.ajax({
      type: 'POST',
      url: '/json_to_csv',
      data: JSONCSV,
      success: function(data) {
        $('#resultbox').html(data);
      }
    })
  })

  const inpFile = $('#inpFile');
  const btnUpload = $('#file_upload');

  $('#file_upload').click(function(e) {
    e.preventDefault();
    const formData = new FormData();
    var files = $('#inpFile')[0].files[0];
    formData.append('file', files);

    $.ajax({
      url: '/file_upload',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data) {
        $('#resultbox').html(data);
      }
    })
});

$('#download').click(function(e) {
  e.preventDefault();
  saveTextAsFile(resultbox.value, 'CSVdata.csv');
});

function saveTextAsFile(textToWrite, fileNameToSaveAs)
  {
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
    {
      downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
      downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
      downloadLink.onclick = destroyClickedElement;
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
    }

    downloadLink.click();
  }

})
