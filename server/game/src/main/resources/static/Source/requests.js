// AJAX PETITIONS

function readTextFile(file)
{
    $.ajax({
        type: "GET",
        url: file,
        dataType: "text",
        success: function(data) {processData(data);}
        });
    
   /*
    var xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    else{
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    var allText;
    xmlhttp.open("GET", file, false);
    xmlhttp.onreadystatechange = function ()
    {
        if(xmlhttp.readyState === 4)
        {
            if(xmlhttp.status === 200 || xmlhttp.status == 0)
            {
                allText = xmlhttp.responseText;
            }
        }
    }
    xmlhttp.send();
    return allText;*/
}




