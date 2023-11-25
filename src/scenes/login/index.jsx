import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import logoGitHub from '../../assets/github-icon.png'
import logoGoogle from '../../assets/google-icon.svg'
import logoPedraMoura from '../../assets/pedramoura_full_logo.png'
import './style.scss'

const Login = () => {

    const [ user, setUser ] = useState([]);
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
            if (user && user.access_token) {
                authenticateGoogle(user)
            }
        },
        [ user ]
    );

    function authenticateGoogle(user) {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: 'application/json'
            }
        }).then((response) => {
            if (response && response.data) {
                authenticateApplicationApi({
                    id: response.data.id,
                    email: response.data.email,
                    firstName: response.data.given_name,
                    lastName: response.data.family_name,
                    picture: response.data.picture,
                });
            }
            return;
        }).catch((error) => {
            console.log('Error Google Auth02 Token');
            console.log(error);
        });
        return;
    }

    function authenticateApplicationApi(data) {
        axios.post(`${process.env.REACT_APP_MAIN_API}/google/authentication/token`, {
            user: data
        }).then((response) => {
            if (response && response.data) {
                const cookiesExpiresInSeconds = 60 * 60 * 24 * 30; //1month
                Cookies.set('Set-Cookie', `token=${response.data}; Path=/; max-age=${cookiesExpiresInSeconds};`);
                const tokenKey = 'accessToken';
                Cookies.set(tokenKey, response.data);
                localStorage.setItem(tokenKey, new String(response.data));
                navigate('/dashboard');
            }
            return;
        }).catch((error) => {
            console.log('Error Api Token');
            console.log(error);
        });

    }

    return(
        <div id="page-auth">
            <div className='logoPedra'>
                <img src={logoPedraMoura} alt="Logo Pedra Moura" />
            </div>

            <a>
                <button onClick={() => login()} className="google-auth">
                    <img src={logoGoogle} alt="Logo da Google" />
                        Login com Google
                </button>
            </a>

            <a href={`https://github.com/login/oauth/authorize?client_id=19ec27068c81ad5cd894`}>
                <button className="git-auth">
                    <img src={logoGitHub} alt="Logo do Github" />
                        Login com Github
                </button>
            </a>
        </div>
    )
}

export default Login;