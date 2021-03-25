import React from 'react';

const Nav = ({ onRouteChange, route }) => {
    if(route === "home"){
        return(
        <nav className='flex justify-end '>
            <p onClick={()=>onRouteChange('signin') } className='f3 link dim black underline pa3 pointer ma0'>Sign Out</p>
        </nav>)
    } else {
        return(
            <div className='flex justify-end '>
                <nav >
                    <p onClick={()=>onRouteChange('signin') } className='f3 link dim black underline pa3 pointer ma0'>Sign In</p>
                </nav>
                <nav >
                    <p onClick={()=>onRouteChange('register') } className='f3 link dim black underline pa3 pointer ma0'>Register</p>
                </nav>
            </div>
        )}
            
}

export default Nav;