import React from 'react';

const Rank = ({name,entries}) => {
    return(
        <div>
            <p className="white f3">{`Hi, ${name}! you rank is ...`}</p>
            <p className='white f1'>{entries}</p>
        </div>
    )
}

export default Rank;