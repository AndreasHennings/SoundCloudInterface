var App = App || {};
App.MmePlayer = (function ()
{
    "use strict";
    /* eslint-env browser  */

    var that = {},

        inputField,
        playList,
        resultList,
        searchController,
        soundCloudBridge,
        soundCloudPlayer;

    /*INITS********************************************************************/

    function init()
    {
      initModules();
      initCallbacks();
    }

    function initModules()
    {
      searchController = App.MmePlayer.SearchController().init();
      resultList = App.MmePlayer.Resultlist().init();
      playList = App.MmePlayer.Playlist().init();
      soundCloudBridge = App.MmePlayer.SoundCloudBridge().init();
      soundCloudPlayer = App.MmePlayer.SoundCloudPlayer().init();
    }

    function initCallbacks()
    {
      searchController.setTextInputCallback(onSearchQueryEntered);
      resultList.setTrackSelectedCallback(onResultlistTrackSelected);
      playList.setTrackSelectedCallback(onPlaylistTrackSelected);
      playList.setTrackPausedCallback(onPlaylistTrackPaused);
      playList.setTrackContinuedCallback(onPlaylistTrackContinued);
      
    }

    /*CALLBACKS****************************************************************/

    function onSearchQueryEntered(query)
    {
      soundCloudBridge.search(query, onTracksFound);
    }

    function onTracksFound(result)
    {
      resultList.display(result);
    }

    function onResultlistTrackSelected(track)
    {
      playList.display(track);
      soundCloudBridge.getPlayer(track.id, onStreamAvailable);
    }

    function onStreamAvailable(player)
    {
      soundCloudPlayer.addSongtoPlayList(player);
    }

    function onPlaylistTrackSelected(position)
    {
      soundCloudPlayer.play(position);
    }

    function onPlaylistTrackPaused(position)
    {
      soundCloudPlayer.pause(position);
    }

    function onPlaylistTrackContinued(position)
    {
      soundCloudPlayer.play(position);
    }


    /**************************************************************************/

    that.init = init;
    return that;
}());
