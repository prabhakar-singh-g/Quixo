# Quixo

![MIT License](https://img.shields.io/badge/License-MIT-green)
![Capacitor](https://img.shields.io/badge/Built_with-Capacitor-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen)

## 📱 About the Project

**Quixo** is a minimalist personal productivity app built with **Capacitor, HTML, CSS,** and **JavaScript**. It offers tools like **Quote, To-Do List, Memoir, Affirmations,** and **Habit Tracker**, helping users stay organized and motivated. Designed for **offline use** with **no permission requirements**, the project is **open-source** and licensed under **MIT**.


## 🌟 Features

### 1. **Manage Section Toggle (📖 Button)**  
   - The **📖** button controls the visibility of all **Manage** buttons.  
   - Clicking it reveals or hides the **Manage** button for each tool.  
   - The **Manage** button allows users to add, edit, or remove content in each section.

### 2. **Display System (Scrollable & Non-Scrollable)**  
   - **Quotes (Non-Scrollable):** Shows a random saved quote every time the app opens.  
   - **To-Do List (Scrollable):** Lists tasks with priority selection (High, Medium, Low).  
   - **Memoir (Scrollable):** Displays memoir titles. Clicking a title shows the full content in a pop-up.  
   - **Affirmations (Scrollable):** Scrollable list of personal affirmations.  
   - **Habit Tracker (Non-Scrollable):** Lists habits with daily progress checkboxes that reset automatically.

### 3. **Dynamic Footer Feedback System**  
   - The footer displays **"Developed by Prabhakar Singh"** by default.  
   - It updates dynamically based on user interactions.

### 4. **Light/Dark Mode Toggle (👁️ Button)**  
   - The **👁️** button lets users switch between **Light Mode** and **Dark Mode**.
     
### 5. **User-Friendly Design**  
   - **Minimalist Layout:** Manage buttons stay hidden until needed.  
   - **Clear Organization:** Separate sections for each tool.  
   - **Responsive Design:** Optimized for various screen sizes.
     

## 🚀 Getting Started

Follow these steps to set up and run the Quixo app on your device:

### **Prerequisites**  
- [Node.js](https://nodejs.org/) installed on your system.  
- [Android Studio](https://developer.android.com/studio) installed for building the APK. 

### **Steps to Run the App:**  

1. **Open Node.js Terminal**  
2. **Clone the Repository:**  
   ```bash
   git clone https://github.com/Prabhakar-Singh-G/Quixo.git
   cd Quixo
   ``` 
3. **Install Dependencies:**  
   ```bash
   npm install
   ```  
4. **Add Android Platform:**  
   ```bash
   npx cap add android
   ```  
5. **Sync the Project:**  
   ```bash
   npx cap sync
   ```  
6. **Open in Android Studio:**  
   ```bash
   npx cap open android
   ```  
7. **Build the APK:**  
   - Wait for Gradle to build and load files.  
   - Go to **Build > Build APK** in Android Studio to generate the APK.  

## 🔒 Security  

- **Offline Functionality:** The app works completely offline, so no internet connection is required.  
- **No Permissions Needed:** The app does not request any permissions, ensuring no data collection or privacy concerns. It's designed to respect user privacy.


## 🤝 Contributing  

Contributions are welcome! To contribute:  
1. **Fork the repository.**  
2. **Create a branch:** `git checkout -b feature/AmazingFeature`.  
3. **Commit your changes:** `git commit -m 'Add AmazingFeature'`.  
4. **Push to the branch:** `git push origin feature/AmazingFeature`.  
5. **Open a Pull Request.**  


## 📝 License  

Distributed under the **MIT License**. See `LICENSE` for details.


**<p align="center">Developed by Prabhakar Singh</p>**

