import TopBar from 'components/TopBar';
import PatientList from 'components/PatientList';
import WelcomeScreen from 'components/WelcomeScreen';

import './HomePage.css';

const HomePage = () => {
  return (
    <>
      <TopBar />
      <div className="main">
        <PatientList />
        <WelcomeScreen />
      </div>
    </>
  );
};

export default HomePage;
