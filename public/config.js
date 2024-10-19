const config = {
  API_CLASS_ENDPOINT:
    process.env.API_CLASS_ENDPOINT ||
    "http://default-api-url.com/prescriptions/drug_class",
  API_MEDICINE_ENDPOINT:
    process.env.API_MEDICINE_ENDPOINT ||
    "http://default-api-url.com/prescriptions/get_drug_class_by_id",
  API_ALL_MEDICINE_ENDPOINT:
    process.env.API_ALL_MEDICINE_ENDPOINT ||
    "https://cliniqueplushealthcare.com.ng/prescriptions/all_medicine/",
};

export default config;
