import { app } from "./app.js";
import connectDB from "./db/db.js";
import { PORT } from "./constant.js";

const main = async(port) => {
    try {
        await connectDB();
        app.listen(port);
    } catch (err) {
        console.log("MONGO db connection failed !!! ", err);
    }
};

main(PORT)
    .then(() => {
        console.log(
            `\t⚙️\t Server is running at port : ${PORT} \n\t⚙️\t Check Api Health at http://localhost:${PORT}/api/health`
        );
    })
    .catch((err) => {
        console.error(err);
    });

    