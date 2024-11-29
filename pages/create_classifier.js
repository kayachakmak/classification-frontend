import React, { useState } from "react";
import { useRouter } from "next/router";

const ButtonsPage = () => {
  const router = useRouter();
  const {classifier_name, class_name1, class_name2 } = router.query;

  const [classId, setClassId] = useState(null); // Stores 0 or 1 based on selected button
  const [isRecording, setIsRecording] = useState(false);

  // Generate the MJPEG stream URL
  const url = `http://localhost:6543/mint/video_feed`


  // Handle start recording
  const handleStartRecording = async () => {
    if (classId === null) {
      alert("Please select a class first.");
      return;
    }
    
    setIsRecording(true);

    try {
      const response = await fetch(
        `http://localhost:6543/mint/start_recording?class_id=${classId}`
      );

      if (!response.ok) {
        throw new Error("Failed to start recording");
      }

      const result = await response.json();
      console.log("Start recording response:", result);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  // Handle stop recording
  const handleStopRecording = async () => {
    if (!isRecording) {
      alert("Recording is not active.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:6543/mint/stop_recording`);

      if (!response.ok) {
        throw new Error("Failed to stop recording");
      }

      const result = await response.json();
      console.log("Stop recording response:", result);

      setIsRecording(false); // Reset recording state
    } catch (error) {
      console.error("Error stopping recording:", error);
    }
  };

  return (
<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black px-4">
  {/* Header */}
  <h1 className="text-4xl font-bold text-white mb-8">
    {classifier_name || "Classifier Name"}
  </h1>

  {/* Buttons */}
  <div className="flex gap-6 mb-8">
    <button
      onClick={() => setClassId(0)}
      className={`px-6 py-3 rounded-lg shadow-md text-white text-lg font-semibold ${
        classId === 0 ? "bg-blue-800" : "bg-blue-200"
      } hover:bg-blue-600`}
    >
      {class_name1 || "Class Name 1"}
    </button>
    <button
      onClick={() => setClassId(1)}
      className={`px-6 py-3 rounded-lg shadow-md text-white text-lg font-semibold ${
        classId === 1 ? "bg-red-800" : "bg-red-200"
      } hover:bg-blue-600`}
    >
      {class_name2 || "Class Name 2"}
    </button>
  </div>

  {/* MJPEG Video Streaming Box */}
  <div
    className="bg-black rounded-lg overflow-hidden mb-8 border border-gray-600 shadow-lg"
    style={{ width: "640px", height: "512px" }}
  >
    
      <img
        src={url}
        alt="Video Stream"
        className="w-full h-full object-cover"
      />
    
  </div>

  {/* Recording Buttons */}
  <div className="flex gap-6">
    <button
      onClick={handleStartRecording}
      disabled={isRecording}
      className={`px-6 py-3 rounded-lg shadow-md text-white text-lg font-semibold ${
        isRecording ? "bg-gray-500" : "bg-green-600"
      } hover:bg-green-700`}
    >
      {isRecording ? "Recording..." : "Start Recording"}
    </button>

    <button
      onClick={handleStopRecording}
      disabled={!isRecording}
      className={`px-6 py-3 rounded-lg shadow-md text-white text-lg font-semibold ${
        !isRecording ? "bg-gray-500" : "bg-red-600"
      } hover:bg-red-700`}
    >
      Stop Recording
    </button>
  </div>
</div>  );
};

export default ButtonsPage;