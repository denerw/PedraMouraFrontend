import { api } from "lib/api";
import { NextRequest, NextResponse } from "next/server";


const AuthCallBack = async (req: NextRequest) => {

    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const registerReponse = await api.post('/api/github/authentication/', {
        code
    })

    const { token } = registerReponse.data;

    //Redirecting back to URL that you came
    const redirectURL = new URL('/dashboard', req.url)

    const cookiesExpiresInSeconds = 60 * 60 * 24 * 30; //1month

    return NextResponse.redirect(redirectURL, {
        //setting token on cookies. Path=/ means that the token is available for all application
        headers: {
            'Set-Cookie': `token=${token}; Path=/; max-age=${cookiesExpiresInSeconds};`,
        }
    })
}

export default AuthCallBack;