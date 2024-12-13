import { Schema, model } from "mongoose";

const courtCaseSchema = new Schema({
 CaseTitle: {
    type: String,
    default: "",
    required: true,
  },
  offenseType:{
    type: String,
    default: "",
  },
  daysInCustody: {
    type: Number,
    default: 0,
  },
  bailStatus : {
    type: String,
    default: "",
  },
  nextHearingDate: {
    type: String,
    default: "",
  },
  petitionerName: {
    type: String,
    default: "",
  },
  respondentName: {
    type: String,
    default: "",
  },
  advocateName: {
    type: String,
    default: "",
  },
  actSection: {
    type: String,
    default: "",
  },
  timeSerevedInPrison: {
    type: String,
    default: "",
  },
  caseRiskScore: {
    type: Number,
    default: 0,
  },
  bailable:{
    type: String,
    default: "no",
  },
  cognizable:{
    type: String,
    default: "yes",
  },
  punishment: {
    type: String,
    default: "",
  },
  section :{
    type: String,
    default: "",
  },
  status: { type: String, enum: ["Open", "Closed", "In Progress"] },
  caseNumber: {
    type: String,
    default: "",
    required: true,
  },
  plaintffName:{
    type: String,
    default: "",
    required: true,
  },
  defendantfName: {
    type: String,
    default: "",
    required: true,
  },
  plaintiffLawyerName: {
    type: String,
    default: "",
    required: true,
  },
  defendantLawyerName: {
    type: String,
    default: "",
    required: true,
  },
  judgeName: {
    type: String,
    default: "",
    required: true,
  },
  priority: {
    type: String,
    default: "",
    required: false,
  },
  filingNumber: {
    type: String,
    default: "",
    required: true,
  },
  filingDate: {
    type: String,
    default: "",
    required: true,
  },
  listingDate: {
    type: String,
    default: "",
    required: true,
  },
  filingYear: {
    type: String,
    default: "",
    required: true,
  },
});

export default model("CourtCase", courtCaseSchema);
