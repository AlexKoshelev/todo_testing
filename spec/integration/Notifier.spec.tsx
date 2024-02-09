import { prettyDOM, render, screen } from "@testing-library/react";
import { Notifier } from "src/components/Notifier";
import { JestStoreProvider } from "../utils/JestStoreProvider";

const mockTask = {
  id: "1",
  header: "This is a less header than 32",
  done: true,
};

jest.useFakeTimers();

describe("Оповещение при вополнении задачи", () => {
  it("появляется и содержит заголовок задачи", async () => {
    const handleClose = jest.fn();

    render(
      <Notifier
        task={mockTask.header}
        open={mockTask.done}
        onClose={handleClose}
      />,
      { wrapper: JestStoreProvider }
    );

    const notifier = screen.getByText(mockTask.header);
    expect(notifier.textContent).toBe(mockTask.header);
  });

  it("одновременно может отображаться только одно", () => {
    const handleClose = jest.fn();

    const { rerender } = render(
      <div>
        <Notifier
          task={mockTask.header}
          open={mockTask.done}
          onClose={handleClose}
        />
        <Notifier
          task={mockTask.header + "second notifier"}
          open={!mockTask.done}
          onClose={handleClose}
        />
      </div>,
      { wrapper: JestStoreProvider }
    );

    const notifier1 = screen.queryByText(mockTask.header);
    const notifier2 = screen.queryByText(mockTask.header + "second notifier");

    expect(notifier1).not.toBeNull();
    expect(notifier2).toBeNull();

    jest.advanceTimersByTime(2000);
    expect(handleClose).toHaveBeenCalledTimes(1);

    rerender(
      <div>
        <Notifier
          task={mockTask.header}
          open={!mockTask.done}
          onClose={handleClose}
        />
        <Notifier
          task={mockTask.header + "second notifier"}
          open={mockTask.done}
          onClose={handleClose}
        />
      </div>
    );

    const notifier1Rerender = screen.queryByText(mockTask.header);
    const notifier2Rerender = screen.queryByText(
      mockTask.header + "second notifier"
    );

    expect(notifier1Rerender).toBeNull();
    expect(notifier2Rerender).not.toBeNull();

    jest.advanceTimersByTime(2000);
    expect(handleClose).toHaveBeenCalledTimes(2);
  });
});
