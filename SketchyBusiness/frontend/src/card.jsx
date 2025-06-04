import { useState, useEffect } from "react";
import { Heart, HeartOff, MessageSquareQuoteIcon, MessageSquare, Eye } from 'lucide-react';
import './Card.css'
import BackendURL from "./pages/URL";

function Card({ id, title, description, date, initialLikes, user }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState(0);
  const [views, setViews] = useState(0);

  const handleLikes = async () => {
    console.log("Sending like request for user:", user);
    const res = await fetch(`${BackendURL}/api/drawings/${id}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user })
    })

    const data = await res.json()
    setLikes(data.likes)
    setIsLiked(data.likedBy.includes(user))
    setComments(data.comments.length)

  };

  const increaseViews = async () => {
    try {
      await fetch(`${BackendURL}/api/drawings/${id}/views`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const res = await fetch(`${BackendURL}/api/drawings/${id}/views`);
      const data = await res.json();
      setViews(data.views);
    } catch (err) {
      console.error("Error updating/fetching views:", err);
    }
  };

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const res = await fetch(`${BackendURL}/api/drawings/${id}/views`);
        const data = await res.json();
        setViews(data.views);
      } catch (err) {
        console.error("Error fetching views:", err);
      }
    };

    fetchViews();
  }, [id]);

  useEffect(() => {
    const getLikes = async () => {
      console.log("Retrieving like status for user:", user);
      try {
        const res = await fetch(`${BackendURL}/api/drawings/${id}/getlike`, {
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

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`${BackendURL}/api/drawings/${id}/comments`);
        const data = await res.json();
        setComments(data.comments.length);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchComments();
  }, [id]);



  return (
    <div className="Card">
      <div className="content">
        <a href={`/drawing/${id}`}
          onClick={async (e) => {
            e.preventDefault();
            await increaseViews();
            window.location.href = `/drawing/${id}`;
          }}>
          <img src={`/assets/Drawings/${id}.jpg`} alt={`drawing-${id}`} />
        </a>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className="like-section">
        <p>{date}</p>
        <button onClick={handleLikes} className="button">
          {isLiked ? <HeartOff /> : <Heart color="red" />} {likes}
        </button>&nbsp;&nbsp;
        <a href={`/drawing/${id}/#comments-section`} onClick={async (e) => {
          e.preventDefault();
          await increaseViews();
          window.location.href = `/drawing/${id}/#comments-section`;
        }} className="a-button">
          {comments > 0 ? <MessageSquareQuoteIcon /> : <MessageSquare />} {comments}
        </a>&nbsp;&nbsp;
        <a className="a-button">
          {<Eye />} {views}
        </a>

      </div>
    </div>

  );
}

export default Card