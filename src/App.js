import './App.css';
import Header from './components/Header/Header';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import PostsList from './components/Feeds/Post';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Profile from './components/Profile/Profile';
import CreatePost from './components/Feeds/CreatePost';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Signin />} />
      </Routes>
      <Routes>
        <Route path="/feeds" element={<PostsList />} />
      </Routes>
      <Routes>
        <Route path="/signin" element={<Signin />} />
      </Routes>
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Routes>
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Routes>
        <Route path="/post/create" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
