import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from "./screens/home";
import GamePage from "./screens/game/Game";
import SettingsPage from "./screens/settings";
import JoinPage from "./screens/join";
import NotFoundPage from "./screens/not-found";
import ErrorPage from "./screens/errors";

import './App.css';

const App = () => {
  const [gameId, setGameId] = useState('');

  return (
    <Routes>
      {/*<Route index element={<Home />} />*/}
      <Route path="/" element={<HomePage />} />
      <Route path="/join" element={<JoinPage />} />
      <Route
        path="/settings"
        element={<SettingsPage gameId={gameId} setGameId={setGameId} />}
      />
      <Route path="/game/:id" element={<GamePage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<NotFoundPage />} />

      {/*<Route element={<Layout />}>*/}
      {/*  <Route path="home" element={<Home />} />*/}
      {/*</Route>*/}
    </Routes>
  );
};

// const Layout = () => {
//   const style = ({ isActive }) => ({
//     fontWeight: isActive ? 'bold' : 'normal',
//   });
//
//   return (
//     <>
//       <h1>SpyFall</h1>
//
//       <nav
//         style={{
//           borderBottom: 'solid 1px',
//           paddingBottom: '1rem',
//         }}
//       >
//         <NavLink to="/" style={style}>
//           Home
//         </NavLink>
//         <NavLink to="/game" style={style}>
//           Game
//         </NavLink>
//         <NavLink to="/settings" style={style}>
//           settings
//         </NavLink>
//         <NavLink to="/join" style={style}>
//           join
//         </NavLink>
//         <NavLink to="/404" style={style}>
//           404
//         </NavLink>
//       </nav>
//
//       <main style={{ padding: '1rem 0 0' }}>
//         <Outlet />
//       </main>
//     </>
//   );
// };

export default App;
