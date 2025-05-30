import "./UserLogged.css";

function UserLogged() {
const loggedInUser = localStorage.getItem("loggedInUser");

return (
  <div className="loggeduser">
    {loggedInUser ? (
      <>
        Logged in as: {loggedInUser}{" "}
        <button
          className="button"
          onClick={() => {
            localStorage.clear();
            window.location.reload(); // or redirect to login
          }}
        >
          Log Out?
        </button>
      </>
    ) : (
      "Login to access all features."
    )}
  </div>
);
}

export default UserLogged