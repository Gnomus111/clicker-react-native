const express = require("express"); // экземпляр для запуска пакетов сервера
require('dotenv').config();
// назначение порта для сервера (нельзя использовать 3000 порт, так как он используется для frontend)
const PORT = process.env.PORT || 3001;


const app = express();


app.listen(PORT, () => {
    console.log(`Server starting on port ${PORT}`);
});

app.get("/api", (req, res) => {
    res.json({
        message: "Hello from backend server",
    });
});

app.use(express.json()); // работа с данными передаваемые с фронта

app.put("/api/data/:id", (req, res) => {
    const id = req.params.id;
    const updatedData = req.body; //! Не сработает без - app.use(express.json());

    if (data.id !== parseInt(id)) {
        return res.status(404).send("Data not found");
    }

    data = {
        ...data,
        ...updatedData
    }; // изменение данных на сервере

    res.json(data); // возврат данных на ответ
});