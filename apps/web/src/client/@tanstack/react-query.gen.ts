// This file is auto-generated by @hey-api/openapi-ts

import { type Options, readRootGet, apiCheckoutApiCheckoutPost, getPaymentApiPaymentPost, loginApiLoginPost, getAirportApiGetAirportGet, getTestApiTestGet, getFlightApiSearchFlightGet } from '../sdk.gen';
import { queryOptions, type UseMutationOptions } from '@tanstack/react-query';
import type { ReadRootGetData, ApiCheckoutApiCheckoutPostData, ApiCheckoutApiCheckoutPostError, GetPaymentApiPaymentPostData, GetPaymentApiPaymentPostError, LoginApiLoginPostData, LoginApiLoginPostError, GetAirportApiGetAirportGetData, GetTestApiTestGetData, GetFlightApiSearchFlightGetData } from '../types.gen';
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

export const loginApiLoginPostQueryKey = (options: Options<LoginApiLoginPostData>) => createQueryKey('loginApiLoginPost', options);

export const loginApiLoginPostOptions = (options: Options<LoginApiLoginPostData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await loginApiLoginPost({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: loginApiLoginPostQueryKey(options)
    });
};

export const loginApiLoginPostMutation = (options?: Partial<Options<LoginApiLoginPostData>>) => {
    const mutationOptions: UseMutationOptions<unknown, AxiosError<LoginApiLoginPostError>, Options<LoginApiLoginPostData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await loginApiLoginPost({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const getAirportApiGetAirportGetQueryKey = (options?: Options<GetAirportApiGetAirportGetData>) => createQueryKey('getAirportApiGetAirportGet', options);

export const getAirportApiGetAirportGetOptions = (options?: Options<GetAirportApiGetAirportGetData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await getAirportApiGetAirportGet({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: getAirportApiGetAirportGetQueryKey(options)
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

export const getFlightApiSearchFlightGetQueryKey = (options: Options<GetFlightApiSearchFlightGetData>) => createQueryKey('getFlightApiSearchFlightGet', options);

export const getFlightApiSearchFlightGetOptions = (options: Options<GetFlightApiSearchFlightGetData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await getFlightApiSearchFlightGet({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: getFlightApiSearchFlightGetQueryKey(options)
    });
};