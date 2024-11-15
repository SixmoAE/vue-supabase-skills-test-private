# Vue Supabase Skills Test

Welcome! As part of the application process we require our candidates to go through a small skills test. We are looking for your intuition as a developer and desire to produce not only good but great maintainable and testable code.

There are no specific instructions but you are given goals to accomplish. How you accomplish these goals is up to you and your expertise and preferences as a developer. You may change anything within this repository as long as the goals are completed as defined.

## Codebase Introduction
This repository contains Vue 3 and Supabase. You are expected to know how this is setup in your local machine and if you do not, you are expected to figure out how to set it up on your local machine.

In addition to that, components are taken directly from https://shadcn-vue.com with minimal to no changes from their initially installed version.

## Quick Start
1. Run the following commands:
    ```
    npm install
    npx supabase start
    npx supabase up
    npm run supabase:edge
    ```

2. Copy .env.example into .env and fill in the variables as necessary.

## Goals

### I. Create a registration page
The application already runs and you can login with the username `admin@admin.com` and the password `password`. However, there is currently no way to register a new account. Your first goal is to create a place for users to create a new account and reach the dashboard and have their full name and email displayed.

### II. Improve UI/UX
Given the experience you have as a developer, make adjustments to the user experience such as modifying the login and registration experience. There are no right or wrong solutions for this goal but we will be looking at you, as a developer, on what your recommendations are for improvement. Provide reasoning for every change in the form of a comment.

### III. Improve code quality
Given the experience you have as a developer, make adjustments to the code applying principles such as SOLID, DRY, and general TypeScript practices to improve the application overall. Provide reasoning for every improvement. Provide reasoning for every change in the form of a comment.

### IV. Advocate for Testing
The application has tests. However, they aren't production ready. Provide testing as you see fit. Please note we do not expect full coverage of testing, a few examples would be enough.

### IV. No Errors
1. There should be no lint errors when running `npm run lint`.
2. There should be no type errors when running `npm run type-check`.
3. There should be no type errors when running `npm run test`.

## Submission
Once you are done with the exam, bundle all of it in a .zip file and submit it to your contact person.
