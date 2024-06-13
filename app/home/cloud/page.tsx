"use client";

import { Cloud } from "@/components/Cloud-area";
import jwt from "jsonwebtoken";
import { useEffect, useRef, useState } from "react";

function MyPage() {
  const [isConnected, setIsConnected] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwt.decode(token);
        setIsConnected(!!decodedToken);
      } catch (error) {
        console.error("Invalid token", error);
        setIsConnected(false);
      }
    } else {
      setIsConnected(false);
    }
  }, []);

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const encryptedFile = await encryptFile(file);
      await uploadFile(encryptedFile);
    }
  };

  const encryptFile = async (file: any) => {
    const encryptionType = "password"; // This should be dynamic based on user's choice
    if (encryptionType === "password") {
      const password = "user-password"; // Get this from user input
      // Implement password-based encryption here
      return file; // Return the encrypted file
    } else if (encryptionType === "privatekey") {
      // Implement private key-based encryption here
      return file; // Return the encrypted file
    }
  };

  const uploadFile = async (file: any) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/file/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("File uploaded successfully");
      } else {
        console.error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  return (
    <>
      <Cloud />
      {isConnected && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </>
      )}
    </>
  );
}

export default MyPage;
