<div align="center"> 
# Litlas
Welcome to **Litlas**, a full-stack web application that encourages readers to explore world literature through an interactive map-based experience. Users can discover books from different countries, build a personalized reading list, and visually track their progress across the globe.

[Features](#features) · [Tech Stack](#tech-stack) · [Getting Started](#getting-started)


</div>

## Demo / Screenshot
**Demo video:** [Youtube Link](https://youtu.be/ERnae2dgKm4)

### Screenshot
<img width="1470" height="797" alt="Main Screenshot" src="https://github.com/user-attachments/assets/e0d91903-955c-49e8-8606-4fa4e59de454" />


## Features
* **Interactive World Map:** Click on any country to receive a book recommendation from that nation’s literary tradition. The map acts as both a discovery tool and a visual progress tracker.
* **Dynamic Recommendations:** Save the current recommendation to your reading list or click **Next** to generate another suggestion instantly.
* **Reading List Management:** Saved books are organized into **Read** and **To Be Read** sections. Users can update a book’s status or remove it from their list.
* **Progress Counters:** The sidebar displays counters for books saved, books read, and total countries explored.
* **Book-to-Map Synchronization:** Each saved book updates the map’s visual state. Countries are highlighted when added to the reading list and change color once marked as read.
* **Dynamic Literature Visualization:** The app provides a real-time global overview of the user’s literary journey, turning reading data into an interactive geographic experience.


## Tech Stack
**Frontend**
* React (UI)
* React-leaflet (interactive map rendering)
* Vite (dev server & build)
* CSS (layout and styling)

⠀**Backend**
* Node.js + Express (REST API)
* MongoDB + Mongoose (data persistence / ODM)
* Google Books API (external book data source)


## Getting Started
### Pre-requisites
This project currently runs **locally only**. To host it on your machine you’ll need:
* **Node.js** (LTS recommended)
* **MongoDB** (local instance)

### Installation
Clone the repository, then install dependencies for both client and server. 
```
git clone <REPO_URL>
cd litlas
```

Install client dependencies 
```
cd client
npm install
```

Install server dependencies
```
cd ../server
npm install
```

### Run Locally
You’ll need to run both the backend server and the frontend client.

1) **Start the backend**
From the project root, start the server:
```
cd server
npm run dev
```

2) **Start the frontend**
Open a new terminal, then from the project root:
```
cd client
npm run dev
```

**Local URLs**
* **Frontend**:  http://localhost:5173
* **Backend**:  http://localhost:3000


## Roadmap / Remaining Tasks
* **User Authentication:** Enable account creation and login (JWT) to store personal reading data.
* **Stats Dashboard:** Expand progress counters into an advanced dashboard with custom reading goals, author diversity, and genre distribution.
* **AI Recommendations:** Personalize book suggestions based on user preferences and reading history.
* **Discovery Mode:** Add a feature that suggests a recommendation from a random country.


## Project Context
Designed and developed independently during the Codeworks Fullstack Bootcamp.

## License
MIT 
