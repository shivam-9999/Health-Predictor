import React from 'react';

import { useAuth } from '../hooks/useAuth';
import { useParams, Navigate } from 'react-router-dom';

import SymptomsTable from '../components/tables/SymptomsTable';

import { GET_SYMPTOMS_BY_PATIENT } from '../graphql/symptoms';
import { useQuery } from '@apollo/client';
import NewSymptomsRecord from '../components/modals/NewSymptomsRecord';
/*
Allow the patient to use a checklist of common
signs and symptoms (COVID-19 or RSV for
example), and submit the choices. 
*/

const SymptomsPage = () => {
  const { loggedInUser, role } = useAuth();

  const { patientId } = useParams();

  const { data, refetch } = useQuery(GET_SYMPTOMS_BY_PATIENT, {
    variables: {
      patient: patientId ?? loggedInUser._id,
    },
  });

  React.useEffect(() => {
    refetch();
  }, [refetch, patientId]);

  if (!patientId) {
    if (role === 'patient') {
      return <Navigate to={`/symptoms/${loggedInUser._id}`} />;
    } else {
      return <Navigate to="/" />;
    }
  } else {
    if (role === 'patient' && patientId !== loggedInUser._id) {
      return <Navigate to="/" />;
    }
  }

  return (
    <>
      <h1>COVID-19 Symptoms Reports</h1>
      <p>Submit a report of your symptoms</p>

      <NewSymptomsRecord />

      <SymptomsTable symptoms={data?.symptomsByPatient ?? []} />
    </>
  )
};

export default SymptomsPage;