// This file is auto-generated by @hey-api/openapi-ts

import { type Options, airportGetAirports, userUsers, authLogin, flightSearchFlight, bookingBookings, paymentPayments, paymentCheckout, paymentPaymentCancel, paymentPaymentGateway, paymentPaymentSuccess, utilsTestEmail, utilsHealthCheck } from '../sdk.gen';
import { queryOptions, type UseMutationOptions } from '@tanstack/react-query';
import type { AirportGetAirportsData, UserUsersData, AuthLoginData, AuthLoginError, AuthLoginResponse, FlightSearchFlightData, BookingBookingsData, PaymentPaymentsData, PaymentPaymentsError, PaymentCheckoutData, PaymentCheckoutError, PaymentPaymentGatewayData, PaymentPaymentGatewayError, PaymentPaymentSuccessData, UtilsTestEmailData, UtilsTestEmailError, UtilsHealthCheckData } from '../types.gen';
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

export const airportGetAirportsQueryKey = (options?: Options<AirportGetAirportsData>) => createQueryKey('airportGetAirports', options);

export const airportGetAirportsOptions = (options?: Options<AirportGetAirportsData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await airportGetAirports({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: airportGetAirportsQueryKey(options)
    });
};

export const userUsersQueryKey = (options?: Options<UserUsersData>) => createQueryKey('userUsers', options);

export const userUsersOptions = (options?: Options<UserUsersData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await userUsers({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: userUsersQueryKey(options)
    });
};

export const authLoginQueryKey = (options: Options<AuthLoginData>) => createQueryKey('authLogin', options);

export const authLoginOptions = (options: Options<AuthLoginData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await authLogin({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: authLoginQueryKey(options)
    });
};

export const authLoginMutation = (options?: Partial<Options<AuthLoginData>>) => {
    const mutationOptions: UseMutationOptions<AuthLoginResponse, AxiosError<AuthLoginError>, Options<AuthLoginData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await authLogin({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const flightSearchFlightQueryKey = (options: Options<FlightSearchFlightData>) => createQueryKey('flightSearchFlight', options);

export const flightSearchFlightOptions = (options: Options<FlightSearchFlightData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await flightSearchFlight({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: flightSearchFlightQueryKey(options)
    });
};

export const bookingBookingsQueryKey = (options?: Options<BookingBookingsData>) => createQueryKey('bookingBookings', options);

export const bookingBookingsOptions = (options?: Options<BookingBookingsData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await bookingBookings({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: bookingBookingsQueryKey(options)
    });
};

export const paymentPaymentsQueryKey = (options: Options<PaymentPaymentsData>) => createQueryKey('paymentPayments', options);

export const paymentPaymentsOptions = (options: Options<PaymentPaymentsData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await paymentPayments({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: paymentPaymentsQueryKey(options)
    });
};

export const paymentPaymentsMutation = (options?: Partial<Options<PaymentPaymentsData>>) => {
    const mutationOptions: UseMutationOptions<unknown, AxiosError<PaymentPaymentsError>, Options<PaymentPaymentsData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await paymentPayments({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const paymentCheckoutQueryKey = (options: Options<PaymentCheckoutData>) => createQueryKey('paymentCheckout', options);

export const paymentCheckoutOptions = (options: Options<PaymentCheckoutData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await paymentCheckout({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: paymentCheckoutQueryKey(options)
    });
};

export const paymentCheckoutMutation = (options?: Partial<Options<PaymentCheckoutData>>) => {
    const mutationOptions: UseMutationOptions<unknown, AxiosError<PaymentCheckoutError>, Options<PaymentCheckoutData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await paymentCheckout({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const paymentPaymentCancelQueryKey = (options: Options<PaymentPaymentCancelData>) => createQueryKey('paymentPaymentCancel', options);

export const paymentPaymentCancelOptions = (options: Options<PaymentPaymentCancelData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await paymentPaymentCancel({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: paymentPaymentCancelQueryKey(options)
    });
};

export const paymentPaymentCancelMutation = (options?: Partial<Options<PaymentPaymentCancelData>>) => {
    const mutationOptions: UseMutationOptions<unknown, AxiosError<PaymentPaymentCancelError>, Options<PaymentPaymentCancelData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await paymentPaymentCancel({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const paymentPaymentGatewayQueryKey = (options: Options<PaymentPaymentGatewayData>) => createQueryKey('paymentPaymentGateway', options);

export const paymentPaymentGatewayOptions = (options: Options<PaymentPaymentGatewayData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await paymentPaymentGateway({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: paymentPaymentGatewayQueryKey(options)
    });
};

export const paymentPaymentGatewayMutation = (options?: Partial<Options<PaymentPaymentGatewayData>>) => {
    const mutationOptions: UseMutationOptions<unknown, AxiosError<PaymentPaymentGatewayError>, Options<PaymentPaymentGatewayData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await paymentPaymentGateway({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const paymentPaymentSuccessQueryKey = (options: Options<PaymentPaymentSuccessData>) => createQueryKey('paymentPaymentSuccess', options);

export const paymentPaymentSuccessOptions = (options: Options<PaymentPaymentSuccessData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await paymentPaymentSuccess({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: paymentPaymentSuccessQueryKey(options)
    });
};

export const utilsTestEmailQueryKey = (options: Options<UtilsTestEmailData>) => createQueryKey('utilsTestEmail', options);

export const utilsTestEmailOptions = (options: Options<UtilsTestEmailData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await utilsTestEmail({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: utilsTestEmailQueryKey(options)
    });
};

export const utilsTestEmailMutation = (options?: Partial<Options<UtilsTestEmailData>>) => {
    const mutationOptions: UseMutationOptions<unknown, AxiosError<UtilsTestEmailError>, Options<UtilsTestEmailData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await utilsTestEmail({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const utilsHealthCheckQueryKey = (options?: Options<UtilsHealthCheckData>) => createQueryKey('utilsHealthCheck', options);

export const utilsHealthCheckOptions = (options?: Options<UtilsHealthCheckData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await utilsHealthCheck({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: utilsHealthCheckQueryKey(options)
    });
};