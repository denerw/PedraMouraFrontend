import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const AuthCallBackPage = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const test = 1;
    
    useEffect(() => {
        authenticate();
    }, [])

    async function authenticate() {
        console.log('executo aqui');

        const api = axios.create({
            baseURL: 'http://localhost:3333/api'
        });

        const code = searchParams.get('code');
        
        await api.post('/github/authentication', {
            code
        }).then((response) => {
            if (response && response.data) {
                const { token } = response.data;    
                const cookiesExpiresInSeconds = 60 * 60 * 24 * 30; //1month
                Cookies.set('Set-Cookie', `token=${token}; Path=/; max-age=${cookiesExpiresInSeconds};`);
                localStorage.setItem('token', token)
                navigate('/dashboard');
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    return '';
}

export default AuthCallBackPage;
