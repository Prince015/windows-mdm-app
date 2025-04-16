import PiLogo from "../../../../assets/icons/pi.svg"
import LoginBox from "../../components/login/LoginBox";

function Login() {
    return (
        <div className="relative h-screen w-screen overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 scale-110 bg-login-bg bg-cover bg-top blur-2xl" />
                <div className="absolute inset-0 bg-black bg-opacity-40" />
            </div>

            <div className="relative z-10 grid grid-cols-2 p-24 gap-8 h-full text-white">
                <div className="flex justify-center gap-4 flex-col">
                    <p className="flex items-center gap-6">
                        <img className="inline-block w-16" src={PiLogo} alt="pi-logo" />
                        <span className="text-2xl text-background">Powered by Physics Wallah</span>
                    </p>
                    <p className="max-w-xl text-background">Gain comprehensive control over digital environment, ensuring safety and well-being with a single, secure login</p>
                </div>
                <LoginBox />
            </div>
        </div>
    );
}

export default Login;
