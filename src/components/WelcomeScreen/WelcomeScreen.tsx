import { Empty } from 'antd';

import 'components/HomePage/HomePage.css';

const WelcomeScreen = () => {
  return (
    <Empty
      className="content"
      // This is just from an example on antd's demo page...
      // I thought it looked pretty alright.
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: 60,
      }}
      description={
        <>
          <h3 className="content__description">
            Welcome to Patient-Medication Records
          </h3>
          <p>Add or select a patient to get started!</p>
        </>
      }
    />
  );
};

export default WelcomeScreen;
