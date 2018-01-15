import React from "react"
import Modal from 'react-modal'

const KModal = ({className, isOpen, label, content, onRequestClose}) => {
    Modal.setAppElement('#app');
    let customStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
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
                base: className.base + " react-modal",
                afterOpen: className.afterOpen + ' modal-open',
                beforeClose:""
            }}
            style={customStyles}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={label}
            shouldCloseOnOverlayClick={true}
        >
            {content}
        </Modal>

    )

}

export default KModal