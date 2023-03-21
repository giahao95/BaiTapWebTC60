import React, { useEffect, useState } from 'react';

const API_URL = 'https://api.github.com/users/anhtbok92';

const ConditionRendering = () => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          setIsLoading(false);
          setIsError(true);
          throw new Error(response.statusText);
        }
      })
      .then((user) => {
        const { login } = user;
        setUser(login);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);

  if (isLoading) {
    return (
      <>
        <h2>Loading.....</h2>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <h2>Error page</h2>
      </>
    );
  }

  return (
    <>
      <h1>Demo example call API with useEffect</h1>
      <h2>Show username: {user}</h2>
    </>
  );
};

export default ConditionRendering;
