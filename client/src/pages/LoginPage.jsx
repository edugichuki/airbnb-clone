import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userInfo = await axios.post("/login", { email, password });
      setUser(userInfo);
      alert("Login successful!");

      setRedirect(true);
    } catch (e) {
      alert("Login failed!");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mt-32">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="youremail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="primary">Login</button>
          <div className="text-center text-gray-500 py-2">
            Don&apos;t have an account yet?{" "}
            <Link className="underline text-black" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
