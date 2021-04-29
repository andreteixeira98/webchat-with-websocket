
import { http } from "./app";
import './webSocket/Client';
import './webSocket/Admin';

const port = process.env.PORT || 3000;

http.listen(port, () => {
    console.log("server is running on port:", port);
});
