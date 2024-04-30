## WSD ASSESSMENT

### SSO Authentication Auth Service Provider

Please navigate to `auth-service` folder from command line

Run Command

```sh
npm i
```

Run this command

```sh
touch .env && cat .env.local > .env
```

Or manually create `.env` file in the root. And copy `.env.local` to `.env`
Run Command

```sh
npm run dev
```

> This is for just demonstration purpose.
> Not implemented any database for data persist.
> Here `JWT_SECRET` use a random string.
> No validation added for `email` and `password` matching.

### Backend with Typescript and Express

Please navigate to `backend` folder from command line

Run Command

```sh
npm i
```

Run this command

```sh
touch .env && cat .env.local > .env
```

Or manually create `.env` file in the root. And copy `.env.local` to `.env`

Run Command

```sh
npm run dev
```

> Frontend must run on `localhost:3000`.
> This host has been white listed for `cors` in backend server.

### Frontend with React

Please navigate to `frontend` folder from command line.

Run Command

```sh
npm i
```

```sh
npm start
```

### Test

Navigate to `backend` and run `npm run test`
