import React from 'react';

import { useMutation } from '@apollo/client';

import { 
  LOGIN_NURSE,
  LOGIN_PATIENT,
  LOGGED_IN_NURSE,
  LOGGED_IN_PATIENT,
  SIGNUP_NURSE,
  SIGNUP_PATIENT,
} from '../graphql/auth';

const AuthContext = React.createContext({
  isLoggedIn: null,
  login: async (email, password) => {},
  signup: async (role, {
    firstName,
    lastName,
    email,
    address,
    phoneNumber,
    password,
  }) => {},
  logout: async () => {},
  loggedInUser: null,
  role: null,
  loading: true,
});

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = React.useState(null);
  const [role, setRole] = React.useState(null);

  const [loading, setLoading] = React.useState(true);

  const [
    loginNurseMutation,
  ] = useMutation(LOGIN_NURSE);

  const [
    loginPatientMutation,
  ] = useMutation(LOGIN_PATIENT);

  const [
    verifyNurseMutation,
  ] = useMutation(LOGGED_IN_NURSE);

  const [
    verifyPatientMutation,
  ] = useMutation(LOGGED_IN_PATIENT);

  const [
    signupNurseMutation,
  ] = useMutation(SIGNUP_NURSE);

  const [
    signupPatientMutation,
  ] = useMutation(SIGNUP_PATIENT);

  React.useEffect(() => {
    setLoading(true);

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      // check if token is valid for patient or nurse

      let verifyMutation;
      if (role === "nurse") {
        verifyMutation = verifyNurseMutation;
      }
      else {
        verifyMutation = verifyPatientMutation;
      }

      verifyMutation({
        variables: {
          token,
        },
      }).then((response) => {
        if (response.data) {
          setLoggedInUser(response.data.verifyPatient || response.data.verifyNurse);
          setRole(role);
        }
        setLoading(false);
      }).catch((error) => {
        console.error(error);
        setLoading(false);
      });

    } else {
      setLoading(false);
    }
  }, [
    verifyNurseMutation,
    verifyPatientMutation,
  ]);


  const login = async ({ email, password }) => {
    try {
      let response;
      let loginMutation;
  
      // Try logging in as a nurse
      try {
        loginMutation = loginNurseMutation;
        response = await loginMutation({
          variables: {
            email,
            password,
          },
        });
    
        if (response.data.loginNurse) {
          const { token } = response.data.loginNurse;

          localStorage.setItem("token", token);
          localStorage.setItem("role", "nurse");

          const nurseVerificationResponse = await verifyNurseMutation({
            variables: {
              token,
            },
          });
          
          setLoggedInUser(nurseVerificationResponse.data?.verifyNurse);
          setRole("nurse");

          return nurseVerificationResponse.data?.verifyNurse;
        }
      } catch (error) {
        console.error(error);
      }
      
      try {
        // Try logging in as a patient
        loginMutation = loginPatientMutation;
        response = await loginMutation({
          variables: {
            email,
            password,
          },
        });
    
        if (response.data.loginPatient) {
          const { token } = response.data.loginPatient;
          localStorage.setItem("token", token);
          localStorage.setItem("role", "patient");

          const patientVerificationResponse = await verifyPatientMutation({
            variables: {
              token,
            },
          });

          setLoggedInUser(patientVerificationResponse.data?.verifyPatient);
          setRole("patient");

          return patientVerificationResponse.data?.verifyPatient;
        }
      } catch (error) {
        console.error(error);
      }
  
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setLoggedInUser(null);
    setRole(null);
  };

  const signup = async (role, {
    firstName,
    lastName,
    email,
    address,
    phoneNumber,
    password,
  }) => {
    try {
      let response;
      let signupMutation;

      if (role === "nurse") {
        signupMutation = signupNurseMutation;
      } else {
        signupMutation = signupPatientMutation;
      }

      response = await signupMutation({
        variables: {
          firstName,
          lastName,
          email,
          address,
          phoneNumber,
          password,
        },
      });

      let _id = null;
      if (role === "nurse") {
        _id = response.data?.signUpNurse?._id;
      } else {
        _id = response.data?.signUpPatient?._id;
      }

      if (!_id) {
        return false;
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
        

  const isLoggedIn = React.useMemo(() => {
    if (loading) {
      return null;
    }

    return loggedInUser !== null;
  }, [loggedInUser, loading]);

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      login,
      signup,
      logout,
      loggedInUser,
      role,
      loading,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
