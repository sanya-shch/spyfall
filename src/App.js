import React, { useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./screens/home";
import Loader from "./components/Loader";

import "./App.css";

const GamePage = lazy(() => import("./screens/game/Game"));
const SettingsPage = lazy(() => import("./screens/settings"));
const JoinPage = lazy(() => import("./screens/join"));
const NotFoundPage = lazy(() => import("./screens/not-found"));
const ErrorPage = lazy(() => import("./screens/errors"));

const App = () => {
  const [gameId, setGameId] = useState("");

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/join"
        element={
          <Suspense fallback={<Loader delay={500} />}>
            <JoinPage />
          </Suspense>
        }
      />
      <Route
        path="/settings"
        element={
          <Suspense fallback={<Loader delay={500} />}>
            <SettingsPage gameId={gameId} setGameId={setGameId} />
          </Suspense>
        }
      />
      <Route
        path="/game/:id"
        element={
          <Suspense fallback={<Loader delay={500} />}>
            <GamePage />
          </Suspense>
        }
      />
      <Route
        path="/error"
        element={
          <Suspense fallback={<Loader delay={500} />}>
            <ErrorPage />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<Loader delay={500} />}>
            <NotFoundPage />
          </Suspense>
        }
      />
      {/*<Route index element={<HomePage />} />*/}
      {/*<Route path="/join" element={<JoinPage />} />*/}
      {/*<Route*/}
      {/*  path="/settings"*/}
      {/*  element={<SettingsPage gameId={gameId} setGameId={setGameId} />}*/}
      {/*/>*/}
      {/*<Route path="/game/:id" element={<GamePage />} />*/}
      {/*<Route path="/error" element={<ErrorPage />} />*/}
      {/*<Route path="*" element={<NotFoundPage />} />*/}
    </Routes>
  );
};

export default App;
