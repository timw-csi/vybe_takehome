Hello Vybers,

Thanks for the opportunity and I look forward to speaking with you about this assignment :)

## Environment variables

.env file would never be shared to public repo, but for this assignment in `backend` dir, all you need to do is remove `.example` from end of `.env.example` filename for environment variables to work.

## To spin up the backend

```sh
docker compose down -v   # to stop and clean up any previous docker instances 

cd backend
npm install
docker compose build
docker compose up
```

## To spin up the frontend in dev environment

```sh
cd frontend
npm install
npm run dev
```

## To run tests

```sh
cd frontend
npm test
```

## To build frontend

```sh
cd frontend
npm run build
npm run preview
```

## To build entire project, serving static JS of frontend

"Bonus points if you implement a build script to create the backend server container and include the frontend code to serve using SSR or static JS."

**from root dir of project**:

```sh
docker compose down -v   # to stop and clean up any previous docker instances

docker compose build
docker compose up
```

browse to http://localhost:3000

## Final thoughts

Overall, I feel like this application works well. For testing, I find that vitest works more smoothly with Vite projects, and it has a similar syntax to Jest, so I went with vitest. Some things I would have liked to accomplish with more time: adding testing on the backend and figuring out how to get the y-axis values to appear in the tooltip for the non-piechart apexcharts.

- Tim
