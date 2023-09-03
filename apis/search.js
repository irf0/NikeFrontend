export const searchProducts = async (searchTerm) => {
  try {
    const response = await fetch(
      `https://nikeappbackend-production.up.railway.app/products/search?key=${searchTerm}`,
      {
        method: "POST",
        headers: {
          Accept: "*/*",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return null;
    }

    const searchData = await response.json();
    return searchData;
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
};
