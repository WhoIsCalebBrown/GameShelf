// pages/Trending.jsx
import React from "react";
import TrendingGames from "../Components/TrendingGames";
import Default from "@/Layouts/Default";

const TrendingPage = ({ games, auth }) => {
    return (
        <Default user={auth}>
            <div className="min-h-screen bg-gray-100 pt-16 dark:bg-gray-900">
                <TrendingGames games={games} />
            </div>
        </Default>
    );
};

export default TrendingPage;
