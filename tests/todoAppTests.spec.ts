import { test, expect } from '@playwright/test';
import {ToDoPage} from "../poms/pages/ToDoPage";

test('Create to-do item', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  await toDoPage.checkToDoItemsVisible(0)
  await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemsVisible(1)
});

test('Create 2 to-do items', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  await toDoPage.createToDoItem();
  await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemsVisible(2)
});

test('Activate to-do item', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  const createdToDo = await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemsVisible(1);
  await createdToDo.activate();
  await createdToDo.checkIsActivated();
});

test('Activate to-do item - search by text', async ({ page }) => {
  const cardText = 'test text';
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  await toDoPage.createToDoItem(cardText);
  await toDoPage.checkToDoItemsVisible(1);
  const createdToDo = toDoPage.getToDoItemsByText(cardText)
  await createdToDo.activate();
  await createdToDo.checkIsActivated();
});

test('Delete to-do item', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  const createdToDo = await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemsVisible(1);
  await createdToDo.deleteItem();
  await toDoPage.checkToDoItemsVisible(0);
});
