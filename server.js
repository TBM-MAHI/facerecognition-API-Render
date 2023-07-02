let app = require('./app');
const http = require('http');
const PORT = process.env.PORT || 3001;


http.createServer(app).listen(PORT, (error) => {
  if (error)
    console.log(`error`, error);
  console.log(`server is listening..at port ${PORT} `);
});
