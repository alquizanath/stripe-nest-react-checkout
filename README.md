# 📦 stripe-nest-react-checkout

A full-stack example of integrating **Stripe payments** with a **NestJS backend** and **React (Vite) frontend**, including secure webhooks, Prisma for orders, and a customizable checkout form.

---

## 🚀 Features

✅ Create PaymentIntents from your NestJS backend  
✅ React checkout page with Stripe Elements and a styled CardElement  
✅ Webhook endpoint to update order status  
✅ Prisma integration for persisting orders  
✅ Stripe test environment ready  
✅ Clean modular codebase with NestJS best practices

---

## 🏗 Tech Stack

- **Backend:** [NestJS](https://nestjs.com/) + [Prisma](https://www.prisma.io/) + [Stripe Node SDK](https://stripe.com/docs/api)
- **Frontend:** [React](https://react.dev/) + [Vite](https://vitejs.dev/) + [Stripe Elements](https://stripe.com/docs/stripe-js)
- **Database:** PostgreSQL/MySQL/SQLite via Prisma (you choose)

## ⚙️ Getting Started

### 1️⃣ Clone the repo

```bash
git clone https://github.com/alquizanath/stripe-nest-react-checkout.git
cd stripe-nest-react-checkout
```

---

### 2️⃣ Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

## 🔐 Environment Variables Summary

| Name                   | Where      | Description                     |
|------------------------|------------|---------------------------------|
| STRIPE_SECRET_KEY      | backend    | Your Stripe secret key          |
| STRIPE_WEBHOOK_SECRET  | backend    | Secret for verifying webhooks   |
| DATABASE_URL           | backend    | Prisma database connection URL  |
| VITE_STRIPE_PUBLISHABLE_KEY | frontend | Your Stripe publishable key     |
| VITE_BACKEND_URL       | frontend   | URL of your NestJS backend      |

---

### 4️⃣ Run your app

```bash
# Backend
cd backend
npm run start:dev

# Frontend
cd ../frontend
npm run dev
```

Visit your checkout page at [http://localhost:5173](http://localhost:5173).

---

## 🔔 Webhooks

Use the Stripe CLI to forward webhook events:

```bash
stripe listen --forward-to localhost:3001/webhooks/stripe
```

## 📜 Scripts

### Backend

```bash
npm run start:dev    # Start backend in dev mode
```

### Frontend

```bash
npm run dev          # Start Vite frontend
```

---

## 📝 License

MIT — free to use, modify, or share.

---

### 🙌 Acknowledgements

- Built with ❤️ using Stripe’s APIs.
- Inspired by Stripe’s [official examples](https://stripe.com/docs).
