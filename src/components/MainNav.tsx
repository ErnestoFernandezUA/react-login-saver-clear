import React from 'react';
import { PageNavLink } from './PageNavLink';

export const MainNav = () => (
  <nav className="navbar is-light px-3">
    <div className="navbar-brand">
      <PageNavLink to={'/'} text={'Login'} />
      <PageNavLink to={'register'} text={'Register'} />
      <PageNavLink to={'data'} text={'Data'} />
    </div>
  </nav>
);
