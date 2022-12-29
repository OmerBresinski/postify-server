## Server

1. cd into the `server` directory
2. Create a `.env` file with the following variables:
- `DATABASE_URL= (very easy to init one with railyway.app, postgresql preferred)`
- `SERVER_PORT=4000`
- `TWITTER_API_KEY= your twitter app credentials`
- `TWITTER_API_SECRET= your twitter app credentials`
- `TWITTER_CALLBACK_URL= your twitter app credentials`
- `TWITTER_ACCESS_TOKEN= your twitter app credentials`
- `TWITTER_ACCESS_TOKEN_SECRET= your twitter app credentials`
- `TWITTER_CLIENT_ID= your twitter app credentials`
- `TWITTER_CLIENT_SECRET= your twitter app credentials`
3. Run the following commands to start the server:
- `npm install`
- `npm run migrate:dev migration_name`
- `npm run build`
- `npm run start:watch`
4. Whenever you change the entity structure in the `prisma.schema` file, make sure to run `npm run migrate:dev` again.
