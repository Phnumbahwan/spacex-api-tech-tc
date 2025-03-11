import React, { useState, useRef, useEffect } from "react";
import { useLaunches } from "../../api/useLaunches";
import Spinner from "../Spinner";
import "./launchList.scss";
import PropTypes from "prop-types";

function getRelativeTime(date) {
    const now = new Date();
    const diff = Math.floor((new Date(date) - now) / 1000);

    const units = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
        { label: "second", seconds: 1 }
    ];

    for (const { label, seconds } of units) {
        const value = Math.floor(diff / seconds);
        if (Math.abs(value) >= 1) {
            return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(value, label);
        }
    }

    return "just now";
}

function LaunchList({ searchQuery, selectedFilter }) {
    const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useLaunches(searchQuery, selectedFilter);
    const [expandedLaunchMissionName, setExpandedLaunchMissionName] = useState(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        if (!bottomRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 1.0 }
        );

        observer.observe(bottomRef.current);

        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage]);

    if (isLoading) return <Spinner color="#1976d2" />;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="launch-container">
            <div className="launch-list">
                {data.pages.map((page) =>
                    page.map((launch) => (
                        <div key={launch.mission_name} className="launch-card">
                            <div className="launch-header">
                                <strong>{launch.mission_name}</strong>
                                <span className={`${launch.upcoming ? "upcoming-status" : launch.launch_success ? "success-status" : "failed-status"}`}>
                                    {launch.upcoming ? "upcoming" : launch.launch_success ? "success" : "failed"}
                                </span>
                            </div>

                            {expandedLaunchMissionName === launch.mission_name && (
                                <div className="launch-details">
                                    <div className="time-link">
                                        <p>{getRelativeTime(launch.launch_date_utc)}</p>
                                        {launch.links.article_link && (
                                            <p>{"| "}<a href={launch.links.article_link} target="_blank" rel="noopener noreferrer">Article</a></p>
                                        )}
                                        {launch.links.video_link && (
                                            <p>{"| "}<a href={launch.links.video_link} target="_blank" rel="noopener noreferrer">Video</a></p>
                                        )}
                                    </div>
                                    <div className="details">
                                        {launch.links.mission_patch && (
                                            <img src={launch.links.mission_patch} alt="Mission Patch" className="mission-patch" />
                                        )}
                                        <p>{launch.details || "No details available."}</p>
                                    </div>
                                </div>
                            )}
                            <div className="view-btn-container">
                                <button
                                    className="view-btn"
                                    onClick={() => setExpandedLaunchMissionName(expandedLaunchMissionName === launch.mission_name ? null : launch.mission_name)}
                                >
                                    {expandedLaunchMissionName === launch.mission_name ? "HIDE" : "VIEW"}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div ref={bottomRef} style={{ height: "10px", marginBottom: "20px" }}></div>

            {isFetchingNextPage && <Spinner color="#1976d2" />}

            {!hasNextPage && <p className="end-of-list">End of list</p>}
        </div>
    );
}

LaunchList.propTypes = {
    searchQuery: PropTypes.string,
    selectedFilter: PropTypes.string
};

export default LaunchList;
