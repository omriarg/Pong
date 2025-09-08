# React Pong Game

A classic Pong clone built with React and JavaScript, featuring responsive UI and modular, component-based architecture.

## 🚀 Features
- Two-player Pong gameplay
- Responsive canvas rendering
- Clean, modular React components
- Score tracking and reset functionality

## 📂 Project Structure
/
├── requirements.txt  
├── code  
│   ├── backend  
│   │   └── pongGame  
│   └── frontend  
│       └── Pong  
│           ├── package.json  
│           ├── public  
│           └── src  
│               ├── components  
│               ├── App.js  
│               └── index.js  
└── README.md

## 🛠️ Prerequisites
- Node.js 14+ / npm 6+

## ⚙️ Installation & Setup

1. Clone the repository  
   git clone <your-repo-url>.git  
   cd <repo-root>

2. Install and run the React app locally  
   cd code\frontend\Pong  
   npm install  
   npm run dev

   The game will be available at http://localhost:PORT/, PORT will be specified in console upon server load


## 🎯 Usage
1. Open your browser to http://localhost:PORT/
2. press Start Game
3. press the Screen to start
4. First player to reach the score limit wins

## 🔧 Customization
- Adjust speed & dimensions: Modify constants in src/components/Ball.js and Paddle.js
- Styling: Edit CSS in src/index.css for custom themes

## 📄 License
This project is licensed under the MIT License. See LICENSE for details.

> Built with ❤️ by [Omri Argaman]
