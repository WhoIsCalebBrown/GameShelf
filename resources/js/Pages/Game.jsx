import React from 'react';
import CommentSection from "@/Components/CommentSection.jsx";
import NavBar from "@/Components/NavBar.jsx";

const GameDetail = ({ game, auth }) => {
    const artworkUrl = game.artworks.length > 0
        ? `https://images.igdb.com/igdb/image/upload/t_1080p/${game.artworks[0].image_id}.jpg`
        : "https://placehold.co/1280x720"; // Fallback image URL

    const coverArtUrl = game.cover_arts.length > 0
        ? `https://images.igdb.com/igdb/image/upload/t_1080p/${game.cover_arts[0].image_id}.jpg`
        : "https://placehold.co/256x340"; // Fallback cover art URL


    console.log(game);
    return (
        <div className="relative min-h-screen bg-black text-white">
            {/* NavBar */}
            <NavBar user={auth} />

            {/* Main Content */}
            <div className="pt-32"> {/* Add padding to avoid overlap with NavBar */}
                {/* Background with fading effect */}
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{
                        backgroundImage: `url(${artworkUrl})`,
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
                </div>

                {/* Content Container */}
                <div className="relative max-w-6xl mx-auto p-8 z-10">
                    {/* Game Details Card */}
                    <div className="flex items-center space-x-8">
                        <div className="w-1/3">
                            <img
                                src={coverArtUrl}
                                alt={`${game.name} Cover Art`}
                                className="w-full rounded-md shadow-lg"
                            />
                        </div>
                        <div className="w-2/3">
                            <h1 className="text-5xl font-bold mb-4">{game.name}</h1>
                            <p className="text-gray-400 mb-2"><strong>Released:</strong> {game.year}</p>
                            <p className="text-gray-400 mb-2"><strong>Genre:</strong> {game.genres.name}</p>
                            <p className="text-gray-400 mb-4"><strong>Platform:</strong> {game.platforms.name}</p>
                            <p className="text-gray-300">{game.description}</p>
                        </div>
                    </div>

                    {/* Comment Section */}
                    <div className="mt-8">
                        <CommentSection gameId={game.id} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameDetail;
