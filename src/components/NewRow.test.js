import NewRow from "./NewRow";
import { render, screen } from "@testing-library/react";
describe("New Row Component", () => {
  test("renders inputs", () => {
    const inputs = [1];
    render(<NewRow inputs={[inputs]} />);
    const buttonElement = screen.queryAllByRole("button");
    expect(buttonElement).toHaveLength(2);
  });
});
