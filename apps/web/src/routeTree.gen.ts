/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as FlightRouteImport } from './routes/flight/route'
import { Route as AuthRouteImport } from './routes/auth/route'
import { Route as AppRouteImport } from './routes/app/route'
import { Route as IndexImport } from './routes/index'
import { Route as FlightIndexImport } from './routes/flight/index'
import { Route as FlightCheckoutImport } from './routes/flight/checkout'
import { Route as AppTicketImport } from './routes/app/ticket'
import { Route as AppSuccessImport } from './routes/app/success'
import { Route as AppPaymentImport } from './routes/app/payment'
import { Route as AppCheckoutImport } from './routes/app/checkout'
import { Route as AppBookingIndexImport } from './routes/app/booking/index'

// Create Virtual Routes

const AuthRegisterLazyImport = createFileRoute('/auth/register')()
const AuthLoginLazyImport = createFileRoute('/auth/login')()
const AppFlightStatusIndexLazyImport = createFileRoute('/app/flight-status/')()
const AppCheckInIndexLazyImport = createFileRoute('/app/check-in/')()

// Create/Update Routes

const FlightRouteRoute = FlightRouteImport.update({
  id: '/flight',
  path: '/flight',
  getParentRoute: () => rootRoute,
} as any)

const AuthRouteRoute = AuthRouteImport.update({
  id: '/auth',
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const AppRouteRoute = AppRouteImport.update({
  id: '/app',
  path: '/app',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const FlightIndexRoute = FlightIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => FlightRouteRoute,
} as any)

const AuthRegisterLazyRoute = AuthRegisterLazyImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => AuthRouteRoute,
} as any).lazy(() => import('./routes/auth/register.lazy').then((d) => d.Route))

const AuthLoginLazyRoute = AuthLoginLazyImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AuthRouteRoute,
} as any).lazy(() => import('./routes/auth/login.lazy').then((d) => d.Route))

const FlightCheckoutRoute = FlightCheckoutImport.update({
  id: '/checkout',
  path: '/checkout',
  getParentRoute: () => FlightRouteRoute,
} as any)

const AppTicketRoute = AppTicketImport.update({
  id: '/ticket',
  path: '/ticket',
  getParentRoute: () => AppRouteRoute,
} as any)

const AppSuccessRoute = AppSuccessImport.update({
  id: '/success',
  path: '/success',
  getParentRoute: () => AppRouteRoute,
} as any)

const AppPaymentRoute = AppPaymentImport.update({
  id: '/payment',
  path: '/payment',
  getParentRoute: () => AppRouteRoute,
} as any)

const AppCheckoutRoute = AppCheckoutImport.update({
  id: '/checkout',
  path: '/checkout',
  getParentRoute: () => AppRouteRoute,
} as any)

const AppFlightStatusIndexLazyRoute = AppFlightStatusIndexLazyImport.update({
  id: '/flight-status/',
  path: '/flight-status/',
  getParentRoute: () => AppRouteRoute,
} as any).lazy(() =>
  import('./routes/app/flight-status/index.lazy').then((d) => d.Route),
)

const AppCheckInIndexLazyRoute = AppCheckInIndexLazyImport.update({
  id: '/check-in/',
  path: '/check-in/',
  getParentRoute: () => AppRouteRoute,
} as any).lazy(() =>
  import('./routes/app/check-in/index.lazy').then((d) => d.Route),
)

