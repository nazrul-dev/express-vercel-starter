
import helmet from 'helmet';

import 'dotenv/config'
import express from 'express'
import nodeCleanup from 'node-cleanup'
import routes from './routes.js'
import { init, cleanup } from './whatsapp.js'
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(helmet());
app.use('/', routes);



var listener = app.listen(function(){
    init()
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});

nodeCleanup(cleanup)

app.all('*', (req, res) => res.status(404).json('route not defined'));

export {app}
