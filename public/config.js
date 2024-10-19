// const API_CLASS_ENDPOINT =
//   "http://cliniqueplushealthcare.com.ng/prescriptions/drug_class";

// const API_MEDICINE_ENDPOINT =
//   "https://cliniqueplushealthcare.com.ng/prescriptions/get_drug_class_by_id";

// const API_ALL_MEDICINE_ENDPOINT =
//   "https://cliniqueplushealthcare.com.ng/prescriptions/all_medicine/";

// export { API_CLASS_ENDPOINT, API_MEDICINE_ENDPOINT, API_ALL_MEDICINE_ENDPOINT };

// const config = {
//   API_CLASS_ENDPOINT:
//     process.env.API_CLASS_ENDPOINT || "https://default-api-url.com",
//   API_MEDICINE_ENDPOINT:
//     process.env.API_MEDICINE_ENDPOINT || "https://default-medicine-url.com",
// };

// export default config;


const API_CLASS_ENDPOINT = process.env.NEXT_PUBLIC_API_CLASS_ENDPOINT;
const API_MEDICINE_ENDPOINT = process.env.NEXT_PUBLIC_API_MEDICINE_ENDPOINT;

export { API_CLASS_ENDPOINT, API_MEDICINE_ENDPOINT };
