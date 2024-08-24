
const Login = ({handleLogin, setUsername, setPassword, password, username, newNotif}) => {
    return (
      <div className="login__wrapper-wrapper">

        <div className="new__wrapper login__wrapper">
          <h1 className="new__heading">Login</h1>
          <form onSubmit={handleLogin}>
            <div >
              <p className="form__fieldname">
                username
              </p>
              <input className="form__input"
                name="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                />
            </div>
  
            <div>
              
            <p className="form__fieldname">
                Password
              </p>
              <input className="form__input"
                name="password"
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button className="nav__btn new__btn login__btn" type="submit">log in </button>
          </form>
  
        </div>
        <text className="login__disclaimer">
          Due to spams registration is not added to UI
        </text>
        {newNotif && 
      <div className="notification__wrapper">
        <text className=" notification">{newNotif}</text>
      </div>
      }
    </div>
      );
}

export default Login