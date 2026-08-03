<div align="center">
  <br />
  <img src="public/static/images/logo.webp" alt="Giahland Logo" width="180" height="180" />
  <h1>🌿 Giahland</h1>
  <p>
    <strong>Online Houseplant Shop &amp; Professional Plant Clinic</strong>
  </p>
  <br />

  ---

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.5-417f56?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19.1-417f56?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-^4-417f56?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-^5-417f56?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-417f56?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Zustand-State_Mgmt-417f56?style=for-the-badge&logo=zustand&logoColor=white" />
  <br/>
  <img src="https://img.shields.io/badge/Full_Stack-App-417f56?style=for-the-badge&logo=vercel&logoColor=white" />
  <img src="https://img.shields.io/badge/Dark_Mode-Supported-417f56?style=for-the-badge&logo=darkmode&logoColor=white" />
  <img src="https://img.shields.io/badge/Zod-Validation-417f56?style=for-the-badge&logo=zod&logoColor=white" />
  <img src="https://img.shields.io/badge/Recharts-Charts-417f56?style=for-the-badge&logo=recharts&logoColor=white" />
  <img src="https://img.shields.io/badge/TipTap-Editor-417f56?style=for-the-badge&logo=tiptap&logoColor=white" />
  <img src="https://img.shields.io/badge/Sharp-Image_Processing-417f56?style=for-the-badge&logo=sharp&logoColor=white" />
</div>

---


<div align="left">

## 📑 Table of Contents

  <ol style="list-style: none; padding-left: 0;">
    <li> <a href="#-about-the-project">📖 About The Project</a></li>
    <li> <a href="#-key-features">✨ Key Features</a></li>
    <li> <a href="#-roles--rules">👥 Roles & Rules</a></li>
    <li> <a href="#-design-inspiration">🎨 Design Inspiration</a></li>
    <li> <a href="#-screenshots">🖼️ Screenshots</a></li>
    <li> <a href="#-built-with">🧰 Built With</a></li>
    <li> <a href="#-getting-started">🚀 Getting Started</a></li>
    <li> <a href="#-database--seed-data">🗄️ Database & Seed Data</a></li>
    <li> <a href="#-project-structure">📁 Project Structure</a></li>
    <li> <a href="#-license">📝 License</a></li>
    <li> <a href="#-contact">📬 Contact</a></li>
  </ol>
</div>

---

<div align="left">

## 📖 About The Project

Giahland is a fully Persian (RTL), full‑stack e‑commerce platform built from the ground up with **Next.js 15**, **TypeScript**, and **MongoDB**. It combines a beautiful online plant shop with a real‑time **plant clinic**, where users can chat with professional plant doctors, upload images, and receive expert advice.

The application includes **three dedicated panels** — User, Plant Doctor, and Admin — each with role‑specific features and a fully responsive, dark‑mode‑enabled interface.

From the cart to the checkout, the live chat to the admin dashboard charts, every detail has been implemented to mirror a **real‑world, production‑ready application**. This project demonstrates a strong command of modern front‑end architecture, server‑side rendering, and clean, scalable code.


---

## ✨ Key Features

### 🛒 Online Store
- Browse plants by category (**Indoor**, **Decorative**, **Gift**, **Discounted**).
- Switch between **Grid** and **List** view with sorting (newest, price, popularity).
- Product detail page with **image gallery (lightbox)**, specifications, care guides, and approved comments.
- Add to cart, toggle wishlist, and checkout with **delivery method** selection.
- **Simulated payment flow** with a dedicated payment page, order tracking, and printable factor.

### 🩺 Plant Clinic
- Choose from a list of professional **plant doctors**.
- Start a consultation and chat **in real time** (text + image upload).
- Chat UI inspired by **Telegram's** clean and familiar messaging experience.
- Messages marked as **sent/seen**, with unread count notifications.
- Close consultations and increment doctor's successful visits.

### 👤 User Panel
- View **order history** and detailed factor (invoice) for each order.
- Manage **consultations** (list, search, sort, chat).
- Create **support tickets** with file attachments and track replies.
- Update profile information and **upload avatar**.
- **Wishlist** with grid/list view.

### 🧑‍⚕️ Plant Doctor Panel
- Write and manage **articles** using a rich‑text editor (TipTap).
- View and **reply to approved comments** on your articles/products.
- Handle **active consultations**, chat with users, and close them.
- Update profile information and **upload avatar**.
- Create **support tickets** with file attachments and track replies.

### 🛠️ Admin Dashboard
- Dashboard with **real‑time stats** (revenue, orders, users, doctors).
- Interactive **charts** (monthly sales, category pie chart) with fake data.
- Full **product CRUD** with multi‑image upload (optimized to WebP).
- **Article** management (list, create, delete).
- Monitor all **consultations** (read‑only chat view).
- **User management** (list, detail, block/unblock, edit info, create new doctor).
- **Order management** (list, detail, change status to delivered).
- **Comment moderation** (approve, reply, delete, mark read/unread).
- Manage **contact messages** and **support tickets**.

