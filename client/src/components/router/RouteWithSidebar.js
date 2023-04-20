import React, { useState } from 'react';

import { useAuth } from '../../hooks/useAuth';

import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Preloader from '../Preloader';

const RouteWithSidebar = ({ children }) => {
  const { loading } = useAuth();

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }

  return (
    <>
      <Preloader show={loading} />
      <Sidebar />

      <main className="content">
        <Navbar />
        {children}
        <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
      </main>
    </>
  );
};
//
export default RouteWithSidebar;
