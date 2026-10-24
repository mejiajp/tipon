# Tipon — Smart Expense Tracker

**Tipon** is a full-stack expense tracking application designed to help users manage their daily expenses, understand their spending habits, and keep track of where their money goes through a simple and intuitive interface.

Built with **Next.js, Spring Boot, and PostgreSQL**, Tipon combines a modern web experience with a secure backend and persistent data storage.

## ✨ Features

- **Expense Tracking** — Record and manage daily expenses with categorized transactions.
- **Spending Insights** — View total spending and understand how expenses are distributed across categories.
- **Transaction History** — Review recent transactions and track previous expenses.
- **Expense Calendar** — Explore expenses by date through a calendar-based view.
- **Google Authentication** — Sign in using your Google account.
- **Guest Mode** — Get started without creating a permanent account.
- **Onboarding Experience** — Walk through an introductory flow to learn about the application.
- **Responsive Interface** — Access your expense tracker through a clean, modern web interface.
- **Theme Support** — Personalize the interface with theme preferences.

## 🛠️ Tech Stack

### Frontend

- [Next.js](https://nextjs.org/) — React framework with the App Router
- [React](https://react.dev/) — UI development
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [shadcn/ui](https://ui.shadcn.com/) — UI components
- [Zustand](https://zustand.docs.pmnd.rs/) — Client-side state management

### Backend

- [Java](https://www.java.com/) — Backend programming language
- [Spring Boot](https://spring.io/projects/spring-boot) — REST API development
- [Spring Security](https://spring.io/projects/spring-security) — Authentication and access control
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa) — Database persistence and ORM

### Database & Authentication

- [PostgreSQL](https://www.postgresql.org/) — Relational database
- [Neon](https://neon.tech/) — Hosted PostgreSQL
- JWT — Token-based authentication
- Google OAuth — Google sign-in

### Deployment

- [Vercel](https://vercel.com/) — Frontend hosting
- [Render](https://render.com/) — Backend hosting

## 🏗️ Architecture

Tipon uses a full-stack architecture with a Next.js frontend, a Next.js Backend-for-Frontend (BFF), a Spring Boot REST API, and a PostgreSQL database.

```text
┌─────────────────────────┐
│       User / Browser    │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│     Next.js Frontend    │
│   UI, State & Routing   │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│     Next.js BFF Layer   │
│   API Proxy & Cookies   │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│    Spring Boot API      │
│ Business Logic & Auth   │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│      PostgreSQL         │
│     Persistent Data     │
└─────────────────────────┘
```

The BFF layer handles communication between the frontend and backend, including forwarding authentication cookies and managing authentication-related requests. Spring Boot handles backend logic, security, and database operations.

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (compatible with the frontend's configured version)
- npm
- Java 21
- PostgreSQL, or a hosted PostgreSQL database such as Neon
- Git

### 1. Clone the repository

```bash
git clone https://github.com/mejiajp/tipon.git
cd tipon
```

### 2. Configure the backend

Navigate to the backend directory:

```bash
cd backend
```

Configure your database connection and authentication settings using your local Spring Boot configuration or environment variables.

Example PostgreSQL configuration:

```properties
#DATABASE CONNECTION
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DATABASE_USERNAME}
spring.datasource.password=${DATABASE_PASSWORD}

#JWT
jwt.secret=${JWT_SECRET}
jwt.expiration-ms=${JWT_EXPIRATION_MS}

#GOOGLE
google.client-id=${GOOGLE_CLIENT_ID}
google.client-secret=${GOOGLE_CLIENT_SECRET}
google.redirect-uri=${GOOGLE_REDIRECT_URI}
```

Set the required values in your local environment. Check the backend configuration for any additional required variables.

Start the Spring Boot application using the project's Gradle or Maven wrapper, depending on the build system configured in the repository.

### 3. Configure the frontend

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the `frontend` directory:

```env
SPRING_API_URL=http://localhost:8080/api
```

Make sure this URL matches the backend's configured address and API base path.

Configure any additional environment variables required by the Google OAuth integration and your local setup.

### 4. Run the application

Start the Spring Boot backend first, then run the frontend in a separate terminal:

```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** The environment variable names and API base path above are examples. Verify them against the current configuration in the repository before running the application.

## 🔐 Authentication

Tipon supports guest access and Google authentication.

- **Guest access:** Start using the application without a traditional account registration flow.
- **Google sign-in:** Authenticate through Google OAuth.
- **JWT authentication:** The backend uses token-based authentication for protected operations.
- **Cookie-based session handling:** The Next.js BFF manages authentication cookies and forwards credentials to the backend as needed.

## 📁 Project Structure

```text
tipon/
├── frontend/          # Next.js application
│   ├── app/           # App Router pages and API routes
│   ├── components/    # Reusable UI components
│   ├── lib/           # API clients and utilities
│   └── stores/        # Zustand state stores
│   └── providers/     # Providers wrapping and logic
│   └── types/         # Storing TypeScript
│
├── backend/           # Spring Boot application
│   └── src/
│       └── main/
│           ├── java/  # Controllers, services, entities, security, configs
│           └── resources/
│
└── README.md
```

_The directory tree is representative; individual folders may differ in the current repository._

## 🎯 Project Goals

Tipon was built to explore and apply practical full-stack development concepts, including:

- Building a modern frontend with Next.js and TypeScript.
- Designing REST APIs with Java and Spring Boot.
- Implementing authentication and authorization.
- Integrating a relational database using Spring Data JPA.
- Using a Backend-for-Frontend architecture to separate frontend concerns from backend services.
- Managing application state and authentication flows.
- Deploying a full-stack application using cloud hosting platforms.

## 🗺️ Roadmap

Potential improvements include:

- [ ] Monthly budgets and spending limits
- [ ] Custom expense categories
- [ ] Advanced spending analytics and visual reports
- [ ] Exportable transaction reports
- [ ] Improved financial summaries and budgeting insights

## 👨‍💻 Author

**Juan Paulo Mejia**

Full Stack Developer focused on building scalable web applications and intuitive user experiences.

- GitHub: [@mejiajp](https://github.com/mejiajp)
- Project Repository: [mejiajp/tipon](https://github.com/mejiajp/tipon)

---

_Tipon — A simpler way to keep track of your spending._
