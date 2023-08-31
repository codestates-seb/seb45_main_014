import images from '../../assets/images/Images.js';
import { GoogleBtn, KakaoBtn } from './OauthBtn.jsx';

const Login = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <img
        src={images.mainlogo}
        alt="main logo"
        width={'200px'}
        className="mt-8"
      />
      <section className="bg-amber-200 p-5 mt-5 rounded-lg">
        <div>
          <GoogleBtn />
          <KakaoBtn />
        </div>
      </section>
    </div>
  );
};

export default Login;
