import React, { useEffect, useState } from 'react';

type Props = {
  user: UserType;
  currentUserId: number;
  onAddLogin: (account: Account) => void;
};

export const AddLogin: React.FC<Props> = ({ 
  user,
  currentUserId,
  onAddLogin,
 }) => {
  let initialAccountId;
    
  if (user.data.length > 0) {
    initialAccountId = Math.max(...user.data.map(account => account.accountId)) + 1;
  } else {
    initialAccountId = 1;
  };

  const initialAccount = {
    accountId: initialAccountId, 
    source: '',
    login: '',
    password: '',
  };

  const [inputAccount, setInputAccount] = useState<Account>(initialAccount);

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setInputAccount({
      ...inputAccount,
      [name]: value,
    });
  };

  const onAddHandler = (account: Account) => {
    if (currentUserId >= 0) {
      onAddLogin(account);

      setInputAccount(initialAccount);
    };
  };

  useEffect(() => {
    let initialAccountId;
    
    if (user.data.length > 0) {
      initialAccountId = Math.max(...user.data.map(account => account.accountId)) + 1;
    } else {
      initialAccountId = 1;
    };

    const initialAccount = {
      accountId: initialAccountId, 
      source: '',
      login: '',
      password: '',
    };

    setInputAccount(initialAccount);
  }, [user.data, user.data.length]);

  return (
    <>
      {inputAccount && (
        <tr className="tfoot">
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
              onClick={() => onAddHandler(inputAccount)}
            >
              Add
            </button>
          </td>
        </tr>
      )} 
    </>    
  );
};
