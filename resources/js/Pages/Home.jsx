import React from 'react';
import { Head } from '@inertiajs/inertia-react';

const games = [
    {
        id: 1,
        title: 'The Legend of Zelda: Breath of the Wild',
        description: 'An open-world adventure game set in the kingdom of Hyrule.',
        image: 'https://example.com/zelda.jpg',
    },
    {
        id: 2,
        title: 'Super Mario Odyssey',
        description: 'A platform game where Mario travels across various worlds.',
        image: 'https://example.com/mario.jpg',
    },
    {
        id: 3,
        title: 'Chrono Trigger',
        description: 'Artwork by Akira Toriyama adventure through time to save the world.',
        image: 'https://example.com/chrono.jpg',
    }
    // Add more games as needed
];

const Home = () => {
    return (
        <div className="container mx-auto p-4">
            <Head title="Video Game Aggregator" />
            <h1 className="text-3xl font-bold mb-4 text-center">Video Game Aggregator</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {games.map((game) => (
                    <div key={game.id} className="bg-white rounded-lg shadow-md p-4">
                        <img
                            src={game.image}
                            alt={game.title}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h2 className="text-xl font-semibold mb-2">{game.title}</h2>
                        <p className="text-gray-700">{game.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
