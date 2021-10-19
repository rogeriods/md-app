import React from 'react';
import Nav from './Nav';
import Menu from './Menu';

const Layout = (props) => {
  return (
    <div>
      <Nav />
      <div className="container-fluid">
        <div className="row">
          <Menu />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div>{props.children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
