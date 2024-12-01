import { profile, user } from "./state";
import type { Tables } from "@/types/database/database.types";
import type { User } from "@supabase/supabase-js";

export const getUser = (): User => user.value;

export const getProfile = (): Tables<"profiles"> => profile.value;
