import { AxiosResponse } from 'axios';
import { useState } from 'react';

interface RequestState<T> {
  data: T | null;
  error: unknown;
}

export const useRequest = <T>() => {
  const [state, setState] = useState<RequestState<T>>({ data: null, error: null });

  const request = async (requestFn: () => Promise<AxiosResponse<T>>) => {
    try {
      const { data } = await requestFn();
      setState((prev) => ({ ...prev, data }));
    } catch (error) {
      setState((prev) => ({ ...prev, error }));
    }
  };

  return { ...state, request };
};
