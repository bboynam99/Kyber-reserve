import React from "react"
import Modal from 'react-modal'

const KModal = (props) => {
    let customStyles = {
        overlay: {
            position: 'fixed',
            top: 50,
            left: 100,
            right: 100,
            bottom: 50,
            backgroundColor: '#F4FbF9',
            zIndex: '1005',
            border: '2px solid #ddd',
            borderRadius: '5px',
            boxShadow: '0 8px 20px 0 rgba(135, 136, 136, 0.26), 0 0 6px 0 rgba(173, 177, 176, 0.26)'
        },
        content: {
            display: 'block',
        }
    }
    return (
        <Modal
            className={{
                base: props.className.base + " react-modal",
                afterOpen: props.className.afterOpen + ' modal-open',
                beforeClose:""
            }}
            style={customStyles}
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            contentLabel={props.contentLabel}
            shouldCloseOnOverlayClick={true}
        >
            {props.content}
        </Modal>

    )

}

export default KModal