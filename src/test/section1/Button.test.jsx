import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("باید متن دکمه نمایش داده شود", () => {
    render(<Button label="ثبت" />);

    const button = screen.getByRole("button", { name: "ثبت" });

    expect(button).toBeInTheDocument();
  });
});
