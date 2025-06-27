
# URL Shortener

This project is a user-friendly, client-side URL Shortener application built with React, TypeScript, and Vite, and styled with Material UI. It provides core URL shortening functionality, including custom shortcodes and validity periods, and displays detailed analytical insights for each shortened link.

The application operates entirely on the client-side, using `localStorage` to persist data, and features a mandatory custom logging middleware for tracking application events.

## Features

-   **Concurrent URL Shortening**: Shorten up to 5 URLs at once.
-   **Customization**:
    -   Optionally provide a custom alphanumeric shortcode (4-10 characters).
    -   Set an optional validity period in minutes (defaults to 30 minutes).
-   **Client-Side Redirection**: Shortened links are handled by React Router for instant redirection.
-   **Statistics & Analytics**:
    -   View a comprehensive list of all created short links.
    -   Track the total number of clicks for each link.
    -   See detailed click data, including timestamp, source (referrer), and a mocked geographical location.
-   **Fully Responsive UI**: A clean interface built with Material UI that works seamlessly on both desktop and mobile devices.
-   **Robust Error Handling**: User-friendly alerts for invalid inputs, shortcode collisions, and expired links.
-   **Extensive Logging**: Integrated with a custom logging middleware that sends detailed logs to a remote server.

---

## Responsive Design Showcase

The application is designed to be fully responsive, ensuring a great user experience on both desktop and mobile devices.

### URL Shortener Page

The layout adapts to provide an intuitive experience on any screen size.

| Desktop View                                                                                    | Mobile View                                                                                 |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| ![Desktop view of the URL Shortener page](./screenshots/shortener-page-desktop.png)             | ![Mobile view of the URL Shortener page](./screenshots/shortener-page-mobile.png)           |

### URL Statistics Page

The statistics table is horizontally scrollable on smaller screens to ensure all data is accessible without breaking the layout.

| Desktop View                                                                                    | Mobile View                                                                                 |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| ![Desktop view of the URL Statistics page](./screenshots/stats-page-desktop.png)                | ![Mobile view of the URL Statistics page](./screenshots/stats-page-mobile.png)              |
| _Full data is visible in columns._                                                              | _The table can be swiped horizontally to view all columns._                                 |

---

## Tech Stack & Architecture

-   **Framework**: [React](https://react.dev/) (v19) with [Vite](https://vitejs.dev/) for a fast development experience.
-   **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety and scalability.
-   **UI Library**: [Material UI (MUI)](https://mui.com/) for a comprehensive set of beautiful and responsive components.
-   **Routing**: [React Router](https://reactrouter.com/) for client-side routing and redirection.
-   **State Management**: React Hooks (`useState`, `useEffect`) for managing component state.
-   **Data Persistence**: Browser `localStorage` is used to simulate a database, making data persistent across sessions on the same browser.
-   **HTTP Client**: [Axios](https://axios-http.com/) for making API calls to the logging service.
-   **Utilities**:
    -   `nanoid` for generating unique, URL-friendly shortcodes.
    -   `date-fns` for reliable date formatting.

### Project Structure

The repository is organized into two main parts as per the requirements:

1.  **`Logging-Middleware/`**: Contains the standalone, reusable logging function.
2.  **`Frontend-Test-Submission/`**: The main Vite + React application.

---

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (version 18.x or higher recommended)
-   [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd your-repository
    ```

2.  **Navigate to the frontend application directory:**
    ```bash
    cd "Frontend-Test-Submission"
    ```

3.  **Install the dependencies:**
    This command will install React, Material UI, and all other necessary packages listed in `package.json`.
    ```bash
    npm install
    ```

### Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    ```

2.  **Open the application in your browser:**
    Vite will start the application and provide a local URL, typically `http://localhost:3000`. Open this URL in your web browser to use the application.

---

## How to Take Mobile Screenshots

You can easily simulate a mobile device and take screenshots using your web browser's built-in developer tools.

1.  Open your application in Chrome, Firefox, or Edge.
2.  Press **F12** (or `Ctrl+Shift+I` / `Cmd+Option+I`) to open Developer Tools.
3.  Click the **Toggle Device Toolbar** icon (it looks like a phone and a tablet).
4.  Select a mobile device from the dropdown menu at the top (e.g., "iPhone 12 Pro").
5.  Refresh the page (`F5`) to ensure all styles are applied correctly.
6.  Take a screenshot of the browser window.

---

## How It Works

### URL Shortening Logic

-   The `urlService.ts` file acts as a mock backend service. It manages all interactions with `localStorage`.
-   When a user submits a form, the `UrlShortenerPage` component performs client-side validation (e.g., checks for valid URL format).
-   If validation passes, it calls `urlService.createShortUrl()`. This function:
    -   Checks for the uniqueness of a custom shortcode if provided.
    -   Generates a new, unique shortcode using `nanoid` if none is provided.
    -   Constructs a `ShortenedUrl` object with creation and expiry dates.
    -   Saves the new object to the array of URLs in `localStorage`.

### Redirection

-   The application uses a wildcard route (`/:shortcode`) in `App.tsx` which is handled by the `RedirectHandler` component.
-   When a user navigates to a short URL (e.g., `http://localhost:3000/abcd12`), this component:
    -   Extracts the `shortcode` from the URL.
    -   Looks up the corresponding long URL in `localStorage` via `urlService`.
    -   Records a new click event for the link.
    -   Performs a client-side redirect using `window.location.replace()`.
    -   Handles cases where the link is expired or does not exist.
