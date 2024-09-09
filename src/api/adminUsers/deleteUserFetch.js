export const deleteUserFetch = async (firstname, lastname) => {
  try {
    const url = `http://localhost:3977/api/v1/user/delete/${firstname}/${lastname}`;

    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, params);

    if (response.status !== 200) {
      throw new Error(`Error HTTP! Estado: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
