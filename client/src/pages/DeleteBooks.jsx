import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

function DeleteBooks() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = () => {
    if (!id) {
      alert("book id not found");
      return;
    }

    setLoading(true);
    axios
      .delete(`http://localhost:5555/book/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("An error occured, chacke console for error");
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-3xl">Aru you want to delete this book?</h3>
        <button
          className="p-4 bg-red-400 text-white m-8 w-full"
         onClick={()=>handleDelete()}
        >Yes, delete it</button>
      </div>
    </div>
  );
}

export default DeleteBooks;
