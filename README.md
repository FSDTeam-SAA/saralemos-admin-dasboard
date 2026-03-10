# Sara Lemos Admin Dashboard

A comprehensive and modern administrative dashboard built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**. This platform provides a centralized interface for managing various aspects of the Sara Lemos ecosystem, including hero sections, user data, subscriptions, and system settings.

## 🚀 Key Features

- **📊 Dashboard Overview**: Real-time insights and analytics overview of the system's performance.
- **👤 User Management**: Full CRUD capabilities for managing administrative and platform users.
- **🎨 Hero Section Management**: Dynamic tools to update and manage the landing page hero content.
- **💳 Subscription Management**: Efficient handling of user subscriptions and plans.
- **⚙️ Advanced Settings**: Comprehensive system configuration and user profile settings.
- **🔐 Role-Based Authentication**: Secure access control using **NextAuth.js**, specifically configured for ADMIN roles.
- **🌓 Theme Support**: Built-in support for light and dark modes via `next-themes`.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [TanStack Query v5](https://tanstack.com/query/latest) (React Query)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide React](https://lucide.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Animations**: [Motion](https://motion.dev/) (formerly Framer Motion)
- **Data Fetching**: [Axios](https://axios-http.com/)
- **Charts**: [Recharts](https://recharts.org/)

## 📂 Project Structure

```text
src/
├── app/               # Next.js App Router (Pages, Layouts, API routes)
│   ├── (auth)/        # Authentication related pages (Login, etc.)
│   ├── (dashboard)/   # Core dashboard features and management views
│   └── api/           # Backend API routes for authentication and proxying
├── components/        # Reusable UI components
│   ├── dashboard/     # Feature-specific dashboard components
│   └── ui/            # Base UI primitives (Radix-based)
├── lib/               # Shared utilities, configurations, and API clients
├── provider/          # Context providers (Auth, Query, Theme)
├── types/             # Common TypeScript definitions
└── proxy.ts           # Middleware-based authentication configuration
```

## 🚥 Getting Started

### Prerequisites

- Node.js 20+
- npm / pnpm / yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd saralemos-admin-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env.local` file in the root directory and add necessary variables (see `.env.example` if available).

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Production

To build the project for production:

```bash
npm run build
npm run start
```

---

Built with ❤️ for the Sara Lemos Platform.
