/// <reference types="react-scripts" />

type UserLogin = {
  login: string;
  password: string;
};

type Account = {
  accountId: number;
  login: string;
  password: string;
  source: string;
};

type UserType = {
  userId: number;
  login: string;
  password: string;
  data: Account[],
};
