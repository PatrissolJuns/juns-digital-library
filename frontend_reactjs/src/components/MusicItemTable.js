import React from 'react';
import PropTypes from './../utils/propTypes';

import {Table} from 'reactstrap';

import Avatar from './../components/Avatar';

import PlayButtonContainer from "../containers/MusicItemContainers/PlayButtonContainer";
import ThreeDotsContainer from "../containers/MusicItemContainers/ThreeDotsContainer";
import BookmarkContainer from "../containers/MusicItemContainers/BookmarkContainer";
import {getUrlAction, getDurationFormat} from './../utils/builtInFunction';

const MusicItemTable = ({ headers, musicData, ...restProps }) => {
    // console.log("musicData = ",musicData);
    if(musicData === undefined || musicData.some(item => item === undefined)) return null;
  return (
    <Table responsive hover {...restProps}>
      <thead>
        <tr className="text-capitalize align-middle">
          {headers.map((item, index) => <th key={index}>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {musicData.map((audio, index) => (
          <tr key={index}>
            <td className="align-middle">
              <Avatar src={getUrlAction(audio.cover, "image")} />
            </td>
            <td className="align-middle">{audio.track}</td>
            <td className="align-middle">{audio.artist}</td>
            <td className="align-middle">{audio.album}</td>
            <td className="align-middle">{getDurationFormat(audio.duration)}</td>
              <td className="align-middle center-hor-ver">
                  <PlayButtonContainer audio={audio} audioList={musicData} />
                  <BookmarkContainer audio={audio} />
                  <ThreeDotsContainer audio={audio} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

/*MusicItemTable.propTypes = {
  headers: PropTypes.node,
  musicData: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string,
      track: PropTypes.string,
      artist: PropTypes.string,
      album: PropTypes.string,
      duration: PropTypes.string,
    })
  ),
};

MusicItemTable.defaultProps = {
  headers: [],
  musicData: [],
};*/

export default MusicItemTable;
