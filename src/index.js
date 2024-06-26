import "./app.css";
import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DevToolBox from "./dev-toolbox/dev-toolbox";
import { toolList } from "./dev-toolbox/tool-list";
import ErrorPage from "./error-page";
import { PomodoroProvider } from "./dev-toolbox/tools/pomodoro/pomodoroContext";
import { Helmet } from "react-helmet";
import { consts } from "./consts";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <>
          <Helmet>
            <title>Dev Toolbox - Access Top Developer Free Tools Online</title>
            <meta charSet="utf-8" />
            <meta
              content="width=device-width, initial-scale=1"
              name="viewport"
            />
            <meta content="#101010" name="theme-color" />
            <meta
              name="description"
              content="Welcome to Dev Toolbox, a developer's companion for all your coding needs. Lightweight, without ads, free, fully client-side, open-sourced."
            />
            <link rel="canonical" href={consts.host + consts.basePath} />
            <link
              href={consts.basePath + "/apple-touch-icon.png"}
              rel="apple-touch-icon"
              sizes="180x180"
            />
            <link
              href={consts.basePath + "/favicon-32x32.png"}
              rel="icon"
              sizes="32x32"
              type="image/png"
            />
            <link
              href={consts.basePath + "/favicon-16x16.png"}
              rel="icon"
              sizes="16x16"
              type="image/png"
            />
            <link href={consts.basePath + "/site.webmanifest"} rel="manifest" />
          </Helmet>
          <DevToolBox />
        </>
      ),
      errorElement: <ErrorPage />,
      children: toolList,
    },
  ],
  {
    basename: consts.basePath,
  },
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PomodoroProvider>
      <RouterProvider router={router} />
    </PomodoroProvider>
  </React.StrictMode>,
);
