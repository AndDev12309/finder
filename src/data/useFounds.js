import API from "data";
import useSWR from "swr";
import buildUrl from "utils/buildUrl";

export const useFounds = (options = {}) => {
  const query = buildUrl(options);
  const url = `/founds${query ? `?${query}` : ""}`;
  const { data, error } = useSWR(url, API.fetcher);

  return {
    founds: data && data.data,
    isLoading: !error && !data,
    isError: error,
  };
};
