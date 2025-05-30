import { useEffect, useState } from "react";
import Card from "../card";
import "./Drawings.css";
import UserLogged from "../UserLogged";

function Drawings() {
    const [drawings, setDrawings] = useState([]);

    useEffect(() => {
        fetch("https://sketchy-business-backend.vercel.app/api/drawings")
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


/*import Card from "../card";
import "./Drawings.css";


function Drawings() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    var message =""
    if (loggedInUser) {
        message="LOGGED IN"
    } else {
        message="LOGGED OUT"
    }


    return (
        <div className="drawings">
        <Card id={1} title="First Drawing" description="My friend told me to draw this when she gave this sketchbook." date="15-11-2024" status={message}/>
        <Card id={2} title="Confused Anime Girl" description="Awww, look at her face!" date="16-11-2024" status={message}/>
        <Card id={3} title="My Friend" description="Drew a portrait of my friend." date="17-11-2024" status={message}/>
        <Card id={4} title="Random dude" description="I don't know why I drew this!." date="20-11-2024" status={message}/>
        <Card id={5} title="Eeeee" description="Cute little anime girl with a hoodie." date="21-11-2024"/>
        <Card id={6} title="Ooh" description="Anime girl with cute eyes." date="21-11-2024"/>
        <Card id={7} title="Challenge" description="My friend told to redraw a drawing in my style." date="22-11-2024"/>
        <Card id={8} title="Lost" description="A girl in the woods with evening clouds." date="26-11-2024"/>
        <Card id={9} title="King of the Hill" description="Let me show you who is the boss." date="28-11-2024"/>
        <Card id={10} title="F1 - 1" description="Failed attempt to draw a F1 racing car" date="30-11-2024"/>
        <Card id={11} title="F1 - 2" description="Finally drew a F1 racing car." date="01-12-2024"/>
        <Card id={12} title="Cute Anime Girl" description="Drew a girl with a lot of details." date="03-12-2024"/>
        <Card id={13} title="A Lovely Sunset" description="When the sun sets down, our hopes rise up." date="06-12-2024"/>
        <Card id={14} title="Secret Admirer" description="Do you even know who loves you?." date="10-12-2024"/>
        <Card id={15} title="Help!" description="I'm lost, I'm not scared, or I thought.." date="12-12-2024"/>
        <Card id={16} title="Comon then!" description="Watch me as I show you how it's done." date="22-12-2024"/>
        <Card id={17} title="Weeeee!" description="I feel like I can fly!" date="30-12-2024"/>
        <Card id={18} title="HEY!" description="He's too busy! Give me some time!!" date="14-01-2025"/>
        <Card id={19} title="Me and friend" description="Me and my friend when we went in Alcheringa event" date="01-02-2025"/>
        <Card id={20} title="Text..text..." description="Comon... I'm waiting for you reply :(" date="29-03-2025"/>
        <Card id={21} title="LOVE" description="I'M NOT MAD, I'M NOT IN LOVE, I AM MAD IN LOVE!" date="05-04-2025"/>
        <Card id={22} title="Some Singer" description="Friend sent this photo to draw." date="27-05-2025"/>
        <Card id={23} title="Not So Romantic" description="Oh, how much I wish..." date="27-05-2025"/>
        <Card id={24} title="What Are You Doing~" description="First ever pencil sketch I made" date="29-05-2025"/>
        </div>
        
    );
}

export default Drawings
*/