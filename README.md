# Leave & Productivity Analyzer

A full‑stack web application that allows HR teams or managers to upload employee attendance data via Excel and instantly view productivity insights through a real‑time dashboard.

---

## 🚀 Features

* 📤 Upload attendance data using Excel (.xlsx)
* 📊 Dashboard with real‑time statistics

  * Expected Working Hours
  * Worked Hours
  * Leaves Used
  * Productivity Percentage
* 📅 Daily attendance table (date-wise view)
* 🔍 Month-wise filtering
* 🗄️ Data stored securely using MongoDB with Prisma ORM

---

## 🛠️ Tech Stack

**Frontend**

* Next.js 15 (App Router)
* TypeScript
* Tailwind CSS

**Backend**

* Next.js API Routes
* Prisma ORM
* MongoDB

**Utilities**

* Excel parsing (xlsx)
* Date handling (dayjs)

---

## 📂 Project Structure

```
/app
  /dashboard        → Dashboard UI
  /upload           → Excel upload UI
  /api
    /upload         → Excel upload API
    /dashboard      → Dashboard data API
/lib
  prisma.ts         → Prisma client
  calculations.ts  → Productivity logic
/prisma
  schema.prisma
```

---

## 📥 Sample Excel Format

| Employee Name | Date       | In Time | Out Time | Is Leave |
| ------------- | ---------- | ------- | -------- | -------- |
| John Doe      | 2025-02-01 | 09:30   | 18:00    | No       |
| John Doe      | 2025-02-02 |         |          | Yes      |

> A sample file is available in `/samples/attendance_sample.xlsx`

---

## ▶️ How It Works

1. User uploads Excel from **Upload Page**
2. Backend parses and stores data in MongoDB
3. Dashboard API calculates metrics
4. Dashboard UI displays updated stats and table

There is **no separate success page** — the dashboard itself reflects uploaded data, which is standard real‑world architecture.

---

## 🧪 API Endpoints

### Upload Excel

```
POST /api/upload
```

### Dashboard Data

```
GET /api/dashboard?month=YYYY-MM
```

---

## 💼 Interview Explanation (Short)

> “This application allows uploading attendance data via Excel. The data is processed and stored using Prisma and MongoDB, and a dashboard dynamically computes productivity metrics with month-wise filtering.”

---

## 📌 Status

✅ Excel upload fully working

---

## 👤 Author

**Lokesh Vyas**
