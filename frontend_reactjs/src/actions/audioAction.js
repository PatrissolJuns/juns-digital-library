import * as types from '../constants/AudioActionTypes'
import axios from 'axios';
import {toast} from "react-toastify";

const apiUrl = "http://localhost:5200/api/audio";

export const fetchAllAudioDB = () => {
    return (dispatch) => {
        /*return dispatch(fetchAudio([{
            "_id" : "5d9593012351295af4757fb2",
            "belongToPlaylist" : [ ],
            "artist" : "Maître Gims",
            "album" : "Ceinture noire",
            "cover" : "1570083585354.png",
            "duration" : "221.152653",
            "isBookmark" : false,
            "musicSrc" : "1570083584468.mp3",
            "size" : 9032742,
            "track" : "38 Les roses ont des epines.mp3",
            "year" : "2018"
        }]));*/
        return axios.get(apiUrl + "/")
                    .then(response => {
                        dispatch(fetchAudio(response.data))
                    })
                    .catch(error => {
                        throw(error);
                    });
    };
};
const config = {
    headers: { 'content-type': 'multipart/form-data' }
}

export const createAudioDB = (data) => {
    return (dispatch) => {
        console.log("passage create dans l'action" ,data);
        return axios.post(`${apiUrl}/create`, data, config)
                    .then(response => {
                        // console.log("response.data = ",response.data);
                        // dispatch(addAudio(response.data))
                        dispatch(fetchAllAudioDB());
                    })
                    .catch(error => {
                        throw(error);
                    });
    };
};

export const renameAudioDB = (_id, track) => {
    return (dispatch) => {
        return axios.put(`${apiUrl}/rename/${_id}`, {track})
            .then(response => {
                console.log("response.data = ",response.data);
                if(response.status === 200) {
                    dispatch(renameAudio(response.data));
                    toast.success("Playlist updated successfully");
                }
            })
            .catch(error => {
                toast.error("Error while trying to update a playlist");
                throw(error);
            });
    };
};

export const deleteAudioDB = (_id) => {
    return (dispatch) => {
        return axios.delete(`${apiUrl}/delete/${_id}`)
            .then(response => {
                // console.log("response.data = ",response.status);
                if(response.status === 200) {
                    dispatch(deleteAudio(_id));
                    toast.success("Audio deleted successfully");
                }
            })
            .catch(error => {
                toast.error("Error while trying to delete a audio");
                throw(error);
            });
    };
};

export const toggleBookmarkAudioDB = (_id) => {
    return (dispatch) => {
        return axios.put(`${apiUrl}/toggle-bookmark/${_id}`)
            .then(response => {
                console.log("toggleBookmarkAudio = ",response);
                if(response.status === 200) {
                    dispatch(toggleBookmarkAudio(_id));
                    toast.success("Audio bookmarked successfully");
                }
            })
            .catch(error => {
                toast.error("Error while trying to bookmark the audio");
                throw(error);
            });
    };
};

/*export const addAudio = ({id, name}) => ({
    type: types.ADD_AUDIO,
    id,
    name
});*/

const renameAudio = (_id, name) => ({
    type: types.RENAME_AUDIO,
    _id: _id,
    name: name
});

const deleteAudio = (_id) => ({
    type: types.DELETE_AUDIO,
    _id: _id
});

const fetchAudio = (audios) => ({
    type: types.FETCH_AUDIO,
    audios
});

const toggleBookmarkAudio = (_id) => ({
    type: types.TOGGLE_BOOKMARK_AUDIO,
    _id: _id
});
