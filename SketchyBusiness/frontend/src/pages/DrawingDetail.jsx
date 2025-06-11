import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './DrawingDetail.css';
import BackendURL from './URL';
import { Download } from 'lucide-react';

function DrawingDetail() {
  const { id } = useParams();
  const [drawing, setDrawing] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  
  // Get username from localStorage once on component mount
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("loggedInUser") || "";
  });

  useEffect(() => {
    const fetchDrawing = async () => {
      try {
        const response = await fetch(`${BackendURL}/api/drawings/${id}`);
        const text = await response.text();
        const data = JSON.parse(text);
        setDrawing(data);
      } catch (err) {
        console.error("Error fetching drawing:", err);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(`${BackendURL}/api/drawings/${id}/comments`);
        const data = await res.json();
        setComments(data.comments);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchDrawing();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !commentText.trim()) return;

    try {
      const res = await fetch(`${BackendURL}/api/drawings/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, text: commentText }),
      });

      if (res.ok) {
        const data = await res.json();
        setComments(data.comments);
        setCommentText('');
      } else {
        console.error("Failed to post comment");
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  if (!drawing) return <p>Loading...</p>;

  return (
    <div className="drawing-detail">
      <h2 className='Drawing-title'>{drawing.title}</h2>
      <img src={`/assets/Drawings/${drawing.customId}.jpg`} alt={drawing.title} className='img' />
      <br/>
      <div className='download-button-container'>
      <a href={`/assets/Drawings/${drawing.customId}.jpg`} download="Drawing.png" className='a'>
        <button className='download-button'><Download/>Download</button>
      </a>

      </div>
      <p><strong>Description:</strong> {drawing.description}</p>
      <p><strong>Date:</strong> {drawing.date}</p>
      <p><strong>Likes:</strong> {drawing.likes}</p>

      <hr />

      <section className="comments-section" id="comments-section">
        <h3>Comments</h3>

        <ul className="comments-list">
          {comments.length === 0 && <p>No comments yet.</p>}
          {comments.map((c, idx) => (
            <li key={idx}>
              <strong>{c.username}:</strong> {c.text} <em>({new Date(c.createdAt).toLocaleString()})</em>
            </li>
          ))}
        </ul>

        {username ? (
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea
              placeholder="Add a comment..."
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              required
            />
            <button type="submit">Post Comment</button>
          </form>
        ) : (
          <p>Please log in to add comments.</p>
        )}
      </section>
    </div>
  );
}

export default DrawingDetail;
