# 🏆 Week 2 — Make Your Scores Permanent

Last week you built a typing speed game. It works great — but try refreshing the page. Your scores are gone. Poof. 💨

This week, you're going to fix that. You'll connect your game to a **database** — a place on the internet that remembers your data forever. And not just for you — anyone who plays your game will appear on your leaderboard.

---

## 🧠 The Big Idea

Every time you load a webpage, the server sends you the files and then **forgets you exist**. This is called being **stateless** — the web has no memory.

That's why your scores disappear. Nobody saved them anywhere.

A **database** fixes this. It's like a shared spreadsheet on the internet — your app writes data to it, and the data stays there. Even if you close the browser, switch computers, or come back next week.

**Firebase** is the database we'll use. It has a superpower: **real-time sync**. When someone plays your game and gets a score, it appears on everyone else's screen instantly. No refresh needed.

---

## 🚀 Getting Started

### Step 1: Get your project ready

If you have your TypeRacer from Week 1, you'll build on top of it. If you're starting fresh, this template has a working game ready to go.

### Step 2: Think about your game

Before adding a database, your game needs a way to know **who** is playing. Think about it like an arcade machine — after you play, it asks for your name so it can put you on the high scores. If your game doesn't ask for a player name yet, that's a good first thing to add.

### Step 3: Open the Gemini chat

Look for the **✨ Gemini icon** on the right side of your screen. Tell it what you want to build — the leaderboard, the player name, saving scores. You're in charge.

### Step 4: Test it!

Play a round. Refresh the page. Are your scores still there? If yes — you just built your first database-connected app! 🎉

---

## 🔄 Make It Yours

Once scores are saving, it's time to level up. Here are some ideas:

- A leaderboard showing the top 10 scores, sorted by WPM
- Gold, silver, and bronze colors for the top 3
- A live counter showing how many total games have been played
- Your personal best score highlighted
- A class chat where players can leave messages
- The date and time next to each score
- A "Clear my scores" button
- Player-vs-player challenges — "I got 85 WPM, can you beat me?"

**The real test:** Share your game link with a classmate. When they play, their score should appear on YOUR leaderboard in real time. 🤯

---

## 🧠 What You're Learning

| Concept               | What it means                                        | Why it matters                        |
| --------------------- | ---------------------------------------------------- | ------------------------------------- |
| **HTTP is stateless** | The web forgets you after every page load            | This is why scores disappear          |
| **Database**          | A place on the internet that stores data permanently | Your scores survive forever           |
| **Firebase**          | A real-time database by Google                       | Updates appear instantly for everyone |
| **Read / Write**      | Saving data to and loading data from the database    | The two things every app does         |
| **Real-time sync**    | Data changes appear on all screens automatically     | The "wow" moment                      |

---

## 📁 Your Files

| File                 | What's inside                                               |
| -------------------- | ----------------------------------------------------------- |
| `index.html`         | The structure of your game                                  |
| `style.css`          | The visual design                                           |
| `main.js`            | The game logic + Firebase code                              |
| `firebase-config.js` | Connection details for the database (don't modify this one) |

---

## 💡 Tips

- **Refresh to test persistence.** The whole point is that data survives a refresh — so keep refreshing!
- **Share your game!** The real magic is when someone else plays and their score appears on your screen.
- **If something breaks**, check the browser console (F12) — it usually tells you what went wrong.
- **Ask Arjun or Sérgio** if you hit a Firebase error you can't fix — config issues are normal and quick to solve.

Have fun! 🏆
