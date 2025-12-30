import app from "./app.js";
import config from "./utils/env.js";
app.listen(config.PORT, () => {
    console.log(`Server running at → ${config.HOST}`);
    console.log(`Coba buka semua route di atas pakai Postman!`);
});
//# sourceMappingURL=index.js.map
