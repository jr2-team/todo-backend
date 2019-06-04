import errorhandler from 'errorhandler';
import app from './startup';

app.use(errorhandler);

const server = app.listen(app.get('port'), () => {
    console.log(`App is running at http://localhost:${app.get('port')} in DEV mode`);
    console.log('  Press CTRL-C to stop\n');
});

export default server;