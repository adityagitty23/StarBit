const STORAGE_KEY = "starbit_restaurants";

export const getRestaurants = () => {
  const data = localStorage.getItem(
    STORAGE_KEY
  );

  return data ? JSON.parse(data) : [];
};

export const saveRestaurants = (
  restaurants
) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(restaurants)
  );
};

export const addRestaurant = (
  restaurant
) => {
  const restaurants =
    getRestaurants();

  restaurants.push(restaurant);

  saveRestaurants(restaurants);
};

export const updateRestaurant = (
  updatedRestaurant
) => {
  const restaurants =
    getRestaurants();

  const updated =
    restaurants.map((restaurant) =>
      restaurant.id ===
      updatedRestaurant.id
        ? updatedRestaurant
        : restaurant
    );

  saveRestaurants(updated);
};