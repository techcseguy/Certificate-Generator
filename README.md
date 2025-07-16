# Certificate Generator

A streamlined web application for generating professional, customizable certificates using AI-generated content and Canvas.js-based design templates. Users can input a course or category name and instantly receive five uniquely styled certificate previews, complete with downloadable Canvas.js code.
---
<img width="1920" height="1007" alt="Image" src="https://github.com/user-attachments/assets/01e6036e-24da-43b8-b8da-9cd688f6b2ba" />
---
<img width="1920" height="2772" alt="Image" src="https://github.com/user-attachments/assets/1f795cb7-b674-4ba9-885f-da44b05d1127" />
---

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Installation](#installation)
* [Usage](#usage)
* [Architecture](#architecture)
* [API & Integration](#api--integration)
* [Contributing](#contributing)
* [License](#license)

---

## Overview

This project aims to eliminate the manual effort of designing certificates by combining:

* **Canvas.js** for rendering certificate designs on the browser
* **LLM (Gemini/OpenAI API)** for generating certificate content dynamically
* **A clean UI/UX** for interactive certificate preview and code viewing

Users enter a course or category name (e.g., *Machine Learning*, *AI for Farmers*) and receive five uniquely styled certificates, ready to use or extend.

---

## Features

* Generate 5 unique certificate designs per category
* AI-powered content creation (certificate text generation)
* Canvas.js-powered rendering
* Instant preview and download functionality
* View and copy corresponding Canvas.js code
* Support for professional, modern, creative, and elegant themes

---

## Tech Stack

**Frontend**

* React.js
* Vite
* Tailwind CSS
* Canvas.js

**Backend**

* Node.js
* Express.js
* Google Gemini API / OpenAI API

**Other**

* dotenv (for environment variable management)
* CORS, body-parsing middlewares
* Deployed via Vercel (Frontend) and Render/Node (Backend)

---

## Installation

### Prerequisites

* Node.js (v16+)
* npm or yarn

### Clone the Repository

```bash
git clone https://github.com/yourusername/certificate-generator.git
cd certificate-generator
```

### Install Dependencies

```bash
npm install
# or
yarn
```

### Environment Variables

Create a `.env` file in the root directory and add your API key:

```
VITE_REACT_APP_OPENAI_KEY=your_openai_or_gemini_key_here
```

---

## Usage

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Live Preview

Visit your deployed frontend (e.g., `https://certificate-generator.vercel.app`) and enter a course name to generate certificates.

---

## Architecture

```
Frontend (React + Canvas.js)
    └── Input: Category Name
    └── Output: 5 Certificate Previews
                 └── Canvas.js rendering
                 └── View Canvas.js code
                 └── Download option

Backend (Express.js)
    └── Endpoint: POST /generate
        └── Uses Gemini/OpenAI to generate certificate phrases
```

---

## API & Integration

**POST /generate**

* **Request body**

  ```json
  {
    "category": "Machine Learning"
  }
  ```

* **Response**

  ```json
  {
    "text": "This is to certify that [recipient] has successfully completed a course in Machine Learning."
  }
  ```

**Third-Party Assets**

* Pixabay
* IconFinder
* SVG Repo

---

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to the branch
5. Open a pull request

---

## License

This project is licensed under the [MIT License](LICENSE).
