// src/components/Login.jsx
import React, { useState } from "react";
import { supabase } from "../supabaseClient";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSignup, setIsSignup] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    let response;
    if (isSignup) {
      response = await supabase.auth.signUp({ email, password });
    } else {
      response = await supabase.auth.signInWithPassword({ email, password });
    }

    if (response.error) setError(response.error.message);
    else onLogin(response.data.user);
  };

  return (
    <div className="login-box">
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <p style={{ marginTop: "1rem" }}>
        {isSignup ? "Already have an account?" : "Don't have an account?"} {" "}
        <button onClick={() => setIsSignup(!isSignup)} style={{ color: "blue", background: "none", border: "none", cursor: "pointer" }}>
          {isSignup ? "Login" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}

export default Login;
