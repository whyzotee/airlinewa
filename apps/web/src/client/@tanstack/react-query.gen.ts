// This file is auto-generated by @hey-api/openapi-ts

import { type Options, readRootGet, apiCheckoutApiCheckoutPost, getPaymentApiPaymentPost, loginApiAuthLoginPost, apiGetAirportListApiAirportGet, getTestApiTestGet, apiSearchFlightApiFlightGet } from '../sdk.gen';
import { queryOptions, type UseMutationOptions } from '@tanstack/react-query';
import type { ReadRootGetData, ApiCheckoutApiCheckoutPostData, ApiCheckoutApiCheckoutPostError, GetPaymentApiPaymentPostData, GetPaymentApiPaymentPostError, LoginApiAuthLoginPostData, LoginApiAuthLoginPostError, ApiGetAirportListApiAirportGetData, GetTestApiTestGetData, ApiSearchFlightApiFlightGetData } from '../types.gen';
import type { AxiosError } from 'axios';
import { client as _heyApiClient } from '../client.gen';

export type QueryKey<TOptions extends Options> = [
    Pick<TOptions, 'baseURL' | 'body' | 'headers' | 'path' | 'query'> & {
        _id: string;
        _infinite?: boolean;
    }
];

const createQueryKey = <TOptions extends Options>(id: string, options?: TOptions, infinite?: boolean): [
    QueryKey<TOptions>[0]
] => {
    const params: QueryKey<TOptions>[0] = { _id: id, baseURL: (options?.client ?? _heyApiClient).getConfig().baseURL } as QueryKey<TOptions>[0];
    if (infinite) {
        params._infinite = infinite;
    }
    if (options?.body) {
        params.body = options.body;
    }
    if (options?.headers) {
        params.headers = options.headers;
    }
    if (options?.path) {
        params.path = options.path;
    }
    if (options?.query) {
        params.query = options.query;
    }
    return [
        params
    ];
};

export const readRootGetQueryKey = (options?: Options<ReadRootGetData>) => createQueryKey('readRootGet', options);

export const readRootGetOptions = (options?: Options<ReadRootGetData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await readRootGet({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: readRootGetQueryKey(options)
    });
};

export const apiCheckoutApiCheckoutPostQueryKey = (options: Options<ApiCheckoutApiCheckoutPostData>) => createQueryKey('apiCheckoutApiCheckoutPost', options);

export const apiCheckoutApiCheckoutPostOptions = (options: Options<ApiCheckoutApiCheckoutPostData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await apiCheckoutApiCheckoutPost({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: apiCheckoutApiCheckoutPostQueryKey(options)
    });
};

export const apiCheckoutApiCheckoutPostMutation = (options?: Partial<Options<ApiCheckoutApiCheckoutPostData>>) => {
    const mutationOptions: UseMutationOptions<unknown, AxiosError<ApiCheckoutApiCheckoutPostError>, Options<ApiCheckoutApiCheckoutPostData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await apiCheckoutApiCheckoutPost({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const getPaymentApiPaymentPostQueryKey = (options: Options<GetPaymentApiPaymentPostData>) => createQueryKey('getPaymentApiPaymentPost', options);

export const getPaymentApiPaymentPostOptions = (options: Options<GetPaymentApiPaymentPostData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await getPaymentApiPaymentPost({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: getPaymentApiPaymentPostQueryKey(options)
    });
};

export const getPaymentApiPaymentPostMutation = (options?: Partial<Options<GetPaymentApiPaymentPostData>>) => {
    const mutationOptions: UseMutationOptions<unknown, AxiosError<GetPaymentApiPaymentPostError>, Options<GetPaymentApiPaymentPostData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await getPaymentApiPaymentPost({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const loginApiAuthLoginPostQueryKey = (options: Options<LoginApiAuthLoginPostData>) => createQueryKey('loginApiAuthLoginPost', options);

export const loginApiAuthLoginPostOptions = (options: Options<LoginApiAuthLoginPostData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await loginApiAuthLoginPost({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: loginApiAuthLoginPostQueryKey(options)
    });
};

export const loginApiAuthLoginPostMutation = (options?: Partial<Options<LoginApiAuthLoginPostData>>) => {
    const mutationOptions: UseMutationOptions<unknown, AxiosError<LoginApiAuthLoginPostError>, Options<LoginApiAuthLoginPostData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await loginApiAuthLoginPost({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const apiGetAirportListApiAirportGetQueryKey = (options?: Options<ApiGetAirportListApiAirportGetData>) => createQueryKey('apiGetAirportListApiAirportGet', options);

export const apiGetAirportListApiAirportGetOptions = (options?: Options<ApiGetAirportListApiAirportGetData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await apiGetAirportListApiAirportGet({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: apiGetAirportListApiAirportGetQueryKey(options)
    });
};

export const getTestApiTestGetQueryKey = (options?: Options<GetTestApiTestGetData>) => createQueryKey('getTestApiTestGet', options);

export const getTestApiTestGetOptions = (options?: Options<GetTestApiTestGetData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await getTestApiTestGet({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: getTestApiTestGetQueryKey(options)
    });
};

export const apiSearchFlightApiFlightGetQueryKey = (options: Options<ApiSearchFlightApiFlightGetData>) => createQueryKey('apiSearchFlightApiFlightGet', options);

export const apiSearchFlightApiFlightGetOptions = (options: Options<ApiSearchFlightApiFlightGetData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await apiSearchFlightApiFlightGet({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: apiSearchFlightApiFlightGetQueryKey(options)
    });
};