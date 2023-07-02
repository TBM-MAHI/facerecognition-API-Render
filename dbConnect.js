module.exports = {
    client: "pg",
    connection: {
        connectionString: process.env.DB_URL,
        ssl: { rejectUnauthorized: false },
        host: process.env.DB_HOST,
        port: 5432,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
}