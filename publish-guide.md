# 🌐 Publish Your Game to the Internet

Right now your game only lives inside Firebase Studio. You can play it, but nobody else can. Let's fix that.

By the end of this guide, your game will have its own URL that you can share with anyone — friends, family, the whole world.

We'll use two things:
- **GitHub** — a place on the internet where developers store their code
- **GitHub Pages** — a free feature that turns your code into a live website

---

## Part 1: Create a GitHub Account

If you already have a GitHub account, skip to Part 2.

1. Go to [github.com](https://github.com)
2. Click **Sign up**
3. Use your email, choose a username, and set a password
4. Verify your account and sign in

That's it — you now have a place to store all your future projects.

---

## Part 2: Create a Repository

A **repository** (or "repo") is like a folder on GitHub that holds your project.

1. On GitHub, click the **+** button in the top-right corner
2. Click **New repository**
3. Give it a name — something like `typeracer` or `my-typing-game`
4. Make sure **Public** is selected (this is required for GitHub Pages)
5. Do NOT check "Add a README file" — your project already has one
6. Click **Create repository**

You'll see a page with setup instructions. Keep this page open — you'll need the URL in the next step.

---

## Part 3: Push Your Code to GitHub

Now we need to send your code from Firebase Studio to GitHub.

Open the Gemini chat and tell it you want to push your code to GitHub. Give it the URL of the repository you just created (it looks like `https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git` — you can copy it from the page you kept open).

Gemini will handle the terminal commands for you.

**If it asks for your username and password:** GitHub no longer accepts passwords in the terminal. Ask Arjun or Sérgio to help you set up authentication — it takes 2 minutes.

After the push, refresh your GitHub repo page. You should see all your files there.

---

## Part 4: Turn On GitHub Pages

This is the step that makes your code into a live website.

1. On your repo page on GitHub, click **Settings** (the tab at the top, not the gear icon)
2. In the left sidebar, click **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Under **Branch**, select **main** and **/ (root)**
5. Click **Save**

Wait 1-2 minutes. GitHub is building your site.

---

## Part 5: Visit Your Site

Your game is now live at:

```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

Bookmark it. Share it. Send it to your friends. This is YOUR game, live on the internet. 🎉

---

## Updating Your Game Later

Every time you make changes and want to update the live version, just tell Gemini to push your code to GitHub again. GitHub Pages will automatically update within a minute or two.

---

## Troubleshooting

**"The page shows a 404"**
- Check that you selected the right branch (`main`) and folder (`/ root`) in GitHub Pages settings
- Make sure your file is called `index.html` (not `Index.html` or `home.html`)
- Wait a few minutes — it can take a bit the first time

**"Gemini says authentication failed"**
- You need a Personal Access Token instead of your password. Ask Arjun or Sérgio for help.

**"I see my files on GitHub but the site doesn't work"**
- Go to Settings → Pages and check that the source is set correctly
- Make sure the repo is **Public**, not Private

**"My Firebase data doesn't work on the live site"**
- It should work! Firebase doesn't care where your site is hosted. If it doesn't, check the browser console (F12) for errors.
