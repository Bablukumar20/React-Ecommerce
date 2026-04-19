import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../firebase";

/**
 * STEP 1: Create Recaptcha (required by Firebase)
 * This prevents bot abuse
 */
export const createRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log("Recaptcha solved");
        },
      }
    );
  }
};

/**
 * STEP 2: Send OTP
 */
export const sendOTP = async (phoneNumber) => {
  try {
    createRecaptcha();

    const appVerifier = window.recaptchaVerifier;

    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      appVerifier
    );

    console.log("OTP Sent Successfully");

    return confirmationResult;
  } catch (error) {
    console.log("OTP ERROR:", error.code, error.message);
    throw error;
  }
};