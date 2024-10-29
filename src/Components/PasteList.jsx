import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPastes } from "../Redux/Slicepaste";
import toast from "react-hot-toast";
import { FaEdit, FaEye, FaTrash, FaClipboard, FaShareSquare } from 'react-icons/fa';

const PasteList = () => {
  const pastes = useSelector((state) => state.Paste.pastes);
  const [searchItem, setSearchItem] = useState("");
  const dispatch = useDispatch();

  // Filter pastes based on the search term
  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchItem.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
    toast.success("Paste deleted successfully");
  }

  const handleShare = async (title, url) => {
    const shareableLink = `${url}?title=${encodeURIComponent(title)}`;
    try {
      await navigator.share({
        title: title,
        url: shareableLink,
      });
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
    <input
      className="flex mt-5 w-full max-w-lg h-12 items-center p-3 border-2 border-sky-500 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300 transition duration-300"
      type="text"
      placeholder="Search..."
      value={searchItem}
      onChange={(e) => setSearchItem(e.target.value)}
    />
    <div className="flex flex-col gap-5 mt-4">
      {filteredPastes.length > 0 ? (
        filteredPastes.map((paste) => (
          <div key={paste.id || paste._id} className="border border-blue-500 rounded-lg p-4 shadow-md bg-white text-black transition-transform duration-300 hover:scale-105">
            <div className="font-bold text-xl mb-2">{paste.title}</div>
            <div className="mb-4 text-gray-700">{paste.content}</div>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="flex items-center bg-sky-500 text-white rounded px-4 py-2 hover:bg-sky-600 transition duration-300">
                <FaEdit className="mr-2" /> 
                <a href={`/?pastesid=${paste?._id}`}> Edit</a>
              </button>
              <button className="flex items-center bg-sky-500 text-white rounded px-4 py-2 hover:bg-sky-600 transition duration-300">
                <FaEye className="mr-2" /> 
                <a href={`/pastes/${paste?._id}`}> View</a>
              </button>
              <button
                className="flex items-center bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition duration-300"
                onClick={() => handleDelete(paste?._id)}
              >
                <FaTrash className="mr-2" />
                Delete
              </button>
              <button
                className="flex items-center bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 transition duration-300"
                onClick={() => {
                  navigator.clipboard.writeText(paste?.content);
                  toast.success("Copied to clipboard");
                }}
              >
                <FaClipboard className="mr-2" />
                Copy
              </button>
              <button
                onClick={() => handleShare(paste.title, `http://localhost:5173/pastes/${paste._id}`)}
                className="flex items-center bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition duration-300"
              >
                <FaShareSquare className="mr-2" />
                Share
              </button>
            </div>
            <div className="bg-gray-200 text-gray-600 mt-4 rounded px-2 py-1 text-sm">
              {new Date(paste.createdAt).toLocaleString()}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-400">No pastes found.</div>
      )}
    </div>
  </div>

  );
};

export default PasteList;
