import API from "data";
import useSWR from "swr";
import buildUrl from "utils/buildUrl";

export const useFound = (id, options = {}) => {
  const query = buildUrl(options);
  const url = id ? `/founds/${id}${query ? `?${query}` : ""}` : null;
  const { data, error } = useSWR(url, API.fetcher);

  return {
    found: data && data.data,
    isLoading: !error && !data,
    isError: error,
  };
};
