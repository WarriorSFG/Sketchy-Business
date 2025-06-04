import { useEffect, useState } from "react";
import Card from "../card";
import "./Drawings.css";
import UserLogged from "../UserLogged";
import BackendURL from './URL';

function Drawings() {
    const [drawings, setDrawings] = useState([]);

    useEffect(() => {
        fetch(`${BackendURL}/api/drawings`)
            .then(res => res.json())
            .then(data => setDrawings(data));
    }, []);

    const loggedInUser = localStorage.getItem("loggedInUser");

    return (<>
    <UserLogged/>
        <div className="drawings">
            {drawings.map(drawing => (
                <Card key={drawing._id}
                    id={drawing.customId}
                    title={drawing.title}
                    description={drawing.description}
                    date={drawing.date}
                    initialLikes={drawing.likes}
                    user={loggedInUser}
                />
            ))}
        </div>
    </>
    );
}

export default Drawings;
