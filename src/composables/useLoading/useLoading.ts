import { ref } from "vue";

export const useLoading = () => {
    const isLoading = ref(false);

    const toggleLoading = () => {
        isLoading.value = !isLoading.value;
    };
    return { isLoading, toggleLoading };
};
