import { AxiosError, AxiosRequestConfig, HttpStatusCode, Method } from 'axios';
import { useCallback, useReducer } from 'react';
import { Id, toast } from 'react-toastify';
import axios from 'src/services/axios';

enum ActionTypes {
  START = 'START',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

interface IRequestResponse<T> {
  data: T | null;
  error: unknown;
  loading: boolean;
  status?: HttpStatusCode;
}

interface IAction<T> {
  type: ActionTypes;
  data?: T;
  error?: unknown;
  status?: HttpStatusCode;
}

interface IAxiosRequestConfig<B> extends AxiosRequestConfig<B> {
  method?: Method;
}

const reducer = <T>(state: IRequestResponse<T>, action: IAction<T>): IRequestResponse<T> => {
  switch (action.type) {
    case ActionTypes.START:
      return { ...state, loading: true };
    case ActionTypes.SUCCESS:
      return { ...state, data: action.data ?? null, status: action.status };
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
 * @template B - The type of the request body.
 *
 * @example
 * // Example usage in a React component
 * const { loading, data, error, status, request } = useRequest<ResponseType, RequestBodyType>();
 *
 * useEffect(() => {
 *   // Make an asynchronous request when the component mounts
 *   request({
 *     method: 'post',
 *     url: '/api/endpoint',
 *     data: {
 *       // Request body data
 *     }
 *   });
 * }, []);
 *
 * @returns An object that contains the `loading`, `data`, `error`, `status` and `request` function.
 */
export const useRequest = <T, B = undefined>(silent: boolean = false) => {
  const [response, dispatch] = useReducer(reducer<T>, { data: null, error: null, loading: false });

  /**
   * Makes an asynchronous HTTP request using Axios.
   * Handles the success and error cases of the request and updates the state accordingly.
   *
   * @param {IAxiosRequestConfig<B>} axiosConfig - The Axios request configuration object that specifies the HTTP method, URL, headers, and other options for the request.
   * @param {string} [successMessage='Request successful'] - The success message to be displayed when the request is successful. Defaults to 'Request successful'.
   * @returns None. The function does not return any value.
   */
  const request = useCallback(
    async (axiosConfig: IAxiosRequestConfig<B>, successMessage: string = 'Request successful') => {
      let id: Id;
      if (!silent) id = toast.loading('Please wait...');

      dispatch({ type: ActionTypes.START });
      try {
        const { data, status } = await axios(axiosConfig);
        dispatch({ type: ActionTypes.SUCCESS, data, status });

        if (status >= HttpStatusCode.Ok && status < HttpStatusCode.MultipleChoices)
          if (!silent) toast.update(id!, { isLoading: false, render: successMessage, type: 'success', autoClose: 1000 });
      } catch (error) {
        dispatch({ type: ActionTypes.ERROR, error });
        if (!silent) toast.dismiss(id!);
        toast.error(error instanceof AxiosError ? error.response?.data.message : 'Request failed', { autoClose: 2500 });
      }
    },
    [silent],
  );

  return { response, request };
};
