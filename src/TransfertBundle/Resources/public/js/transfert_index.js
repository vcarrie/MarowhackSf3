$(document).ready(function(){
    update()
    function update() {
        $.ajax({
            url : $('#url-update-files').val(),
            type : "GET",
            dataType: 'json',
            success : function(ret) {
                var resultats = $('#results');
                resultats.empty();
                for (i=0;i<ret.length;i++){
                        var item = $('<li></li>');
                        var link =  $('<a></a>');
                        link.attr('target', "blank");
                        link.attr('href', '/transfert/getfile/'+ret[i]['id']);
                        link.text(ret[i]['name']);
                        item.append(link);
                        resultats.append(item)
                }
            }
        });
    }
    $("#form-upload").bind("drop", function(e) {
        var files = e.originalEvent.dataTransfer.files;
        processFileUpload(files);

        // forward the file object to your ajax upload method
        return false;
    });

    function processFileUpload(droppedFiles) {
        // add your files to the regular upload form
        var uploadFormData = new FormData();
        if(droppedFiles.length > 0) { // checks if any files were dropped
            for(var f = 0; f < droppedFiles.length; f++) { // for-loop for each file dropped
                uploadFormData.append("files[]",droppedFiles[f]);  // adding every file to the form so you could upload multiple files
            }
        }

        $.ajax({
            url : $('url-send-transfert').val(), // use your target
            type : "POST",
            data : uploadFormData,
            cache : false,
            contentType : false,
            processData : false,
            success : function(ret) {
                update();
            }
        });
    }

});