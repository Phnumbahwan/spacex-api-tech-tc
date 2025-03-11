import { useInfiniteQuery } from "@tanstack/react-query";

const fetchLaunches = async ({ pageParam = 0, queryKey }) => {
    const [, searchQuery] = queryKey;
    const limit = pageParam === 0 ? 10 : 3;
    const searchParam = searchQuery ? `&mission_name=${searchQuery}` : "";

    const response = await fetch(`https://api.spacexdata.com/v3/launches?limit=${limit}&offset=${pageParam * 3}${searchParam}`);

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json();
};

export function useLaunches(searchQuery) {
    return useInfiniteQuery({
        queryKey: ["launches", searchQuery],
        queryFn: fetchLaunches,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) =>
            lastPage.length > 0 ? (allPages.length === 1 ? 3 : allPages.length + 1) : undefined,
        staleTime: 5000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
}
