var App = App || {};
App.MmePlayer.SoundCloudPlayer = function()
{
    var that = {},
    currentSong,
    currentPosition,
    songs=[]; //array of streamplayer-objects

    function init()
    {
      return that;
    }


    function addSongtoPlayList(song)
    {
      if (songs.indexOf(song)<0)
      {
        songs.push(song);
      }
    }

    function play(position)
    {
      currentSong = songs[position];
      currentPosition=position;
      currentSong.play();
      currentSong.on("finish", onFinish);

    }

    function pause(position)
    {
      currentSong = songs[position];
      currentPosition=position;
      currentSong.pause();
    }

    function onFinish()
    {

      currentSong.seek(0);
      currentSong.pause();


      if (currentPosition >= songs.length-1)
      {
        currentPosition=0;
        play(currentPosition);
      }
      else
      {
        currentPosition++;
        play(currentPosition);
      }
    }
    that.play=play;
    that.pause=pause;
    that.addSongtoPlayList=addSongtoPlayList;
    that.init=init;
    return that;
}
