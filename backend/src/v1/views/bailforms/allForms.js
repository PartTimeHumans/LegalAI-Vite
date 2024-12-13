import forms from "../../models/formModel.js";

const allForms = async (request, response) => {
  try {
    const allForms = await forms.find();
    let data = allForms;
    return data;
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

export default allForms;
