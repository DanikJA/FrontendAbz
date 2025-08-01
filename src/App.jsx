import "./App.css";
import Header from "./Header";
import Hero from "./Hero";
import PostForm from "./PostForm";
import UsersSection from "./Users";

function App() {
  return (
    <div className="container">
      <Header />
      <Hero />
      <UsersSection />
      <PostForm />
    </div>
  );
}

export default App;
