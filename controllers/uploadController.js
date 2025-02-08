const xml2js = require("xml2js");
const CreditReport = require("../models/CreditReport");

exports.processXML = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const xmlData = req.file.buffer.toString("utf-8");

    xml2js.parseString(xmlData, async (err, result) => {
      if (err) {
        return res.status(500).json({ message: "XML Parsing Error", error: err });
      }

      const transformedData = transformXMLData(result);

      try {
        await CreditReport.create(transformedData);
        res.json({ message: "XML processed successfully", data: transformedData });
      } catch (dbError) {
        console.error("Database Error:", dbError);
        res.status(500).json({ message: "Database Error", error: dbError });
      }
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server Error", error: error });
  }
};

function transformXMLData(xmlData) {
  const transformed = {};

  if (xmlData.INProfileResponse) {
    const profile = xmlData.INProfileResponse;

    const basicDetails = profile.Basic_Details?.[0] || {};

    transformed.Basic_Details = {
      Name: {
        First_Name: basicDetails.Name?.[0]?.First_Name?.[0] || "N/A",
        Middle_Name: basicDetails.Name?.[0]?.Middle_Name?.[0] || "N/A",
        Last_Name: basicDetails.Name?.[0]?.Last_Name?.[0] || "N/A",
      },
      Mobile_Phone: basicDetails.Mobile_Phone?.[0] || 0,
      PAN_Number: basicDetails.PAN_Number?.[0] || "N/A",
      Credit_Score: parseInt(basicDetails.Credit_Score?.[0]) || 0,
    };

    const reportSummary = profile.Report_Summary?.[0] || {};
    transformed.Report_Summary = {
      Total_number_of_accounts: parseInt(reportSummary.Total_number_of_accounts?.[0]) || 0,
      Active_accounts: parseInt(reportSummary.Active_accounts?.[0]) || 0,
      Closed_accounts: parseInt(reportSummary.Closed_accounts?.[0]) || 0,
      Current_balance_amount: parseInt(reportSummary.Current_balance_amount?.[0]) || 0,
      Secured_accounts_amount: parseInt(reportSummary.Secured_accounts_amount?.[0]) || 0,
      Unsecured_accounts_amount: parseInt(reportSummary.Unsecured_accounts_amount?.[0]) || 0,
      Last_7_days_credit_enquiries: parseInt(reportSummary.Last_7_days_credit_enquiries?.[0]) || 0,
    };

    const creditAccounts = profile.Credit_Accounts_Information?.[0] || {};
    transformed.Credit_Accounts_Information = {
      Bank_Name: creditAccounts.Bank_Name?.[0] || "N/A",
      Account_Number: creditAccounts.Account_Number?.[0] || "N/A",
      Address: creditAccounts.Address?.[0] || "N/A",
      Amount_Overdue: parseInt(creditAccounts.Amount_Overdue?.[0]) || 0,
      Current_Balance: parseInt(creditAccounts.Current_Balance?.[0]) || 0,
    };
  }

  return transformed;
}
