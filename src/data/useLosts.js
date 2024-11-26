import useSWR from "swr";
import API from "./index";
import buildUrl from "utils/buildUrl";

export const useLosts = (options = {}) => {
  const query = buildUrl(options);
  console.log("options", options);
  const url = `/losts${query ? `?${query}` : ""}`;
  const { data, error } = useSWR(url, API.fetcher);

  return {
    losts: data && data.data,
    isLoading: !error && !data,
    isError: error,
  };
};
