import { useDispatch } from "react-redux";
import { deleteBlog, likeBlog } from "../../reducers/blogReducer";
import { useNavigate, useParams } from "react-router";

const Blog = ({ blogs }) => {

  const params = useParams()
  const id = params.id
  const blog = blogs.find(b => b.id === id)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <div className="container">
      <div className="singleBlog__wrapper">
        <h1 className="singleBlog__title">{blog.title}</h1>

        <div className="singleBlog__info-wrapper">
          
          <p className="singleBlog__author">{blog.author}</p>

          <div className="singleBlog__like-del">
            <button className="nav__btn singleBlog__btn" onClick={() => dispatch(likeBlog(blog))}>like: {blog.likes}</button>
            <button className="nav__btn singleBlog__btn" onClick={() => {dispatch(deleteBlog(blog)); navigate('/blogs')}}>delete</button>
          </div>



        </div>
        <hr></hr>
        <text className="singleBlog__content">
          {blog.content && blog.content}
        </text>
          <hr></hr>
      </div>
      
    </div>
)};

export default Blog;



  // <div>
  //    <strong> </strong> 
  //   <button </button>
  //   <button </button>
    
  // </div>