const AppBookingIndexRoute = AppBookingIndexImport.update({
  id: '/booking/',
  path: '/booking/',
  getParentRoute: () => AppRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/app': {
      id: '/app'
      path: '/app'
      fullPath: '/app'
      preLoaderRoute: typeof AppRouteImport
      parentRoute: typeof rootRoute
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthRouteImport
      parentRoute: typeof rootRoute
    }
    '/flight': {
      id: '/flight'
      path: '/flight'
      fullPath: '/flight'
      preLoaderRoute: typeof FlightRouteImport
      parentRoute: typeof rootRoute
    }
    '/app/checkout': {
      id: '/app/checkout'
      path: '/checkout'
      fullPath: '/app/checkout'
      preLoaderRoute: typeof AppCheckoutImport
      parentRoute: typeof AppRouteImport
    }
    '/app/payment': {
      id: '/app/payment'
      path: '/payment'
      fullPath: '/app/payment'
      preLoaderRoute: typeof AppPaymentImport
      parentRoute: typeof AppRouteImport
    }
    '/app/success': {
      id: '/app/success'
      path: '/success'
      fullPath: '/app/success'
      preLoaderRoute: typeof AppSuccessImport
      parentRoute: typeof AppRouteImport
    }
    '/app/ticket': {
      id: '/app/ticket'
      path: '/ticket'
      fullPath: '/app/ticket'
      preLoaderRoute: typeof AppTicketImport
      parentRoute: typeof AppRouteImport
    }
    '/flight/checkout': {
      id: '/flight/checkout'
      path: '/checkout'
      fullPath: '/flight/checkout'
      preLoaderRoute: typeof FlightCheckoutImport
      parentRoute: typeof FlightRouteImport
    }
    '/auth/login': {
      id: '/auth/login'
      path: '/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthLoginLazyImport
      parentRoute: typeof AuthRouteImport
    }
    '/auth/register': {
      id: '/auth/register'
      path: '/register'
      fullPath: '/auth/register'
      preLoaderRoute: typeof AuthRegisterLazyImport
      parentRoute: typeof AuthRouteImport
    }
    '/flight/': {
      id: '/flight/'
      path: '/'
      fullPath: '/flight/'
      preLoaderRoute: typeof FlightIndexImport
      parentRoute: typeof FlightRouteImport
    }
    '/app/booking/': {
      id: '/app/booking/'
      path: '/booking'
      fullPath: '/app/booking'
      preLoaderRoute: typeof AppBookingIndexImport
      parentRoute: typeof AppRouteImport
    }
    '/app/check-in/': {
      id: '/app/check-in/'
      path: '/check-in'
      fullPath: '/app/check-in'
      preLoaderRoute: typeof AppCheckInIndexLazyImport
      parentRoute: typeof AppRouteImport
    }
    '/app/flight-status/': {
      id: '/app/flight-status/'
      path: '/flight-status'
      fullPath: '/app/flight-status'
      preLoaderRoute: typeof AppFlightStatusIndexLazyImport
      parentRoute: typeof AppRouteImport
    }
  }
}

// Create and export the route tree

interface AppRouteRouteChildren {
  AppCheckoutRoute: typeof AppCheckoutRoute
  AppPaymentRoute: typeof AppPaymentRoute
  AppSuccessRoute: typeof AppSuccessRoute
  AppTicketRoute: typeof AppTicketRoute
  AppBookingIndexRoute: typeof AppBookingIndexRoute
  AppCheckInIndexLazyRoute: typeof AppCheckInIndexLazyRoute
  AppFlightStatusIndexLazyRoute: typeof AppFlightStatusIndexLazyRoute
}

const AppRouteRouteChildren: AppRouteRouteChildren = {
  AppCheckoutRoute: AppCheckoutRoute,
  AppPaymentRoute: AppPaymentRoute,
  AppSuccessRoute: AppSuccessRoute,
  AppTicketRoute: AppTicketRoute,
  AppBookingIndexRoute: AppBookingIndexRoute,
  AppCheckInIndexLazyRoute: AppCheckInIndexLazyRoute,
  AppFlightStatusIndexLazyRoute: AppFlightStatusIndexLazyRoute,
}

const AppRouteRouteWithChildren = AppRouteRoute._addFileChildren(
  AppRouteRouteChildren,
)

interface AuthRouteRouteChildren {
  AuthLoginLazyRoute: typeof AuthLoginLazyRoute
  AuthRegisterLazyRoute: typeof AuthRegisterLazyRoute
}

const AuthRouteRouteChildren: AuthRouteRouteChildren = {
  AuthLoginLazyRoute: AuthLoginLazyRoute,
  AuthRegisterLazyRoute: AuthRegisterLazyRoute,
}

const AuthRouteRouteWithChildren = AuthRouteRoute._addFileChildren(
  AuthRouteRouteChildren,
)

interface FlightRouteRouteChildren {
  FlightCheckoutRoute: typeof FlightCheckoutRoute
  FlightIndexRoute: typeof FlightIndexRoute
}

const FlightRouteRouteChildren: FlightRouteRouteChildren = {
  FlightCheckoutRoute: FlightCheckoutRoute,
  FlightIndexRoute: FlightIndexRoute,
}

