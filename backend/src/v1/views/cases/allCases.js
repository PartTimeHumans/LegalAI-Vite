import cases from "../../models/CourtCase.js";

const allCase = async (request, response) => {
  try {
    const allCases = await cases.find();
    return allCases;
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

const getDetail = async (id) => {
  try {
    const Case = await cases.findById(id);
    if (!Case || Case.length === 0) {
      throw new Error("Case not found");
    }
    return Case;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { getDetail, allCase };
