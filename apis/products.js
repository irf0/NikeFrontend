//1. Get all the products
export const getProducts = async () => {
  try {
    const response = await fetch("http://192.168.43.25:3000/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

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
