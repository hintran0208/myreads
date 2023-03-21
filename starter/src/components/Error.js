import React from 'react';
import { NavLink } from 'react-router-dom';

const Error = () => {
  return (
    <section className="page_404">
      <div className="content_box_404">
        <h2>404</h2>
        <h3>Look like you're lost</h3>
        <p>the page you are looking for not available!</p>
        <NavLink to="/" className="link_404">
          Go to Home
        </NavLink>
      </div>
    </section>
  );
};

export default Error;
