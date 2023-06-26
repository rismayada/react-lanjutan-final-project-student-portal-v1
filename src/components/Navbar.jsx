import React from 'react';
// TODO: answer here
import { Link as reachLink } from 'react-router-dom';
import { Link } from '@chakra-ui/react';

const NavBar = () => {
  return (
    <>
      <nav className="container-nav">
        <h1>
          <Link as={reachLink} data-testid="home-page" to="/">
            Student Portal
          </Link>
        </h1>
        <div className="container-nav2">
          <p>
            <Link to="/student" as={reachLink} data-testid="student-page">
              All Student
            </Link>
          </p>
          <p>
            <Link to="/add" as={reachLink} data-testid="add-page">
              Add Student
            </Link>
          </p>
        </div>
      </nav>
    </>
    // TODO: answer here
  );
};

export default NavBar;
