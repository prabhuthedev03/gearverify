# GearVerify - Local Development

This project is a static site optimized for Cloudflare Pages.

## How to Run Locally

### Option 1: Cloudflare Wrangler (Recommended)
This simulates the Cloudflare environment, including Functions (if any).

1.  Ensure you have [Node.js](https://nodejs.org/) installed.
2.  Run the following command in the project root:
    ```bash
    npx wrangler pages dev .
    ```
3.  Open `http://localhost:8788` in your browser.

### Option 2: Python Simple Server (Quick Static Check)
If you only need to check HTML/CSS changes and don't need Cloudflare Functions:

1.  Run the following command:
    ```bash
    python -m http.server 8000
    ```
2.  Open `http://localhost:8000` in your browser.

### Option 3: VS Code Live Server
If you use VS Code, install the "Live Server" extension and click "Go Live" at the bottom right.

## Deployment
Pushing to the `main` branch will automatically trigger a deployment on Cloudflare Pages.
