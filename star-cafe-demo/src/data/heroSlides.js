import restaurantConfig from "../config/restaurantConfig";
import starbit from "../assets/logo/startbit.png";
import burgerHero from "../assets/hero/burger.png";
import pizzaHero from "../assets/hero/pizza.png";
import coffeeHero from "../assets/hero/coldcoffee.png";
import friesHero from "../assets/hero/fries.png";

const heroSlides = [
  {
    image: starbit,

    badge: "⭐ Welcome",

    title:
      `Welcome to ${restaurantConfig.restaurantName}`,

    subtitle:
      restaurantConfig.address,
  },

  {
    image: burgerHero,

    badge: "🍔 Best Seller",

    title: "Cheese Burger",

    subtitle:
      "Freshly grilled and loaded with cheese.",
  },

  {
    image: pizzaHero,

    badge: "🍕 Customer Favourite",

    title: "Veg Pizza",

    subtitle:
      "Loaded with fresh vegetables and cheese.",
  },

  {
    image: coffeeHero,

    badge: "🥤 Refreshing",

    title: "Cold Coffee",

    subtitle:
      "Perfect companion for your meal.",
  },

  {
    image: friesHero,

    badge: "🍟 Crispy Delight",

    title: "French Fries",

    subtitle:
      "Golden crispy fries served hot.",
  },
];

export default heroSlides;