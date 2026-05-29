import express from "express";
import cors from "cors";
import categoryRoutes from "./routes/category.routes";
import authRoutes from "./routes/auth.routes";
import menuItemRoutes from "./routes/menu-item.routes";
import orderRoutes from "./routes/order.routes";


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Karinderya POS API Running",
  });
});

app.use("/api/auth", authRoutes);
app.use(
  "/api/menu-items",
  menuItemRoutes
);

export default app;