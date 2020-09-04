import React, { useEffect, useState } from "react";
import * as actions from "../../actions/spotifyactions";
import { useSpotifyContext } from "../../store/spotifystore";
import Playlist from "../../components/Playlists/Playlists";
import NavBar from "../../components/NavBar/NavBar";
import TrackList from "../../components/TrackList/TrackList";
import { ToastContainer, toast } from "react-toastify";
import { Paper } from "@material-ui/core";
import { deleteplaylist } from "../../actions/spotifyactions";
import CircularProgress from "@material-ui/core/CircularProgress";

const PlaylistPage = () => {
  const { dispatch, state } = useSpotifyContext();
  console.log(state);

  const [showsongs, setshowsongs] = useState(false);

  useEffect(() => {
    dispatch(actions.get_playlist(state.userinfo.id));
  }, []);

  // useEffect(() => {
  //   if (state.selected_playlist !== "" && state.playlists.length > 0) {
  //     const selectedPlaylist = state.playlists.filter(
  //       (x: any) => x.id === state.selected_playlist
  //     );
  //     dispatch(
  //       actions.get_playlist_tracks(
  //         state.selected_playlist,
  //         selectedPlaylist[0].tracks.total
  //       )
  //     );
  //   }
  // }, [state.selected_playlist, state.playlist_tracks]);

  const handleOnClickPlaylist = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    //  setshowPlaylistControls(e.currentTarget.id);
    dispatch(actions.selected_playlist(e.currentTarget.id));
    console.log(state.selected_playlist);

    const selectedPlaylist = state.playlists.filter(
      (x: any) => x.id === e.currentTarget.id
    );

    console.log(selectedPlaylist[0].tracks.total);

    dispatch(
      actions.get_playlist_tracks(
        e.currentTarget.id,
        selectedPlaylist[0].tracks.total
      )
    );

    setshowsongs(true);
  };

  const handleRemoveFromPlaylist = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    await dispatch(
      actions.removefromplaylist(state.selected_playlist, e.currentTarget.id)
    );
    toast("Removed From Playlist");

    const selectedPlaylist = state.playlists.filter(
      (x: any) => x.id === state.selected_playlist
    );

    console.log(selectedPlaylist);

    await dispatch(
      actions.get_playlist_tracks(
        state.selected_playlist,
        selectedPlaylist[0].tracks.total
      )
    );
  };

  const handleDeletePlaylist = () => {
    //  dispatch(deleteplaylist(state.selected_playlist));
    toast("Playlist Unfollowed");
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: "linear-gradient(-45deg, purple, #53025359)",

          height: "300px",
        }}
      ></div>
      {state.playlists.length === 0 ? (
        <CircularProgress />
      ) : (
        <Playlist
          playlists={state.playlists}
          onClick={handleOnClickPlaylist}
          deletePlaylist={handleDeletePlaylist}
          //   showPlaylistControls={showPlaylistControls}
        />
      )}
      {showsongs ? (
        <TrackList
          tracks={state.tracks}
          removefromplaylist={handleRemoveFromPlaylist}
          showPlaylistTrackControls={true}
        />
      ) : null}
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default PlaylistPage;
