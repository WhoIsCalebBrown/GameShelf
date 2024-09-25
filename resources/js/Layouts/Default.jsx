import React from 'react';
import NavBar from "@/Components/NavBar.jsx";
import {useUser} from "@/Context/UserContext.jsx";

export default function Layout({ children }) {
    return (
        <div>
            <NavBar />
            <main>{children}</main>
        </div>
    );
}
