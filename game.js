
var topics = ['freddie mercury','rolling stones', 'the last waltz', 'jim morrison', 'pink floyd', 'john lennon', 'george harrison', 'jimi hendrix', 'led zeppelin', 'lou reed', 'david bowie', 'janis joplin']
var gifsAdded = false;
var gifClicked = false;
// localStorage.clear();
var favList = JSON.parse(localStorage.getItem('favarray')) || [];


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
            addGifs(result.data[i]);
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

function addGifs(response) {
    var newDiv = $("<div>");
    newDiv.addClass("gif-div");
    var newP = $("<p>").text("Rating: "+ response.rating);
    var favDiv = $("<div>");
    //keeps heart full if the localstorage includes the image already
    if( favList.indexOf(response.id) > -1){
        favDiv.html("<i class='fas fa-heart'></i>");
    } else{
    favDiv.html("<i class='far fa-heart'></i>");
    favDiv.attr('data-heart-state', "empty");
    }
    favDiv.addClass("heart");
    favDiv.attr("data-id", response.id);
    newDiv.append(newP);
    var newGif = $("<img>").attr("src", response.images.fixed_height_still.url);
    newGif.attr("data-gif", response.images.fixed_height.url);
    newGif.attr("data-still",  response.images.fixed_height_still.url);
    newGif.addClass("gif-image");
    
    newDiv.append(newGif);
    $("#gif-area").append(newDiv);
    newDiv.append(favDiv);
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
    $('#button-area').prepend(newButton);
}

function gameStart (){

//     <div class="card" style="width: 18rem;">
//   <img src="..." class="card-img-top" alt="...">
//   <div class="card-body">
//     <h5 class="card-title">Card title</h5>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     <a href="#" class="btn btn-primary">Go somewhere</a>
//   </div>
// </div>
    var startDiv = $("<div>");
    startDiv.addClass("card bg-light start-card")
    startDiv.attr("style","width: 25rem;")
    var startGif = $("<img>");
    startGif.addClass("card-img-bottom")
    var cardDiv = $("<div>");
    var cardHeader = $("<h3>");
    cardHeader.addClass("header");
    cardHeader.text("Welcome!")
    cardDiv.addClass("card-body");
    var startP = $("<p>");
    startGif.attr("src", "images/rockingout.gif");
    startP.addClass("card-text start-text");
    startP.text("Click on one of the buttons to see some gifs. Click on the image to start them moving. Add your own button in the 'New Gif Search'. Heart something to favorite it.");
    cardDiv.append(cardHeader);
    cardDiv.append(startP);
    startDiv.append(cardDiv);
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
    if(!gifClicked){
    var gifFile = $(this).attr("data-gif");
    console.log(gifFile);
    $(this).attr("src", gifFile);
    gifClicked = true;
    }
    else{
    var gifStill = $(this).attr("data-still");
    $(this).attr("src", gifStill);
    gifClicked = false;
    }


});
//display favorites
$("#favorites").on("click", function(){
    addFavorites(favList);
});

function addFavorites(array){
    if(!gifsAdded){
        $("#gif-area").empty();
        for(var i = 0; i < array.length; i++){
            $.get("https://api.giphy.com/v1/gifs/" + array[i] + "?api_key=oCBybv6yQ2KLbcNZjx8FbiozWFazPaUG&q")
            .then(function(favoriteReturn){
                console.log(favoriteReturn);
                  addGifs(favoriteReturn.data);
            });
        } 
    }else{
    gifsAdded = false;
    addFavorites(array);
        }
    } 
    

$(document).on("click", ".heart", function(){
    if($(this).attr("data-heart-state") === "empty"){
        console.log("heart clicked")
        $(this).html("<i class='fas fa-heart'></i>")
        $(this).attr("data-heart-state", "solid")
        favList.push(($(this).attr("data-id")))
        console.log(favList);
        localStorage.setItem('favarray', JSON.stringify(favList));
        
    }
    else{
        console.log("heart clicked")
        $(this).html("<i class='far fa-heart'></i>")
        $(this).attr("data-heart-state", "empty")
        favList.splice(($(this).attr("data-id")),1);
        console.log(favList);
        localStorage.setItem('favarray', JSON.stringify(favList));
    }
});
