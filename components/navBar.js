import Link from 'next/link'
import { useRouter } from 'next/router'

import { useCookies } from 'react-cookie';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link href="/">
                            <a className="nav-link active">Home</a>
                        </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/login">
                                <a className="nav-link">Login</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/register" >
                                <a className="nav-link">Register</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export const NavBarAuth = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const router = useRouter()
    const logout = ()=>{
        removeCookie('jwt');
        removeCookie('username');
        router.push('/')
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link href="/">
                            <a className="nav-link active">Home</a>
                        </Link>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" onClick={logout}>Logout</button>
                        </li>
                        <Link href={`/user/profile/${cookies.username}`}>
                            <a className="nav-link active">Profile</a>
                        </Link>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;