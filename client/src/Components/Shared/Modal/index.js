import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from "react-transition-group";
import BackDrop from '../BackDrop';

const ModalOverLay = props => {
      const content = (
            <div className={`custom_modal ${props.modal_body}`} >
                <div className="modal_dialog">
                    <header className={`modal__header ${props.headerClass}`}>
                        <h2>{props.header}</h2>
                    </header>
                    <form onSubmit={ props.onSubmit ? props.onSubmit : (event) => event.preventDefault()}>
                        <div className={`modal__content ${props.contentClass}`}>
                            {props.children}
                        </div>
                        <footer className={`modal__footer  ${props.footerClass}`}>
                            {props.footer}
                        </footer>
                    </form>
                </div>
            </div>
      )
      return ReactDOM.createPortal(content, document.getElementById('modal-hooks'));
}

const Modal = props => {
      return (
            <React.Fragment>
                  {props.show ? <BackDrop clicked={props.onCancel} /> : null}
                  <CSSTransition
                        in={props.show}
                        mountOnEnter
                        unmountOnExit
                        timeout={100}
                        className="custom_modal"
                  >
                        <ModalOverLay {...props}/>
                  </CSSTransition>
            </React.Fragment>
      )}

export default Modal;