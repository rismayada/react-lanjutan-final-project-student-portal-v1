import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import Footer from '../components/Footer';

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/student');
  };

  return (
    <div className="container-home">
      <div>
        <h1>Studi Independen</h1>
        <h1>Kampus Merdeka</h1>
        <h2>by RUANGGURU</h2>
      </div>
      <div className="vertical-Line"></div>
      <div className="container-home2">
        <h1>Student Portal</h1>
        <Button data-testid="student-btn" onClick={handleButtonClick}>
          ALL STUDENT
        </Button>
      </div>
      <Footer />
    </div>
  ); // TODO: replace this
};

export default Home;
