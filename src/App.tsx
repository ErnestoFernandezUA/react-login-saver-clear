import React from 'react';
import { Outlet } from 'react-router-dom';
// import { MainNav } from './components/MainNav';


export const App = () => {
  return (
    <>
      {/* <MainNav /> */}

      <div className="section">
        <Outlet />
      </div>
    </>
  );
};
