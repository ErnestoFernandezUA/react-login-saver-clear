import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  account: Account;
  user: UserType;
  currentUserId: number;
  onDeleteLogin: (account:Account) => void;
  onSaveAccount: (account: Account) => void;
};

const areEqual = (prevProps: Props, nextProps: Props) => {
  return (
    prevProps.user.data === nextProps.user.data
  );
};

export const Login: React.FC<Props> = React.memo(({ 
  account, 
  onDeleteLogin,
  onSaveAccount,
 }) => {
  const [inputAccount, setInputAccount] = useState(account);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isStatusChange, setIsStatusChange] = useState(false);

  const onPasswordHide = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  const onStatusChange = () => {
    setIsStatusChange(!isStatusChange);
  };

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setInputAccount({
      ...inputAccount,
      [name]: value,
    });
  };

  const shownPassword = (isPasswordHidden: boolean) => {
    let result = '';

    if (isPasswordHidden) {
      for (let i = 0; i < inputAccount.password.length; i++) {
        result += '*';
      } 
    } else {
      result = inputAccount.password;
    }

    return result;
  };

  const onSaveHandler = (account: Account) => {
    onSaveAccount(account);
    
    setIsPasswordHidden(true);
    setIsStatusChange(false);
    
  };

  const onDeleteHandler = (account: Account) => {
    onDeleteLogin(account);

    setIsPasswordHidden(true);
    setIsStatusChange(false);
  };

  return (
    <>
      {!isStatusChange ? (
        <tr
          className={classNames(
          )}
        >
          <td className="is-vcentered has-text-weight-bold">
            {inputAccount.source}
          </td>
          <td className="is-vcentered">
            {inputAccount.login}
          </td>
          <td className="is-vcentered">
            {shownPassword(isPasswordHidden)}
          </td>
          <td>
            <button
              className="button is-primary"
              onClick={onStatusChange}
              disabled={isPasswordHidden}
            >
              Change
            </button>
          </td>
          <td>
            <button
              className="button is-primary"
              onClick={onPasswordHide}
            >
              {isPasswordHidden ? 'Show' : 'Hide'}
            </button>
          </td>
          <td>
          <button
              className="button is-primary"
              onClick={() => onDeleteHandler(account)}
            >
              Delete
            </button>
          </td>

          
        </tr>
      ) : (
        <tr
          className={classNames({
          })}
        >
          <td className="is-vcentered">
            <input 
              type="text"
              name="source"
              value={inputAccount.source}
              onChange={(event) => onInput(event)}
              className="input"
            />
          </td>
          <td className="is-vcentered has-text-weight-bold">
              <input 
              type="text"
              name="login"
              value={inputAccount.login}
              onChange={(event) => onInput(event)}
              className="input"
            />
          </td>
          <td className="is-vcentered">
            <input 
                type="text"
                name="password"
                value={inputAccount.password}
                onChange={(event) => onInput(event)}
                className="input"
              />
          </td>
          <td>
          </td>

          <td>
            <button
              className="button is-primary"
              onClick={() => onSaveHandler(inputAccount)}
            >
              Save
            </button>
          </td>
        </tr>
      )}
    </>
  );
}, areEqual);
