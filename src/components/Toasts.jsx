import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = (msg) => toast(msg, { rtl: true });

export default function Toasts() {
  return (
    <ToastContainer
      position="top-left"
      theme="dark"
      rtl
      autoClose={3500}
      pauseOnHover
    />
  );
}
