import { createProfile, fetchProfile, signInWithPassword, signOut, signUp } from "./actions";
import { getProfile, getUser } from "./getters";
import { setUser } from "./setters";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => ({
    getProfile,
    getUser,
    setUser,
    fetchProfile,
    createProfile,
    signInWithPassword,
    signOut,
    signUp,
}));
