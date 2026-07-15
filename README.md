# Hridi's Diary — Frontend

A polished, full-stack e-commerce web app for **skincare, haircare, undergarments, and curated occasion gift combos** (Valentine's, Eid, Christmas, Puja). Built with **Next.js + TypeScript + Tailwind CSS**, featuring a custom "Velvet Gift Box" design system, live backend data, authentication, cart & checkout, Stripe payments, and admin management tools.

---

## 🚀 Live Deployment

- **Live Site:** `https://hridis-diary-frontend.vercel.app` *(update with your actual URL)*
- **Backend API:** [Hridi's Diary Backend](https://hridi-s-diary-backend.vercel.app/api)
- **GitHub (Frontend):** *(https://github.com/rabeya121/hridi-s-diary-frontend)*
- **GitHub (Backend):** *(https://github.com/rabeya121/Hridi-s-diary-backend)*


---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS v4 (custom "Velvet Gift Box" design tokens — velvet plum, gold, blush)
- **Fonts:** Fraunces (display), Inter (body), Caveat (script accent)
- **Charts:** Recharts (Admin Dashboard analytics)
- **Carousel:** Swiper (Hero slider)
- **Auth:** JWT-based auth via custom Express backend + Google Identity Services (OAuth)
- **Payments:** Stripe Checkout (hosted payment page)
- **Image Uploads:** ImgBB API
- **Notifications:** react-hot-toast
- **Icons:** lucide-react, react-icons

---

## ✨ Features

- **Landing Page** — Hero slider, Categories, Featured Products, Occasion Gift Combos, Why Choose Us, Testimonials, Newsletter, FAQ
- **Shop Page** — Search, category & price filters, sorting, pagination
- **Product & Combo Details** — Image gallery, specs, reviews & ratings, related items
- **Authentication** — Register/Login, Demo login, Google OAuth
- **Cart & Checkout** — Add to cart, quantity management, Cash on Delivery or Stripe card payment
- **Order History** — Customer "My Orders" + Admin "All Orders" with status management
- **Admin Panel** — Sidebar-based dashboard with Add Item, Manage Items, Add Combo, Orders, and Recharts analytics (revenue, order status, product categories)
- **Reviews & Ratings** — Star ratings and comments for both products and combos
- **Fully Responsive** — Mobile, tablet, and desktop layouts throughout

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (admin)/         # Route group: admin sidebar layout (dashboard, orders, items, combos)
│   ├── auth/            # Login & Register pages
│   ├── shop/            # Explore/listing page
│   ├── product/[id]/     # Product details
│   ├── combos/           # Combo listing & details
│   ├── cart/, checkout/   # Cart & checkout flow
│   ├── orders/            # Customer order history
│   ├── about/, contact/, blog/  # Static content pages
│   └── page.tsx           # Landing page
├── components/
│   ├── layout/           # Navbar, Footer
│   ├── home/             # Landing page sections
│   ├── shop/             # ProductCard, SkeletonCard
│   ├── auth/             # ProtectedRoute
│   └── admin/            # AdminSidebar
├── context/               # AuthContext, CartContext
└── lib/                   # API client, types, image upload helper
```

---

## 🔑 Environment Variables

Create a `.env` (or `.env.local`) file in the root with:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_oauth_client_id
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

---

## 🧑‍💻 Local Development

```bash
npm install
npm run dev     # starts dev server on http://localhost:3000
npm run build    # production build
npm start        # runs production build
```

Make sure the backend server is running (locally or deployed) and `NEXT_PUBLIC_API_URL` points to it.

---

## 🔐 Demo Credentials

| Role | Email | Password |
|---|---|---|
| Customer | *(add demo customer email)* | *(add password)* |
| Admin | *(hriditest.@example.com)* | *(test1234)* |


Or use the **"Try Demo Login"** button on the login page.

---

## 📄 License

This project was built as an academic full-stack TypeScript assignment.