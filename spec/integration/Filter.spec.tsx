import { prettyDOM, render, screen } from "@testing-library/react";

import { App } from "src/App";
import ue from "@testing-library/user-event";
import { JestStoreProvider } from "../utils/JestStoreProvider";

describe("Список задач", () => {
  const userEvent = ue.setup({
    advanceTimers: jest.advanceTimersByTime,
  });
  // не содержит выполненные задачи
  // после нажатия на кнопку фильтрации
  it("с включенным фильтром", async () => {
    render(<App />, { wrapper: JestStoreProvider });
    const input = screen.getByTestId("input-field");

    const addBtn = screen.getByAltText(/Добавить/i);

    await userEvent.clear(input);
    await userEvent.type(input, "task 1");
    await userEvent.click(addBtn);

    await userEvent.clear(input);
    await userEvent.type(input, "task 2");
    await userEvent.click(addBtn);

    const tasks = screen.queryAllByRole("checkbox");
    const filterBtn = screen.getByText("Спрятать выполненные задачи");

    await userEvent.click(tasks[0]);

    await userEvent.click(filterBtn);

    const newTasks = screen.queryAllByRole("checkbox");

    expect(newTasks.length).toBe(1);
  });

  // показывает как выполненные, так и не выполненные задачи
  // после повторного нажатия на кнопку фильтрации
  it("с выключенным фильтром", async () => {
    render(<App />, { wrapper: JestStoreProvider });

    const filterBtn = screen.getByText("Показать выполненные задачи");

    await userEvent.click(filterBtn);
    const tasks = screen.queryAllByTestId("task-filter-checkbox");

    expect(tasks.length).toBe(2);
  });
  // Если кнопка Показать выполненную задачу нажата, то текст меняется на Спрятать выполненную задачу
  it("Изменение текста кнопки фильтра", async () => {
    render(<App />, { wrapper: JestStoreProvider });

    const hideBtn = screen.getByText("Спрятать выполненные задачи");

    await userEvent.click(hideBtn);

    expect(hideBtn.textContent).toBe("Показать выполненные задачи");
  });

  it("Кнопка не активна, если нет выполненных задачь", async () => {
    render(<App />, { wrapper: JestStoreProvider });

    const tasks = screen.queryAllByRole("checkbox");
    const filterBtn = screen.getByText("Показать выполненные задачи");

    await userEvent.click(tasks[0]);
    screen.debug();
  });
});
