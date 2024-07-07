"use client";

import React, { useState } from 'react';
import { MdClose } from "react-icons/md";

const Announcement: React.FC = () => {
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  const handleClose = () => {
    setShowAnnouncement(false);
  };

  return (
    <>
      {showAnnouncement && (
        <div className="announcement  flex items-center justify-center">
          <div className="announcement-content bg-green-600 flex text-white w-full p-3">
            <p className="text-center flex-1 md:text-lg text-sm">
               We've earned the top spot in Peerlist Spotlight for Week 27! 🥇 Thanks you for your support.
            </p>
            <button className="close-button ml-4" onClick={handleClose}>
            <MdClose />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Announcement;

