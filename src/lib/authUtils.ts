import { toast } from 'react-hot-toast';

export function handleAuthError(err: any, customMessage?: string) {
  console.error(err);
  
  const errorCode = err.code;
  
  // Don't show toast if user closed the popup
  if (errorCode === 'auth/popup-closed-by-user') {
    return;
  }
  
  let message = customMessage || "An error occurred";
  
  switch (errorCode) {
    case 'auth/operation-not-allowed':
      message = "This sign-in method is not enabled. Please contact support or enable it in the Firebase Console.";
      break;
    case 'auth/email-already-in-use':
      message = "This email is already registered. Please log in instead.";
      break;
    case 'auth/invalid-credential':
      message = "Invalid email or password. Please try again.";
      break;
    case 'auth/weak-password':
      message = "Password is too weak. Please use at least 6 characters.";
      break;
    case 'auth/user-not-found':
      message = "No account found with this email.";
      break;
    case 'auth/wrong-password':
      message = "Incorrect password. Please try again.";
      break;
    case 'auth/too-many-requests':
      message = "Too many failed attempts. Please try again later.";
      break;
    case 'auth/network-request-failed':
      message = "Network error. Please check your internet connection.";
      break;
    default:
      message = err.message || message;
  }
  
  toast.error(message);
}
