import { useState, useEffect } from "react";
import Blog from "./components/pages/Blog";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { showNotification } from "./reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, initialiseBlogs } from "./reducers/blogReducer";
import Login from "./components/pages/LoginPage";
import Nav from "./components/Navbar";
import HomePage from "./components/pages/HomePage";
import About from "./components/pages/About";
import BlogsPage from "./components/pages/BlogPage";
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import CreateNew from "./components/pages/CreateNew";
//importing css here
import '../node_modules/modern-normalize/modern-normalize.css'
import './index.css'
import './App.css'
import './components/styles/Nav.css'
import './components/styles/home.css'
import './components/styles/about.css'
import './components/styles/Blogpage.css'
import './components/styles/singleBlog.css'
import './components/styles/newBlog.css'
import './components/styles/login.css'

const App = () => {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState('')

  // console.log('logging with','username: ', username, 'password: ', password);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialiseBlogs())
  }, []);

  const reduxBlogs = useSelector(state => state.blog)
  

  useEffect(() => {
    const userJSON = window.localStorage.getItem("loggedBlogappUser");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
      blogService.setToken(user.generatedToken);
    }
  }, []);

  const newNotif = useSelector(state => state.notification)

  //this is login handler
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      setPassword("");
      setUsername("");
    } catch (exception) {

      dispatch(showNotification('incorrect username or password'))
    }
  };

  const addBlog = async (event) => {
    event.preventDefault();

    const newBlog = { title, author, url, content};
    if (title === "" || author === "" || url === "" || content === "") {
      dispatch(showNotification(`all 4 fields are mandatory`))
      
    }
    else {
      dispatch(createBlog(newBlog));
      dispatch(showNotification(`Added" ${title}" successfully`))
      setTitle('')
      setUrl('')
      setAuthor('')
      setContent('')

      
    }
  };


  const userName = () => {
    if (user) {
      return user.username;
    }
    return null;
  };

  const logOut = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };


  
  if (user === null) {
    return (
      <Login 
      handleLogin = {handleLogin}
      setUsername = {setUsername}
      setPassword = {setPassword} 
      password= {password} 
      username= {username} 
      newNotif = {newNotif}
      />
    );
  }
  return (
    <Router>

      <div className="main__app">
        <Nav username = {userName} logOut= {logOut}/>
        <Routes>
          <Route path="/" element = {<HomePage/>} />
          <Route path="/about" element = {<About/>} />
          <Route path="/blogs" element = {<BlogsPage reduxBlogs={reduxBlogs}/>} />
          <Route path="/blogs/:id" element = {<Blog blogs={reduxBlogs}/>} />
          <Route path="/createnew" element = {<CreateNew addBlog={addBlog} title={title} setTitle={setTitle} author={author} 
          setAuthor={setAuthor} url={url} setUrl= {setUrl} content={content} setContent ={setContent}/>} />
        </Routes>
      </div>

      {newNotif && 
      <div className="notification__wrapper">
        <text className=" notification">{newNotif}</text>
      </div>
      }


    </Router>
  );
};

export default App;
