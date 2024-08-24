import { useNavigate } from "react-router"

const Nav = ({username, logOut}) => {
    const navigate = useNavigate()



    return (
        <div className="container nav">
            <>
                <p className="nav__username">{username()}</p>
                <button className="nav__btn nav__logout" onClick={logOut}>Log Out</button>
            </>

            <h1 onClick={() => navigate('/')} className="nav__title">Blogs</h1>

            <div className="nav__right">
                    <p onClick={() => navigate('/about')} className="nav__about">About</p>
                <p onClick={() => navigate('/blogs')} className="nav__btn nav__createnew">
                    Blogs
                </p>
                <p onClick={() => navigate('/createnew')} className="nav__btn nav__createnew">
                    Create New
                </p>
            </div>
        </div>
    )
}

export default Nav