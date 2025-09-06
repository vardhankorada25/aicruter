"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "@/services/superbaseClient";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
        router.replace("/auth");
        return;
      }
      if (!user) {
        router.replace("/auth");
      } else {
        router.replace("/dashboard");
      }
    }
    checkUser();
    // No dependencies except router
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      Checking authentication...
    </div>
  );
}