### 🔔 Notifications
- **Role‑based notification system** that keeps every user informed in real time.
- **Users** receive alerts for new consultation messages and ticket replies.
- **Plant Doctors** get notified about new consultation messages, new approved comments on their articles/products, and ticket updates.
- **Admins** see notifications for pending tickets, unread contact messages, and comments awaiting approval.
- Notification badges appear in the header and sidebar, with automatic refresh across pages.

### 🛡️ Authentication & Security
- **JWT‑based auth** with access & refresh tokens (HTTP‑only cookies).
- Automatic **token refresh** via middleware, no user interruption.
- **Role‑based route protection** (middleware + server‑side checks).
- Passwords hashed with **bcryptjs** (12 salt rounds).
- All server actions validate user identity and role before execution.
- **Blocked users** are prevented from signing in or accessing any protected route and are redirected to the dedicated blocked page.

### 🖼️ Image Handling
- **Client‑side preview** before upload for avatars, products, articles, tickets, and chat.
- Automatic **WebP conversion** with quality optimization via Sharp.
- Secure file naming with random strings to prevent **path traversal** attacks.
- Old images cleaned up on update/delete (disk space management).
- **Lightbox gallery** for product images (swipe, keyboard navigation).

### 🔍 Search & Navigation
- **Real‑time product search** with 500ms debounce and loading state.
- **Breadcrumb navigation** with dynamic title support and responsive truncation.
- **URL‑based filtering & sorting** on all product and blog listing pages.
- **Pagination** on all list pages with proper page reset on filter change.
- **Scroll‑to‑top button** with circular progress indicator, visible on all pages except the chat screen to avoid overlap.

### ⚡ Performance & SEO
- **Next.js 15 App Router** with Server Components for optimal performance.
- **unstable_cache** and **revalidateTag** for smart cache invalidation.
- **Lazy loading** for below‑the‑fold content (homepage sliders, product images).
- **Metadata & Open Graph** tags on all pages for SEO.
- Custom **404 page** with Persian messaging and navigation.

### ✍️ Content & Forms
- **Rich‑text editor** (TipTap) with image embedding for blog articles.
- **Zod validation** on both client (React Hook Form) and server (Server Actions).
- Inline **error handling** with toast notifications and field‑level messages.

### 📊 Charts & Dashboard
- **Monthly sales line chart** and **category pie chart** with dark‑mode‑aware colors.
- **Animated counters** (CountUp) for stats and hero numbers.
- Real‑time stats calculation using MongoDB aggregation pipelines.

### 🎨 User Experience
- **Full Dark Mode** – persisted in cookies & localStorage, zero flicker on reload.
- **Fully responsive** from mobile to wide desktop.
- Skeleton loaders, smooth animations, toast notifications.
- Custom Persian font (**Modam**) with full RTL support.
- Sticky headers and dynamic overlays for smooth navigation.


### 🎯 Attention to Detail
- **Custom‑styled scrollbar** matching the brand’s green identity (`#417f56`), applied globally.
- **Blocked user flow:** a logged‑in blocked user is immediately restricted from accessing any panel and redirected to the `/blocked` page with a helpful message. Once they log out, they cannot sign in again.
- Empty states designed with helpful illustrations and CTA buttons (empty cart, no orders, etc.).
- **Fallback images** for broken or missing profile pictures.

</div>

---

<a name="roles--rules"></a>

<div align="left">
  
## 👥 Roles & Rules

Giahland has **three distinct roles**, each with carefully scoped permissions. This separation ensures security, clean UX, and prevents unauthorized access.

</div>

<br>

| Permission | 👤 User | 🧑‍⚕️ Plant Doctor | 🛠️ Admin |
|---|---|---|---|
| Browse & search products | ✅ | ✅ | ✅ |
| Add to cart & checkout | ✅ | ❌ | ❌ |
| Like/Wishlist products | ✅ | ❌ | ❌ |
| Create & manage consultations | ✅(create) | ✅ (close) | ✅ (monitor all and close) |
| Real‑time chat in consultations | ✅ | ✅ | 👀 Read‑only |
| Create support tickets | ✅ | ✅ | ✅ (manage all and reply) |
| Write & publish blog articles | ❌ | ✅ | ✅ |
| Reply to approved comments | ❌ | ✅(conditional) | ✅ |
| Comment moderation | ❌ | ❌ | ✅ |
| View order history & factors | ✅(pay pending) | ❌ | ✅ (all users) |
| Update own profile & avatar | ✅ | ✅ | ✅ |
| Access admin dashboard | ❌ | ❌ | ✅ |
| Manage products (CRUD) | ❌ | ❌ | ✅ |
| Manage users (block/edit/create) | ❌ | ❌ | ✅ |
| Manage contact messages | ❌ | ❌ | ✅ |
| Change order status | ❌ | ❌ | ✅ |
| Receive role‑based notifications | ✅ | ✅ | ✅ |

