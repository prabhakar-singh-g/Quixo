// Initialization
const lightDarkToggle = document.getElementById('lightDarkToggle');
const body = document.body;

const settingsToggle = document.getElementById('settingsToggle');
const manageButtons = document.querySelectorAll('.manage-button');

// Arrays for storing data
let quotes = JSON.parse(localStorage.getItem("quotes")) || [];
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let selectedPriority = 'important'; 
let memoirData = JSON.parse(localStorage.getItem('memoirs')) || [];
let affirmations = JSON.parse(localStorage.getItem("affirmations")) || [];
let habits = []; 

// Event Listeners for theme toggle (Light/Dark Mode)
lightDarkToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode'); 
});

// Event Listeners for settings toggle (Show/Hide Manage Buttons)
settingsToggle.addEventListener('click', () => {
    manageButtons.forEach(button => {
        button.style.display = button.style.display === 'none' ? 'inline-block' : 'none';
    });
});

// Manage section toggle
function toggleManageSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.style.display = section.style.display === 'none' || section.style.display === '' ? 'block' : 'none';
}

document.querySelectorAll('.manage-section').forEach(section => {
    section.style.display = 'none';
});

// Feedback message display
function showFeedbackMessage(message) {
    const footerFeedback = document.getElementById('footerFeedback');
    const originalText = footerFeedback.innerHTML;
    footerFeedback.innerHTML = message; 
    setTimeout(() => {
        footerFeedback.innerHTML = originalText;
    }, 3000); 
}

// Combine window.onload for all features
window.onload = function () {
  // Load Quotes 
   if (quotes.length > 0) {
    displayRandomQuote();
    updateQuoteSelect();
} else {
    displayRandomQuote();
}

    // Load To-Do List
    if (todos.length > 0) {
    displayTodos();
    updateRemoveSelect();
} else {
    displayTodos();
}

    // Load Memoirs 
    if (localStorage.getItem("memoirs")) {
        memoirData = JSON.parse(localStorage.getItem("memoirs"));
        displayMemoirs();
        populateMemoirSelect();
    }

    // Load Affirmation 
   if (affirmations.length > 0) {
    displayAffirmations();
    updateAffirmationSelect();
} else {
    displayAffirmations(); 
}

    // Load Habits
    if (localStorage.getItem("habits")) {
        habits = JSON.parse(localStorage.getItem("habits"));
        displayHabits();
        updateHabitSelect();
    }
    checkAndResetHabitsForNewDay();
}

// Quotes functionality
function addQuote() {
    const quoteInput = document.getElementById("quoteInput").value.trim();
    if (quoteInput) {
        quotes.push(quoteInput);
        localStorage.setItem("quotes", JSON.stringify(quotes));
        displayRandomQuote();
        updateQuoteSelect();
        document.getElementById("quoteInput").value = ''; // Clear input
        showFeedbackMessage("Quote added successfully!");
    } else {
        alert("Please enter a quote!");
    }
}

// Display Random Quote Function
function displayRandomQuote() {
    const quoteBox = document.getElementById("quoteBox");
    quoteBox.innerHTML = ''; 

    if (quotes.length === 0) {
        quoteBox.innerHTML = `<p>Add your first quote!</p>`;
    } else {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteBox.innerHTML = `<p>${quotes[randomIndex].replace(/\n/g, '<br>')}</p>`;
    }
}

function updateQuoteSelect() {
    const quoteSelect = document.getElementById("quoteSelect");
    quoteSelect.innerHTML = `<option>Select your quote here...</option>`;
    quotes.forEach((quote, index) => {
        const firstLine = quote.split("\n")[0];
        const option = document.createElement("option");
        option.value = index;
        option.textContent = firstLine;
        quoteSelect.appendChild(option);
    });
}

function removeQuote() {
    const quoteSelect = document.getElementById("quoteSelect");
    const selectedIndex = quoteSelect.value;
    if (selectedIndex !== "Select your quote here..." && selectedIndex !== "") {
        quotes.splice(selectedIndex, 1);
        localStorage.setItem("quotes", JSON.stringify(quotes));
        displayRandomQuote();
        updateQuoteSelect();
        showFeedbackMessage("Quote removed successfully!");
    } else {
        alert("Please select a quote to remove!");
    }
}

