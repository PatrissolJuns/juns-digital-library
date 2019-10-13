import React, {Fragment, useState} from "react";
import PropTypes from "../utils/propTypes";

import ReactJkMusicPlayer from "react-jinke-music-player";
import {FaHeadphones} from 'react-icons/fa';
import {getUrlAction} from "../utils/builtInFunction";

import "react-jinke-music-player/assets/index.css";


const PlayerManager = ({...props}) => {
    const options = {
        //audio lists model
        // audioLists: audioLists,

        //default play index of the audio player  [type `number` default `0`]
        // defaultPlayIndex: 0,

        //if you want dynamic change current play audio you can change it [type `number` default `0`]
        // playIndex: 0,

        //color of the music player theme    [ type `string: 'light' or 'dark'  ` default 'dark' ]
        theme: 'dark',

        // Specifies movement boundaries. Accepted values:
        // - `parent` restricts movement within the node's offsetParent
        //    (nearest node with position relative or absolute), or
        // - a selector, restricts movement within the targeted node
        // - An object with `left, top, right, and bottom` properties.
        //   These indicate how far in each direction the draggable
        //   can be moved.
        bounds: 'body',

        //Whether to load audio immediately after the page loads.  [type `Boolean | String`, default `false`]
        //"auto|metadata|none" "true| false"
        preload: false,

        //Whether the player's background displays frosted glass effect  [type `Boolean`, default `false`]
        glassBg: false,

        //The next time you access the player, do you keep the last state  [type `Boolean` default `false`]
        remember: false,

        //The Audio Can be deleted  [type `Boolean`, default `true`]
        remove: true,

        //audio controller initial position    [ type `Object` default '{top:0,left:0}' ]
        defaultPosition: {
            top: 0,
            left: 0
        },

        // play mode text config of the audio player
        playModeText: {
            order: 'order',
            orderLoop: 'order loop',
            singleLoop: 'loop',
            shufflePlay: 'shuffle'
        },

        //audio controller open text  [ type `String | ReactNode` default 'open']
        openText: 'open',

        //audio controller close text  [ type `String | ReactNode` default 'close']
        closeText: 'close',

        //audio theme switch checkedText  [ type `String | ReactNode` default '-']
        checkedText: 'on',

        //audio theme switch unCheckedText [ type `String | ReactNode` default '-']
        unCheckedText: 'off',

        // audio list panel show text of the playlist has no songs [ type `String` | ReactNode  default 'no music']
        notContentText: 'No music',

        panelTitle: 'playlist',

        defaultPlayMode: 'order',

        //audio mode        mini | full          [type `String`  default `full`]
        mode: 'full',

        /**
         * [ type `Boolean` default 'false' ]
         * The default audioPlay handle function will be played again after each pause, If you only want to trigger it once, you can set 'true'
         */
        once: true,

        //Whether the audio is played after loading is completed. [type `Boolean` default 'true']
        autoPlay: true,

        //Whether you can switch between two modes, full => mini  or mini => full   [type 'Boolean' default 'true']
        toggleMode: true,

        //audio cover is show of the "mini" mode [type `Boolean` default 'true']
        showMiniModeCover: true,

        //audio playing progress is show of the "mini"  mode
        showMiniProcessBar: false,

        //audio controller is can be drag of the "mini" mode     [type `Boolean` default `true`]
        drag: true,

        //drag the audio progress bar [type `Boolean` default `true`]
        seeked: true,

        //audio controller title [type `String | ReactNode`  default <FaHeadphones/>]
        controllerTitle: <FaHeadphones />,

        //Displays the audio load progress bar.  [type `Boolean` default `true`]
        showProgressLoadBar: true,

        //play button display of the audio player panel   [type `Boolean` default `true`]
        showPlay: true,

        //reload button display of the audio player panel   [type `Boolean` default `true`]
        showReload: true,

        //download button display of the audio player panel   [type `Boolean` default `true`]
        showDownload: true,

        //loop button display of the audio player panel   [type `Boolean` default `true`]
        showPlayMode: true,

        //theme toggle switch  display of the audio player panel   [type `Boolean` default `true`]
        showThemeSwitch: true,

        //lyric display of the audio player panel   [type `Boolean` default `false`]
        showLyric: true,

        //Extensible custom content       [type 'Array' default '[]' ]
        extendsContent: [],

        //default volume of the audio player [type `Number` default `100` range `0-100`]
        defaultVolume: 100,

        //playModeText show time [type `Number(ms)` default `700`]
        playModeShowTime: 600,

        //Whether to try playing the next audio when the current audio playback fails [type `Boolean` default `true`]
        loadAudioErrorPlayNext: true,

        //Music is downloaded handle
        onAudioDownload(audioInfo) {
//    swal('download successfully', '', 'success')
            console.log('audio download', audioInfo)
        },

        //audio play handle
        onAudioPlay(audioInfo) {
            console.log('audio playing', audioInfo)
        },

        //audio pause handle
        onAudioPause(audioInfo) {
            console.log('audio pause', audioInfo)
        },

        //When the user has moved/jumped to a new location in audio
        onAudioSeeked(audioInfo) {
            console.log('audio seeked', audioInfo)
        },

        //When the volume has changed  min = 0.0  max = 1.0
        onAudioVolumeChange(currentVolume) {
            console.log('audio volume change', currentVolume)
        },

        //The single song is ended handle
        onAudioEnded(audioInfo) {
            // swal('Audio is ended!', '', 'success')
            console.log('audio ended', audioInfo)
        },

        //audio load abort The target event like {...,audioName:xx,audioSrc:xx,playMode:xx}
        onAudioAbort(e) {
            console.log('audio abort', e)
        },

        //audio play progress handle
        onAudioProgress(audioInfo) {
            // console.log('audio progress',audioInfo);
        },

        //audio reload handle
        onAudioReload(audioInfo) {
            console.log('audio reload:', audioInfo)
        },

        //audio load failed error handle
        onAudioLoadError(e) {
//    swal('audio load error', '', 'error')
            console.log('audio load err', e)
        },

        //theme change handle
        onThemeChange(theme) {
            console.log('theme change:', theme)
        },

        onAudioListsChange(currentPlayId, audioLists, audioInfo) {
            console.log('[currentPlayId] audio lists change:', currentPlayId)
            console.log('[audioLists] audio lists change:', audioLists)
            console.log('[audioInfo] audio lists change:', audioInfo)
        },

        onAudioPlayTrackChange(currentPlayId, audioLists, audioInfo) {
            console.log(
                'audio play track change:',
                currentPlayId,
                audioLists,
                audioInfo
            )
        },

        onPlayModeChange(playMode) {
            console.log('play mode change:', playMode)
        },

        onModeChange(mode) {
            console.log('mode change:', mode)
        },

        onAudioListsPanelChange(panelVisible) {
            console.log('audio lists panel visible:', panelVisible)
        },

        onAudioListsDragEnd(fromIndex, endIndex) {
            console.log('audio lists drag end:', fromIndex, endIndex)
        },

        onAudioLyricChange(lineNum, currentLyric) {
            console.log('audio lyric change:', lineNum, currentLyric)
        },

        // custom music player root node
        getContainer() {
            return document.body
        }
    }

    const audioLists = props.player.audioLists.map(audio => {
        return {
            name: audio.track,
            singer: audio.artist,
            cover: getUrlAction (audio.cover, 'image'),
            musicSrc: getUrlAction(audio.musicSrc, 'audio'),
        }
    });

    return (
        <Fragment>
            { props.player.show ? <ReactJkMusicPlayer
                defaultPlayIndex={props.player.currentIndex}
                audioLists={audioLists} { ...options } /> : null }
        </Fragment>
    )
}

PlayerManager.propTypes = {
    player: PropTypes.shape({
                audioList: PropTypes.arrayOf(
                        PropTypes.shape({
                            name: PropTypes.string,
                            singer: PropTypes.string,
                            cover: PropTypes.string,
                            musicSrc: PropTypes.string,
                        })
                    ),
                currentIndex: PropTypes.number,
                play: PropTypes.bool,
                show: PropTypes.bool
            })
}

/*PlayerManager.propTypes = {
    audioLists: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            singer: PropTypes.string,
            cover: PropTypes.string,
            musicSrc: PropTypes.string,
        })
    )

     <Media>
            { props.player.show ? <ReactJkMusicPlayer
                defaultPlayIndex={props.player.currentIndex}
                audioLists={audioLists} { ...options }/> : null }
        </Media>
    /*<Media>
            { props.player.show ? <MusicPlayer defaultPlayIndex={props.player.currentIndex} audioLists={audioLists} /> : null }
        </Media>*
}*/


export default PlayerManager;