<br>

<div align="left">

### 🚫 Important Restrictions

- **Plant Doctors & Admins** cannot add items to cart, checkout, or like products. These UI elements are **hidden** for them.
- **Plant Doctors** can only reply to comments that are:
  - on **any product** or on their **own articles**.
  - already **approved** by admin.
  - **not yet replied to** by admin.
- **Admins** can reply to any comment, and their reply **replaces** any existing doctor or admin response.
- **Blocked users** are instantly logged out and redirected to `/blocked`. They **cannot sign in** until unblocked by an admin.
- **The first registered user** automatically becomes the **super admin** with full system access.

</div>

---

<a name="-design-inspiration"></a>

<div align="left">

## 🎨 Design Inspiration

The initial visual direction for the homepage was inspired by an **early, unfinished concept** shared by **[Farhad Raoufi](https://www.figma.com/@farhadraoufi)** on Figma Community ([view concept](https://www.figma.com/community/file/1402547134501760376)), licensed under **CC BY 4.0**.  
As the original creator noted, *"this was designed as a concept and was never continued."*

Starting from that basic starting point, **Giahland was built from the ground up** and expanded into a full-featured, production‑grade platform — orders of magnitude beyond the initial idea:

- A fully integrated **e‑commerce store** with cart, checkout, and payment flow.
- A real‑time **plant clinic** with live chat and image sharing.
- Three dedicated **panels** for Users, Plant Doctors, and Admins.
- A complete **dark mode** system, role‑based notifications, interactive charts, and much more.

> This is not a redesign — it's a complete **product development**, turning an unfinished concept into a scalable, real‑world application.

</div>

---
<<<<<<< HEAD
---

<a name="-screenshots"></a>

## 🖼️ Screenshots

<div align="left">

> Each GIF shows the **desktop & mobile** view with a **light → dark mode** transition.

</div>

---

### 🏠 Homepage
<details open>
<summary>View Screenshots</summary>
<table>
  <tr>
    <td align="center"><strong>🖥️ Desktop</strong></td>
    <td align="center"><strong>📱 Mobile</strong></td>
  </tr>
  <tr>
    <td><img src="screenshots/homepage-desktop.gif" width="640" /></td>
    <td><img src="screenshots/homepage-mobile.gif" width="187" /></td>
  </tr>
</table>
</details>

### 🛒 Products
<details>
<summary>View Screenshots</summary>
<table>
  <tr>
    <td align="center"><strong>🖥️ Desktop</strong></td>
    <td align="center"><strong>📱 Mobile</strong></td>
  </tr>
  <tr>
    <td><img src="screenshots/products-desktop.gif" width="640" /></td>
    <td><img src="screenshots/products-mobile.gif" width="187" /></td>
  </tr>
</table>
</details>

### 📱 Product Detail
<details>
<summary>View Screenshots</summary>
<table>
  <tr>
    <td align="center"><strong>🖥️ Desktop</strong></td>
    <td align="center"><strong>📱 Mobile</strong></td>
  </tr>
  <tr>
    <td><img src="screenshots/product-detail-desktop.gif" width="640" /></td>
    <td><img src="screenshots/product-detail-mobile.gif" width="187" /></td>
  </tr>
</table>
</details>

### 👤 User Panel
<details>
<summary>View Screenshots</summary>
<table>
  <tr>
    <td align="center"><strong>🖥️ Desktop</strong></td>
    <td align="center"><strong>📱 Mobile</strong></td>
  </tr>
  <tr>
    <td><img src="screenshots/user-panel-desktop.gif" width="640" /></td>
    <td><img src="screenshots/user-panel-mobile.gif" width="187" /></td>
  </tr>
</table>
</details>

### 🩺 Consultation & Chat
<details>
<summary>View Screenshots</summary>
<table>
  <tr>
    <td align="center"><strong>🖥️ Desktop</strong></td>
    <td align="center"><strong>📱 Mobile</strong></td>
  </tr>
  <tr>
    <td><img src="screenshots/consultation-desktop.gif" width="640" /></td>
    <td><img src="screenshots/consultation-mobile.gif" width="187" /></td>
  </tr>
</table>
</details>

### 🛠️ Admin Dashboard
<details>
<summary>View Screenshots</summary>
<table>
  <tr>
    <td align="center"><strong>🖥️ Desktop</strong></td>
    <td align="center"><strong>📱 Mobile</strong></td>
  </tr>
  <tr>
    <td><img src="screenshots/admin-dashboard-desktop.gif" width="640" /></td>
    <td><img src="screenshots/admin-dashboard-mobile.gif" width="187" /></td>
  </tr>
</table>
</details>

---
=======
>>>>>>> master
