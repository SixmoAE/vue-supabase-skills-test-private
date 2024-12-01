import { setProfile } from "./setters";
import { user } from "./state";
import supabase from "@/supabase";
import type { Tables } from "@/types/database/database.types";
import type { SignInWithPasswordCredentials, SignUpWithPasswordCredentials } from "@supabase/supabase-js";

export const signInWithPassword = async (payload: SignInWithPasswordCredentials) => {
    const { data, error } = await supabase.auth.signInWithPassword(payload);

    if (error) {
        throw error;
    }

    return { data };
};

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw error;
    }

    return { success: true };
};

export const signUp = async (payload: SignUpWithPasswordCredentials) => {
    const { data, error } = await supabase.auth.signUp(payload);

    if (error) {
        throw error;
    }

    return { data };
};

export const createProfile = async (payload: Tables<"profiles">): Promise<any> => {
    const { data, error } = await supabase.from("profiles").insert(payload);

    if (error) {
        throw error;
    }

    return { data };
};

export const fetchProfile = async (): Promise<void> => {
    if (!user.value.id) {
        throw new Error("fetchProfile(): Authenticated User ID not found.");
    }

    const { data } = await supabase.from("profiles").select().eq("id", user.value.id).single();

    if (!data) {
        throw new Error("fetchProfile(): User profile not found.");
    }

    setProfile(data);
};