// To-Do list functionality
function addTodo() {
    const todoInput = document.getElementById('todoInput').value.trim();
    if (!todoInput) {
        alert('Please enter a task!');
        return;
    }

    // Assign priority symbol
    let prioritySymbol = selectedPriority === 'mostImportant' ? '🔴' :
                         selectedPriority === 'important' ? '🟡' : '🟢';

    // Add task with priority symbol to the array
    const taskWithPriority = `${prioritySymbol} ${todoInput}`;
    todos.push(taskWithPriority);

    // Save to localStorage
    localStorage.setItem("todos", JSON.stringify(todos));

    // Display tasks and update the remove dropdown
    displayTodos();
    updateRemoveSelect();
    document.getElementById('todoInput').value = "";
    showFeedbackMessage("Task added successfully!");
}

// Display To-Do List Function
function displayTodos() {
    const todoList = document.querySelector('.todolist');
    todoList.innerHTML = ''; 
    if (todos.length === 0) {
        todoList.innerHTML = `<p>Add your first task!</p>`;
    } else {
        todos.forEach(task => {
            const ul = document.createElement('ul');
            ul.textContent = task;
            todoList.appendChild(ul);
        });
    }
}

function removeTodo() {
    const selectedTaskText = document.getElementById('todoSelect').value;

    if (!selectedTaskText) {
        alert('Please select a task to remove!');
        return;
    }

    // Match and remove task with selected priority
    todos = todos.filter(task => {
        const taskText = task.slice(2).trim(); 
        return taskText !== selectedTaskText; 
    });

    localStorage.setItem("todos", JSON.stringify(todos));

    // Update display and remove dropdown
    displayTodos();
    updateRemoveSelect();
    showFeedbackMessage("Task removed successfully!");
}

function updateRemoveSelect() {
    const removeSelect = document.getElementById('todoSelect');
    removeSelect.innerHTML = '<option value="">Select your task here...</option>';

    todos.forEach(task => {
        if ((selectedPriority === 'mostImportant' && task.startsWith('🔴')) ||
            (selectedPriority === 'important' && task.startsWith('🟡')) ||
            (selectedPriority === 'lessImportant' && task.startsWith('🟢'))) {
            
            const taskText = task.slice(2).trim();

            const option = document.createElement('option');
            option.textContent = taskText;
            removeSelect.appendChild(option);
        }
    });
}

function setPriority(priority) {
    selectedPriority = priority;

    // Remove previous selection highlight
    document.querySelectorAll('.priority-btn').forEach(btn => btn.classList.remove('selected'));
    document.getElementById(priority + 'Btn').classList.add('selected');

    // Update the remove select box
    updateRemoveSelect();
}

 // Memoir functionality
function displayMemoirs() {
    const memoirList = document.getElementById('memoirBox').querySelector('ul');
    memoirList.innerHTML = '';

    if (memoirData.length === 0) {
        const noMemoirMessage = document.createElement('ul');
        noMemoirMessage.textContent = 'ㅤAdd your first memoir!';
        memoirList.appendChild(noMemoirMessage);
    } else {
        memoirData.forEach((memoir, index) => {
            const card = document.createElement('div');
            card.classList.add('memoir-card');
            card.innerHTML = `<p>${memoir.title}</p>`;
            card.onclick = () => openMemoirPopup(index); 
            memoirList.appendChild(card);
        });
    }

    populateMemoirSelect(); 
}

// Function to open the popup showing memoir content
function openMemoirPopup(index) {
    const memoir = memoirData[index];
    if (memoir) {
        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.innerHTML = `
            <div class="popup-content">
                <h2>${memoir.title}</h2>
                <p>${memoir.content}</p>
                <button onclick="closeMemoirPopup()">Close</button>
            </div>
        `;
        document.body.appendChild(popup);
    }
}

// Function to close the popup
function closeMemoirPopup() {
    const popup = document.querySelector('.popup');
    if (popup) {
        popup.remove();
    }
}

// Function to add a new memoir
function addMemoir() {
    const title = document.getElementById('memoirTitle').value;
    const content = document.getElementById('memoirContent').value;

    if (title && content) {
        memoirData.push({ title, content });
        localStorage.setItem('memoirs', JSON.stringify(memoirData));
        displayMemoirs();  // Refresh the list
        document.getElementById('memoirTitle').value = '';
        document.getElementById('memoirContent').value = '';
    } else {
        alert('Please enter both title and content.');
    }
}

