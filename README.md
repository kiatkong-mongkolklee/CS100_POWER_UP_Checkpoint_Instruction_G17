# Personal Learning Portfolio

A small web app for keeping track of what you've done and what you learned from it. Everything is saved in the user's own browser `localStorage`, so there's no sign-up and no backend server or database.

This document covers two things: **(1)** how to open the project, and **(2)** a detailed test plan — so that someone outside the team, or a grader, can follow it, open the page, and actually try out the system without asking the team anything extra (Issue #6).

## Requirements

- Any modern web browser: Chrome, Edge, Firefox, or Safari
- Internet connection **only the first time you open it**, since the page loads Bootstrap CSS/JS from a CDN (`cdn.jsdelivr.net`). After that, the browser caches it.
- No need to install Node.js, a server, or any database.

## Project structure

```
index.html                 Main page (all the UI)
css/style.css               Extra styling on top of Bootstrap
js/app.js                   All the logic (form validation, saving/rendering data)
sample-portfolio-1.json     Example portfolio data, for reference when filling in the test form
sample-portfolio-2.json     A second example portfolio data set
README.md                   This document
```

> Note: `sample-portfolio-*.json` are **example data to look at / copy into the form** only. The app does not have a feature to import a JSON file directly yet.

## How to open the project

Pick whichever method is easiest — none of them require installing anything extra.

**Option 1 — Download as ZIP**
1. Go to the repo on GitHub: `https://github.com/kiatkong-mongkolklee/CS100_POWER_UP_Checkpoint_Instruction_G17`
2. Click the green **Code** button, then choose **Download ZIP**
3. Extract the downloaded ZIP file
4. Open the extracted folder and double-click **`index.html`**
5. The page opens in your default browser (the URL will start with `file:///...`) — it's ready to use immediately, no commands needed

**Option 2 — Clone with Git**
1. Open a terminal / command prompt
2. Run:
   ```
   git clone https://github.com/kiatkong-mongkolklee/CS100_POWER_UP_Checkpoint_Instruction_G17.git
   ```
3. Go into the cloned folder and open `index.html` in a browser (double-click it, or right-click → Open with → pick a browser)

**Option 3 — Open with Live Server (optional, for VS Code users)**
1. Open the project folder in VS Code
2. Install the **Live Server** extension
3. Right-click `index.html` → **Open with Live Server**
4. The page opens at `http://127.0.0.1:5500/` (or a nearby port)

All three methods give the same result, since this is a single static page that runs entirely in the browser — there's no backend to start.

## Detailed test steps

Work through Test 1 → 10 in order to cover every main feature of the system. Each test lists the **steps** and the **expected result**.

### Test 1 — Create a new portfolio (happy path, everything filled in correctly)
1. In the **Create Portfolio** section, select `Portfolio 1` in the **Select Portfolio** dropdown
2. Fill in Display Name, What I Enjoy, What I've Tried, What I'm Curious About
3. Scroll down to **Add Portfolio Item** and fill in every field: Title, Type (pick anything except Other), Date, Role, Description
4. In the Skills field, type something like `HTML, CSS, JavaScript`
5. Fill in all 4 Reflection fields (What I Did, What I Learned, Challenge, Next Step)
6. In the Evidence URL field, type a link starting with `http://` or `https://`, e.g. `https://github.com`
7. Click **Create Portfolio**

**Expected result:** a green "Portfolio saved!" message appears at the top. Scroll to **View Portfolio**, select `Portfolio 1` in its dropdown, and you'll see the profile info you entered plus the newly created item card, with the counter showing **"1 Item"**.

### Test 2 — Validation when fields are left empty
1. Clear the form with the **Clear** button (or refresh the page)
2. Leave some of the `required` fields empty (e.g. skip Display Name and Title) and click **Create Portfolio**

**Expected result:** a red "Please check the highlighted fields. Nothing was saved." message appears. The empty fields get a red border with a message underneath (e.g. "Please enter a display name."), **no** new item is saved, and focus jumps to the first field with an error.

### Test 3 — Invalid date
1. Fill in the form as in Test 1, but for the **Date** field, test a date that doesn't actually exist (the app checks this with `isValidDate`, e.g. February 31st) — you can test this via the browser dev tools if the native date picker won't let you type one — then click Create Portfolio

**Expected result:** the Date field gets a red border with "Invalid date. Please use the format YYYY-MM-DD." and the form is not saved.

### Test 4 — Invalid evidence link
1. Fill in the form as in Test 1, but in the **Evidence URL** field type something that isn't a link, e.g. `github.com` (no http/https) or `abcde`
2. Click Create Portfolio

**Expected result:** the Evidence field gets a red border saying the link is invalid and must start with `http://` or `https://`, and the form is not saved. Fix it to `https://github.com` and submit again — it should pass and save normally.

### Test 5 — Selecting Type "Other"
1. Fill in the form as in Test 1, but for **Type** select **Other**

**Expected result:** a new text input appears for typing a custom type. If you leave it empty and click Create Portfolio, you get the error "Please type your own type." If you type something, e.g. `Hackathon`, and click Create Portfolio, it saves and the item card in View Portfolio shows `Hackathon` instead of the word "Other".

### Test 6 — Adding multiple items to the same portfolio
1. Successfully create a first item as in Test 1 (you'll see the saved message, and the Add Portfolio Item fields clear automatically while the profile info above stays)
2. Fill in a second item (no need to re-enter the profile) and click Create Portfolio again

**Expected result:** in View Portfolio, the counter now shows **"2 Items"** and you can see both item cards listed.

### Test 7 — Switching portfolios (Portfolio 1 ↔ Portfolio 2)
1. Create data for `Portfolio 1` as in Test 1
2. In the **Select Portfolio** dropdown (on the Create side), switch to `Portfolio 2`

**Expected result:** the profile form above clears immediately (since Portfolio 2 has no data yet). Fill in new profile + item data for Portfolio 2 and click Create Portfolio, then switch the dropdown back to `Portfolio 1` — Portfolio 1's data should still be there completely intact, not overwritten or lost. The **View Portfolio** dropdown switches along with it automatically (both dropdowns stay in sync).

### Test 8 — The Clear button
1. Fill in some profile and item fields (don't submit)
2. Click the **Clear** button

**Expected result:** the fields in the **Add Portfolio Item** section (Title, Type, Date, Role, ... through Evidence/Photo/File) are all cleared. The profile fields above (Display Name, What I Enjoy, etc.) keep whatever the currently selected portfolio has (they are not cleared), and any red error borders from before disappear too.

### Test 9 — Uploading photos/files (Issue #20)
1. Fill in the form as in Test 1
2. In the **Upload Photo** field, select one or more image files (.jpg/.png)
3. In the **Upload Files** field, select a document, e.g. a .pdf or .docx
4. Click Create Portfolio

**Expected result:** the item card in View Portfolio shows a **Photos** section with actual thumbnail images of what was uploaded, not just filenames, and a **Files** section with a filename link that actually downloads the original file when clicked. (Fixed per Issue #20, where images/files previously didn't show up at all.)

> Note: files are stored as Data URLs inside `localStorage`, which has a quota of roughly 5MB per site. If the total size of uploaded files is too large, you'll see "Could not save: browser storage is full." — try smaller files.

### Test 10 — Data persistence (localStorage)
1. Create at least one portfolio item as in Test 1
2. **Refresh the page** (F5), or close the tab and reopen `index.html`

**Expected result:** all the data (profile and items you created) is still there without needing to re-enter anything, since it's stored in that browser's `localStorage`.

> Limitation: data is tied to the **specific browser + machine** that created it. Opening it in a different browser, a different computer, or Incognito/Private mode won't show the existing data, and clearing the browser's site data will delete it permanently.

## Sample test data

You can use the data in `sample-portfolio-1.json` and `sample-portfolio-2.json` as example input. From the first file:

- Display Name: `Adam Smith`
- What I Enjoy: `Coding`
- What I've Tried: `CS100`
- What I'm Curious About: `Javascript`
- Item Title: `What When Why Who`, Type: `Activity`, Date: `2026-11-05`, Role: `Data Analyst`
- Skills: `Javascript`
- Evidence: `https://github.com`

## Known limitations

- There is no backend/database — data lives only in the user's browser and does not sync across devices or accounts.
- `localStorage` has a limited quota (roughly 5MB per domain); attaching many or large photos/files may cause saving to fail.
- Only 2 portfolios are supported (Portfolio 1, Portfolio 2), matching the dropdown options provided.
