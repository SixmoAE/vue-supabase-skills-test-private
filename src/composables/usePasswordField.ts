import { Eye, EyeOff } from "lucide-vue-next";

import { computed, type Ref, ref } from "vue";

export enum InputType {
    TEXT = "text",
    PASSWORD = "password",
}

export function usePasswordField() {
    const show: Ref<boolean> = ref(false);

    const toggleShow = (): boolean => (show.value = !show.value);

    return {
        icon: computed<any>(() => (show.value ? Eye : EyeOff)),
        type: computed<string>(() => (show.value ? InputType.TEXT : InputType.PASSWORD)),
        toggleShow,
    };
}
