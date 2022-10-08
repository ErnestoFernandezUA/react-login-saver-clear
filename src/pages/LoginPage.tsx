import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames';
import './LoginPage.scss';

type Props = {
  onLogin: (login: string, password: string, statusLogin: boolean) => void;
  statusLogin: boolean;
  usersData: UserType[] | [];
};

export const LoginPage: React.FC<Props> = ({
  onLogin, 
  statusLogin, 
  usersData,
}) => {
  const [inputUserLogin, setInputUserLogin] = useState<UserLogin>({ 
    login: '', 
    password: '',
  });

  const [showErrorInputLogin, setShowErrorInputLogin] = useState(false);
  const [showErrorInputPassword, setShowErrorInputPassword] = useState(false);
  const [showErrorNotExistUser, setShowErrorNotExistUser] = useState(false);
  const [showErrorPasswordIncorrect, setShowErrorPasswordIncorrect] = useState(false);

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    if (name === 'login') {
      setShowErrorInputLogin(false);
      setShowErrorNotExistUser(false);
    };

    if (name === 'password') {
      setShowErrorInputPassword(false);
      setShowErrorPasswordIncorrect(false);
    };

    setInputUserLogin({
      ...inputUserLogin,
      [name]: value,
    });
  };

  const onSubmit = (event: React.FormEvent) => {
    event?.preventDefault();

    if (isValidUser(inputUserLogin.login, inputUserLogin.password)) {
      onLogin(inputUserLogin.login, inputUserLogin.password, statusLogin);
    }
  };

  const isValidUser = (login: string, password: string) => {
    if (login.length === 0) {
      setShowErrorInputLogin(true);
    };

    if (password.length === 0) {
      setShowErrorInputPassword(true);
    };

    if ((login.length !== 0 ) && (password.length !== 0)) {
      const findUser = usersData.find(user => user.login === login);

      if (findUser) {
        if (findUser.password !== password) {
          setShowErrorPasswordIncorrect(true);
        }
      } else {
        setShowErrorNotExistUser(true);
      }
    }

    if (!(showErrorInputLogin ||
      showErrorInputPassword ||
      showErrorNotExistUser ||
      showErrorPasswordIncorrect)) {
      return true;
    }

    return false;
  };

  return (
    <div className="login-form">
      <article className="message is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-half-fullhd">
        <div className="message-header  ">
          <p className="mr-5">Login Page</p>
        </div>
        <div className="message-body">
          <form 
            action="" 
            className="field"
            onSubmit={(event) => onSubmit(event)}
          >
            <div className="block">
              <label className="label" htmlFor="login">Email</label>
                <input
                  id="login"
                  name="login"
                  type="email" 
                  placeholder="enter email, please"
                  value={inputUserLogin.login}
                  onChange={(event) => onInput(event)}
                  className={classNames("input",
                  {'is-danger' : showErrorInputLogin || showErrorNotExistUser}
                  )}
                />
                {showErrorInputLogin && <p className="notification is-light p-0">Login is incorrect</p>}
                {showErrorNotExistUser && <p>This user isn't exist!</p>}
            </div>

            <div className="block">
              <label className="label" htmlFor="password">Password</label>
                <input
                  name="password"
                  id="password"
                  type="password" 
                  placeholder="********"
                  value={inputUserLogin.password}
                  onChange={(event) => onInput(event)}
                  className={classNames('input',
                  {'is-danger' : showErrorInputPassword || showErrorPasswordIncorrect}
                  )}
                />
                {showErrorInputPassword && <p>Password is incorrect</p>}
                {!showErrorInputPassword && showErrorPasswordIncorrect && <p>Password is wrong!</p>}
            </div>
            <div className="block">
              <button
                type="submit"
                className="button is-primary mb-2 is-fullwidth"
                disabled={showErrorInputLogin || showErrorInputPassword || showErrorNotExistUser || showErrorPasswordIncorrect}
              >
                Login
              </button>
              
              <NavLink to={'/register'}>
                <p>Don&#39;t have an account? Sign Up</p>
              </NavLink>
            </div>
          </form>
        </div>
      </article>
    </div>
  );
};
