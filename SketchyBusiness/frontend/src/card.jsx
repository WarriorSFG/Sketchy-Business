import { useState, useEffect } from "react";
import { Heart, HeartOff} from 'lucide-react';
import './Card.css'

function Card({id, title, description, date, initialLikes, user }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikes = async () => {
    console.log("Sending like request for user:", user);
    const res = await fetch(`https://sketchy-business-backend.vercel.app/api/drawings/${id}/like`, {
      method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user })
    })

    const data = await res.json()
    setLikes(data.likes)
    setIsLiked(data.likedBy.includes(user))

  };

  useEffect(() => {
    // Call getLikes only once when component mounts
    const getLikes = async () => {
      console.log("Retrieving like status for user:", user);
      try {
        const res = await fetch(`https://sketchy-business-backend.vercel.app/api/drawings/${id}/getlike`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: user })
        });

        const data = await res.json();
        setIsLiked(data.likedBy?.includes(user));
      } catch (err) {
        console.error("Error fetching like status:", err);
      }
    };

    if (user) {
      getLikes();
    }
  }, [id, user]);


    return (
        <div className="Card">
    <div className="content">
        <a href={`/drawing/${id}`}>
  <img src={`/assets/Drawings/${id}.jpg`} alt={`drawing-${id}`} />
</a>
        <h2>{title}</h2>
        <p>{description}</p>
    </div>

    <div className="like-section">        
        <p>{date}</p>
        <button onClick={handleLikes} className="button">
            {isLiked ? <HeartOff /> : <Heart color="red" />} {likes}
        </button>
    </div>
</div>

    );
}

export default Card