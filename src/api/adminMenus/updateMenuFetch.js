export const updateMenus = async (nombre, menuData) => {
    try {
        const url = 'http://localhost:3977/api/v1/menu/' + nombre;

        const params = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(menuData),
        };

        const response = await fetch(url, params);
        const result = await response.json();

        if (response.status !== 200) throw result;

        return result;
    } catch (error) {
        throw error;
    }
};
