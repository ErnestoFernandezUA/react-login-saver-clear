import React from 'react';
import { Outlet } from 'react-router-dom';


export const AppBase = () => {
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
