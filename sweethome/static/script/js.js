function color(bgc, lampId){
    $.ajax({
        url: '/ex',
        type:"GET",
        data:{
            "res" : bgc,
            "lampId":lampId,
        },
        success: function (data) {
            $(lamp).css("background-color",  data["content"]['result'])
        },
        error: function(s) {
            console.log('err');
        }
    })
         
}

function lamp_switch(lampId) {
    lamp = "#"+lampId
    let count = $(lamp).children()
    lamp = (count.length)? count: lamp
    let bgc = $(lamp).css("background-color")
    color(bgc, lampId)
}

