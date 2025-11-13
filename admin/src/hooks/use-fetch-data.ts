
/**
 * Module dependencies.
 */

import { Error } from '../types/error';
import { useEffect, useState } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';

/**
 * Export `useFetchData` hook.
 */

export function useFetchData(url: string) {
  const [fetchedData, setFetchedData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refetch, setRefetch] = useState({});
  const fetchClient = useFetchClient();

  useEffect(() => {
    async function fetchData(): Promise<void> {
      setIsLoading(true);

      fetchClient.get(url)
        .then(({ data }: any) => {
          if (data.data?.name === 'AxiosError') {
            setError({
              code: data.data.code,
              message: data.data.message,
              status: data.data.status
            });

            setFetchedData(null);
          } else if (data.data?.code === 'ERR_INVALID_CHAR') {
            setError({
              code: data.data.code,
              message: 'Invalid character',
              status: 500
            });

            setFetchedData(null);
          } else { 
            setFetchedData(data.data);
          }
        })
        .catch((error: any) => {
          setError({
            code: error.code,
            message: error.message,
            status: error.response.status
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    fetchData();
  }, [setIsLoading, setFetchedData, setError, refetch]);

  return {
    error,
    fetchedData,
    isLoading,
    setRefetch
  };
}
