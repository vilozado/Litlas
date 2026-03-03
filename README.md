
# Litlas
Welcome to **Litlas**, a full-stack web application that encourages readers to explore world literature through an interactive map-based experience. Users can discover books from different countries, build a personalized reading list, and visually track their progress across the globe.

# Demo / Screenshot
**Demo video:**

## Screenshot
<img width="1470" height="797" alt="Litlas Screenshot" src="https://github.com/user-attachments/assets/a77915bd-71ac-4127-b122-1e6cca1ed815" />

# Features
* **Interactive World Map:** Click on any country to receive a book recommendation from that nation’s literary tradition. The map acts as both a discovery tool and a visual progress tracker.
* **Dynamic Recommendations:** Save the current recommendation to your reading list or click **Next** to generate another suggestion instantly.
* **Reading List Management:** Saved books are organized into **Read** and **To Be Read** sections. Users can update a book’s status or remove it from their list.
* **Progress Counters:** The sidebar displays counters for books saved, books read, and total countries explored.
* **Book-to-Map Synchronization:** Each saved book updates the map’s visual state. Countries change color when added to the reading list and  once marked as read.
* **Dynamic Literature Visualization:** The app provides a global overview of the user’s literary journey, turning reading data into an interactive geographic experience.

# Tech Stack
FrontEnd

* React (UI)
* React-leaflet (interactive map rendering)
* Vite (dev server & build)
* CSS (UI animations and visual feedback)

⠀Backend
* Node.js + Express (REST API)
* MongoDB + Mongoose (data persistence / ORM)
* Google Books API (external book data source)

# Roadmap / Remaining Tasks
* **User profile:** Enable account creation and login (JWT-Authentication) to store personal reading data.
* **Stats Dashboard:** Expand progress counters into a dashboard with custom reading goals, author diversity, and genre distribution.
* **AI Recommendations:** Personalize book suggestions based on user preferences and reading history.
* **Discovery Mode:** Add a feature that suggests a recommendation from a random country.

# Project Context
Designed and developed independently during the Codeworks Fullstack Bootcamp.

# License
MIT 
