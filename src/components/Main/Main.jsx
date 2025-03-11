import React, { useState } from "react";
import SearchBar from "../SearchBar";
import LaunchList from "../LaunchList";
import FilterBar from "../FilterBar";
import "./main.scss";

function Main() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("All");

    return (
        <div>
            <div className="d-flex">
                <SearchBar onSearch={setSearchQuery} />
                <FilterBar selectedFilter={selectedFilter} onFilterChange={(value) => setSelectedFilter(value)} />
            </div>
            <LaunchList searchQuery={searchQuery} selectedFilter={selectedFilter} />
        </div>
    );
}

export default Main;
