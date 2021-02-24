import {app} from './app'

const serverPort: Number = 3333;

app.listen(serverPort, () => console.log(`Server is running on ${serverPort}!`));

