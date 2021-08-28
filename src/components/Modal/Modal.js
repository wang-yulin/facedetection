import React from "react";
import ReactDOM from "react-dom";
import './Modal.css';

const modalToot = document.getElementById("modal-root")

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement("div");
    }

    componentDidMount() {
        modalToot.appendChild(this.el)
    }

    componentWillUnmount() {
        modalToot.removeChild(this.el)
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.el)
    }
}

export default Modal;