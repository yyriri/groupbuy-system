console.log(" server.js 最新版本已启动");
console.log("BUY API 已加载");
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

app.use(
    cors({
        origin: "http://127.0.0.1:5500"
    })
);// 👈 就是这里
app.use(express.json());

// 测试接口
app.get("/", (req, res) => {
    res.send("server is running");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});

app.post("/buy", async (req, res) => {
    const { buyer_name, quantity, product_id } = req.body;

    try {
        // 1. 查商品库存
        const productResult = await pool.query(
            "SELECT * FROM products WHERE id = $1",
            [product_id]
        );

        const product = productResult.rows[0];


        // 2. 判断库存
        if (product.stock < quantity) {
            return res.json({
                success: false,
                message: "库存不足"
            });
        }

        // 3. 扣库存
        await pool.query(
            "UPDATE products SET stock = stock - $1 WHERE id = $2",
            [quantity, product_id]
        );

        // 4. 创建订单
        await pool.query(
            "INSERT INTO orders (buyer_name, product_id, quantity) VALUES ($1, $2, $3)",
            [buyer_name, product_id, quantity]
        );

        res.json({
            success: true,
            message: "购买成功"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "服务器错误"
        });
    }
});

app.get("/products", async (req, res) => {
    const result = await pool.query(
        "SELECT * FROM products ORDER BY id ASC"
    );
    res.json(result.rows);
});
