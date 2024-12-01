import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import PropTypes from "prop-types";


function BookCard({ books }) {
    
  return (
    <div className="grid sm:grid-col-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book)=> (
        <div key={book._id} className="border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl">
            <h2 className="absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg">
                {book.publishYear}
            </h2>
            <h4 className="my-2 text-gray-500">{book._id}</h4>
            <div className="flex items-center justify-start gap-x-4">
                <PiBookOpenTextLight className="text-2xl text-red-300"/>
                <h2 className="my-1">{book.title}</h2>
            </div>
            <div className="flex items-center justify-start gap-x-4">
                <BiUserCircle className="text-2xl text-red-300"/>
                <h2 className="my-1">{book.author}</h2>
            </div>
            <div className="flex justify-between items-center gap-x-2 mt-4 p4">
                <Link to={`/book/details/${book._id}`}>
                    <BsInfoCircle className="text-2xl text-green-800 hover:text-black" />
                </Link>
                <Link to={`/book/edit/${book._id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
                </Link>
                <Link to={`/book/delete/${book._id}`}>
                    <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
                </Link>
            </div>
        </div>
      ))}
    </div>
  );
}

export default BookCard;

BookCard.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      // Add other book properties here if needed
    })
  ).isRequired,
};
