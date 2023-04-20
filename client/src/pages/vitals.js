import React from 'react';

import { useAuth } from '../hooks/useAuth';
import { useParams, Navigate } from 'react-router-dom';

import VitalsTable from '../components/tables/VitalsTable';

/*
Allow the patient to enter daily information
as specified by the nurse practitioner
(for example pulse rate, blood pressure,
weight, temperature, respiratory rate).
*/

import { GET_VITALS_BY_PATIENT } from '../graphql/vitals';
import { useQuery } from '@apollo/client';

import NewVitalsReport from '../components/modals/NewVitalsReport';

const VitalsPage = () => {
  const { loggedInUser, role } = useAuth();

  const { patientId } = useParams();

  const { data, refetch } = useQuery(GET_VITALS_BY_PATIENT, {
    variables: {
      patient: patientId ?? loggedInUser._id,
    },
  });

  React.useEffect(() => {
    refetch();
  }, [refetch, patientId]);

  if (!patientId) {
    if (role === 'patient') {
      return <Navigate to={`/vitals/${loggedInUser._id}`} />;
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
      <h1>Vital Records</h1>
      <p>Submit a report of your vitals</p>

      <NewVitalsReport />

      <VitalsTable vitals={data?.healthPatientsByPatient ?? []} />
    </>
  )
};

export default VitalsPage;