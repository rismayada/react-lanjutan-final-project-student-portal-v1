// TODO: answer here
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const NotFound = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1);
  };
  return (
    <>
      <h1>404 | Not Found</h1>
      <Button onClick={handleReturn} data-testid="return-btn">
        Return
      </Button>
    </>
  );
};

export default NotFound;
