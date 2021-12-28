import React from 'react';
import ReactDom from 'react-dom';

const backDrop = (props) => {
      const backdrop = <div className="backdrop" onClick={props.clicked}></div>
      return ReactDom.createPortal(backdrop, document.getElementById('back-drop'));
}

export default backDrop;