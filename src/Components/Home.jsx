import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../Redux/Slicepaste";
import { format } from 'date-fns';

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pastesid"); // Use "pastesid" consistently
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.Paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId); // Fix the find method
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  const createPaste = () => {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };
  
    // Format the date using date-fns
    const formattedDate = format(new Date(paste.createdAt), 'MMMM d, yyyy h:mm:ss a');
  
    console.log("Formatted Date:", formattedDate);

    if (pasteId) {
      // Update
      dispatch(updateToPastes(paste));
    } else {
      // Create
      dispatch(addToPastes(paste));
    }
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 shadow-lg rounded-lg">
  <div className="flex flex-col md:flex-row gap-4 justify-between">
    <input
      type="text"
      className="p-3 rounded-2xl mt-2 text-black w-full md:w-[65%] placeholder:text-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter Title Name"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />

    <button
      onClick={createPaste}
      className="p-3 rounded-2xl mt-2 bg-white text-black font-semibold hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
    >
      {pasteId ? "Update My Paste" : "Create Paste"}
    </button>
  </div>
  <div className="mt-8">
    <textarea
      className="rounded-2xl mt-4 min-w-full p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter Content"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      rows={10}  // Adjusted for better fit
    />
  </div>
</div>

  );
};

export default Home;
