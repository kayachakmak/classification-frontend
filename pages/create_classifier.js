import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const ButtonsPage = () => {
  const router = useRouter();
  const { ip_address, classifier_name, class_name1, class_name2 } = router.query;

  const [classId, setClassId] = useState(null); // Stores 0 or 1 based on selected button
  const [isRecording, setIsRecording] = useState(false);

  // Generate the MJPEG stream URL
  const videoStreamUrl = ip_address ? `${ip_address}/mint/video_feed` : null;

  // Handle start recording
  const handleStartRecording = async () => {
    if (classId === null) {
      alert("Please select a class first.");
      return;
    }

    setIsRecording(true);

    try {
      const response = await fetch(
        `${ip_address}/mint/start_recording?class_id=${classId}`
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
      const response = await fetch(`${ip_address}/mint/stop_recording`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ classId }),
      });

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        {classifier_name || "Classifier Name"}
      </h1>

      {/* Buttons */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setClassId(0)}
          className={`px-6 py-2 rounded-lg shadow-md text-white ${
            classId === 0 ? "bg-blue-700" : "bg-blue-600"
          } hover:bg-blue-700`}
        >
          {class_name1 || "Class Name 1"}
        </button>
        <button
          onClick={() => setClassId(1)}
          className={`px-6 py-2 rounded-lg shadow-md text-white ${
            classId === 1 ? "bg-blue-700" : "bg-blue-600"
          } hover:bg-blue-700`}
        >
          {class_name2 || "Class Name 2"}
        </button>
      </div>

      {/* MJPEG Video Streaming Box */}
      <div
        className="bg-black rounded-lg overflow-hidden mb-8"
        style={{ width: "316px", height: "512px" }}
      >
        {videoStreamUrl ? (
          <img
            src={videoStreamUrl}
            alt="Video Stream"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            Loading video stream...
          </div>
        )}
      </div>

      {/* Recording Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleStartRecording}
          disabled={isRecording}
          className={`px-6 py-2 rounded-lg shadow-md text-white ${
            isRecording ? "bg-gray-400" : "bg-green-600"
          } hover:bg-green-700`}
        >
          {isRecording ? "Recording..." : "Start Recording"}
        </button>

        <button
          onClick={handleStopRecording}
          disabled={!isRecording}
          className={`px-6 py-2 rounded-lg shadow-md text-white ${
            !isRecording ? "bg-gray-400" : "bg-red-600"
          } hover:bg-red-700`}
        >
          Stop Recording
        </button>
      </div>
    </div>
  );
};

export default ButtonsPage;