import React from "react";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-blue-500 opacity-50 z-50 h-full">
      {/* You can replace this with a more sophisticated loader */}
      <div className="animate-pulse h-full"></div>
    </div>
  );
};

export default Loading;
