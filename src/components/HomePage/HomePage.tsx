import { Switch, Route } from 'react-router-dom';

import TopBar from 'components/TopBar';
import PatientList from 'components/PatientList';
import PatientDetails from 'components/PatientDetails';
import WelcomeScreen from 'components/WelcomeScreen';

import './HomePage.css';

const HomePage = () => {
  return (
    <>
      <TopBar />
      <div className="main">
        <Switch>
          <Route exact path="/">
            <PatientList />
            <WelcomeScreen />
          </Route>
          <Route path="/patient/:patientId">
            <PatientList />
            <PatientDetails />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default HomePage;
