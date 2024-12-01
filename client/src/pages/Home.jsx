import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { MdOutlineAddBox } from "react-icons/md";
import BookTable from "../components/home/BookTable";
import BookCard from "../components/home/BookCard";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/book")
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 :hover-bg-sky-600 px-4 py-1 roundedlg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 :hover-bg-sky-600 px-4 py-1 roundedlg"
          onClick={() => setShowType("card")}
        >
          card
        </button>
      </div>
      <div className="flex items-center justify-between border-b border-neutral-300 px-2 mb-2 rounded-md">
        <h1 className="text-5xl my-6 text-sky-600 font-extrabold tracking-wide">
          Books List
        </h1>
        <Link to="/book/create">
          <MdOutlineAddBox className="text-4xl text-sky-800" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BookTable books={books} />
      ) : (
        <BookCard books={books} />
      )}
    </div>
  );
}

export default Home;
