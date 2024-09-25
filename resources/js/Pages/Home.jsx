import React, {useEffect, useState} from 'react';
import {Head, usePage} from '@inertiajs/react';
import Default from '@/Layouts/Default';
import CommandPalette from "@/Components/CommandPalette.jsx";
import DescriptionModal from "@/Components/DescriptionModal.jsx";
import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';
import RunawayButton from "../Components/RunawayButton.jsx";

const Home = ({  }) => {
    const { props: { games } } = usePage()

    const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);

    const handleOpenDescriptionModal = (game) => {
        setSelectedGame(game);
        setIsDescriptionModalOpen(true);
    };

    const handleCloseDescriptionModal = () => {
        setIsDescriptionModalOpen(false);
        setSelectedGame(null);
    };

    const handleOpenAddModal = (game) => {
        setSelectedGame(game);
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
        setSelectedGame(null);
    };

    const handleAddGame = () => {
        if (selectedGame) {
            axios.post('/game-user', {
                game_id: selectedGame.id,
                game_name: selectedGame.name,
                game_description: selectedGame.description,
            }).then(response => {
                console.log(response.data.message);
                setIsAddModalOpen(false);
                setSelectedGame(null);
                Inertia.reload();
            }).catch(error => {
                console.error('There was an error adding the game to your collection!', error);
            });
        }
    };

    return (
        <Default>
            <Head title="Your Video Game Collection Manager" />

            <CommandPalette gameModalCallback={handleOpenAddModal} />

            {selectedGame && (
                <DescriptionModal
                    isOpen={isDescriptionModalOpen}
                    onClose={handleCloseDescriptionModal}
                    game={selectedGame}
                />
            )}

            {selectedGame && (
                <Dialog open={isAddModalOpen} onClose={handleCloseAddModal}>
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                        <Dialog.Panel className="max-w-lg space-y-4 border bg-white p-12">
                            <DialogTitle className="font-bold">{selectedGame.name}</DialogTitle>
                            <Description>Do you want to add this game to your library?</Description>
                            <div className="flex gap-4">
                                <button onClick={handleCloseAddModal}>Cancel</button>
                                <button onClick={handleAddGame}>Add</button>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            )}

            <div className="relative dark:bg-dots-lighter dark:bg-gray-900 text-white min-h-screen pt-16 p-8 overflow-x-hidden">
                <h1 className="mt-12 text-5xl font-extrabold mb-8 text-center text-purple-600">GameShelf</h1>
                <div className="flex flex-wrap justify-center gap-8">
                    {games.map((game) => {
                        const isTruncated = game.description.length > 200;
                        const artworkUrl = game.cover_arts.length > 0
                            ? `https://images.igdb.com/igdb/image/upload/t_720p/${game.cover_arts[0].image_id}.jpg`
                            : "https://placehold.co/600x400"; // Fallback image URL

                        return (
                            <div key={game.id} className="bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 p-6 w-72 relative">
                                <img
                                    src={artworkUrl}
                                    alt={game.name}
                                    className="w-full h-48 object-scale-down rounded-md mb-4"
                                />
                                <h2 className="text-2xl font-semibold text-purple-600 mb-2">
                                    <a href={`/games/${game.slug}`}>{game.name}</a>
                                </h2>
                                <p className="text-gray-300 mb-4">
                                    {isTruncated ? `${game.description.substring(0, 200)}...` : game.description}
                                </p>
                                <div className="flex justify-between items-end mt-auto">
                                    {isTruncated && (
                                        <button
                                            onClick={() => handleOpenDescriptionModal(game)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Read more
                                        </button>
                                    )}
                                </div>
                                <p className="absolute bottom-4 right-4 text-gray-500 font-bold">{game.platforms.name}</p>
                            </div>
                        );
                    })}
                </div>
                <RunawayButton />
            </div>

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
                /* Custom scrollbar for dark theme */
                ::-webkit-scrollbar {
                    width: 12px;
                }

                ::-webkit-scrollbar-track {
                    background: #1a202c;
                }

                ::-webkit-scrollbar-thumb {
                    background-color: #4a5568;
                    border-radius: 6px;
                    border: 3px solid #1a202c;
                }
            `}</style>
    </Default>
    );
};

export default Home;
