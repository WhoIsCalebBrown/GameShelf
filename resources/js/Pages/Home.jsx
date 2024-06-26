import React from 'react';
import { Head } from '@inertiajs/react';
import NavBar from "@/Components/NavBar.jsx";

const Home = ({ games, auth }) => {
    return (
        <>
            <Head title="Your Video Game Collection Manager" />
            <NavBar user={auth}/>

            <div className="bg-gray-900 text-white min-h-screen p-8 mt-6">
                <h1 className="text-5xl font-extrabold mb-8 text-center text-purple-600">GameShelf</h1>
                <div className="flex flex-wrap justify-center gap-8">
                    {games.map((game) => (
                        <div key={game.id} className="bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 p-6 w-72 relative">
                            <img
                                src="https://placehold.co/600x400"
                                alt={game.name}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-2xl font-semibold text-purple-600 mb-2">{game.name}</h2>
                            <p className="text-gray-400 mb-12">{game.description}</p>
                            <p className="absolute bottom-4 right-4 text-gray-500 font-bold">{game.platform}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>

    );
};

export default Home;
