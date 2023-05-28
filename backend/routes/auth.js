const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    const obj = {
        a: "nouman",
        number: 23
    }
    res.send(obj);
})

module.exports = router;