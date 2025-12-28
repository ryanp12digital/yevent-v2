import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createAdmin() {
    const email = "fernando@faculdadeide.edu.br";
    const password = "Vw[V3<m\\aC-9*8qB"; // escape backslash if needed, but in JS string literal it needs care. 
    // "Vw[V3<m\\aC-9*8qB" -> actually the user provided password is "Vw[V3<m\aC-9*8qB". In JS string: "Vw[V3<m\\aC-9*8qB"

    // Check if checks exist first? 
    // actually signIn first to see if exists?

    console.log("Attempting to sign up...");

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: "Admin Fernando",
            }
        }
    });

    if (signUpError) {
        console.error("SignUp Error:", signUpError.message);
        // If already registered, try sign in to get ID
        if (signUpError.message.includes("already registered") || signUpError.message.includes("User already registered")) {
            console.log("User already exists, signing in to get ID...");
            const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (signInError) {
                console.error("SignIn Error:", signInError.message);
                return;
            }

            if (signInData.user) {
                console.log("USER_ID:", signInData.user.id);
            }
        }
        return;
    }

    if (signUpData.user) {
        console.log("USER_ID:", signUpData.user.id);
    } else {
        console.log("No user returned from signUp (maybe email confirmation required?)");
    }
}

createAdmin();
