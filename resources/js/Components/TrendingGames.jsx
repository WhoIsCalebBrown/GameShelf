// components/TrendingGames.jsx
import React from "react";
import { format } from "date-fns";

const TrendingGames = ({ games }) => {
    console.log(games);

    return (
        <div className="py-8">
            <div className="pt-30 mx-auto px-4 pt-12 sm:px-6 lg:px-32">
                <h1 className="mb-8 text-center text-5xl font-extrabold text-purple-600 drop-shadow-lg">
                    Trending Games test
                </h1>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5">
                    {games.map((game) => (
                        <div
                            key={game.id}
                            className="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl dark:bg-gray-800">
                            <div className="relative pb-[133.33%]">
                                <img
                                    src={`${game.cover_url.replace("t_thumb", "t_cover_big_2x")}`}
                                    alt={game.name}
                                    className="absolute left-0 top-0 h-full w-full object-cover"
                                />
                            </div>

                            <div className="p-6">
                                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                                    {game.name}
                                </h3>

                                <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                                    Released: {game.release_date}
                                </div>

                                <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-300">{game.summary}</p>

                                <button className="mt-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrendingGames;
