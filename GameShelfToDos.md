# GameShelf App - ToDo List

This markdown file outlines the tasks and features that need to be implemented for the GameShelf App. These tasks will enhance the functionality and user experience of the application.

## 1. Game Search via IGDB Database
- [ ] **Objective:** Implement a feature that allows users to search for games using the IGDB database.
    - [ ] If a game is not found in the local database, search IGDB and provide the option to add it.
    - [ ] Integrate IGDB API to fetch game details.

## 2. Comment Section Functionality
- [ ] **Objective:** Get the comment section working properly.
    - [ ] Enable users to add, edit, and delete comments on game pages.
    - [ ] Implement proper validation and sanitization of comments.
    - [ ] Display comments in a user-friendly manner, including timestamps and user details.

## 3. Navbar Design for Authentication States
- [ ] **Objective:** Adjust the navbar to display different options depending on the user's authentication status.
    - [ ] **Authenticated Users:**
        - [ ] Show options like "Profile," "My Games," and "Logout."
    - [ ] **Unauthenticated Users:**
        - [ ] Show options like "Login" and "Register."
    - [ ] Ensure the design is responsive and visually appealing for both states.

## 4. User Profile Photo Customization
- [ ] **Objective:** Allow users to upload and manage their own profile photos.
    - [ ] Replace the randomly changing profile photo with a user-uploaded image.
    - [ ] Provide an interface for uploading, cropping, and saving profile photos.
    - [ ] Ensure the photos are stored securely and served efficiently.

## 5. Game Status Tracking
- [ ] **Objective:** Enable users to categorize their games with various statuses.
    - [ ] Allow users to mark games as "Want," "Completed," "Playing," "Plan to Play," or "Shelved."
    - [ ] Implement a user-friendly interface for selecting and viewing these statuses.
    - [ ] Ensure that each status is reflected accurately in the user's game library.

## 6. Pivot Tables for Relationships
- [ ] **Objective:** Create pivot tables to manage many-to-many relationships between entities.
    - [ ] **Genres and Games:**
        - [ ] Implement a pivot table to link games with their respective genres.
        - [ ] Ensure the ability to assign multiple genres to a game.
    - [ ] **Platforms and Games:**
        - [ ] Implement a pivot table to link games with the platforms they are available on.
        - [ ] Allow multiple platforms to be associated with a game.
    - [ ] **Genres and Platforms:**
        - [ ] Implement a pivot table to manage the relationship between genres and platforms, if necessary.

## 7. Miscellaneous Enhancements
- [ ] **Objective:** Review and improve any additional aspects of the application.
    - [ ] Refine the user interface and user experience (UI/UX) across the app.
    - [ ] Optimize performance and ensure the app is mobile-friendly.
    - [ ] Conduct thorough testing to catch and fix bugs.

---

**Note:** This ToDo list is meant to guide the development process for the GameShelf App. Prioritize tasks based on user needs and project timelines. Regularly update the list to reflect progress and new requirements.
