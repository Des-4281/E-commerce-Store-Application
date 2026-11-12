# E-Commerce Store

An online store built with React, TypeScript, Redux Toolkit, and React Query. It loads products from the [FakeStoreAPI](https://fakestoreapi.com/), lets you filter them by category, and has a shopping cart that is saved in sessionStorage and cleared on checkout.

## Features

- **Product catalog.** Every product shows its image, title, price, category, description, and rating, with an **Add to Cart** button.
- **Category filter.** The dropdown is built from the API's category list, not hard-coded. Choosing a category loads only that category's products.
- **Image fallback.** If a product image fails to load (some FakeStore images return 404), a "No image" placeholder is shown instead.
- **Shopping cart.** Shows each item's image, title, count, and price. Change the count with − and +, or remove the item.
- **Live totals.** The cart shows the total number of items and the total price, and the navbar badge shows the item count on every page.
- **Saved in sessionStorage.** The cart is stored as an array of product objects, so it survives page refreshes and moving between pages.
- **Checkout.** Simulates an order by clearing the cart in Redux and sessionStorage, then shows a success message.

## Tech stack

- React 19 + TypeScript
- Vite
- Redux Toolkit + React Redux (cart state)
- TanStack React Query (fetching products and categories)
- React Router 7
- React-Bootstrap 5

## Getting started

```bash
git clone https://github.com/YOUR-USERNAME/ecommerce-store.git
cd ecommerce-store
npm install
npm run dev
```

Then open http://localhost:5173. No API keys or `.env` file are needed.

Other scripts:

| Command | What it does |
|---|---|
| `npm run build` | Type-checks and builds the app into `dist/` |
| `npm run preview` | Serves the built app locally |
| `npm run lint` | Runs ESLint |

## How to use it

1. **Browse** products on the Home page.
2. **Filter** by picking a category from the dropdown, or choose "All categories" to see everything.
3. **Add to cart** with the button on any product. The Cart badge in the navbar updates right away.
4. **Open the cart** to change counts, remove items, and see the totals.
5. **Check out** to clear the cart and see the confirmation message.

## Pages

| Page | URL | What it does |
|---|---|---|
| Home | `/` | Product list, category dropdown, Add to Cart buttons |
| Cart | `/cart` | Cart contents, totals, Checkout button |
| Not found | any other URL | "Page not found" message |

## Project structure

```
src/
  types.ts                  Product and CartItem types
  main.tsx                  Wraps the app in the Router, Redux, and React Query providers
  App.tsx                   NavBar and the routes
  index.css                 Image sizing for product cards and cart thumbnails
  api/fakeStore.ts          fetch functions for the FakeStoreAPI endpoints
  hooks/useStoreQueries.ts  React Query hooks: useCategories and useProducts
  redux/cartSlice.ts        Cart state, actions, selectors, and sessionStorage helpers
  redux/store.ts            Redux store; saves the cart to sessionStorage after every change
  components/NavBar.tsx     Top navigation with the live cart count
  components/ProductImage.tsx  Image that switches to a placeholder if it fails to load
  components/ProductCard.tsx   One product with its Add to Cart button
  pages/HomePage.tsx        Category dropdown and product grid
  pages/CartPage.tsx        Cart list, totals, and checkout
  pages/NotFoundPage.tsx    Shown for unknown URLs
public/
  placeholder.svg           The fallback "No image" picture
```

## How it works

### React Query vs. Redux

The app keeps two kinds of data in two places:

- **Server data** (products and categories) comes from the API, so **React Query** handles it. It fetches the data, caches it, and tracks loading and error states. `useProducts(category)` uses the category in its query key, so changing the dropdown fetches the matching endpoint:
  - `""` (All categories) → `GET /products`
  - `"electronics"` → `GET /products/category/electronics`
- **App data** (the cart) belongs to the user, so **Redux Toolkit** handles it. The cart slice defines the only ways the cart can change: `addToCart`, `updateCount`, `removeFromCart`, and `clearCart`. Totals are calculated by selectors from the cart items, so they are always accurate.

### Keeping sessionStorage in sync

- When the app starts, the cart slice's initial state is loaded from sessionStorage.
- `store.subscribe` in `store.ts` runs after every Redux action and saves the cart array to sessionStorage under the key `cart`.
- When the cart is empty, the `cart` key is removed. That's how checkout clears both Redux and sessionStorage with one action.

sessionStorage is cleared when the browser tab closes. The cart survives refreshes and page changes within the tab.

### Image fallback

`ProductImage` renders a normal `<img>`. If the image fails to load, its `onError` handler sets a `failed` state, and the image switches to `/placeholder.svg`. The placeholder is part of the project, so it can't go missing the way an outside image can.

## License

MIT
