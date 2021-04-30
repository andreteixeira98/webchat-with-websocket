
import { http } from "./app";
import './webSocket/Client';
import './webSocket/Admin';

const port = process.env.PORT || 4000;

http.listen(port, () => {
    console.log(`server is running in port ${port}`);
});
