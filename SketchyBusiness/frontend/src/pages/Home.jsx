import UserLogged from "../UserLogged";
import './Home.css'

function Home() {
    return (<>
        <UserLogged/>
        <div className="text">
            <hr className="hr"/>
            Thank you very much for visiting my website!
            <br/>
            If you want to see all my sketches, visit the drawings page.
            <hr className="hr"/>
        </div>
    </>
    );
}

export default Home