This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started


First, you need to create a GitHubApplication and get GITHUB_ID
GITHUB_SECRET to set in .env variables:

Steps:
  - 1 Go to github.com, login into your profile and click into your avatar
  - 2 Click in settings
  - 3 Developer settings
  - 4 Github Apps
  - 5 New GitHub App
  - 6 Select a title to your application (i putted "FlexianaTesting in my")
      - Homapage url field: http://localhost:3000/
      - Callback URL field: http://localhost:3000/api/auth/callback
  - 7 After this steps you will be able to take github_id and github_secret


Second, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Libs used

```bash
Design Patterns:

    - commitizen
    - Husky
    - Eslint
    - Prettier
    - Eslint Unicorn
    - Ts-prune

Context:

    - Zustand:
        - In our application there was not necessarily a need to use a
        provider such as zustand, redux, context, among others, but i wanted
        to demonstrate how it would be used on a daily basis

    - React-Query:
        - React-query is a lib to cache information on the front end. I used it in hooks format, and with fully typed request and response

    - Axios:
        - Call apis

    - React-Hook-Forms:
        - decrease re-render on screen

    - Nookies:
        - Cookies manipulation

    - Next-auth:
        - Auth with github

    - Chakra:
        - UI Lib


```

## Project Structure

```bash

    -> @Types: Change default next type to add some authenticated layouts
    -> api: Config request/response api and axios instance
    -> components: global components
    -> layouts: We have two layouts types, when user is logged and other for user without sessions (like sign screen, reset password, etc...)
    -> modules: Create to be import in pages, but in modules we can add types and more files that would not be possible in pages
    -> pages: next system pages
    -> services: react query hooks
    -> store: zustand providers
    -> theme: chakra theme
    -> types: global types
    -> utils: system utils

```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
