/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
import colors from "tailwindcss/colors";
import animate from "tailwindcss-animate";

export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                primary: colors.blue,
                "primary-foreground": "#FFFFFF",
                accent: "#f1f4f8",
                muted: "#6B7280",
                "muted-foreground": "#81868b",
                success: colors.green,
                danger: colors.red,
                ring: "#6366F1",
                background: "#F9FAFB",
                gray: colors.slate,
            },

            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
            },

            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },

            typography: (theme) => ({
                xs: {
                    css: {
                        fontSize: theme("fontSize.xs"), // Adjust as needed
                        lineHeight: theme("lineHeight.tight"),
                    },
                },
            }),
        },
    },
    plugins: [animate, typography],
};
