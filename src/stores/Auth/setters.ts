import { profile, user } from "./state";
import type { Tables } from "@/types/database/database.types";
import type { User } from "@supabase/supabase-js";

export const setUser = (payload: User) => {
    user.value = {
        ...user.value,
        ...payload,
    };
};

export const setProfile = (payload: Tables<"profiles">) => {
    profile.value = {
        ...profile.value,
        ...payload,
    };
};
