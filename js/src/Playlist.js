var App = App || {};
App.MmePlayer.Playlist = function()
{
    var that = {},
    template_string,
    position,
    playList,  //segment of HTML for storing and tracks to be rendered
    trackList=[], //Array for track-objects
    createView,
    onClickCallback,
    onTrackPausedCallback,
    onTrackContinuedCallback;

  function init()
  {
    position=0;
    template_string = document.querySelector("#playlist-entry").innerHTML;
    createView = _.template(template_string);
    playList = document.querySelector("#pl");
    playList.addEventListener("click", onPlayListEntryClicked);
    return that;
  }

  function onPlayListEntryClicked(event)
  {
    var btnPause,
        btnPlay;

    var element = event.target.parentNode;  //selecting targets parent element

    if (element.classList.contains("button"))  //clicked on a button
    {
      element=element.parentNode; //move up one layer to target li-element
    }
    

    var number = element.attributes[1].value;

    var button=element.querySelector(".button");

    btnPause = element.querySelector(".pause"); //selecting the elements button
    btnPlay = element.querySelector(".play");

    //Check if field is "virgin"
    if (btnPause.classList.contains("hidden")  &&  btnPlay.classList.contains("hidden") && element.className=="entry")
    {

      resetButtons();
      btnPause.classList.remove("hidden"); //show button
      onClickCallback(number);
    }

    else //play-pause button pressed
    {
      var a=btnPause.classList;
      var b=btnPlay.classList;

      a.toggle("hidden");
      b.toggle("hidden");


      if (a.contains("hidden"))
      {
        onTrackPausedCallback(number);
      }

      if (b.contains("hidden"))
      {
        onTrackContinuedCallback(number);
      }
    }
  }


  function resetButtons()
  {
    var btns = playList.getElementsByClassName("button");
    for (var index=0; index<btns.length; index++)
    {
      btns[index].classList.add("hidden");
    }
  }

  function display(track)
  {
    track.position=position;
    position++;
    trackList.push(track);
    var listEntryString = createView(track);
    var tmpElement = document.createElement("div");
    tmpElement.innerHTML = listEntryString;
    playList.appendChild(tmpElement);
  }

  function setTrackSelectedCallback(callback)
  {
    onClickCallback=callback;
  }

  function setTrackPausedCallback(callback)
  {
    onTrackPausedCallback=callback;
  }

  function setTrackContinuedCallback(callback)
  {
    onTrackContinuedCallback=callback;
  }

  that.resetButtons=resetButtons;
  that.setTrackContinuedCallback=setTrackContinuedCallback;
  that.setTrackPausedCallback=setTrackPausedCallback;
  that.setTrackSelectedCallback=setTrackSelectedCallback;
  that.display=display;
  that.init=init;
  return that;
}
