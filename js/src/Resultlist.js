var App = App || {};
App.MmePlayer.Resultlist = function()
{
    var that = {},
        template_string,
        resultList,
        createView,
        list,
        selected=[],
        onClickCallback,
        button;

    function init()
    {
      template_string = document.querySelector("#resultlist-entry").innerHTML;
      createView = _.template(template_string);
      resultList = document.querySelector("#rl");

      resultList.addEventListener("click", onButtonClicked);
      return that;
    }

    function setTrackSelectedCallback(callback)
    {
      onClickCallback=callback;
    }

    function onButtonClicked(event)
    {
      if (event.path[0].className=="icon-plus-circled")
      {
        var number=event.path[3].attributes[1].nodeValue;
        if (selected.indexOf(number)<0)
        {
          selected.push(number)
          onClickCallback(list[number]);
        }

      }
    }

    function getSongID(number)
    {
      return list[number].id;
    }

    function display(result)
    {
      list=result;


      //Empty the HTML-Element

      while (resultList.firstChild)
      {
        resultList.removeChild(resultList.firstChild);
      }

      //Iterate through result, add position, create new elements

      for (var index=0; index<result.length; index++)
      {
        result[index].position = index;

        var durationFormatted = formatDuration(result[index].duration);
        result[index].duration = durationFormatted;

        var listEntryString = createView(result[index]);
        var tmpElement = document.createElement("div");
        tmpElement.innerHTML = listEntryString;
        resultList.appendChild(tmpElement);

      }


    }

    function formatDuration(milliseconds)
    {
      var mins = Math.floor(milliseconds/60000);
      var rest = milliseconds-(mins*60000);
      var secs = Math.floor(rest/1000);
      if (secs<10)
      {
        secs = "0"+secs;
      }
      return mins+":"+secs;
    }

    that.getSongID=getSongID;
    that.setTrackSelectedCallback=setTrackSelectedCallback;
    that.display=display;
    that.init=init;
    return that;
}
