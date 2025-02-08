const mongoose = require("mongoose");

const CreditReportSchema = new mongoose.Schema({
  Basic_Details: {
    Name: {
      First_Name: String,
      Middle_Name: String,
      Last_Name: String,
    },
    Mobile_Phone: Number,
    PAN_Number: String,
    Credit_Score: Number,
  },
  Report_Summary: {
    Total_number_of_accounts: Number,
    Active_accounts: Number,
    Closed_accounts: Number,
    Current_balance_amount: Number,
    Secured_accounts_amount: Number,
    Unsecured_accounts_amount: Number,
    Last_7_days_credit_enquiries: Number,
  },
  Credit_Accounts_Information: {
    Bank_Name: String,
    Account_Number: String,
    Address: String,
    Amount_Overdue: Number,
    Current_Balance: Number,
  }
});

module.exports = mongoose.model("CreditReport", CreditReportSchema);