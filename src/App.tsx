import React from 'react';
import { useEffect, useState } from 'react';
import { 
  Navigate, 
  Route, 
  Routes,
  useNavigate,
} from 'react-router-dom';
import { 
  AppBase, 
} from './App_';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { UserDataPage } from "./pages/UserDataPage";
import './index.css';

const initialUser = {
  userId: 0,
  login: '111@test.com',
  password: 'qqq',
  data: [
    {accountId: 1, login: 'aaa', password: '111', source: 'google'},
    {accountId: 2, login: 'bbb', password: '222', source: 'aol'},
  ],
};

const initialUsersData = [initialUser];

const localUsersData = JSON.parse(`${localStorage.getItem('localUsersData')}`);

if (!localUsersData) {
  console.log('localUsersData NOT exist');
  localStorage.setItem('localUsersData', JSON.stringify(initialUsersData));
} else {
  console.log('localUsersData exist');
}

console.log(localUsersData);

export const App = () => {
  const [statusLogin, setStatusLogin] = useState(false);
  const [usersData, setUsersData] = useState<UserType[] | []>([]);
  const [user, setUser] = useState<UserType | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number>(-1);
  const navigate = useNavigate();
  
  useEffect(() => {
    setUsersData(localUsersData);
  }, []);

  const onLogin = (login: string, password: string, statusLogin: boolean) => {
    if (!statusLogin) {
      const currentUser = usersData.find(user => user.login === login && user.password === password);
  
      if(currentUser) {
        console.log('this user exist!');
  
        setStatusLogin(true);
        setUser(currentUser);

        setCurrentUserId(usersData.findIndex(user => user.login === login && user.password === password));

        navigate('data');
      } else {
        // eslint-disable-next-line no-console
        console.log('this user is not exist!');
      }
    };
  };

  const onRegisterUser = (user: UserType) => {
    setUsersData([...usersData, user]);
  };

  const onLogout = () => {
    setStatusLogin(false);
    setUser(null);
    setCurrentUserId(-1);

    localStorage.setItem('localUsersData', JSON.stringify(usersData));
  };

  const onDeleteLogin = (deleteAccount: Account) => {
    if ((currentUserId >= 0) && user && (usersData.length > 0)) {
      console.log('delete');

      const newData = user.data.filter(account => account.accountId !== deleteAccount.accountId);

      const newUser = {
        ...user,
        data: newData,
      };
    
      const newUsersData = usersData;
      newUsersData[currentUserId] = newUser;

      setUsersData(newUsersData);
      setUser(usersData[currentUserId]);
      localStorage.setItem('localUsersData', JSON.stringify(usersData));
    };
  };
  
  const onSaveAccount = (saveAccount: Account) => {
    if ((currentUserId >= 0) && user && (usersData.length > 0)) {
      const newData = user.data;
      const saveAccountIndex = newData.findIndex(account => account.accountId === saveAccount.accountId);

      if (saveAccountIndex >= 0) {
        newData[saveAccountIndex] = saveAccount;
      };

      const newUser = {
        ...user,
        data: newData,
      };
    
      const newUsersData = usersData;
      newUsersData[currentUserId] = newUser;

      setUsersData(newUsersData);
      setUser(usersData[currentUserId]);
      localStorage.setItem('localUsersData', JSON.stringify(usersData));
    };
  };

  const onAddLogin = (account: Account) => {
    if ((currentUserId >= 0) && user && (usersData.length > 0)) {
      const newData = user.data;
      newData.push(account);

      const newUser = {
        ...user,
        data: newData,
      };

      const newUsersData = usersData;
      newUsersData[currentUserId] = newUser;

      setUsersData(newUsersData);
      setUser(usersData[currentUserId]);
      localStorage.setItem('localUsersData', JSON.stringify(usersData));
    };
  };
  
  const onClearUserData = () => {
    if ((currentUserId >= 0) && user && (usersData.length > 0)) {
      const newData = user.data;
      newData.length = 0;
      
      const newUser = {
        ...user,
        data: newData,
      };

      const newUsersData = usersData;
      newUsersData[currentUserId] = newUser;

      setUsersData(newUsersData);
      setUser(usersData[currentUserId]);
      localStorage.setItem('localUsersData', JSON.stringify(usersData));
    };
  };

  const onDeleteUser = () => {
    if ((currentUserId >= 0) && user && (usersData.length > 0)) {
      const newUsersData = usersData.filter(user => user.userId !== currentUserId);

      setUsersData(newUsersData);
      setUser(null);
      setCurrentUserId(-1);
      setStatusLogin(false);
      localStorage.setItem('localUsersData', JSON.stringify(usersData));
    };
  };

  return (
    <Routes>
      <Route path="/" element={<AppBase />} >
        <Route 
          index 
          element={(
            <LoginPage
              onLogin={onLogin} 
              statusLogin={statusLogin}
              usersData={usersData}
            />
          )} 
        />

        <Route
          path="register" 
          element={(
            <RegisterPage
              setCurrentUserId={setCurrentUserId}
              usersData={usersData}
              setUser={setUser}
              setStatusLogin={setStatusLogin} 
              onRegisterUser={onRegisterUser}
            />
          )} 
        />

        <Route 
          path="data"
          element={
            statusLogin ? (
              <>
                <UserDataPage 
                  onLogout={onLogout}
                  user={user}
                  currentUserId={currentUserId}
                  onDeleteLogin={onDeleteLogin}
                  onSaveAccount={onSaveAccount}
                  onAddLogin={onAddLogin}
                  onClearUserData={onClearUserData}
                  onDeleteUser={onDeleteUser}
                /> 
              </>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route path="*" element={<p>Page not found</p>} />
      </Route>
    </Routes>
  );
};