const FlightRouteRouteWithChildren = FlightRouteRoute._addFileChildren(
  FlightRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/app': typeof AppRouteRouteWithChildren
  '/auth': typeof AuthRouteRouteWithChildren
  '/flight': typeof FlightRouteRouteWithChildren
  '/app/checkout': typeof AppCheckoutRoute
  '/app/payment': typeof AppPaymentRoute
  '/app/success': typeof AppSuccessRoute
  '/app/ticket': typeof AppTicketRoute
  '/flight/checkout': typeof FlightCheckoutRoute
  '/auth/login': typeof AuthLoginLazyRoute
  '/auth/register': typeof AuthRegisterLazyRoute
  '/flight/': typeof FlightIndexRoute
  '/app/booking': typeof AppBookingIndexRoute
  '/app/check-in': typeof AppCheckInIndexLazyRoute
  '/app/flight-status': typeof AppFlightStatusIndexLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/app': typeof AppRouteRouteWithChildren
  '/auth': typeof AuthRouteRouteWithChildren
  '/app/checkout': typeof AppCheckoutRoute
  '/app/payment': typeof AppPaymentRoute
  '/app/success': typeof AppSuccessRoute
  '/app/ticket': typeof AppTicketRoute
  '/flight/checkout': typeof FlightCheckoutRoute
  '/auth/login': typeof AuthLoginLazyRoute
  '/auth/register': typeof AuthRegisterLazyRoute
  '/flight': typeof FlightIndexRoute
  '/app/booking': typeof AppBookingIndexRoute
  '/app/check-in': typeof AppCheckInIndexLazyRoute
  '/app/flight-status': typeof AppFlightStatusIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/app': typeof AppRouteRouteWithChildren
  '/auth': typeof AuthRouteRouteWithChildren
  '/flight': typeof FlightRouteRouteWithChildren
  '/app/checkout': typeof AppCheckoutRoute
  '/app/payment': typeof AppPaymentRoute
  '/app/success': typeof AppSuccessRoute
  '/app/ticket': typeof AppTicketRoute
  '/flight/checkout': typeof FlightCheckoutRoute
  '/auth/login': typeof AuthLoginLazyRoute
  '/auth/register': typeof AuthRegisterLazyRoute
  '/flight/': typeof FlightIndexRoute
  '/app/booking/': typeof AppBookingIndexRoute
  '/app/check-in/': typeof AppCheckInIndexLazyRoute
  '/app/flight-status/': typeof AppFlightStatusIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/app'
    | '/auth'
    | '/flight'
    | '/app/checkout'
    | '/app/payment'
    | '/app/success'
    | '/app/ticket'
    | '/flight/checkout'
    | '/auth/login'
    | '/auth/register'
    | '/flight/'
    | '/app/booking'
    | '/app/check-in'
    | '/app/flight-status'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/app'
    | '/auth'
    | '/app/checkout'
    | '/app/payment'
    | '/app/success'
    | '/app/ticket'
    | '/flight/checkout'
    | '/auth/login'
    | '/auth/register'
    | '/flight'
    | '/app/booking'
    | '/app/check-in'
    | '/app/flight-status'
  id:
    | '__root__'
    | '/'
    | '/app'
    | '/auth'
    | '/flight'
    | '/app/checkout'
    | '/app/payment'
    | '/app/success'
    | '/app/ticket'
    | '/flight/checkout'
    | '/auth/login'
    | '/auth/register'
    | '/flight/'
    | '/app/booking/'
    | '/app/check-in/'
    | '/app/flight-status/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AppRouteRoute: typeof AppRouteRouteWithChildren
  AuthRouteRoute: typeof AuthRouteRouteWithChildren
  FlightRouteRoute: typeof FlightRouteRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AppRouteRoute: AppRouteRouteWithChildren,
  AuthRouteRoute: AuthRouteRouteWithChildren,
  FlightRouteRoute: FlightRouteRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/app",
        "/auth",
        "/flight"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/app": {
      "filePath": "app/route.tsx",
      "children": [
        "/app/checkout",
        "/app/payment",
        "/app/success",
        "/app/ticket",
        "/app/booking/",
        "/app/check-in/",
        "/app/flight-status/"
      ]
    },
    "/auth": {
      "filePath": "auth/route.tsx",
      "children": [
        "/auth/login",
        "/auth/register"
      ]
    },
    "/flight": {
      "filePath": "flight/route.tsx",
      "children": [
        "/flight/checkout",
        "/flight/"
      ]
    },
    "/app/checkout": {
      "filePath": "app/checkout.tsx",
      "parent": "/app"
    },
    "/app/payment": {
      "filePath": "app/payment.tsx",
      "parent": "/app"
    },
    "/app/success": {
      "filePath": "app/success.tsx",
      "parent": "/app"
    },
    "/app/ticket": {
      "filePath": "app/ticket.tsx",
      "parent": "/app"
    },
    "/flight/checkout": {
      "filePath": "flight/checkout.tsx",
      "parent": "/flight"
    },
    "/auth/login": {
      "filePath": "auth/login.lazy.tsx",
      "parent": "/auth"
    },
    "/auth/register": {
      "filePath": "auth/register.lazy.tsx",
      "parent": "/auth"
    },
    "/flight/": {
      "filePath": "flight/index.tsx",
      "parent": "/flight"
    },
    "/app/booking/": {
      "filePath": "app/booking/index.tsx",
      "parent": "/app"
    },
    "/app/check-in/": {
      "filePath": "app/check-in/index.lazy.tsx",
      "parent": "/app"
    },
    "/app/flight-status/": {
      "filePath": "app/flight-status/index.lazy.tsx",
      "parent": "/app"
    }
  }
}
ROUTE_MANIFEST_END */
