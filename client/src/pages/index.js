import React from 'react';

import Card from 'react-bootstrap/Card';

/*
This will serve as a dashboard for the user.
For patients, we'll have the daily motivational
tips in here. For nurses, we'll have the
latest received emergency alerts, etc.
*/

import { useAuth } from '../hooks/useAuth';

const IndexPage = () => {
  const { loggedInUser } = useAuth();
  return (
    <>
      <h1>Dashboard</h1>
      <Card>
        <Card.Body>
          <p>Welcome, {loggedInUser.firstName}, to your dashboard!</p>
          <p>Here you can view your latest vitals, symptoms, and more!</p>
          <p>For patients, you can also view your daily health tips!</p>
          <p>For nurses, you can also view your latest emergency alerts!</p>
        </Card.Body>
      </Card>
    </>
  )
};

export default IndexPage;