import errorhandler from 'errorhandler';
import app from './startup';

app.use(errorhandler);

const server = app.listen(8080/*app.get('port')*/, () => {
    console.log(`App is running at http://localhost:8080 in DEV mode`);
    console.log('  Press CTRL-C to stop\n');
});

export default server;