export const getOrderStatus = async (orderId) => {
  try {
    const response = await fetch(
      `http://192.168.43.25:3000/orders/${orderId}`,
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
