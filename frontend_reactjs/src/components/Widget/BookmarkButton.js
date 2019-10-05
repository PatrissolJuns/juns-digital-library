import {Button} from "reactstrap";
import React from "react";
import { IoMdHeart } from 'react-icons/io';

const BookmarkButton = () => {
    return (
        <Button outline color="primary"
                style={{ width:"35px", height:"35px", flexDirection: "column" }}
                className="rounded-circle center-hor-ver">
            <IoMdHeart size={20} />
        </Button>
    )
}

export default BookmarkButton;