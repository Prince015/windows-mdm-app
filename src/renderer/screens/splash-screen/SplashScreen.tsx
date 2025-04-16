import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const url = window.location.href;
    console.log('url', url);
    const refStart = url.indexOf('ref=') + 4;
    const refEnd =
      url.indexOf('&', refStart) !== -1
        ? url?.indexOf('&', refStart)
        : url?.length;
    const ref = url?.slice(refStart, refEnd);

    console.log('ref', ref);

    if (ref == 'home') {
      navigate('/home', { replace: true });
    } else {
      setTimeout(() => {
        console.log('Not Login');
        navigate('/login')
      }, 1000);
    }
  }, []);

  return (
    <div className="h-screen w-screen bg-bg text-primary grid place-items-center rounded-[10px]">
      <div className="font-bold text-2xl font-sans grid place-items-center gap-2">
        Windows Mdm App
        <div className="w-full h-[2px] bg-gradient-to-r from-primary to-primary bg-no-repeat bg-[length:0%_100%] bg-center animate-line" />
      </div>
    </div>
  );
};

export default SplashScreen;
