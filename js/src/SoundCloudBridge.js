var App = App || {};
App.MmePlayer.SoundCloudBridge = function()
{
    var that = {},
        queryOptions={};


    function init()
    {
      SC.initialize(
      {
        "client_id": '725eaf370b3543abf2e305080fccccbf',
        "redirect_uri": "",
      });
      return that;
    }

    function search(query, callback)
    {
      queryOptions.q = query;
      queryOptions.limit = 100;
      queryOptions.filter = "streamable";
      SC.get("/tracks", queryOptions).then(function(result)
      {
        callback(result);
      });

    }

    function getPlayer(id, callback)
    {
      SC.stream("/tracks/" + id).then(function(player)
      {
        callback(player);
      });
    }
    that.getPlayer=getPlayer;
    that.search = search;
    that.init=init;
    return that;
}
