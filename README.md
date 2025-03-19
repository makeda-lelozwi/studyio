This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Study.io - EdTech Web Application

## Overview

Study.io is an educational technology (EdTech) web application designed to empower users with course ideas to share their knowledge by creating and uploading courses. The platform allows users to register, create courses, and manage their content seamlessly. The project was built using Next.js for the frontend, Material-UI (MUI) for styling and components, and Strapi as the backend CMS (Content Management System).

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
