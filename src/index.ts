import * as dotenv from 'dotenv';
dotenv.config()

import app from './server';

app.listen(2001, () => {
    console.log('server listening on http://localhost:2001')
})