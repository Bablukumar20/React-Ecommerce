import React, { useState } from "react";
import { sendOTP } from "../auth/phoneAuth";

const PhoneLogin = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /**
   * SEND OTP TO PHONE
   */
  const handleSendOTP = async () => {
    try {
      setLoading(true);
      setMessage("");

      // FIX: always format phone correctly
      const formattedPhone = phone.startsWith("+")
        ? phone
        : "+91" + phone;

      const result = await sendOTP(formattedPhone);

      setConfirmationResult(result);
      setMessage("OTP sent successfully ✔");
    } catch (error) {
      console.log("SEND OTP ERROR:", error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * VERIFY OTP
   */
  const handleVerifyOTP = async () => {
    try {
      setLoading(true);

      if (!confirmationResult) {
        setMessage("Please send OTP first");
        return;
      }

      await confirmationResult.confirm(otp);

      setMessage("Login successful 🎉");
    } catch (error) {
      console.log("VERIFY ERROR:", error);
      setMessage("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">

      {/* REQUIRED FOR RECAPTCHA */}
      <div id="recaptcha-container"></div>

      <div className="bg-gray-900 p-6 rounded-lg w-96">

        <h2 className="text-xl font-bold mb-4">
          Phone OTP Login
        </h2>

        {/* PHONE INPUT */}
        <input
          type="text"
          placeholder="Enter phone number (9876543210)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 mb-3 text-black rounded"
        />

        {/* SEND OTP */}
        <button
          onClick={handleSendOTP}
          disabled={loading}
          className="w-full bg-blue-500 py-2 rounded mb-4"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>

        {/* OTP INPUT */}
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 mb-3 text-black rounded"
        />

        {/* VERIFY OTP */}
        <button
          onClick={handleVerifyOTP}
          disabled={loading}
          className="w-full bg-green-500 py-2 rounded"
        >
          Verify OTP
        </button>

        {/* MESSAGE */}
        <p className="mt-4 text-center text-sm text-yellow-300">
          {message}
        </p>

      </div>
    </div>
  );
};

export default PhoneLogin;