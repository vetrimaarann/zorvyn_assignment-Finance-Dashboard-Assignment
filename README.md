# Zorvyn Finance Dashboard UI - Frontend Assignment

## Overview
This repository contains the implementation of a Finance Dashboard UI built for the Zorvyn Frontend Developer Intern assignment. The objective was to create a clean, interactive, and responsive interface that allows users to track their financial activity, visualize trends, and manage transactions with role-based access.

**Built by:** Sunder G  
**Timeline:** April 2026

## 🚀 Features Implemented

### 1. Dashboard Overview
- **Summary Cards:** Quick view of Total Balance, Monthly Income, Expenses, and Savings Rate.
- **Balance Trend (Time-based):** An Area Chart showing the growth of balance over the last 30 days using **Recharts**.
- **Spending Breakdown (Categorical):** A Pie Chart visualizing where the money goes across various spending categories.

### 2. Transactions Management
- **Detailed List:** Displaying Date, Description, Category, Amount, and Type.
- **Real-time Filtering:** Filter by transaction type (Income/Expense) or category.
- **Search:** Search across descriptions and categories.
- **Stateful Actions:** Add and delete transactions (available in Admin mode).

### 3. Role-Based UI (RBAC Simulation)
- **Admin Role:** Full access to add and delete transactions.
- **Viewer Role:** Read-only access. Actions like "Add Transaction" or "Delete" are hidden or disabled.
- **Role Switcher:** A demo toggle in the header to easily switch between roles and see the UI adapt dynamically.

### 4. Smart Insights
- **Heuristics-based Insights:** Automatically identifies the highest spending category.
- **Anomalous Activity Detection:** Alerts the user if a transaction exceeds a certain threshold (e.g., >$1,000 outlier detection).
- **Milestone Tracking:** Celebrates healthy savings rates.

### 5. Premium UI/UX
- **Modern Aesthetics:** Built with a "Clean & Premium" design philosophy using Indigo and Emerald accents.
- **Dark Mode Support:** Integrated theme engine using CSS Variables.
- **Responsiveness:** Fully adaptive layout for desktop and tablet views.
- **Glassmorphism & Shadows:** Subtle elevations and transitions for a high-end feel.

## 🛠️ Technical Decisions

- **Framework:** **React.js + TypeScript** for robust component architecture and type safety.
- **Bundler:** **Vite** for blazing fast development and build times.
- **State Management:** **Zustand** (with persistence) was chosen for its simplicity and performance compared to Redux, while providing a global state for roles and transactions.
- **Styling:** **Vanilla CSS with Variables**. I chose not to use Tailwind to demonstrate my ability to architect a maintainable design system from scratch using modern CSS features like variables, grid, and flexbox.
- **Icons:** **Lucide React** for consistent, modern iconography.
- **Visualizations:** **Recharts** for its declarative nature and seamless integration with the React lifecycle.

## 📦 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd zorvyn-finance
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🧠 Design Philosophy
I focused on **information hierarchy**. In finance, data can be overwhelming, so I used white space and distinct card structures to keep the most important numbers (Balance, Trends) at the top. The Role-based UI was implemented using a global state store, ensuring that the "Admin" vs "Viewer" logic is consistent across all components.

---
*Created as part of the Zorvyn FinTech Frontend Intern Selection Process.*
