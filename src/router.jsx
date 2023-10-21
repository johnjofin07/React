import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RickMorty } from "./Rick-and-Morty";
import { Quote } from "./Randomquote";
import { Coffee } from "./CoffeeList";
import { Picker } from "./Colorpicker";
import { Calculator } from "./Calculator";
import { Login } from "./Signup";
import { Loginapi } from "./Loginapi";
import FormikBasic from "./FormikLogin";

const router = createBrowserRouter([
  {
    path: "/rick-morty",
    element: <RickMorty />,
  },

  {
    path: "/calculator",
    element: <Calculator />,
  },

  {
    path: "/",
    element: <Quote />,
  },

  {
    path: "/coffee",
    element: <Coffee />,
  },

  {
    path: "/picker",
    element: <Picker />,
  },

  {
    path: "/quotes",
    element: <Quote />,
  },
  {
    path: "/signup",
    element: <Login />,
  },

  {
    path: "/login",
    element: <Loginapi />,
  },

  {
    path: "/form",
    element: <FormikBasic />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
