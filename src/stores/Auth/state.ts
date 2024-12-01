import type { Tables } from "@/types/database/database.types";
import { ref } from "vue";

export const user = ref<any>({
    app_metadata: {
        provider: "",
        providers: [],
    },
    aud: "",
    confirmed_at: "",
    created_at: "",
    email: "",
    email_confirmed_at: "",
    id: "",
    identities: [],
    is_anonymous: false,
    last_sign_in_at: null,
    phone: "",
    role: "",
    updated_at: "",
    user_metadata: [],
});

export const profile = ref<Tables<"profiles">>({
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    created_at: "",
    deleted_at: "",
    updated_at: "",
});
