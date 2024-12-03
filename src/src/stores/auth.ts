import supabase from "@/supabase";
import type { SignInWithPasswordCredentials, User } from "@supabase/supabase-js";
import { defineStore } from "pinia";
import { ref } from "vue";

export interface UserProfile {
    first_name: string | null;
    last_name: string | null;
    email: string;
    id: string;
    created_at: string;
    updated_at: string | null;
    deleted_at: string | null;
}

export interface SignUpData {
    first_name: string;
    last_name: string;
}

interface SignUpCredentialsWithData {
    email: string;
    password: string;
    options?: {
        data?: {
            first_name?: string;
            last_name?: string;
        };
    };
}

export const useAuthStore = defineStore("auth", () => {
    const user = ref<User | null>(null);
    const profile = ref<UserProfile | null>(null);

    const setUser = (newUser: User | null) => {
        user.value = newUser;
    };

    const setProfile = (newProfile: UserProfile | null) => {
        profile.value = newProfile;
    };

    const getUser = (): User | null => {
        return user.value;
    };

    const getProfile = (): UserProfile | null => {
        return profile.value;
    };

    const signInWithPassword = async (payload: SignInWithPasswordCredentials) => {
        const { data, error } = await supabase.auth.signInWithPassword(payload);
        return { data, error };
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        return error;
    };

    const signUp = async (credentials: SignUpCredentialsWithData) => {
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
            // Create profile with proper typing
            const { error: profileError } = await supabase.from("profiles").insert({
                email: data.user.email ?? "", // ensure email is never undefined
                id: data.user.id, // id is required for the relation
                first_name: credentials.options?.data?.first_name || null,
                last_name: credentials.options?.data?.last_name || null,
                updated_at: new Date().toISOString(),
                created_at: new Date().toISOString(),
            });

            if (profileError) {
                return { error: profileError };
            }
        }

        return { data, error };
    };

    const fetchProfile = async (): Promise<void> => {
        const userId = user.value?.id;
        if (!userId) {
            console.error("fetchProfile(): Authenticated User ID not found.");
            return;
        }

        const { data: userProfile } = await supabase.from("profiles").select().eq("id", userId).single();

        if (userProfile) {
            setProfile(userProfile);
        } else {
            console.error("fetchProfile(): User profile not found.");
        }
    };

    const signInWithGoogle = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        return { data, error };
    };

    const resetPassword = async (email: string) => {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/reset-password`,
        });
        return { data, error };
    };

    return {
        // Setters
        setUser,

        // Getters
        getProfile,
        getUser,

        // Actions
        fetchProfile,
        signInWithPassword,
        signOut,
        signUp,
        signInWithGoogle,
        resetPassword,
    };
});
