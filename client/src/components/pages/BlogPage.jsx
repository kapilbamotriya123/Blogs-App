import { useNavigate } from "react-router"
import Blog from "./Blog"

const Blogs = ({reduxBlogs}) => {
  const navigate = useNavigate()
    return (
        <div>
          <div className="container">
              <h2 className="blog__heading">Recent Blogs</h2>
              <div className="blog__wrapper-og">

              {reduxBlogs.map((blog) => (
            
                <div className="blog__wrapper" key={blog.id} onClick={() => navigate(`/blogs/${blog.id}`)}>
                  <p className="blog__title">{blog.title}</p>
                  <div className="blog__info-wrapper">
                    <p className="blog__author"> Author: {blog.author}</p>
                    <p className="blog__likes">likes: {blog.likes}</p>
                  </div>
                </div>
              ))}


              </div>

          </div>






        </div>
    )
}

export default Blogs