// Call the display function when the page loads
displayMemoirs();

// Function to populate the select options for editing and removing
function populateMemoirSelect() {
  const memoirSelect = document.getElementById('memoirSelect');
  const memoirRemoveSelect = document.getElementById('memoirRemoveSelect');

  // Clear existing options
  memoirSelect.innerHTML = '<option value="">Select Memoir Title</option>';
  memoirRemoveSelect.innerHTML = '<option value="">Select Memoir Title to Remove</option>';

  // Add memoir titles as options
  memoirData.forEach((memoir, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = memoir.title;
    memoirSelect.appendChild(option);
    memoirRemoveSelect.appendChild(option.cloneNode(true));
  });
}

// Function to handle manage action selection
function handleManageChange() {
  const manageSelect = document.getElementById('manageSelect').value;

  // Show appropriate sections based on selected action
  document.getElementById('addSection').style.display = manageSelect === 'add' ? 'block' : 'none';
  document.getElementById('editSection').style.display = manageSelect === 'edit' ? 'block' : 'none';
  document.getElementById('removeSection').style.display = manageSelect === 'remove' ? 'block' : 'none';
}

function addMemoir() {
  const title = document.getElementById('memoirTitle').value;
  const content = document.getElementById('memoirContent').value;

  if (title && content) {
    const newMemoir = { title, content };
    memoirData.push(newMemoir);
    localStorage.setItem('memoirs', JSON.stringify(memoirData)); 
    displayMemoirs(); 
    clearAddMemoirFields();
    showFeedbackMessage('Memoir added successfully!'); 
  } else {
    alert('Please fill in both title and content.');
  }
}
// Function to clear the Add 
function clearAddMemoirFields() {
  document.getElementById('memoirTitle').value = '';
  document.getElementById('memoirContent').value = '';
}

// Function to load the selected memoir for editing
function loadMemoirForEdit() {
  const index = document.getElementById('memoirSelect').value;
  const memoir = memoirData[index];

  if (memoir) {
    document.getElementById('memoirEditContent').value = memoir.content;
  }
}

function saveMemoirEdit() {
  const index = document.getElementById('memoirSelect').value;
  const newContent = document.getElementById('memoirEditContent').value;

  if (index !== '' && newContent) {
    memoirData[index].content = newContent;
    localStorage.setItem('memoirs', JSON.stringify(memoirData)); // Save to localStorage
    displayMemoirs(); // Refresh memoir list
    document.getElementById('memoirEditContent').value = ''; // Clear edit field
    showFeedbackMessage('Memoir edited successfully!'); // Feedback message
  } else {
    alert('Please select a memoir and provide content to save.');
  }
}

function removeMemoir() {
  const index = document.getElementById('memoirRemoveSelect').value;

  if (index !== '') {
    memoirData.splice(index, 1); 
    localStorage.setItem('memoirs', JSON.stringify(memoirData)); 
    displayMemoirs(); 
    showFeedbackMessage('Memoir removed successfully!'); 
  } else {
    alert('Please select a memoir to remove.');
  }
}

// Initialize the memoir app and display existing memoirs
displayMemoirs();   

 // Affirmations functionality
function addAffirmation() {
    const affirmationInput = document.getElementById("affirmationInput").value.trim();
    if (affirmationInput) {
        // Add 💫 symbol to the affirmation
        const affirmationWithSymbol = `💫 ${affirmationInput}`;
        affirmations.push(affirmationWithSymbol);
        localStorage.setItem("affirmations", JSON.stringify(affirmations));
        displayAffirmations();
        updateAffirmationSelect();
        document.getElementById("affirmationInput").value = ''; 
        showFeedbackMessage("Affirmation added successfully!");
    } else {
        alert("Please enter an affirmation!"); 
    }
}

// Display Affirmations Function
function displayAffirmations() {
    const affirmationBox = document.getElementById("affirmationsBox");
    affirmationBox.innerHTML = ''; 
    if (affirmations.length === 0) {
        affirmationBox.innerHTML = `<p>Add your first affirmation!</p>`;
    } else {
        affirmations.forEach(affirmation => {
            const ul = document.createElement('ul');
            ul.textContent = affirmation;
            affirmationBox.appendChild(ul);
        });
    }
}

