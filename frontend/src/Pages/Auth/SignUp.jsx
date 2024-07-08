import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticateSignUp } from "../../Services/api";
import emailjs from '@emailjs/browser';
import bg from '../../assets/main/bg.jpg';

const SignUpInitialValues = {
    username: "",
    email: "",
    phoneNumber: '',
    password: "",
}

const SignUp = () => {
    const [data, setData] = useState(SignUpInitialValues);
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [generatedOtp, setGeneratedOtp] = useState("");
    const [error, setError] = useState("");
    const [stage, setStage] = useState("initial");
    const navigate = useNavigate();
    const otpRefs = useRef([]);
    const [loading, setLoading] = useState(false);

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const otpChangeHandler = (e, index) => {
        const newOtp = [...otp];
        newOtp[index] = e.target.value;
        setOtp(newOtp);

        if (e.target.value && index < otpRefs.current.length - 1) {
            otpRefs.current[index + 1].focus();
        }
    }

    const sendOtpEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        const otp = Math.floor(1000 + Math.random() * 9000).toString(); 
        try {
            const templateParams = {
                to_email: data.email,
                to_name: data.username,
                otp: otp
            };
            await emailjs.send('service_v4iuenm', 'template_yi45klh', templateParams, 'kpyEI3k4KZKSecI54');
            setGeneratedOtp(otp);
            setStage("otp");
        } catch (error) {
            console.error("Error sending OTP email:", error);
            setError("Failed to send OTP. Please try again.");
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const enteredOtp = otp.join("");
        if (enteredOtp !== generatedOtp) {
            setError("OTP does not match. Please enter the correct OTP.");
            return;
        }
        try {
            const response = await authenticateSignUp(data);
            if (response.status === 200) {
                navigate('/login');
                setData(SignUpInitialValues);
                setOtp(["", "", "", ""]);
                setStage("initial");
            } else {
                setError("Sign Up failed");
            }
        } catch (error) {
            console.error("Error during sign up:", error);
            if (error.response && error.response.status === 400) {
                setError(error.response.data.message);
            }
        }
    }

    return (
        <div className="flex justify-center items-center w-full bg-gray-100 h-screen">
            <div className="flex flex-col my-24 md:flex-row mx-4 bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
                <div className="md:w-1/2 h-auto">
                    <img src={bg} alt="background" className="object-cover w-full h-full" />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center h-full">
                    <h2 className="text-2xl font-semibold mb-4 text-center">SignUp</h2>
                    {stage === "initial" && (
                        <form onSubmit={sendOtpEmail}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700">Email</label>
                                <input type="email" name="email" value={data.email} placeholder="Enter your Email" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-[#FF7D29]" onChange={changeHandler} required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-gray-700">Username</label>
                                <input type="text" name="username" value={data.username} placeholder="Enter your username" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-[#FF7D29]" onChange={changeHandler} required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phoneNumber" className="block text-gray-700">Mobile No</label>
                                <input type="text" name="phoneNumber" value={data.phoneNumber} placeholder="Enter your Mobile No" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-[#FF7D29]" onChange={changeHandler} required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700">Password</label>
                                <input type="password" name="password" value={data.password} placeholder="Enter your Password" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-[#FF7D29]" onChange={changeHandler} required />
                            </div>
                            {error && <p className="text-red-500 text-md pb-4">{error}</p>}
                            <button className="w-full text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">{loading ? 'Signing in...' : 'Signup'}</button>
                        </form>
                    )}
                    {stage === "otp" && (
                        <form onSubmit={submitHandler}>
                            <p className="text-center text-gray-700 mb-4">Enter the activation code sent to your email {data.email}</p>
                            <div className="mb-4 flex justify-between">
                                {otp.map((value, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        value={value}
                                        placeholder="0"
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-1/6 text-center focus:outline-none focus:border-[#FF7D29]"
                                        onChange={(e) => otpChangeHandler(e, index)}
                                        ref={el => otpRefs.current[index] = el}
                                        required
                                    />
                                ))}
                            </div>
                            {error && <p className="text-red-500 text-md pb-4">{error}</p>}
                            <button className="w-full text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">Verify</button>
                        </form>
                    )}
                    <div className="flex gap-3 mt-6 justify-center">
                        <p>Already have an account?</p>
                        <Link to='/login' className="text-[#8EC44C] font-semibold ">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
