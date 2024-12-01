# Refactored Project Structure with Composables Folder

### Update Overview:  
- **Created `composables` Folder**: A dedicated folder was introduced to organize and house all custom hooks and composables in one place, ensuring a clear and scalable structure.  
- **Moved `useFormField`**: The `useFormField` composable was relocated from the `components` folder to the newly created `composables` folder.  

### Benefits:
- **Enhanced Scalability**: By separating composables from components, the structure becomes more modular and better suited for growth.  
- **Improved Readability**: Developers can quickly locate and understand reusable hooks and composables, reducing cognitive load.  
- **Cleaner Components Folder**: Components are now exclusively for UI-related files, while logic-based utilities are centralized in the `composables` folder.  
- **Reusable Logic**: Having `useFormField` in `composables` emphasizes its role as reusable logic that can be accessed across various components.

This change promotes a clean, maintainable, and professional project architecture, aligning with best practices in modern Vue development.
