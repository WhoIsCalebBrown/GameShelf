// GameDetail.jsx
import React from 'react';
import CommentSection from "../Components/CommentSection.jsx";
import Default from "../Layouts/Default.jsx";
import {usePage} from "@inertiajs/react";

const GameDetail = ({  }) => {
    // Assume comments are part of the game data
    // const { comments } = game;

    const { props: { game, auth } } = usePage()

    return (
        <Default user={auth}>
            <div className="relative min-h-screen bg-gray-800 text-white">
                <div className="pt-32">
                    <div
                        className="absolute inset-0 bg-contain bg-no-repeat z-0"
                        style={{
                            backgroundImage: `url(${game.artworks.length > 0 ? `https://images.igdb.com/igdb/image/upload/t_1080p/${game.artworks[0].image_id}.jpg` : "https://placehold.co/1280x720"})`,
                            backgroundPosition: 'center top', // Center horizontally, top vertically
                        }}
                    >
                        <div
                            className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
                    </div>
                    <div className="relative max-w-6xl mx-auto p-8 z-10">
                        <div className="flex items-center space-x-8">
                            <div className="w-1/3">
                                <img
                                    src={game.cover_arts.length > 0 ? `https://images.igdb.com/igdb/image/upload/t_1080p/${game.cover_arts[0].image_id}.jpg` : "https://placehold.co/256x340"}
                                    alt={`${game.name} Cover Art`}
                                    className="w-full rounded-md shadow-lg"
                                />
                            </div>
                            <div className="w-2/3">
                                <h1 className="text-5xl font-bold mb-4">{game.name}</h1>
                                <p className="text-gray-400 mb-2"><strong>Released:</strong> {game.year}</p>
                                <p className="text-gray-400 mb-2"><strong>Genre:</strong> {game.genre}</p>
                                <p className="text-gray-400 mb-4"><strong>Platform:</strong> {game.platform}</p>
                                <p className="text-gray-300">{game.description}</p>
                            </div>
                        </div>

                        {/* Pass comments to CommentSection */}
                        <CommentSection />
                    </div>
                </div>
            </div>
        </Default>
    );
};

export default GameDetail;
