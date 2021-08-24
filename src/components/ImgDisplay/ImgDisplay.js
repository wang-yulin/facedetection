import React from 'react';
import './ImgDisplay.css';

const ImgDisply = ({ url, boxes }) => {
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
                {boxes.map(box => {
                    return <div key={box.topRow} className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
                })}
            </div> 
        </div>
        
    )
}

export default ImgDisply;