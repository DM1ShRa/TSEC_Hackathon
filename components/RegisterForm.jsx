"use client";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required!");
      return;
    }

    try {
      const resUserExist = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const { user } = await resUserExist.json();
      if (user) {
        setError("User Already Exists!");
        return;
      }
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User Reg Failed");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  console.log("Name", name);
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-400">
        <h1 className="text-xl font-semibold my-4">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {error && (
            <div>
              <Alert severity="error">{error}</Alert>
            </div>
          )}
          <TextField
            id="outlined-basic"
            type="text"
            onChange={(e) => setName(e.target.value)}
            label="Full Name"
            variant="outlined"
          />
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
            Register
          </Button>
          <Link className="text-sm mt-3 text-right" href={"/"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
