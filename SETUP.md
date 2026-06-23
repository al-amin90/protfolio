# Setup and Run

1. Install dependencies:

```bash
npm install
npm install --save jsonwebtoken multer cloudinary next-connect
```

2. Create a `.env` with values:

- `DATABASE_URL` — MongoDB connection string
- `JWT_ACCESS_TOKEN` — JWT secret
- `ADMIN_EMAIL` — admin login email
- `ADMIN_PASSWORD` — admin password
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

3. Run dev server:

```bash
npm run dev
```

4. Visit `/login` to sign in, then `/dashboard` to manage projects.
