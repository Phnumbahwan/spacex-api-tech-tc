import { useInfiniteQuery } from "@tanstack/react-query";

const fetchLaunches = async ({ pageParam = 0, queryKey }) => {
    const [, searchQuery, selectedFilter] = queryKey;
    const limit = pageParam === 0 ? 10 : 3;
    const searchParam = searchQuery ? `&mission_name=${searchQuery}` : "";

    let filterParam = "";
    if (selectedFilter === "Upcoming") filterParam = "&upcoming=true&launch_success=null";
    if (selectedFilter === "Failed") filterParam = "&launch_success=false";
    if (selectedFilter === "Success") filterParam = "&launch_success=true";

    const response = await fetch(`https://api.spacexdata.com/v3/launches?limit=${limit}&offset=${pageParam * 3}${searchParam}${filterParam}`);

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json();
};

export function useLaunches(searchQuery, selectedFilter) {
    return useInfiniteQuery({
        queryKey: ["launches", searchQuery, selectedFilter],
        queryFn: fetchLaunches,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) =>
            lastPage.length > 0 ? (allPages.length === 1 ? 3 : allPages.length + 1) : undefined,
        staleTime: 5000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
}
