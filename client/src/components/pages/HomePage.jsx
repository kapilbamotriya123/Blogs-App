import { useNavigate } from "react-router"

const HomePage = () => {
    const navigate = useNavigate()
    return (
        <div className="container">
            <div className="home__wrapper">

                <h2 className="home__intro">
                    Hello! Welcome to Blogs, where you can create your own blogs, explore others' posts, and much more.
                </h2>
                <button onClick={() => navigate('/blogs')} className="home__btn">
                    Blogs
                </button>
            </div>
        </div>
    )
}

export default HomePage