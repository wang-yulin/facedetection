import React from 'react';
import './ImgDisplay.css';

const ImgDisply = ({ url, box }) => {
    return (
        <div className="center">
            <div className="absolute mt2">
                <img 
                id='inputimage'
                className="pa1"
                src={ url }
                alt="" 
                style={{width: "500px", height: 'auto'}}
                />
                <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div> 
        </div>
        
    )
}

export default ImgDisply;