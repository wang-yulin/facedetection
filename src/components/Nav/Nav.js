import React from 'react';
import ProfileIcon from '../Profile/ProfileIcon';

const Nav = ({ onRouteChange, route, toggleModal }) => {
    if(route === "home"){
        return(
        <nav className='flex justify-end '>
            <ProfileIcon 
                onRouteChange={onRouteChange}
                toggleModal={toggleModal}
            />
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