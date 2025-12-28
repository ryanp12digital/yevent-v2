import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createSuperAdmin() {
    const email = "ryansantiago@p12digital.com.br";
    const password = "SuperAdmin@2024!";

    console.log("Attempting to sign up super admin...");
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: "Ryan Santiago",
            }
        }
    });

    if (signUpError) {
        console.error("SignUp Error:", signUpError.message);

        // Try to sign in if user exists
        if (signUpError.message.includes("already registered")) {
            console.log("User already exists. Please sign in manually.");
        }
        return;
    }

    if (signUpData.user) {
        console.log("Super admin created successfully!");
        console.log("USER_ID:", signUpData.user.id);
        console.log("EMAIL:", email);
        console.log("PASSWORD:", password);
        console.log("\nIMPORTANT: After confirming email, insert into public.users table via Supabase MCP.");
    } else {
        console.log("No user returned from signUp (email confirmation may be required).");
    }
}

createSuperAdmin();
