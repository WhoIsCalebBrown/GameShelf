import React from 'react';
import NavBar from "@/Components/NavBar.jsx";

export default function Layout({ children, user }) {
    return (
        <div>
            <NavBar user={user} />
            <main>{children}</main>
        </div>
    );
}
