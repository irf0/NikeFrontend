export const getOrderStatus = async (orderId) => {
  try {
    const response = await fetch(
      `https://nikeappbackend-production.up.railway.app/orders/${orderId}`,
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

    const ordersData = await response.json();
    return ordersData;
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
};
