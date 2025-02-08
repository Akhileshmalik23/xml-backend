const mongoose = require("mongoose");

const CreditReportSchemaCopy = new mongoose.Schema({
  Header: {
    SystemCode: Number,
    MessageText: String,
    ReportDate: Number,
    ReportTime: Number,
  },
  UserMessage: {
    UserMessageText: String,
  },
  CreditProfileHeader: {
    Enquiry_Username: String,
    ReportDate: Number,
    ReportTime: Number,
    Version: String,
    ReportNumber: Number,
    Subscriber: String, // Might be better as an ObjectId referencing a Subscriber collection
    Subscriber_Name: String,
  },
  Current_Application: {
    Current_Application_Details: {
      Enquiry_Reason: Number,
      Finance_Purpose: String,
      Amount_Financed: Number,
      Duration_Of_Agreement: Number,
      Current_Applicant_Details: {
        Last_Name: String,
        First_Name: String,
        Middle_Name1: String,
        Middle_Name2: String,
        Middle_Name3: String,
        Gender_Code: String,
        IncomeTaxPan: String,
        PAN_Issue_Date: Number, // Consider Date type if format is consistent
        PAN_Expiration_Date: Number, // Consider Date type
        Passport_number: String,
        Passport_Issue_Date: Number, // Consider Date type
        Passport_Expiration_Date: Number, // Consider Date type
        Voter_s_Identity_Card: String,
        Voter_ID_Issue_Date: Number, // Consider Date type
        Voter_ID_Expiration_Date: Number, // Consider Date type
        Driver_License_Number: String,
        Driver_License_Issue_Date: Number, // Consider Date type
        Driver_License_Expiration_Date: Number, // Consider Date type
        Ration_Card_Number: String,
        Ration_Card_Issue_Date: Number, // Consider Date type
        Ration_Card_Expiration_Date: Number, // Consider Date type
        Universal_ID_Number: String,
        Universal_ID_Issue_Date: Number, // Consider Date type
        Universal_ID_Expiration_Date: Number, // Consider Date type
        Date_Of_Birth_Applicant: Number, // Consider Date type
        Telephone_Number_Applicant_1st: String,
        Telephone_Extension: String,
        Telephone_Type: String,
        MobilePhoneNumber: String,
        EMailId: String,
      },
      Current_Other_Details: {
        Income: Number,
        Marital_Status: String,
        Employment_Status: String,
        Time_with_Employer: String,
        Number_of_Major_Credit_Card_Held: Number,
      },
      Current_Applicant_Address_Details: {
        FlatNoPlotNoHouseNo: String,
        BldgNoSocietyName: String,
        RoadNoNameAreaLocality: String,
        City: String,
        Landmark: String,
        State: String,
        PINCode: Number,
        Country_Code: String,
      },
      Current_Applicant_Additional_AddressDetails: String, // Or a more specific schema if needed
    },
  },
  CAIS_Accountsa: {
    CAIS_Summary: {
      Credit_Account: {
        CreditAccountTotal: Number,
        CreditAccountActive: Number,
        CreditAccountDefault: Number,
        CreditAccountClosed: Number,
        CADSuitFiledCurrentBalance: Number,
      },
      Total_Outstanding_Balance: {
        Outstanding_Balance_Secured: Number,
        Outstanding_Balance_Secured_Percentage: Number,
        Outstanding_Balance_UnSecured: Number,
        Outstanding_Balance_UnSecured_Percentage: Number,
        Outstanding_Balance_All: Number,
      },
    },
    CAIS_Account_DETAILS: [ // Array to handle multiple accounts
      {
        Identification_Number: String,
        Subscriber_Name: String,
        Account_Number: String,
        Portfolio_Type: String,
        Account_Type: String,
        Open_Date: Number, // Consider Date type
        Credit_Limit_Amount: Number,
        Highest_Credit_or_Original_Loan_Amount: Number,
        Terms_Duration: String,
        Terms_Frequency: String,
        Scheduled_Monthly_Payment_Amount: Number,
        Account_Status: Number,
        Payment_Rating: Number,
        Payment_History_Profile: String,
        Special_Comment: String,
        Current_Balance: Number,
        Amount_Past_Due: Number,
        Original_Charge_Off_Amount: Number,
        Date_Reported: Number, // Consider Date type
        Date_of_First_Delinquency: Number, // Consider Date type
        Date_Closed: Number, // Consider Date type
        Date_of_Last_Payment: Number, // Consider Date type
        // ... (Add other fields from CAIS_Account_DETAILS as needed)
        CAIS_Account_History: [ // Array for history
          {
            Year: Number,
            Month: Number,
            Days_Past_Due: Number,
            Asset_Classification: String,
          },
        ],
        CAIS_Holder_Details: {
          Surname_Non_Normalized: String,
          First_Name_Non_Normalized: String,
          Middle_Name_1_Non_Normalized: String,
          // ... other CAIS_Holder_Details
        },
        CAIS_Holder_Address_Details: {
          First_Line_Of_Address_non_normalized: String,
          // ... other CAIS_Holder_Address_Details
        },
        CAIS_Holder_Phone_Details: {
          Telephone_Number: String,
          // ... other CAIS_Holder_Phone_Details
        },
        CAIS_Holder_ID_Details: {
          Income_TAX_PAN: String,
          // ... other CAIS_Holder_ID_Details
        },
      },
    ],
  },
});

module.exports = mongoose.model("CreditReportCopy", CreditReportSchemaCopy);