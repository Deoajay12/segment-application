import React, { useState } from "react";
import SegmentModal from "./Components/SegmentModal";
const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Save Segment
      </button>

      {isOpen && <SegmentModal onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default App;
