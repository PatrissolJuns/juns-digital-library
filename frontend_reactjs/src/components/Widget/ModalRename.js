import React, { useEffect, useState } from 'react';
import {Button, InputGroup, InputGroupAddon, Modal, ModalBody, ModalHeader} from "reactstrap";

const ModalRename = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(props.isModalOpen);

    const toggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <Modal
            isOpen={isModalOpen}
            toggle={() => toggle()}
            className={props.className + " modal-dialog-centered"}>
            <ModalHeader toggle={() => toggle()}>{props.title}</ModalHeader>
            <ModalBody>
                <form
                    onSubmit={handleSubmit}
                >
                    <InputGroup>
                        <input
                            type="text"
                            className="form-control"
                            name="new_playlist"
                            // onChange={this.handleChange}
                        />
                        <InputGroupAddon addonType="prepend"><Button type="submit" color="primary">Submit</Button></InputGroupAddon>
                    </InputGroup>
                </form>
            </ModalBody>
        </Modal>
    )
}

export default ModalRename;