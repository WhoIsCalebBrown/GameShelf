import React, {useState} from 'react';
import { Head } from '@inertiajs/react';
import NavBar from "@/Components/NavBar.jsx";
import CommandPalette from "@/Components/CommandPalette.jsx";
import {Description, Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import {Inertia} from "@inertiajs/inertia";
import TruncatedText from "@/Components/TruncatedText.jsx";

const Home = ({ games, auth }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [gameData, setGameData] = useState(null);

    const handleOpenModal = (data) => {
        setGameData(data);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setGameData(null);
    };

    const handleModalClick = (gameData) => {
        setIsModalOpen((prev) => !prev);
        setGameData(gameData);
    }

    const handleAddGame = () => {
        if (gameData) {
            axios.post('/game-user', {
                game_id: gameData.id,
                game_name: gameData.name,
                game_description: gameData.description,
            }).then(response => {
                console.log(response.data.message);
                setIsModalOpen(false);
                setGameData(null);
                Inertia.reload();
                // Optionally, refresh the page or update state to reflect changes
            }).catch(error => {
                console.error('There was an error adding the game to your collection!', error);
            });


        }
    }

    return (
        <>
            <Head title="Your Video Game Collection Manager"/>

            <div>
                <NavBar user={auth}/>
            </div>

            <CommandPalette gameModalCallback={handleModalClick}/>

            {gameData && (
                <Dialog open={isModalOpen} onClose={handleCloseModal}>
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                            <DialogTitle className="font-bold">{gameData.name}</DialogTitle>
                            <Description>Do you want to add this game to your library?</Description>
                            <div className="flex gap-4">
                                <button onClick={handleCloseModal}>Cancel</button>
                                <button onClick={handleAddGame}>Add</button>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            )}

            <div
                className="relative dark:bg-dots-lighter dark:bg-gray-900 text-white min-h-screen pt-16 p-8 overflow-x-hidden">
                <h1 className="mt-12 text-5xl font-extrabold mb-8 text-center text-purple-600">GameShelf</h1>
                <div className="flex flex-wrap justify-center gap-8">
                    {games.map((game) => (
                        <div key={game.id}
                             className="bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 p-6 w-72 relative">
                            <img
                                src="https://placehold.co/600x400"
                                alt={game.name}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-2xl font-semibold text-purple-600 mb-2">{game.name}</h2>
                            <TruncatedText text={game.description} maxLength={200} />
                            <p className="absolute bottom-4 right-4 text-gray-500 font-bold">{game.platform.name}</p>
                        </div>
                    ))}
                </div>
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
        </>
    );
};

export default Home;
