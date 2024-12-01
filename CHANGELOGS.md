# Changelog

## Overview

This document outlines the changes made during the Vue Supabase Skills Test.

---

## Features

-   **Registration Page**  
    Added a registration page that allows users to create a new account and displays their full name and email on the dashboard upon login.

-   **Password Visibility Icon**  
    Added an icon to toggle password visibility for better UX during registration and login.

-   **Profile Creation**  
    Profiles are now created as part of the registration process.

-   **Forgot Password Functionality**  
    Implemented a forgot password flow but with dummy actions

---

## Code Improvements

-   **Separated Logic into Composables**  
    Separated the registration and login logic into reusable composables to improve maintainability and separation of concerns.

-   **Created Reusable Composables and Utils**

    -   `useLoading`: A composable for handling loading states across various components.
    -   `getErrorMessage`: A function for consistent error handling.
    -   `delay`: A function for adding delays in workflows (useful for debounce, animations, etc.).

-   **Use of Try-Catch for Registration and Login**  
    Wrapped registration and login processes in try-catch blocks to handle potential and unexpected errors gracefully.

-   **Use of VeeValidate + Zod for Validation**  
    Added `vee-validate` and `zod` for form validation to improve the user experience by catching errors early.

---

## Testing

-   **End-to-End (E2E) Tests**  
    Added E2E tests to cover the following workflows:

    -   Registration
    -   Login

    Note: Each E2E workflow test has custom fixtures

-   **Unit Tests**  
    Added unit tests to cover the following components and composables:
    -   Dashboard
    -   ExamplePage
    -   `useLoading` composable
    -   Auth layout

---

## UI/UX Improvements

-   Improved the user flow of login and registration by adding appropriate links to navigate between each
-   Added client-side form validation to catch errors early
-   Enhanced the password input with a visibility toggle to improve accessibility and usability.
-   Removed logo link that redirects to login page as it can disrupt user's registration
-   Made the error toast have error color so the users will immediately notice
-   Changed the description color text-gray-400 to text-gray-500 to be more readable
-   Changed the descriptions to be action oriented

## Conclusion

The changes made address the key goals outlined in the task, with improvements to both functionality and maintainability. Testing coverage has been added where appropriate to ensure the application is stable and works as expected.

## Time Spent

-   **Total Hours Spent**: ~8 hours  
    _Breakdown_:
    -   Registration Page: ~1 hour
    -   Profiles Creation combined with Supabase signup: ~45 minutes
    -   Password Visibility Icon: ~15 minutes
    -   Code Improvements and Reusables: ~2 hours
    -   Testing (E2E, Unit Tests): ~2 hours
    -   UI/UX Improvements: ~1 hours
    -   Miscellaneous (Debugging, Documentation, etc.): ~1 hours
