import React from 'react';
import { Outlet } from 'react-router-dom';
import { TaskPopup } from './components/TaskPopup';
// import { MainNav } from './components/MainNav';


export const App = () => {
  return (
    <>
      <div className="body hero is-fullheight">
        {/* <MainNav /> */}

        <div className="section">
          <Outlet />
        </div>
      </div>
    </>
  );
};
