# Leave Productivity Analyzer

## Project Overview

Leave Productivity Analyzer is a full-stack web application designed to analyze employee attendance, leave patterns, and productivity using Excel uploads. The system processes attendance data and presents real-time productivity insights through an interactive dashboard.

This project demonstrates **end-to-end system design**, including file uploads, data processing, database storage, API-driven dashboards, and modern UI development.

---

## Key Features

* Productivity dashboard with real-time metrics
* Excel upload for bulk attendance data
* Automatic calculation of:

  * Expected working hours
  * Actual worked hours
  * Leave count
  * Productivity percentage
* Daily attendance table
* Fast API responses using Prisma ORM

---

## Tech Stack

### Frontend

* Next.js 15 (App Router)
* TypeScript
* Tailwind CSS

### Backend

* Next.js API Routes
* Prisma ORM (MongoDB)

### Database

* MongoDB (via Prisma)

### Utilities

* dayjs (date calculations)
* xlsx (Excel parsing)

---

## Setup Instructions (VERY IMPORTANT)

### Clone the Repository

```bash
git clone <repo-url>
cd leave-productivity-analyzer
```

---

### Install Dependencies

```bash
npm install
```

---

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="<your-mongodb-connection-url>"
```

---

### Prisma Setup

Generate Prisma Client:

```bash
npx prisma generate
```

---

### Run the Application

```bash
npm run dev
```

App will run on:

```
http://localhost:3000
```

---

## Excel Upload Instructions (CRITICAL FOR TESTING)

### Required Excel Format

Your Excel file **must contain these exact columns**:

| Column Name   | Description            |
| ------------- | ---------------------- |
| Employee Name | Full name of employee  |
| Date          | YYYY-MM-DD format      |
| In Time       | HH:mm (24-hr) or blank |
| Out Time      | HH:mm (24-hr) or blank |
| Is Leave      | YES / NO               |

---

### Sample Excel Provided

A realistic sample file is included:

```
attendance_sample.xlsx
```

Use this file to test uploads instantly.

---

### Upload Steps

1. Open:

```
http://localhost:3000/upload
```

2. Select the Excel file
3. Click **Upload**
4. Wait for success message

---

## Where to See the Results

### Dashboard View

Navigate to:

```
http://localhost:3000/dashboard
```

### Dashboard Displays:

* Expected Working Hours
* Worked Hours
* Leaves Used
* Productivity Percentage
* Daily Attendance Table

Make sure the **month selector matches the uploaded data month** (e.g. February 2025)

---

---

## Overall Explanation

> The Excel upload stores attendance data in MongoDB using Prisma. The dashboard dynamically calculates productivity metrics by month and visualizes them using API-driven architecture.

---

## Project Status

✔ Excel upload fully working
✔ Dashboard fully dynamic
✔ Production-ready architecture

---

## Author

Lokesh Vyas
