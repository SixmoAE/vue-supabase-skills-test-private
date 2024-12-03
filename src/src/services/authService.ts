import supabase from "@/supabase";
import type { SignUpCredentialsWithData } from "@/types/auth";
import type { SignInWithPasswordCredentials, User } from "@supabase/supabase-js";

export class AuthService {
    async signInWithPassword(credentials: SignInWithPasswordCredentials) {
        return await supabase.auth.signInWithPassword(credentials);
    }

    async signUp(credentials: SignUpCredentialsWithData) {
        const { data, error } = await supabase.auth.signUp({
            email: credentials.email,
            password: credentials.password,
            options: {
                data: {
                    first_name: credentials.options?.data?.first_name || null,
                    last_name: credentials.options?.data?.last_name || null,
                },
            },
        });

        if (!error && data.user) {
            await this.createProfile(data.user, credentials);
        }

        return { data, error };
    }

    private async createProfile(user: User, credentials: SignUpCredentialsWithData) {
        return await supabase.from("profiles").insert({
            email: user.email ?? "",
            id: user.id,
            first_name: credentials.options?.data?.first_name || null,
            last_name: credentials.options?.data?.last_name || null,
            updated_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
        });
    }
}

export const authService = new AuthService();
