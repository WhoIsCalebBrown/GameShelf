import React, { useState, useEffect } from 'react';

const RunawayButton = () => {
    const [position, setPosition] = useState({ top: '90%', left: '90%' });
    const navbarBoundary = 120; // Boundary to prevent the button from moving behind the navbar

    const handleMouseMove = (event) => {
        const button = document.getElementById('runaway-button');
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const distance = Math.sqrt(
            Math.pow(event.clientX - (rect.left + rect.width / 2), 2) +
            Math.pow(event.clientY - (rect.top + rect.height / 2), 2)
        );

        const sensitivity = 300; // Distance at which the button starts moving
        const maxSpeed = 200; // Maximum speed when the mouse is very close
        const minSpeed = 5; // Minimum speed when the mouse is far

        if (distance < sensitivity) {
            const speed = Math.max(minSpeed, maxSpeed * (1 - distance / sensitivity));
            const angle = Math.atan2(event.clientY - (rect.top + rect.height / 2), event.clientX - (rect.left + rect.width / 2));
            let newTop = rect.top - Math.sin(angle) * speed;
            let newLeft = rect.left - Math.cos(angle) * speed;

            // Ensure the button stays within the viewport and above the navbar
            newTop = Math.max(navbarBoundary, Math.min(window.innerHeight - rect.height, newTop));
            newLeft = Math.max(0, Math.min(window.innerWidth - rect.width, newLeft));

            setPosition({ top: newTop, left: newLeft });
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <button
            id="runaway-button"
            className="bg-gradient-to-r bg-blue-500 to-purple-600 text-white px-4 py-2 rounded fixed transition-all duration-100"
            style={{ top: position.top, left: position.left, position: 'fixed' }}
        >
            Search Game
        </button>
    );
};

export default RunawayButton;
