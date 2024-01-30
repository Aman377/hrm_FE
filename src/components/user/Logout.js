import { useEffect } from "react";
import { toast } from "react-toastify";

function Logout() {
  useEffect(() => {
    localStorage.clear();
    // deleteAllCookies();
    toast.success("Logged Out");
    // localStorage.setItem("isLogged", false);;

    localStorage.setItem("isLogged", "");
    window.location.href = "/admin/auth/login";
  }, []);
}
export default Logout;
