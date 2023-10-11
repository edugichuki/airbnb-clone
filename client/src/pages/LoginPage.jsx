import { Link } from "react-router-dom";
const LoginPage = () => {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mt-32">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto">
          <input type="email" placeholder="youremail.com" />
          <input type="password" placeholder="password" />
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
