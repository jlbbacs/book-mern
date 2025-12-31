import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { AiOutlinePrinter } from 'react-icons/ai'; 

const ShowBooks = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    // FIXED: Changed .post() to .get() and added the id to the URL
    axios.get(`/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center no-print'>
        <BackButton />
        <button
          onClick={handlePrint}
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg flex items-center gap-x-2 transition-all'
        >
          <AiOutlinePrinter className='text-2xl' />
          <span>Print Details</span>
        </button>
      </div>

      <h1 className='text-3xl my-4'>Book Details</h1>
      
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4 bg-white shadow-sm'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500 font-bold'>Id:</span>
            <span>{book._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500 font-bold'>Title:</span>
            <span>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500 font-bold'>Author:</span>
            <span>{book.author}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500 font-bold'>Publish Year:</span>
            <span>{book.publishedYear}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500 font-bold'>Create Time:</span>
            <span>{book.createdAt ? new Date(book.createdAt).toLocaleString() : 'N/A'}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500 font-bold'>Last Update Time:</span>
            <span>{book.updatedAt ? new Date(book.updatedAt).toLocaleString() : 'N/A'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBooks;