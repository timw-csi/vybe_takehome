## To spin up the backend in dev environment

```sh
cd backend
npm install
docker compose up
```

## To spin up the frontend in dev environment

```sh
cd frontend
npm install
npm run dev
```

## To run tests

```
cd frontend
npm test
```

Overall, I feel like this application works well, besides the testing (Vite/React/Typescript not playing well together). Some things I would have liked to accomplish with more time: making use of environment variables instead of hardcoding URL for connection to the Redis database, and figuring out how to get the y-axis values to appear in the tooltip for the non-piechart apexcharts.

- Tim
