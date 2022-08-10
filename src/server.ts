import app from './app';

process.on('SIGINT', () => {
    server.close((err:any) => {
        process.exit(err ? 1 : 0);
    });
});

const port = 3002
const server = app.listen(port, () => {
    console.log(`Running at ${port}`);
});

export default server;
