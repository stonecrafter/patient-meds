import { Empty } from 'antd';

import './WelcomeScreen.css';

const WelcomeScreen = () => {
  return (
    <Empty
      className="welcome"
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: 60,
      }}
      description={<span>Welcome to Patient Medication Records</span>}
    />
  );
};

export default WelcomeScreen;
