import { useEffect, useState } from "react";
import api from "../services/api";
import "./ReportsPage.css";

interface ReportSummary {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  bestSellingItem: string;
}

export default function ReportsPage() {
  const [report, setReport] =
    useState<ReportSummary | null>(
      null
    );

  

  async function loadReport() {
    try {
      const response =
        await api.get(
          "/reports/summary"
        );

      setReport(
        response.data.data
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to load reports"
      );
    }
  }

  useEffect(() => {
    loadReport();
  }, []);

  if (!report) {
    return (
      <div className="reports-container">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="reports-container">
      <h1 className="page-title">
        Reports
      </h1>

      <div className="reports-grid">
        <div className="report-card">
          <h3>Total Sales</h3>

          <p>
            ₱
            {report.totalSales.toLocaleString()}
          </p>
        </div>

        <div className="report-card">
          <h3>Total Orders</h3>

          <p>
            {report.totalOrders}
          </p>
        </div>

        <div className="report-card">
          <h3>Average Order</h3>

          <p>
            ₱
            {report.averageOrderValue.toFixed(
              2
            )}
          </p>
        </div>

        <div className="report-card">
          <h3>Best Seller</h3>

          <p>
            {
              report.bestSellingItem
            }
          </p>
        </div>
      </div>
    </div>
  );
}