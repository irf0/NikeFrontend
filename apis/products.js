//1. Get all the products
export const getProducts = async () => {
  try {
    const response = await fetch(
      "https://nikeappbackend-production.up.railway.app/products",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return null;
    }

    const productsData = await response.json();
    return productsData;
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
};

export const getProduct = async (productRef) => {
  try {
    const response = await fetch(
      `https://nikeappbackend-production.up.railway.app/products/${productRef}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return null;
    }

    const productsData = await response.json();
    return productsData;
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
};
