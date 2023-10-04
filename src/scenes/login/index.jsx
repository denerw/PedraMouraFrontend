
import './style.scss'
import logoGoogle from '../../assets/google-icon.svg'
import logoGitHub from '../../assets/github-icon.png'
import logoPedraMoura from '../../assets/pedramoura_full_logo.png'
import axios from 'axios'




const login = () => {

    return(
        <div id="page-auth">
            <div className='logoPedra'>
                <img src={logoPedraMoura} alt="Logo Pedra Moura" />
            </div>
            
            <a href={`http://localhost:3333/api/google/authentication`}>
                <button  className="google-auth">
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

export default login;