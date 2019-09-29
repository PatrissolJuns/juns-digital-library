import React from 'react';
import PropTypes from './../utils/propTypes';

import {Table, Button} from 'reactstrap';

import Avatar from './../components/Avatar';

import { IoMdHeart } from 'react-icons/io';

const MusicItemTable = ({ headers, musicData, ...restProps }) => {
  return (
    <Table responsive hover {...restProps}>
      <thead>
        <tr className="text-capitalize align-middle">
          {headers.map((item, index) => <th key={index}>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {musicData.map(({ avatar, track,artist, album, duration }, index) => (
          <tr key={index}>
            <td className="align-middle">
              <Avatar src={avatar} />
            </td>
            <td className="align-middle">{track}</td>
            <td className="align-middle">{artist}</td>
            <td className="align-middle">{album}</td>
            <td className="align-middle">{duration}</td>
            <td className="align-middle">
                <Button outline color="primary"
                       style={{ width:"35px", height:"35px", flexDirection: "column" }}
                       className="rounded-circle center-hor-ver">
                    <IoMdHeart size={20} />
                </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

MusicItemTable.propTypes = {
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
};

export default MusicItemTable;
