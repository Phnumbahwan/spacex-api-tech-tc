import React, { useState } from "react";
import SearchBar from "../SearchBar";
import LaunchList from "../LaunchList";

function Main() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div>
            <SearchBar onSearch={setSearchQuery} />
            <LaunchList searchQuery={searchQuery} />
        </div>
    );
}

export default Main;
