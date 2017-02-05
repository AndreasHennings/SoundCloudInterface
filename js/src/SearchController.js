var App = App || {};
App.MmePlayer.SearchController = function()
{
    var that = {},
        inputField,
        textInputCallback;

    function init()
    {
      inputField = document.querySelector("#input");
      inputField.addEventListener("change", onTextInput);
      return that;
    }

    function onTextInput()
    {
      var result=this.value;
      inputField.value="";
      textInputCallback(result);
    }

    function setTextInputCallback(callback)
    {
      textInputCallback=callback;
    }

    that.setTextInputCallback=setTextInputCallback;
    that.init=init;
    return that;
}
