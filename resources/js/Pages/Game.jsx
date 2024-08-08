import React from 'react';
import CommentSection from "@/Components/CommentSection.jsx";

const GameDetail = ({ game }) => {
    const artworkUrl = game.artworks.length > 0
        ? `https://images.igdb.com/igdb/image/upload/t_720p/${game.artworks[0].image_id}.jpg`
        : "https://placehold.co/1280x720"; // Fallback image URL

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mb-6">
                <h1 className="text-4xl font-bold mb-4">{game.name}</h1>
                <div className="mb-4">
                    <img
                        src={artworkUrl}
                        alt={game.name}
                        className="w-full object-contain mx-auto rounded-md"
                    />
                </div>
                <p className="text-gray-400"><strong>Release Year:</strong> {game.year}</p>
                <p className="text-gray-400"><strong>Genre:</strong> {game.genre}</p>
                <p className="text-gray-400"><strong>Platform:</strong> {game.platform.name}</p>
                <p className="mt-4">{game.description}</p>
            </div>
            <CommentSection gameId={game.id} />
        </div>
    );
};

export default GameDetail;
