import * as types from '../constants/AudioActionTypes'
import axios from 'axios';

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

/*export const addAudio = ({id, name}) => ({
    type: types.ADD_AUDIO,
    id,
    name
});*/

export const editAudio = (id, name) => ({
    type: types.EDIT_AUDIO,
    id: id,
    name: name
});

export const deleteAudio = (id) => ({
    type: types.DELETE_AUDIO,
    id: id
});

export const fetchAudio = (audios) => ({
    type: types.FETCH_AUDIO,
    audios
});