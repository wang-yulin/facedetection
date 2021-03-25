import React from 'react';
import './ImgInput.css';

const ImgInput = ({ onInputChange, onButtonChange }) => {
    return (
        <div>
            <div>
                <p className="f3">
                    {'This magic Brain will detect faces in your picture. Git it a try!'}
                </p>
            </div>
            <div className='center'>
                <div className="pa4 br3 shadow-5 pattern">
                    <input type='text' className='f4 pa2 w-70'onChange={onInputChange} />
                    <button 
                    onClick = {onButtonChange}
                    className="w-30 grow f4 link pv2 white bg-light-purple dib"
                    >Detect</button>   
                </div>
                
            </div>
        </div>
    )
}

export default ImgInput;

