"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PORT = 80;
const main = async () => {
    const app = (0, express_1.default)();
    app.listen(PORT, () => {
        console.log(`Server ready at http://localhost:${PORT}`);
    });
};
main().catch(e => {
    console.error(e);
});
