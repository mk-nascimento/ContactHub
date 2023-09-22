import { AxiosResponse, HttpStatusCode } from 'axios';
import { useCallback, useReducer } from 'react';

enum ActionTypes {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

interface RequestState<T> {
  data: T | null;
  error: unknown;
  status?: HttpStatusCode;
}

interface SuccessAction<T> {
  type: ActionTypes.SUCCESS;
  data: T | null;
  status?: HttpStatusCode;
}
interface ErrorAction {
  type: ActionTypes.ERROR;
  error: unknown;
}

type RequestAction<T> = SuccessAction<T> | ErrorAction;

const reducer = <T>(state: RequestState<T>, action: RequestAction<T>): RequestState<T> => {
  switch (action.type) {
    case ActionTypes.SUCCESS:
      return { ...state, data: action.data, status: action.status };
    case ActionTypes.ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

/**
 * A TypeScript custom hook called `useRequest` that is used to handle asynchronous requests in a React component.
 *
 * @template T - The type of response data from the request.
 *
 * @example
 * // Example usage in a React component
 * const { data, error, status, request } = useRequest<MyDataType>();
 *
 * useEffect(() => {
 *   // Make an asynchronous request when the component mounts
 *   request(async () => await axios.post('auth/login/')); // Replace with your actual data fetching function;
 * }, []);
 *
 * @returns An object that contains the `data`, `error`, `status`, and `request` function.
 */
export const useRequest = <T>() => {
  const [state, dispatch] = useReducer(reducer<T>, { data: null, error: null });

  const request = useCallback(async (requestFn: () => Promise<AxiosResponse<T>>) => {
    try {
      const { data, status } = await requestFn();
      dispatch({ type: ActionTypes.SUCCESS, data, status });
    } catch (error) {
      dispatch({ type: ActionTypes.ERROR, error });
    }
  }, []);

  return { ...state, request };
};
