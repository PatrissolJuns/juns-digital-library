import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { fetchAllPlaylistsDB } from './actions/playlistAction'
import {fetchAllAudioDB} from "./actions/audioAction";

import AppContainer from './containers/AppContainer';

let globalState = {
    playlists: [
        { id: 1, name: "Dashgum - Admin Panel Theme"},
        { id: 2, name: "Extensive collection of plugins"},
        { id: 3, name: "Free updates always, no extra fees."},
        { id: 4, name: "More features coming soon"}
    ]
};

// const store = createStore(rootReducer, globalState, applyMiddleware(thunk));
const store = createStore(rootReducer, applyMiddleware(thunk));
store.dispatch(fetchAllPlaylistsDB());
store.dispatch(fetchAllAudioDB());

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('root')
);

// ReactDOM.render(<App />, document.getElementById('root'));
