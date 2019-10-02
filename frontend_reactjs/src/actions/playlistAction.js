import * as types from '../constants/PlaylistActionTypes'
import axios from 'axios';

const apiUrl = "http://localhost:3001/api/playlist";

export const fetchAllPlaylistsDB = () => {
    return (dispatch) => {
        return axios.get(apiUrl + "/")
                    .then(response => {
                        dispatch(fetchPlaylists(response.data))
                    })
                    .catch(error => {
                        throw(error);
                    });
    };
};

export const createPlaylistDB = (name) => {
    return (dispatch) => {
        return axios.post(`${apiUrl}/create`, {name})
                    .then(response => {
                        console.log("response.data = ",response.data);
                        dispatch(addPlaylist(response.data))
                    })
                    .catch(error => {
                        throw(error);
                    });
    };
};

export const addPlaylist = ({id, name}) => ({
    type: types.ADD_PLAYLIST,
    id,
    name
});

export const editPlaylist = (id, name) => ({
    type: types.EDIT_PLAYLIST,
    id: id,
    name: name
});

export const deletePlaylist = (id) => ({
    type: types.DELETE_PLAYLIST,
    id: id
});

export const fetchPlaylists = (playlists) => ({
    type: types.FETCH_PLAYLIST,
    playlists
});