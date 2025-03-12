/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as FlightImport } from './routes/flight'
import { Route as AuthRouteImport } from './routes/auth/route'
import { Route as AppRouteImport } from './routes/app/route'
import { Route as IndexImport } from './routes/index'
import { Route as AppTicketImport } from './routes/app/ticket'
import { Route as AppSuccessImport } from './routes/app/success'
import { Route as AppPaymentImport } from './routes/app/payment'
import { Route as AppCheckoutImport } from './routes/app/checkout'
import { Route as AppBookingIndexImport } from './routes/app/booking/index'

// Create Virtual Routes

const AuthRegisterLazyImport = createFileRoute('/auth/register')()
const AuthLoginLazyImport = createFileRoute('/auth/login')()

// Create/Update Routes

const FlightRoute = FlightImport.update({
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
      preLoaderRoute: typeof FlightImport
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
    '/app/booking/': {
      id: '/app/booking/'
      path: '/booking'
      fullPath: '/app/booking'
      preLoaderRoute: typeof AppBookingIndexImport
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
}

const AppRouteRouteChildren: AppRouteRouteChildren = {
  AppCheckoutRoute: AppCheckoutRoute,
  AppPaymentRoute: AppPaymentRoute,
  AppSuccessRoute: AppSuccessRoute,
  AppTicketRoute: AppTicketRoute,
  AppBookingIndexRoute: AppBookingIndexRoute,
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

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/app': typeof AppRouteRouteWithChildren
  '/auth': typeof AuthRouteRouteWithChildren
  '/flight': typeof FlightRoute
  '/app/checkout': typeof AppCheckoutRoute
  '/app/payment': typeof AppPaymentRoute
  '/app/success': typeof AppSuccessRoute
  '/app/ticket': typeof AppTicketRoute
  '/auth/login': typeof AuthLoginLazyRoute
  '/auth/register': typeof AuthRegisterLazyRoute
  '/app/booking': typeof AppBookingIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/app': typeof AppRouteRouteWithChildren
  '/auth': typeof AuthRouteRouteWithChildren
  '/flight': typeof FlightRoute
  '/app/checkout': typeof AppCheckoutRoute
  '/app/payment': typeof AppPaymentRoute
  '/app/success': typeof AppSuccessRoute
  '/app/ticket': typeof AppTicketRoute
  '/auth/login': typeof AuthLoginLazyRoute
  '/auth/register': typeof AuthRegisterLazyRoute
  '/app/booking': typeof AppBookingIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/app': typeof AppRouteRouteWithChildren
  '/auth': typeof AuthRouteRouteWithChildren
  '/flight': typeof FlightRoute
  '/app/checkout': typeof AppCheckoutRoute
  '/app/payment': typeof AppPaymentRoute
  '/app/success': typeof AppSuccessRoute
  '/app/ticket': typeof AppTicketRoute
  '/auth/login': typeof AuthLoginLazyRoute
  '/auth/register': typeof AuthRegisterLazyRoute
  '/app/booking/': typeof AppBookingIndexRoute
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
    | '/auth/login'
    | '/auth/register'
    | '/app/booking'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/app'
    | '/auth'
    | '/flight'
    | '/app/checkout'
    | '/app/payment'
    | '/app/success'
    | '/app/ticket'
    | '/auth/login'
    | '/auth/register'
    | '/app/booking'
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
    | '/auth/login'
    | '/auth/register'
    | '/app/booking/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AppRouteRoute: typeof AppRouteRouteWithChildren
  AuthRouteRoute: typeof AuthRouteRouteWithChildren
  FlightRoute: typeof FlightRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AppRouteRoute: AppRouteRouteWithChildren,
  AuthRouteRoute: AuthRouteRouteWithChildren,
  FlightRoute: FlightRoute,
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
        "/app/booking/"
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
      "filePath": "flight.tsx"
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
    "/auth/login": {
      "filePath": "auth/login.lazy.tsx",
      "parent": "/auth"
    },
    "/auth/register": {
      "filePath": "auth/register.lazy.tsx",
      "parent": "/auth"
    },
    "/app/booking/": {
      "filePath": "app/booking/index.tsx",
      "parent": "/app"
    }
  }
}
ROUTE_MANIFEST_END */
