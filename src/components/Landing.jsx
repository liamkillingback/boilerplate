import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../state";
import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,11}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const Landing = () => {
  const [Landing, setLanding] = useState(true);

  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    console.log(e);
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username: username,
        password: password,
      });
      console.log(response);
      if (response?.status === 200) {
        const { token, user } = response?.data;
        dispatch(
          setLogin({
            user: user,
            token: token,
          })
        );
        navigate("/account");
      } else {
        return alert(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong, Please try again later.");
    }
    setLoggingIn(false);
  };

  const handleRegisterSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();
    console.log(e);
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      alert("Invalid username or password");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const isValidEmail = EMAIL_REGEX.test(email);
    if (!isValidEmail) {
      alert("Email not valid");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        username: username,
        email: email,
        password: password,
      });
      console.log(response);
      setIsLogin(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`landing flex flex-col items-center justify-center font-thin w-screen h-screen absolute top-0 text-white ${
        Landing ? "translate-y-0" : "-translate-y-full"
      } duration-500 transition-all ease-out`}
    >
      <h1 className=" font-extrabold text-[3rem] bg-[rgba(26,37,58,0.94)] w-full px-10 fixed top-0">
        TRADEM8
      </h1>
      <div className="w-full h-full bg-[rgba(14,20,31,0.94)] flex md:flex-row flex-col items-center justify-center px-[5%]">
        <div className="md:w-[60%] md:pt-0 pt-40 h-full flex items-center justify-center flex-col md:gap-10 gap-5 px-[5%]">
          <h1 className=" md:text-[3rem] text-[1.6rem] font-semibold">
            Connect with other tradies, talk shop, get tools to help build your business.
          </h1>
          <p className="md:text-[1.5rem]">Wether you're an apprentice, worker or a contractor, find value in networking with others and use our tools to help you on the job.</p>
          <button onClick={() => setLanding(!Landing)} className="text-[2rem] bg-[#ff513a] w-full   hover:scale-105 transition-all">Check it out</button>
        </div>
        <div
          className={`w-[40$] h-full flex flex-col items-center justify-center text-center  py-5 `}
        >
          <form
            onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}
            className="flex flex-col m-2 items-center"
          >
            <h1 className="text-[2.3rem] w-full text-left">{`${
              isLogin ? "Login" : "Create account"
            }`}</h1>

            {/* <p
              className={`flower text-[1rem] ${isLogin && "hidden"} text-left`}
            >
              - 4 to 12 characters.
              <br />
              - Must begin with a letter.
              <br />- Letters, numbers, underscores, hyphens allowed.
            </p> */}
            <input
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              name="username"
              className="font-sans m-2 w-full text-black sm:h-10 h-10 text-[2rem] px-2 shadow-lg border"
            />
            {!isLogin && (
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email address"
                name="email"
                className="font-sans m-2 w-full text-black sm:h-10 h-10 text-[2rem] px-2 shadow-lg border"
              />
            )}
            {/* <p className={`flower ${isLogin && "hidden"} `}>
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p> */}
            <input
              required
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              className="flower m-2 w-full text-black sm:h-10 h-10 text-[2rem] px-2 shadow-xl border"
            />
            {!isLogin && (
              <>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  name="confirm-password"
                  className="flower m-2 w-full text-black sm:h-10 h-10 text-[2rem] px-2 shadow-xl border"
                />
              </>
            )}
            <button className="text-[2rem] bg-[#ff513a] w-full   hover:scale-105 transition-all mt-10">{`${
              isLogin ? "Login" : "Get Started"
            }`}</button>
          </form>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[1.5rem] mt-5  underline hover:text-red-500 p-2 w-full   transition-all"
          >{`${
            !isLogin
              ? `${loggingIn ? "..." : "Have an account? Login"}`
              : `${submitting ? "submitting" : "Register"}`
          }`}</button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
