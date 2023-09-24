import React, { useEffect } from "react";

import DropContent from './dropcontent.js';
import NavBtn from './navbtn.js';

// Nav Content Component
export default function NavContent({ widthdemension, page, flipContent, is_login }){
    const[dropdown, setDropdown] = React.useState(false);
    const[authenticated, setAuthenticated] = React.useState(false);

    window.onclick = (event) => {
        if (dropdown === true){
            if (!event.target.matches('.dropbtn') && !event.target.matches('#navDropdown a')){
                setDropdown(false)
            }
        }
    };

    // Check if user is authenticated
    useEffect(() => {
        fetch('/authentication')
        .then(response => response.json())
        .then(data => {
            setAuthenticated(data.authenticated)
        })
        .catch(error => {
            alert(error)
        })
    }, []);
    

    // if window width is less than 710px plug a dropdown menu
    if (widthdemension <= 710){
        return (
            <div className="dropdown">
                <i onClick={() => setDropdown(!(dropdown))} className={dropdown ? "fa-solid fa-bars dropbtn dropbtn-focus": "fa-solid fa-bars dropbtn"}></i>
                <DropContent dropdown={dropdown} />
            </div>
        );
    }

    // Else return nav-items
    else {
        return (
            <>
                <div className="nav-items">
                    <a href="/">Home</a>
                    <a href="#">About</a>
                    <a href="#">Type of house</a>
                    <a href="#">Contact</a>
                </div>
                <NavBtn page={page} authenticated={authenticated} flipContent={flipContent} is_login={is_login}/>
                
            </>
        );
    }
}