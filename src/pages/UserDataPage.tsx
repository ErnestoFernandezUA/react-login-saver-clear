import React from 'react';
import { UserDataTable } from '../components/UserDataTable';
import { useNavigate } from 'react-router-dom';

type Props = {
  onLogout: () => void;
  user: UserType | null;
  currentUserId: number;
  onDeleteLogin: (account:Account) => void;
  onSaveAccount: (account: Account) => void;
  onAddLogin: (account: Account) => void;
  onClearUserData: () => void;
  onDeleteUser: () => void;
};

export const UserDataPage: React.FC<Props> = ({ 
  onLogout,
  user,
  currentUserId,
  onDeleteLogin,
  onSaveAccount,
  onAddLogin,
  onClearUserData,
  onDeleteUser,
}) => {
  const navigate = useNavigate();

  return (
    <article className="message">
      <div className="message-header  ">
        <p>Data Page</p>
        <button
          className="button is-link"
          onClick={() => {
            onLogout();

            navigate('/');
          }}
        >
          Log out
        </button>
      </div>
      <div className="message-body p-0 card">
        {user && (
          <UserDataTable
            user={user}
            currentUserId={currentUserId}
            onDeleteLogin={onDeleteLogin}
            onSaveAccount={onSaveAccount}
            onAddLogin={onAddLogin}
            onClearUserData={onClearUserData}
            onDeleteUser={onDeleteUser}
          />
        )}
      </div>
    </article>
  );
};
