import useSWR from 'swr';
import API from './index';

export const useCategories = () => {
  const { data, error } = useSWR( `/categories`, API.fetcher );

  return {
    categories: data && data.data,
    isLoading: !error && !data,
    isError: error
  };
};
