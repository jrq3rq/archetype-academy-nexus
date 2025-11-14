import { getFunctions, httpsCallable } from "firebase/functions";

const setUserRole = async (user, uid, role) => {
  if (!user) return;

  const functions = getFunctions();
  const setRole = httpsCallable(functions, "setUserRole");

  try {
    const response = await setRole({ uid, role });
    console.log(response.data.message);
  } catch (error) {
    console.error("Error setting user role:", error);
  }
};

export default setUserRole;
