// This file is auto-generated by @hey-api/openapi-ts

import { z } from 'zod';

export const zAirport = z.object({
    name: z.string(),
    address: z.string(),
    code: z.string()
});

export const zBookingModel = z.object({
    id: z.string(),
    user_id: z.string(),
    date: z.string().datetime(),
    departure: z.string().datetime(),
    origin: z.string(),
    destination: z.string(),
    arrive: z.string().datetime(),
    status: z.string()
});

export const zCancelModel = z.object({
    flight_route_id: z.string(),
    booking_id: z.string()
});

export const zCheckoutModel = z.object({
    id: z.string(),
    uid: z.string()
});

export const zFlightRoutSchedule = z.object({
    departure: z.string(),
    arrival: z.string()
});

export const zFlightRoute = z.object({
    id: z.string(),
    origin: z.array(z.string()),
    destination: z.array(z.string()),
    schedule: zFlightRoutSchedule,
    date: z.string().datetime(),
    price: z.number().int()
});

export const zHttpValidationError = z.object({
    detail: z.array(z.object({
        loc: z.array(z.unknown()),
        msg: z.string(),
        type: z.string()
    })).optional()
});

export const zLoginModel = z.object({
    username: z.string(),
    password: z.string()
});

export const zPassengerModel = z.object({
    name: z.string(),
    lastname: z.string(),
    gender: z.string(),
    country: z.string(),
    birthday: z.string(),
    identity: z.object({
        type: z.string(),
        number: z.string(),
        out_date: z.union([
            z.string(),
            z.null()
        ])
    })
});

export const zPaymentContact = z.object({
    prefix: z.string(),
    name: z.string(),
    lastname: z.string(),
    email: z.string(),
    country_code: z.string(),
    phone_number: z.string()
});

export const zPaymentGateway = z.object({
    payment_id: z.string(),
    user_id: z.string(),
    type: z.string(),
    number: z.string(),
    out_date: z.string(),
    cvv: z.string(),
    holder_name: z.string()
});

export const zPaymentIdentity = z.object({
    type: z.string(),
    number: z.string(),
    out_date: z.union([
        z.string(),
        z.null()
    ])
});

export const zPaymentModel = z.object({
    user_id: z.string(),
    seat_class: z.string(),
    flight_route_id: z.string(),
    passengers: z.array(zPassengerModel),
    contact: zPaymentContact
});

export const zValidationError = z.object({
    loc: z.array(z.unknown()),
    msg: z.string(),
    type: z.string()
});

export const zAirportGetAirportsResponse = z.array(zAirport);

export const zFlightSearchFlightResponse = z.array(zFlightRoute);

export const zBookingBookingsResponse = z.array(zBookingModel);

export const zUtilsHealthCheckResponse = z.boolean();