import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
//css is from index.css by default

const SideNavbar = () => {
  const { user } = useAuthContext();

  return (
    <header>
      <div className="sidenavbarcontainer">
        <nav>
          {user && (
            <div className="sidenavbarlinks">
              <Link to="/">
                <span className="material-symbols-outlined sidebar">home</span>
                Home
              </Link>
              <Link to="/admin-dashboard">
                <span className="material-symbols-outlined sidebar">dashboard</span>
                Dashboard
              </Link>
              <Link to="/admin-users">
                <span className="material-symbols-outlined sidebar">group</span>
                Users</Link>
              <Link to="/admin-courses">
                <span className="material-symbols-outlined sidebar">library_books</span>
                Courses
              </Link>
              {/* inavtive links for placeholders for now, add routes when pages exist...  */}
              <Link to="/">
                <span className="material-symbols-outlined sidebar">grade</span>
                Grades
              </Link>
              <Link to="/">
                <span className="material-symbols-outlined sidebar">mode_comment</span>
                Chat
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default SideNavbar;
