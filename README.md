NodeJS API for KTU social media app. Major dependencies:
```
 Express
 
 ts-node

 For authentication/sessions, Jwt

 PostgreSQL and TypeORM

 phantom for headless web browser for web scraping
```

In the future, I ***hope*** to;

- [ ] Make the codebase more readable, there are still some files where controllers have business logic
- [ ] Implement socket.io or a message broker like kafka
- [ ] Extend on role structure

To run the project, first make sure you're running a postgreSQL database, then create an ormconfig.json file.
Here's an example below:
```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "<YOUR PASSWORD>",
  "database": "<YOUR DATABASE NAME>",
  "synchronize": true,
  "entities": ["src/entities/**/*.ts", "dist/entities/**/*.js"]
}
```
Then, run

```npm install```

```npm run start```

and the API should be up and running.
