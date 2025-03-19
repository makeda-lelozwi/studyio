# Study.io - EdTech Web Application

## Overview

**Study.io** is an educational technology (EdTech) web application designed to empower users with course ideas to share their knowledge by creating and uploading courses. The platform allows users to register, create courses, and manage their content seamlessly. The project was built using **Next.js** for the frontend, **Material-UI (MUI)** for styling and components, and **Strapi** as the backend CMS (Content Management System).

### Development Process

1. Key Sections and AI Assistance

Defining Interfaces: AI helped define TypeScript interfaces for course data, user data, and API responses.

Troubleshooting Errors: AI was used to debug and resolve issues during development.

Styling: AI provided guidance on using MUI components effectively and ensuring a consistent design.

Error Handling: AI assisted in implementing initial error handling for API requests and user interactions.

API Integration: AI ensured the correct usage of Strapi endpoints and proper filtering of responses.

2. Main Sources of Help
   Strapi Documentation: Both written documentation and the Strapi AI chatbot were used extensively.

YouTube: Tutorials and guides for Next.js, MUI, and Strapi.

DeepSeek: AI assistance for coding, debugging, and best practices.

### Installation and Setup

Prerequisites
Node.js (v16 or higher)

npm or yarn

Strapi CLI (optional, for local Strapi setup)

Steps to Run the Project

1. Clone the Repository:

```bash
Copy
git clone https://github.com/makeda-lelozwi/study.io.git
cd study.io
```

2. Install Dependencies:

```bash
Copy
npm install

# or

yarn install
Set Up Strapi Backend:
```

3. Navigate to the Strapi directory:

```bash
Copy
cd server
```

4. Install Strapi dependencies:

```bash
Copy
npm install

# or

yarn install
```

5. Start the Strapi server:

```bash
Copy
npm run develop

# or

yarn develop
```

5. Access the Strapi admin panel at http://localhost:1337/admin and set up your content types (e.g., courses, users).

6. Set Up Next.js Frontend:

Navigate to the frontend directory:

```bash
Copy
cd ../client
```

7. Start the Next.js development server:

```bash
Copy
npm run dev

# or

yarn dev
```

8. Access the application at http://localhost:3000.

9. Environment Variables:

Create a .env.local file in the frontend directory and add the following:

```bash
env
Copy
NEXT_PUBLIC_BASE_URL=http://localhost:1337
Ensure your Strapi backend is running and accessible at the specified URL.
```

Acknowledgments
Strapi Documentation: For providing clear guidance on setting up and using Strapi.

YouTube Tutorials: For helping with Next.js and MUI integration.

DeepSeek AI: For assisting with coding, debugging, and best practices.

Material-UI (MUI): For providing a robust library of UI components.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Thank you for checking out Study.io! 🚀
