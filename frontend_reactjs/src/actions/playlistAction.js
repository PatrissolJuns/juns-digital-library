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

export const updatePlaylistDB = (_id, name, audioLists) => {
    return (dispatch) => {
        return axios.put(`${apiUrl}/update/${_id}`, {name, audioLists})
            .then(response => {
                console.log("response.data = ",response.data);
                dispatch(updatePlaylist(response.data))
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

export const updatePlaylist = (playlist) => ({
    type: types.UPDATE_PLAYLIST,
    playlist: playlist

});

export const deletePlaylist = (id) => ({
    type: types.DELETE_PLAYLIST,
    id: id
});

export const fetchPlaylists = (playlists) => ({
    type: types.FETCH_PLAYLIST,
    playlists
});