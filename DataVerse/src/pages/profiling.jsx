import { useState, useEffect } from "react";
import * as Components from '../components/profilingcomponents';
import BackgroundAnimation from "../components/backgroundanimation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, loginUser, signupUser } from "../redux/auth/AuthSlice";
import Cookies from "js-cookie";

const Profiling = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [signIn, toggle] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const status = useSelector((state) => state.auth.status);
    const error = useSelector((state) => state.auth.error);

    useEffect(() => {
        const checkToken = async () => {
            const token = Cookies.get('access_token');
            if (token) {
                await dispatch(fetchUserDetails());
                navigate('/app/dashboard');
            }
        };
        checkToken();
    }, [dispatch, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(loginUser({ email, password }));
            if (loginUser.fulfilled.match(resultAction)) {
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    navigate('/app/dashboard');
                }, 2000);
            } else {
                console.error('Login failed:', resultAction.payload);
            }
        } catch (err) {
            console.error('An error occurred:', err);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(signupUser({ username, email, password }));
            if (signupUser.fulfilled.match(resultAction)) {
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    toggle(!signIn);
                }, 2000);
            } else {
                console.error('Signup failed:', resultAction.payload);
            }
        } catch (err) {
            console.error('An error occurred:', err);
        }
    };

    return (
        <div className="relative h-screen">
            <div className="absolute w-12 z-50 top-6 left-6 h-12 bg-customDarkBlue text-white rounded-lg flex items-center justify-center">
                <button onClick={() => navigate('/')}><FontAwesomeIcon icon={faArrowLeft} className="w-6 h-6 cursor-pointer" /></button>
            </div>
            <div className="absolute inset-0 flex justify-center items-center z-10 font-sans">
                <Components.Container>
                    <Components.SignUpContainer $signin={signIn}>
                        <div className="flex justify-center mt-8 -mb-8">
                            <p className="text-xl font-semibold font-sans">DataVerse</p>
                        </div>
                        <Components.Form>
                            <Components.Title>Create Account</Components.Title>
                            <Components.Input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                            <Components.Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Components.Input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            {error && <div className="text-red-500 text-sm mb-2">{typeof error === 'string' ? error : error.message || 'An error occurred'}</div>}
                            <Components.Button onClick={handleSignUp}>Sign Up</Components.Button>
                        </Components.Form>
                    </Components.SignUpContainer>
                    <Components.SignInContainer $signin={signIn}>
                        <div className="flex justify-center mt-8 -mb-8">
                            <p className="text-xl font-semibold font-sans">DataVerse</p>
                        </div>
                        <Components.Form>
                            <Components.Title>Sign in</Components.Title>
                            <Components.Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Components.Input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                            {error && <div className="text-red-500 text-sm mb-2">{typeof error === 'string' ? error : error.message || 'An error occurred'}</div>}
                            <Components.Button onClick={handleLogin}>Sign In</Components.Button>
                        </Components.Form>
                    </Components.SignInContainer>
                    <Components.OverlayContainer $signin={signIn}>
                        <Components.Overlay $signin={signIn}>
                            <Components.LeftOverlayPanel $signin={signIn}>
                                <Components.Title>Hello, Buddy!</Components.Title>
                                <Components.Paragraph>
                                    Register with us and start your practical journey right away!
                                </Components.Paragraph>
                                <Components.GhostButton onClick={() => toggle(true)}>
                                    Sign In
                                </Components.GhostButton>
                            </Components.LeftOverlayPanel>
                            <Components.RightOverlayPanel $signin={signIn}>
                                <Components.Title>Welcome Back to DataVerse!</Components.Title>
                                <Components.Paragraph>
                                    To keep connected with us please login with your personal info
                                </Components.Paragraph>
                                <Components.GhostButton onClick={() => toggle(false)}>
                                    Sign Up
                                </Components.GhostButton>
                            </Components.RightOverlayPanel>
                        </Components.Overlay>
                    </Components.OverlayContainer>
                </Components.Container>
            </div>
            {showSuccess && (
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-4 py-2 rounded">
                    {signIn ? 'Login successful!' : 'Signup successful!'}
                </div>
            )}
        </div>
    );
};

export default Profiling;
