import React from 'react';
import EmergencyTable from '../components/tables/EmergencyTable';

import { useAuth } from '../hooks/useAuth';
import { useParams, Navigate } from 'react-router-dom';

import NewEmergencyAlert from '../components/modals/NewEmergencyAlert';

import { GET_EMERGENCIES_BY_PATIENT, GET_ALL_EMERGENCIES } from '../graphql/emergency';
import apolloClient from '../utils/apollo';


/*
Allow the patient to create and send an
emergency alert to first responders
(by storing this in a separate collection)
*/

const EmergencyPage = () => {
  const { loggedInUser, role } = useAuth();

  const { patientId } = useParams();

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    if (patientId) {
      apolloClient.query({
        query: GET_EMERGENCIES_BY_PATIENT,
        variables: {
          patient: patientId,
        },
      }).then((result) => {
        setData(result.data.emergenciesByPatient);
      });
    } else {
      apolloClient.query({
        query: GET_ALL_EMERGENCIES,
      }).then((result) => {
        setData(result.data.emergencies);
      });
    }
  }, [patientId]);

  if (!patientId) {
    if (role === 'patient') {
      return <Navigate to={`/emergencies/${loggedInUser._id}`} />;
    }
  } else {
    if (role === 'patient' && patientId !== loggedInUser._id) {
      return <Navigate to="/" />;
    }
  }

  return (
    <>
      <h1>Emergency Alerts</h1>
      <p>Send an emergency alert to first responders</p>

      { role === 'patient' && <NewEmergencyAlert /> }
      
      <EmergencyTable
        emergencies={data}
      />
    </>
  )
};

export default EmergencyPage;