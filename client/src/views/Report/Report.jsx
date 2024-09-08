import { useState, useEffect } from "react";
import axios from "axios";
import "./Report.css"; // Import CSS for styling

const DailyReport = () => {
  const [reports, setReports] = useState([]);

  // const [newReport, setNewReport] = useState({ employeeName: '', reportContent: '' });

  useEffect(
    () => {
      // Fetch daily reports from an API (placeholder function)
      fetchReports();
    },
    [],
    setReports
  );

  const fetchReports = async () => {
    // Placeholder data, replace with API call

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const response = await axios.get("/api/v1/admin/getDailyReport", config);

    console.log(response);

    const info = response.data.data;

    console.log(info);

    setReports(info);
  };

  const markAsReviewed = (id) => {
    setReports(
      reports.map((report) =>
        report.id === id ? { ...report, status: "Reviewed" } : report
      )
    );
  };

  const deleteReport = (id) => {
    setReports(reports.filter((report) => report.id !== id));
  };

  return (
    <div className="report-container ">
      <h2>Daily Reports</h2>

      {/******   this is the list of reports   *******/}
      <ul>
        {reports.map((report) => (
          <li
            key={report._id}
            className={report.isActive ? "active" : "not-active"}
          >
            <h3 className="text-lg font-semibold">
              {report.firstName} &nbsp; &nbsp;{report.lastName}
            </h3>

            <p className="flex flex-col space-x-3">
              {report.dailyReports.map((dailyReport) => {
                dailyReport;
              })}
            </p>

            <span className="text-lg">{report.email}</span>
            <span className="text-lg">
              {report.isActive ? (
                <span className="text-green-600"> 🟩 Active</span>
              ) : (
                <span className="text-red-600"> 🟥 not Active</span>
              )}
            </span>
            <div>
              {report.status === "Pending" && (
                <button onClick={() => markAsReviewed(report.id)}>
                  Mark as Reviewed
                </button>
              )}
              <button onClick={() => deleteReport(report.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyReport;
