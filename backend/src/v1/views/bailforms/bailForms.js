import bailForms from "../../models/formModel.js";

let bailFormStorage = [];

const bailForm = async (request, response) => {
  try {
    const baildata = new bailForms({
      petitioner: {
        name: request.body.petitioner.name,
        gender: request.body.petitioner.gender,
        dob: request.body.petitioner.dob,
        age: request.body.petitioner.age,
        advocateName: request.body.petitioner.advocateName,
        barRegnNo: request.body.petitioner.barRegnNo,
        email: request.body.petitioner.email,
        phone: request.body.petitioner.phone,
        address: request.body.petitioner.address,
        pincode: request.body.petitioner.pincode,
      },
      respondent: {
        organizationDetails: request.body.respondent.organizationDetails,
        organizationName: request.body.respondent.organizationName,
        respondentName: request.body.respondent.respondentName,
        advocateName: request.body.respondent.advocateName,
        barRegnNo: request.body.respondent.barRegnNo,
        email: request.body.respondent.email,
        phone: request.body.respondent.phone,
        address: request.body.respondent.address,
        pincode: request.body.respondent.pincode,
      },
      policeStation: {
        challanType: request.body.policeStation.challanType,
        state: request.body.policeStation.state,
        district: request.body.policeStation.district,
        policeStationCode: request.body.policeStation.policeStationCode,
        firType: request.body.policeStation.firType,
        firNo: request.body.policeStation.firNo,
        firYear: request.body.policeStation.firYear,
        dateOfOffence: request.body.policeStation.dateOfOffence,
        firDate: request.body.policeStation.firDate,
      },
      actSection: request.body.actSection.map((section) => ({
        act: section.act,
        sections: section.sections,
      })),
      bail: {
        caseType: request.body.bail.caseType,
        crimeRegisteredOffice: request.body.bail.crimeRegisteredOffice,
        firNo: request.body.bail.firNo,
        ipcSection: request.body.bail.ipcSection,
        caseDescription: request.body.bail.caseDescription,
        offenceType: request.body.bail.offenceType,
        offenceAgainst: request.body.bail.offenceAgainst,
      },
    });
    try {
      await baildata.save();
      console.log("Data saved to MongoDB");
    } catch (dbError) {
      console.error("MongoDB Error:", dbError.message);
      const error = { message: "Internal server error" };
      return { error };
    }

    bailFormStorage.push(baildata);
    console.log(bailFormStorage);

    let data = bailFormStorage;
    return { data };

    // Save the bailForm or perform other operations
  } catch (error) {
    return { error: `err in bailform registraion ${error}` };
  }
};

export default bailForm;
