/* eslint-disable indent */
import type { ToastProps } from ".";
import type { Component, VNode } from "vue";
import { computed, ref } from "vue";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

export type StringOrVNode = string | VNode | (() => VNode);

type ToasterToast = ToastProps & {
    id: string;
    title?: string;
    description?: StringOrVNode;
    action?: Component;
};

const actionTypes = {
    ADD_TOAST: "ADD_TOAST",
    UPDATE_TOAST: "UPDATE_TOAST",
    DISMISS_TOAST: "DISMISS_TOAST",
    REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
    count = (count + 1) % Number.MAX_VALUE;
    return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
    | {
          type: ActionType["ADD_TOAST"];
          toast: ToasterToast;
      }
    | {
          type: ActionType["UPDATE_TOAST"];
          toast: Partial<ToasterToast>;
      }
    | {
          type: ActionType["DISMISS_TOAST"];
          toastId?: ToasterToast["id"];
      }
    | {
          type: ActionType["REMOVE_TOAST"];
          toastId?: ToasterToast["id"];
      };

interface State {
    toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

function addToRemoveQueue(toastId: string) {
    if (toastTimeouts.has(toastId)) return;

    const timeout = setTimeout(() => {
        toastTimeouts.delete(toastId);
        dispatch({
            type: actionTypes.REMOVE_TOAST,
            toastId,
        });
    }, TOAST_REMOVE_DELAY);

    toastTimeouts.set(toastId, timeout);
}

const state = ref<State>({
    toasts: [],
});

function dispatch(action: Action) {
    switch (action.type) {
        case actionTypes.ADD_TOAST:
            state.value.toasts = [action.toast, ...state.value.toasts].slice(0, TOAST_LIMIT);
            break;

        case actionTypes.UPDATE_TOAST:
            state.value.toasts = state.value.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t));
            break;

        case actionTypes.DISMISS_TOAST: {
            const { toastId } = action;

            if (toastId) {
                addToRemoveQueue(toastId);
            } else {
                state.value.toasts.forEach((toast) => {
                    addToRemoveQueue(toast.id);
                });
            }

            state.value.toasts = state.value.toasts.map((t) =>
                t.id === toastId || toastId === undefined
                    ? {
                          ...t,
                          open: false,
                      }
                    : t,
            );
            break;
        }

        case actionTypes.REMOVE_TOAST:
            if (action.toastId === undefined) state.value.toasts = [];
            else state.value.toasts = state.value.toasts.filter((t) => t.id !== action.toastId);

            break;
    }
}

function useToast() {
    return {
        toasts: computed(() => state.value.toasts),
        toast,
        dismiss: (toastId?: string) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
    };
}

interface ToastOptions extends ToastProps {
    title?: string;
    description?: StringOrVNode;
    action?: Component;
    duration?: number;
}

function toast(opts: ToastOptions) {
    const id = genId();

    const update = (props: ToastOptions) => {
        dispatch({
            type: "UPDATE_TOAST",
            toast: { ...props, id },
        });
    };

    const dismiss = () => {
        dispatch({
            type: "DISMISS_TOAST",
            toastId: id,
        });
    };

    dispatch({
        type: "ADD_TOAST",
        toast: {
            ...opts,
            id,
            duration: opts.duration ?? 5000,
        },
    });

    return {
        id,
        dismiss,
        update,
    };
}

export { toast, useToast };
