import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
const ViewPaste = () => {
  const { id } = useParams();
  const allpastes = useSelector((state) => state.Paste.pastes);
  const paste = allpastes.filter((p) => p._id === id)[0];
  console.log("its paste ", paste);
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 rounded-lg shadow-lg">
    <div className="flex flex-row gap-4 justify-between">
      <input
        type="text"
        className="p-3 rounded-2xl mt-2 text-black w-[65%] ml-4 pl-3 border border-gray-300 bg-white disabled:bg-gray-200 disabled:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="Enter Title Name"
        value={paste.title}
        disabled
        onChange={(e) => setTitle(e.target.value)}
      />
  
      <button
        className="flex items-center justify-center p-2 rounded-2xl mt-2 mr-4 bg-white text-black font-semibold hover:bg-blue-700 transition duration-300 ease-in-out shadow-md"
        onClick={() => {
          navigator.clipboard.writeText(paste?.content);
          toast.success("Copied to clipboard");
        }}
      >
        <span className="mr-2">📋</span> {/* Copy icon (you can replace this with an actual icon from an icon library) */}
        Copy
      </button>
    </div>
  
    <div className="mt-8">
      <textarea
        className="rounded-2xl mt-4 min-w-[500px] p-4 border border-gray-300 bg-white disabled:bg-gray-200 disabled:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="Enter Content"
        value={paste.content}
        disabled
        onChange={(e) => setValue(e.target.value)}
        rows={10}  // Adjusted for better fit
      />
    </div>
  </div>
  
  );
};

export default ViewPaste;