// Update Select Dropdown for Affirmations
function updateAffirmationSelect() {
    const affirmationSelect = document.getElementById("affirmationSelect");
    affirmationSelect.innerHTML = `<option>Select your affirmation here...</option>`;
    affirmations.forEach((affirmation, index) => {
        const firstLine = affirmation.replace(/^💫\s*/, '');
        const option = document.createElement("option");
        option.value = index;
        option.textContent = firstLine;
        affirmationSelect.appendChild(option);
    });
}

// Remove Selected Affirmation Function
function removeAffirmation() {
    const affirmationSelect = document.getElementById("affirmationSelect");
    const selectedIndex = affirmationSelect.value;
    if (selectedIndex !== "Select your affirmation here..." && selectedIndex !== "") {
        affirmations.splice(selectedIndex, 1);
        localStorage.setItem("affirmations", JSON.stringify(affirmations));
        displayAffirmations();
        updateAffirmationSelect();
        showFeedbackMessage("Affirmation removed successfully!");
    } else {
        alert("Please select an affirmation to remove!");
    }
}


// Array functionality
function addHabit() {
    const habitInput = document.getElementById('habitInput').value.trim();
    if (!habitInput) {
        alert('Please enter a habit!');
        return;
    }

    // Add habit to the array
    habits.push({ habit: habitInput, completed: false });

    // Save to localStorage
    localStorage.setItem("habits", JSON.stringify(habits));

    // Display habits and update the remove dropdown
    displayHabits();
    updateHabitSelect();
    document.getElementById('habitInput').value = "";
    showFeedbackMessage("Habit added successfully!");
}

// Display Habits Function (With Checkbox)
function displayHabits() {
    const habitList = document.querySelector('.habit-list');
    habitList.innerHTML = ''; 

    if (habits.length === 0) {
        habitList.innerHTML = `<p>Add your first habit!</p>`;
    } else {
        habits.forEach((habit, index) => {
            const ul = document.createElement('ul');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = habit.completed;
            checkbox.id = `habitCheckbox${index}`;
            checkbox.addEventListener('change', () => toggleHabitCompletion(index));

            ul.appendChild(checkbox);
            ul.appendChild(document.createTextNode(habit.habit));

            habitList.appendChild(ul);
        });
    }
}

// Toggle Habit Completion (Checkbox)
function toggleHabitCompletion(index) {
    habits[index].completed = !habits[index].completed;
    localStorage.setItem("habits", JSON.stringify(habits));
    displayHabits();
}

// Remove Habit Function
function removeHabit() {
    const selectedHabitText = document.getElementById('habitSelect').value;

    if (!selectedHabitText) {
        alert('Please select a habit to remove!');
        return;
    }

    // Remove selected habit from the list
    habits = habits.filter(habit => habit.habit !== selectedHabitText);

    // Save updated habits to localStorage
    localStorage.setItem("habits", JSON.stringify(habits));

    // Update display and remove dropdown
    displayHabits();
    updateHabitSelect();
    showFeedbackMessage("Habit removed successfully!");
}

// Update Habit Select Box (For Removal)
function updateHabitSelect() {
    const habitSelect = document.getElementById('habitSelect');
    habitSelect.innerHTML = '<option value="">Select your habit here...</option>';

    habits.forEach(habit => {
        const option = document.createElement('option');
        option.textContent = habit.habit;
        habitSelect.appendChild(option);
    });
}

// Function to check if it's a new day and reset all habits
function checkAndResetHabitsForNewDay() {
    const lastResetDate = localStorage.getItem("lastResetDate");
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    // If the date is different, reset habits
    if (lastResetDate !== currentDate) {
        resetAllHabits();
        localStorage.setItem("lastResetDate", currentDate); // Update the last reset date
    }
}

// Function to reset all habits (uncheck the checkboxes)
function resetAllHabits() {
    habits.forEach(habit => {
        habit.completed = false; // Uncheck all habits
    });
    localStorage.setItem("habits", JSON.stringify(habits));
    displayHabits();
}