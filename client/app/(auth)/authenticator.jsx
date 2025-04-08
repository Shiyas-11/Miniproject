import { useRouter } from "next/navigation";
const fetchdata = async (token) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/fetchStudent",
      {}, // Empty body, as we're extracting student ID from token
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in headers
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response?.status === 401) {
      return { status: 401 };
    }
    console.error(error.response?.data || "Error fetching student data");
  }
};
