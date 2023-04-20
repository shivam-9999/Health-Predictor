import React from 'react';

/*
Allow the patient to send daily motivational
tips to the patient (by storing them
  in the database and providing a daily
  tips page for the patient to view, etc.).
*/

import { GET_ALL_TIPS } from '../graphql/tips';
import { useQuery } from '@apollo/client';
import TipCard from '../components/TipCard';
import { Stack } from 'react-bootstrap';
import NewTips from '../components/modals/NewTips';

import { useAuth } from '../hooks/useAuth';

const TipsPage = () => {
  const { data } = useQuery(GET_ALL_TIPS);

  const { role } = useAuth();

  return (
    <>
      <h1>Health Tips</h1>
      <p>Here are some tips to help you stay healthy!</p>

      { role === 'nurse' && <NewTips /> }

      <Stack gap={3}>
        { data?.tips?.map((tip) => (
          <TipCard
            key={tip._id}
            data={tip}
          />
        ))}
      </Stack>
    </>
  )
};

export default TipsPage;