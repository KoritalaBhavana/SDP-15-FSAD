# Travel Nest Pro

Travel Nest Pro is a Vite + React + TypeScript app with role-based auth and dashboard flows.

## Local setup

1. Install dependencies:

```sh
npm install
```

2. Create local env file from template:

```sh
cp .env.example .env
```

3. Add Firebase values to `.env`.

4. Start development server:

```sh
npm run dev
```

## Google authentication setup (Sign In + Sign Up)

The app now supports Google auth via Firebase Auth. The same Google button works for:

- Sign In with Google
- Sign Up with Google

Admin Sign Up is blocked by design, including Google sign-up.

### Required environment variables

Set these values in local `.env` and in Netlify site environment variables:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## Deploy updates for GitHub and Netlify

### GitHub

1. Push these code changes to your GitHub repository.
2. If you run preview/build pipelines from GitHub, add the same Firebase variables in your repository or environment secrets.

### Netlify

1. Site settings → Environment variables: add all `VITE_FIREBASE_*` values.
2. Build settings are configured via `netlify.toml`:
	- Build command: `npm run build`
	- Publish directory: `dist`

## Scripts

- `npm run dev` – start local dev server
- `npm run build` – production build
- `npm run preview` – preview production build
- `npm run test` – run test suite
