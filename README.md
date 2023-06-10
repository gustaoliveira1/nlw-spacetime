# NLW Spacetime

This project is a time capsule, developed at [Rocketseat](https://rocketseat.com.br)'s NLW Spacetime (Next Level Week), and allows users to store their memories so that they can be seen in the future. And I definitely learned a lot at the event.

## Installation

1. Clone this repository to your local repository.

```bash
git clone https://github.com/gustaoliveira1/nlw-spacetime.git
```

2. Enter in the `server` folder.

```bash
cd server
```

- 2.1. Install dependencies.

```bash
npm install
```

- 2.2. Go to your github, create a application and copy the client id and client secret. After create an `.env` file in the root folder of the server and create the environment variables `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`.
- 2.3. Follow the steps in the [ORM Prisma](https://prisma.io) to create a sqlite database.
- 2.4. Create `uploads` folder on server root.
- 2.5. Run the server.

```bash
npm run dev
```

I also had the front end of the project but it was lost by a bug in git :c
