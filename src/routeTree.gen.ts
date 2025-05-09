/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as QuizImport } from './routes/quiz'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const QuizRoute = QuizImport.update({
  id: '/quiz',
  path: '/quiz',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
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
    '/quiz': {
      id: '/quiz'
      path: '/quiz'
      fullPath: '/quiz'
      preLoaderRoute: typeof QuizImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/quiz': typeof QuizRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/quiz': typeof QuizRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/quiz': typeof QuizRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/quiz'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/quiz'
  id: '__root__' | '/' | '/quiz'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  QuizRoute: typeof QuizRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  QuizRoute: QuizRoute,
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
        "/quiz"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/quiz": {
      "filePath": "quiz.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
