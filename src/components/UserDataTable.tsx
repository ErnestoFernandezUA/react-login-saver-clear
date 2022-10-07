import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AddLogin } from './AddLogin';
import { Login } from './Login';

type Props = {
  user: UserType;
  currentUserId: number;
  onDeleteLogin: (account:Account) => void;
  onSaveAccount: (account: Account) => void;
  onAddLogin: (account: Account) => void;
  onClearUserData: () => void;
  onDeleteUser: () => void;
};

export const UserDataTable: React.FC<Props> = ({ 
  user, 
  currentUserId,
  onDeleteLogin,
  onSaveAccount,
  onAddLogin,
  onClearUserData,
  onDeleteUser,
}) => {
  const navigate = useNavigate();

  const onDeleteUserHandler = () => {
    onDeleteUser();

    navigate('/');
  };

  return (
    <>
      <table className="table is-striped is-fullwidth card">
        <thead className="thead">
          <tr className="">
            <th className="is-vcentered is-one-third">Source</th>
            <th className="is-vcentered is-one-third">Login</th>
            <th className="is-vcentered is-one-third">Password</th>
            <th className="is-vcentered"></th>
            <th className="is-vcentered">
              <button 
                className="button is-danger"
                onClick={onClearUserData}
              >
                Clear Data
              </button>
            </th>
            <th className="is-vcentered">
              <button 
                className="button is-danger"
                onClick={onDeleteUserHandler}
              >
                Delete User
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {user.data.map(account => (
            <Login 
              key={account.source}
              account={account}
              user={user}
              currentUserId={currentUserId}
              onDeleteLogin={onDeleteLogin}
              onSaveAccount={onSaveAccount}
            />
          ))}
 
          <AddLogin 
            user={user}
            currentUserId={currentUserId}
            onAddLogin={onAddLogin}
          />

        </tbody>
      </table>
    </>
  );
};
