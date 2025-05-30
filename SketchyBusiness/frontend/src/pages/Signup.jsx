import { useEffect, useState } from "react";
import "./Login.css";
function SignUp() {

    const [BackendData, SetBackendData] = useState([{}])

    useEffect(() => {
        fetch("/register").then(
            res => res.json()
        ).then(
            data => {
                console.log(data)
            }
        )
    }, [])
    return (
        <section className="signup">
            <div className="signupform">
                <h1 className="logintext">REGISTER</h1>
                <form action="/register" method="post">
                    <div>
                        <input type="text" placeholder="Username" className="input-field" id="username" name="username" />
                        <hr/>
                    </div>
                    <div>
                        <input type="password" placeholder="Password" className="input-field" id="password" name="password" />
                        <hr/>
                    </div>
                    <div>
                        <button type="submit" className="submitbutton">SignUp</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default SignUp