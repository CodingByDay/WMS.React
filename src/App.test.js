jest.mock("axios", () => ({
  __esModule: true,
  default: {
    interceptors: {
      response: { use: jest.fn() },
      request: { use: jest.fn() },
    },
    get: jest.fn(() => Promise.resolve({ data: {} })),
  },
}));

jest.mock("devexpress-dashboard-react", () => ({
  DashboardControl: () => null,
  DataRequestOptions: () => null,
}));

jest.mock("devexpress-dashboard/common", () => ({
  DashboardPanelExtension: function MockExtension() {},
}));

import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store/store";

test("renders login screen on root route", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  expect(
    screen.getByRole("heading", { name: /prijava/i }),
  ).toBeInTheDocument();
});
