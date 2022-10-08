import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import './RegisterPage.scss';

type Props = {
  setCurrentUserId: (index: number) => void;
  usersData: UserType[] | [];
  setUser: (user: UserType) => void;
  setStatusLogin: (value: boolean) => void;
  onRegisterUser: (user: UserType) => void;
};

export const RegisterPage: React.FC<Props> = ({ 
  setStatusLogin, 
  setUser, 
  setCurrentUserId,
  onRegisterUser, 
  usersData,
}) => {
  const navigate = useNavigate();

  let initialUserId;
  
  if (typeof usersData === 'object' && usersData.length > 0) {
    initialUserId = Math.max(...usersData.map(user => user.userId)) + 1;
  } else {
    initialUserId = 1;
  };
  
  const [inputRegisterUser, setInputRegisterUser] = useState<UserType>({ 
    login: '', 
    password: '',
    userId: initialUserId,
    data: [],
  });

  const [showErrorIncorrectLogin, setShowErrorIncorrectLogin] = useState(false);
  const [showErrorIncorrectPassword, setShowErrorIncorrectPassword] = useState(false);
  const [showErrorExistUser, setShowErrorExistUser] = useState(false);

  const validateRegisterUser = (newUser: UserType) => {
    if (!newUser.login || !newUser.password) {
      if (!newUser.login) {
        setShowErrorIncorrectLogin(true);
      };
  
      if (!newUser.password) {
        setShowErrorIncorrectPassword(true);
      };
      
      return false;
    };


    if (usersData.find(user => user.login === newUser.login)) {
      setShowErrorExistUser(true);

      return false;
    }

    return true;
  };

  const onInput = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    if (name === 'login') {
      setShowErrorExistUser(false);
      setShowErrorIncorrectLogin(false);
    };

    if (name === 'password') {
      setShowErrorIncorrectPassword(false);
    };

    setInputRegisterUser({
      ...inputRegisterUser,
      [name]: value,
    });
  };

  const onSubmitRegisterForm = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateRegisterUser(inputRegisterUser)) {
      onRegisterUser(inputRegisterUser);
  
      setStatusLogin(true);
      setUser(inputRegisterUser);
      setCurrentUserId(usersData.length);
  
      navigate('/data');
    };
  };

  return (
    <div className="register-form">
      <article className="message is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-half-fullhd">
        <div className="message-header  ">
          <p>Register Page</p>
        </div>

        <div className="message-body">
        <form 
          className=""
          onSubmit={(event) => onSubmitRegisterForm(event) }
        >
          <div className="field">
            <label className="label" htmlFor="login">Email</label>
            <div className="control">
              <input 
                id="login"
                name="login"
                type="email" 
                placeholder="e.g. tolyan@example.com"
                value={inputRegisterUser.login}
                onChange={(event) => onInput(event)}
                className="input" 
              />
              {showErrorIncorrectLogin && <p>login is required</p>}
              {showErrorExistUser && <p>this user already exists!</p>}
            </div>
          </div>

          <div className="block">
            <label className="label" htmlFor="password">Password</label>
            <input 
              id="password"
              className="input" 
              type="password" 
              placeholder="********"
              name="password"
              value={inputRegisterUser.password}
              onChange={(event) => onInput(event)}
            />
            {showErrorIncorrectPassword && <p>password is required</p>}
          </div>

          <button 
            className="block button is-primary mb-2 is-fullwidth"
            type="submit"
          >
            Create an account
          </button>

          <NavLink to={'/'}>
            <p>Back to Login</p>
          </NavLink>
        </form>
        </div>
      </article>
    </div>
  );
};
