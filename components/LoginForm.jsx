"use client";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required!");
      return;
    }
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res.error) {
        setError("Invalid Credentials");
        return;
      }
      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-400">
        <h1 className="text-xl font-semibold my-4">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {error && (
            <div>
              <Alert severity="error">{error}</Alert>
            </div>
          )}
          <TextField
            id="outlined-basic"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            variant="filled"
          />
          <Button
            type="submit"
            variant="outlined"
            color="success"
            className="cursor-pointer"
          >
            Login
          </Button>
          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Don't have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
