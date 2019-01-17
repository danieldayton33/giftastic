
var topics = ['freddie mercury','rolling stones', 'the last waltz', 'jim morrison', 'pink floyd', 'john lennon', 'george harrison', 'jimi hendrix', 'led zeppelin', 'lou reed', 'david bowie', 'janis joplin']
var gifsAdded = false;
var gifClicked = false;

function searchGiphy(topic){
    console.log(topic);
    if(!gifsAdded) {
    $.get("https://api.giphy.com/v1/gifs/search?api_key=oCBybv6yQ2KLbcNZjx8FbiozWFazPaUG&q="+ topic +"&limit=15").then(function(result) { 
        console.log("success got data", result); 
        $("#gif-area").empty();
        var newGif = $("<img>");
  
        for(var i = 0; i < result.data.length; i++) {
            var newSpan = $("<span>")
            var newDiv = $("<div>");
            var picDiv = $("<div>");
            newSpan.addClass("gif-div");
            newDiv.text("Rating: "+ result.data[i].rating);
            var newGif = $("<img>", {
                src: result.data[i].images.fixed_height_still.url,
                on: {
                    click: function (){
                        var j = $(this).attr('id');
                        console.log(j);
                        if(!gifClicked){
                        $(this).attr("src", result.data[j].images.fixed_height.url);
                        gifClicked = true;
                        }
                        else{
                            $(this).attr("src", result.data[j].images.fixed_height_still.url);
                            gifClicked = false;
                        }
                    }
                },
                id: [i]
            });
            picDiv.append(newGif);
            newDiv.append(picDiv);
            newSpan.append(newDiv);
            $("#gif-area").append(newSpan);
        }
    });
    gifsAdded = true;
    }
    else{
        $("#gif-area").empty();
        gifsAdded = false;
        searchGiphy(topic);
    }
}

    
function addButton(topic){
    var newButton = $('<button>',{
    type: 'button',
    class: 'btn btn-light',
    id: 'gif-button',
    text: topic,
    on: {
        click : function (){
        searchGiphy(topic);
    }
    }
    });
    $('#button-area').append(newButton);
}

function gameStart (){
    var startDiv = $("<div>");
    var startGif = $("<img>");
    startGif.attr("src", "images/rockingout.gif");
    startDiv.addClass("start-text");
    startDiv.text("Welcome! Click on one of the buttons to see some gifs. Click on the image to start them moving. Add your own button in the 'New Gif Search'.");
    startDiv.append(startGif);
    $("#gif-area").append(startDiv);
    for(var i = 0; i < topics.length; i++){
    addButton(topics[i]);
}
}

gameStart();
$("#add-search").click(function(){
    if($("#search-area").val().length > 0){
        var newSearchItem = $("#search-area").val();
        $("#search-area").val("");
        addButton(newSearchItem);
        
    }
    else {
        return false;
    }
});
