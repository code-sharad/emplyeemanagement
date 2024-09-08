import { useRef, useState, useEffect } from "react";

function PhotoCapture() {
  const videoRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      startCamera();
    }, 5 * 1000);

    return () => {
      console.log("Component unmounting");
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      stopCameraStream();
    };
  }, []);

  const startCamera = async () => {
    try {
      stopCameraStream();
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      timeoutRef.current = setTimeout(() => capturePhoto(), 1000);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        setPhoto(URL.createObjectURL(blob)); // For display purposes
        console.log("Photo captured");
        sendPhotoToBackend(blob);
        stopCameraStream();
      }, "image/jpeg");
    }
  };

  const stopCameraStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const sendPhotoToBackend = async (photoBlob) => {
    try {
      const formData = new FormData();
      formData.append("photo", photoBlob, "photo.jpg");

      const response = await fetch(
        "https://emplyeemanagement-nvmn.onrender.com/api/v1/user/sendSnapshot",
        {
          method: "POST",
          body: formData,

          // Send cookies with the request
          credentials: "include",

          withCredentials: true,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Photo sent successfully:", response);

      const result = await response.json();
      console.log("Photo sent successfully:", result);
    } catch (error) {
      console.error("Error sending photo to backend:", error);
    }
  };

  return (
    <div className="mt-44">
      <video ref={videoRef} autoPlay style={{ display: "none" }} />
    </div>
  );
}

export default PhotoCapture;
