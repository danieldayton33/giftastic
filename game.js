
var topics = ['freddie mercury','rolling stones', 'the last waltz', 'jim morrison', 'pink floyd', 'john lennon', 'george harrison', 'jimi hendrix', 'led zeppelin', 'lou reed', 'david bowie', 'janis joplin']
var gifsAdded = false;
var gifClicked = false;

function searchGiphy(topic){
    console.log(topic);
    if(!gifsAdded) {
            $.get("https://api.giphy.com/v1/gifs/search?api_key=oCBybv6yQ2KLbcNZjx8FbiozWFazPaUG&q="+ topic +"&limit=15")
            .then(function(result) { 
            console.log("success got data", result); 
            $("#gif-area").empty();
            var newGif = $("<img>");
  
            for(var i = 0; i < result.data.length; i++) {
            // var wrapperDiv = $("<div>");
            var newDiv = $("<div>");
            newDiv.addClass("gif-div");
            var newP = $("<p>").text("Rating: "+ result.data[i].rating);
            newDiv.append(newP);
            var newGif = $("<img>").attr("src", result.data[i].images.fixed_height_still.url);
            newGif.attr("data-gif", result.data[i].images.fixed_height.url);
            newGif.attr("data-still",  result.data[i].images.fixed_height_still.url);
            newGif.addClass("gif-image");
            newDiv.append(newGif);
            $("#gif-area").append(newDiv);
    
            }
            gifsAdded = true;
        });
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
$("#add-search").click(function(event){
    event.preventDefault();
    if($("#search-area").val().length > 0){
        var newSearchItem = $("#search-area").val();
        $("#search-area").val("");
        addButton(newSearchItem);
        
    }
    else {
        return false;
    }
});
$(document).on("click", ".gif-image", function(){
    if(gifClicked){
    var gifFile = $(this).attr("data-gif");
    console.log(gifFile);
    $(this).attr("src", gifFile);
    gifClicked = false;
    }
    else{
    var gifStill = $(this).attr("data-still");
    $(this).attr("src", gifStill);
    gifClicked = true;
    }


});
