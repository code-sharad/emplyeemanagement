import { app } from "./src/app.js";
import connectDB from "./src/db/db.js";
import { PORT } from "./src/constant.js";

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

    