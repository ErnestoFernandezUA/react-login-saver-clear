import React from 'react';
import './TaskPopup.scss';

type Props = {
  onShowTaskPopup: (event: React.MouseEvent) => void;
};

export const TaskPopup: React.FC<Props> = ({ onShowTaskPopup }) => {
  return (
  <div className="task-popup bulma-overlay-mixin-parent">
    <article className="bulma-overlay-mixin p-0">
      <div className="message-header ">
        <p>In order to proceed please complete the following test task:</p>
        <button 
          type="button" 
          onClick={(event) => onShowTaskPopup(event)}
          className="button is-rounded is-danger is-outlined"
        > 
          Close
        </button>
      </div>
      <div className="message-body">
        Create <strong>"Password manager"</strong> app to manage all your passwords for different accounts (mails, devices, accounts, servers, etc.). Push it to your own GitHub repository and send the link back to us.
        <br />
        App should have at least 3 pages:<strong> login, register, dashboard </strong>(main logged in view).
        <br />
        User should be able to add/edit/delete/reveal passwords on the dashboard after login. 
        All password data should be stored somewhere, so when user reloads pages, they will be redirected back to the dashboard and all the passwords will be fetched.
        <br />
        You can choose any DB or local storage. 
        By default passwords should be hidden with "*", there should be an ability to reveal password (button, etc.).
        <br />
        Stack to use: <strong>React, typescript</strong> 
      </div>
    </article> 
  </div>
)};