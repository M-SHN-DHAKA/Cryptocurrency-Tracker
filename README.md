# Cryptocurrency Tracker

The responsive cryptocurrency tracking dashboard built with Next.js. This project publish live prices, market cap, and price changes (1h, 24h, 7d) for the top 100 cryptocurrencies. Clicking on any coin opens a dedicated details page with more information.

Here we have got the live data from the CoinGecko API and renders it through a clean, table-based UI. No backend of its own; all cryptocurrency data comes directly from a third-party API.

## Stack

| Concern      | Choice                                          |
| ------------ | ------------------------------------------------ |
| Framework    | Next.js 15, App Router                          |
| Language     | JavaScript (no TypeScript)                      |
| Styling      | Bootstrap 5 + custom CSS                        |
| HTTP client  | Axios                                           |
| Crypto data  | CoinGecko API (`/coins/markets`, `/coins/{id}`) |

## Getting started

Requires Node.js 18 or newer and a free [CoinGecko](https://www.coingecko.com/en/api) Demo API key.

\`\`\`bash
npm install
\`\`\`

Create a `.env.local` file in the project root and add your API key:

\`\`\`bash
NEXT_PUBLIC_COINGECKO_API_KEY=your_api_key_here
\`\`\`

Then run the dev server:

\`\`\`bash
npm run dev
\`\`\`

The app runs at `http://localhost:3000`.

Other scripts:

\`\`\`bash
npm run build
npm run start
npm run lint
\`\`\`

## Project structure

\`\`\`
src/
  app/
    layout.js               Root layout — imports Bootstrap and global CSS
    page.js                 Home page — renders the CryptoList component
    globals.css              Custom theme and layout tweaks
    components/
      Navbar.js               Top navigation bar
      CryptoList.js            Fetches and displays the top 100 coins, search/filter logic
    crypto/
      [id]/
        page.js                Dynamic route — details page for a single coin
.env.local                     API key (not committed to git)
\`\`\`

## Features

- Displays the top 100 cryptocurrencies with live price, market cap, and price change (1h/24h/7d)
- Search/filter coins by name in real time
- Color-coded price changes (green for positive, red for negative)
- Dynamic details page for each coin (`/crypto/[id]`) with rank, supply, and 24h high/low
- Loading and error states for network requests

## Environment variables

| Variable                        | Description                                                      |
| -------------------------------- | ------------------------------------------------------------------ |
| `NEXT_PUBLIC_COINGECKO_API_KEY` | Your personal CoinGecko Demo API key. Required for all requests. |

The `NEXT_PUBLIC_` prefix is required because the key is used inside client components (`"use client"`).

## Known limitations

- Uses CoinGecko's free Demo plan, which has rate limits (requests per minute).
- Only the top 100 coins (by market cap) are shown on the home page.

## License

This project is for personal/educational use.