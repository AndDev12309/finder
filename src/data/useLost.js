import useSWR from "swr";
import API from "./index";
import buildUrl from "utils/buildUrl";

export const useLost = (id, options = {}) => {
  const query = buildUrl(options);
  const url = id ? `/losts/${id}${query ? `?${query}` : ""}` : null;
  const { data, error } = useSWR(url, API.fetcher);

  return {
    lost: data && data.data,
    isLoading: !error && !data,
    isError: error,
  };
};
