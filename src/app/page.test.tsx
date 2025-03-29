/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from "@testing-library/react";
import * as PageModule from "./page";

const renderPage = async () => {
  await waitFor(async () => {
    render(await PageModule.default());
  });
};

beforeAll(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve([]),
  }) as jest.Mock;
});

afterAll(() => {
  (global.fetch as jest.Mock).mockRestore();
});

it("Render No Products if data is a empty array", async () => {
  await renderPage();
  expect(screen.getByTestId("no-products")).toBeInTheDocument();
});

it("Render Product list if thers products", async () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: () =>
      Promise.resolve([
        { id: 1, name: "Product 1", price: 800 },
        { id: 2, name: "Product 2", price: 1200 },
      ]),
  });
  await renderPage();
  expect(screen.getByTestId("product-list")).toBeInTheDocument();
  expect(screen.getByTestId("product-1")).toBeInTheDocument();
  expect(screen.getByTestId("product-2")).toBeInTheDocument();
  expect(screen.getByTestId("product-name-Product 1")).toBeInTheDocument();
  expect(screen.getByTestId("product-name-Product 2")).toBeInTheDocument();
  expect(screen.getByTestId("product-price-800")).toBeInTheDocument();
  expect(screen.getByTestId("product-price-1200")).toBeInTheDocument();
});
