export const deleteUserFetch = async (firstname, lastname) => {
  try {
    const url = `https://proyectfinal-backend-fsdeveloper-production.up.railway.app/api/v1/user/delete/${firstname}/${lastname}`;

    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, params);

    if (response.status !== 200) {
      throw new Error(`Error https! Estado: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
