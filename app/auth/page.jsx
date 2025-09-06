"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { supabase } from "@/services/superbaseClient";

function Login() {
  const signInWithGoogle = async () => {
    try {
      // Sign in with Google OAuth
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) {
        console.error("Error signing in with Google:", error.message);
        return;
      }

      // Get the authenticated user data
      const { user } = data;
      if (user) {
        // Insert or update user data in the `users` table
        const { error: upsertError } = await supabase
          .from("users")
          .upsert(
            {
              email: user.email,
              name: user.user_metadata?.full_name || user.user_metadata?.name,
              google_id: user.id, // Google user ID
            },
            { onConflict: ["email"] } // Update if email already exists
          );

        if (upsertError) {
          console.error("Error saving user to database:", upsertError.message);
        } else {
          console.log("User saved successfully:", user.email);
        }
      }
    } catch (error) {
      console.error("Unexpected error during sign-in:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center border rounded-3xl w-[450px]">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={400}
          height={100}
          className="w-[180px]"
        />
        <div className="flex items-center flex-col">
          <Image
            src={"/login.png"}
            alt="login"
            width={600}
            height={4000}
            className="w-[400px] h-[250px] rounded-3xl"
          />
          <h2 className="text-2xl font-bold text-center mt-5">
            Welcome to AiCruter
          </h2>
          <p className="text-gray-500 text-center">
            Sign-in with Google Authentication
          </p>
          <Button className="mt-7 mb-7 w-full" onClick={signInWithGoogle}>
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;