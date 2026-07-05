# Sophia Question Copier

A tiny Chrome extension that copies the current [Sophia](https://www.sophia.org/) quiz question and its answer choices to your clipboard as clean, minimal plain text.

It adds a floating **Copy Q** button (bottom-right of the page) and an **Alt+Q** keyboard shortcut. Press either one and the question prompt plus all answer choices land on your clipboard, ready to paste anywhere.

## What it copies

The prompt on one line, followed by each answer choice on its own line, for example:

```
Which of the following best describes a variable?
A.) A fixed value that never changes
B.) A named container for a value that can change
C.) A type of loop
D.) A comment in the code
```

It supports both Sophia quiz layouts:

- **Challenge / practice** questions (with `A.) B.) C.)` letters)
- **Milestone** questions (no letters)

If it can't find a question on the page, it shows a small "No question found" toast instead of copying.

## Install (from source)

Chrome can't install unpacked extensions from a `.zip`, so you load the folder directly:

1. **Download the code** — either clone the repo:
   ```bash
   git clone https://github.com/vanyanv/sophia-copy.git
   ```
   or click **Code → Download ZIP** on GitHub and unzip it.
2. Open Chrome and go to `chrome://extensions`.
3. Turn on **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked**.
5. Select the `sophia-copy` folder (the one containing `manifest.json`).

The extension is now installed. It runs automatically on any `sophia.org` page.

> Works in any Chromium-based browser that supports Manifest V3: Google Chrome, Microsoft Edge, Brave, Opera, etc. The steps are the same — just open that browser's extensions page.

## Usage

1. Open a quiz question on Sophia.
2. Click the **Copy Q** button in the bottom-right, or press **Alt+Q**.
3. A "Question copied ✓" toast confirms it. Paste wherever you like.

## Files

| File | Purpose |
| --- | --- |
| `manifest.json` | Extension manifest (Manifest V3) |
| `content.js` | Extracts the question + choices and copies them |
| `styles.css` | Styling for the floating button and toast |

## Updating

After pulling new changes (`git pull`), go to `chrome://extensions` and click the **reload** (↻) icon on the extension card to load the latest version.

## License

MIT
