import React from "react";

import UpdateURL from './UpdateURL.js';
import { leapfrog } from 'ldrs'

leapfrog.register()

export default function NavContent({ dropdown, authenticated, page, is_login, logout_user, isloading }){
    if (dropdown){
        if (page === "login"){
            return (
                <div id="navDropdown" className="dropdown-content">
                    <a href="/">Home</a>
                    <a href="#">About</a>
                    <a onClick={() => UpdateURL('account')}>Account</a>
                    <a href="#">Contact</a>
                    <a onClick={() => UpdateURL(is_login ? 'signup': 'login')}>{is_login && "Sign up" || "Log in"}</a>
                </div>
            );
        }
        else {
            return (
                <div id="navDropdown" className="dropdown-content">
                    <a href="/">Home</a>
                    <a href="#">About</a>
                    <a onClick={() => UpdateURL('account')}>Account</a>
                    <a href="#">Contact</a>
                    {isloading && <a><l-leapfrog size="20" speed="2.5" color="black" ></l-leapfrog></a> || (authenticated && <a onClick={() => logout_user()}>Logout</a> || <a onClick={() => {UpdateURL('login')}}>Login</a>)}
                </div>
            );
        }
    } else {
        return (<></>);
    }
}