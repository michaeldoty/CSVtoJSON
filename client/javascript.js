$(document).ready(function() {
  console.log('document ready');


  $('#form_submit').click(function(event) {
    event.preventDefault();
    console.log('submit data button clicked');

    var JSONData = ($('#inputbox').val())
    var JSONCSV = ('this is def not right!!' + JSONData);

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
    let formData = new FormData();
    var files = $('#inpFile')[0].files[0];
    formData.append('file', files);

    $.ajax({
      url: '/file_upload',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data) {
        $('#inputbox').html(data);
        $('#inpFile').val('');

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

  $('#clear').click(function(e) {
    e.preventDefault();
    $('#inputbox').html("");
    $('#resultbox').html("");
  });

})
