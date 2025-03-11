import React from "react";
import PropTypes from "prop-types";
import "./search.scss";

function SearchBar({ onSearch, placeholder }) {
    return (
        <input
            type="text"
            className="search-bar"
            placeholder={placeholder}
            onChange={(e) => onSearch(e.target.value)}
        />
    );
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};

SearchBar.defaultProps = {
    placeholder: "Search...",
};

export default SearchBar;
