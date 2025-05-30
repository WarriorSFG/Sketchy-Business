import { useState } from "react";
import "./Login.css"
function LoginPage() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("https://sketchy-business-backend.vercel.app/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        localStorage.setItem("loggedInUser", username);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage(`${error} :Something went wrong. Try again later.`);
    }
  };


  return (
    <section className="signup">
      <div className="signupform">
        <h1 className="logintext">LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" placeholder="Username" className="input-field" id="username" name="username" />
            <hr />
          </div>
          <div>
            <input type="password" placeholder="Password" className="input-field" id="password" name="password" />
            <hr />
          </div>
          <div>
            <button type="submit" className="submitbutton">Login</button>
          </div>
        </form>
        <div className="createacc">
          {message && <p>{message}</p>}
          <a href="signup" className="a">No account?Create one!</a>
        </div>
      </div>
    </section>
  );
}

export default LoginPage