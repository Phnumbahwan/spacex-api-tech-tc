import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaCheckCircle, FaTimesCircle, FaClock, FaFilter } from "react-icons/fa";
import "./filterbar.scss";

function FilterBar({ selectedFilter, onFilterChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const filters = [
        { label: "All", icon: <FaFilter />, value: "All" },
        { label: "Success", icon: <FaCheckCircle color="green" />, value: "Success" },
        { label: "Failed", icon: <FaTimesCircle color="red" />, value: "Failed" },
        { label: "Upcoming", icon: <FaClock color="orange" />, value: "Upcoming" },
    ];

    return (
        <div className="dropdown">
            <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
                <span>{filters.find(f => f.value === selectedFilter)?.icon}</span>
                <span>{selectedFilter}</span>
                <span> ▼</span>
            </button>

            {isOpen && (
                <ul className="dropdown-menu">
                    {filters.map(filter => (
                        <li key={filter.value} onClick={() => { onFilterChange(filter.value); setIsOpen(false); }}>
                            {filter.icon} {filter.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

FilterBar.propTypes = {
    selectedFilter: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func.isRequired,
};

export default FilterBar;
