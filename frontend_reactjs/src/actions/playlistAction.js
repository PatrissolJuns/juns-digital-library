import * as types from '../constants/PlaylistActionTypes'
import axios from 'axios';
import {toast} from "react-toastify";

const apiUrl = "http://localhost:5200/api/playlist";

export const fetchAllPlaylistsDB = () => {
    return (dispatch) => {
        return axios.get(apiUrl + "/")
                    .then(response => {
                        dispatch(fetchPlaylists(response.data));
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
                        dispatch(addPlaylist(response.data));
                    })
                    .catch(error => {
                        throw(error);
                    });
    };
};

export const updatePlaylistDB = (_id, name, audioList, isAdd = true) => {
    return (dispatch) => {
        return axios.put(`${apiUrl}/update/${_id}`, {name, audioList, isAdd})
            .then(response => {
                console.log("response.data = ",response.data);
                if(response.status === 200) {
                    dispatch(updatePlaylist(response.data));
                    toast.success("Playlist updated successfully");
                } else {
                    toast.error("WARNING : Error while trying to update a playlist");
                }
            })
            .catch(error => {
                toast.error("Error while trying to update a playlist");
                throw(error);
            });
    };
};

export const deletePlaylistDB = (_id) => {
    return (dispatch) => {
        return axios.delete(`${apiUrl}/delete/${_id}`)
            .then(response => {
                console.log("response.data = ",response.status);
                if(response.status === 200) {
                    dispatch(deletePlaylist(_id));
                    toast.success("Playlist deleted successfully");
                }
            })
            .catch(error => {
                toast.error("Error while trying to delete a playlist");
                throw(error);
            });
    };
};

const addPlaylist = ({id, name, audioList}) => ({
    type: types.ADD_PLAYLIST,
    id,
    name,
    audioList
});

const updatePlaylist = (playlist) => ({
    type: types.UPDATE_PLAYLIST,
    playlist: playlist

});

const deletePlaylist = (_id) => ({
    type: types.DELETE_PLAYLIST,
    _id: _id
});

const fetchPlaylists = (playlists) => ({
    type: types.FETCH_PLAYLIST,
    playlists
});