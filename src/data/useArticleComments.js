import useSWR from 'swr';
import API from './index';

export const useArticleComments = ( id ) => {
  const { data, error, mutate } = useSWR( () => `/articles/${ id }/comments`, API.fetcher );
  return {
    comments: data && data.data,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
};
