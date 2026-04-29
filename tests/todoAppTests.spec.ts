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

test('Create two items, activate one, clear completed button test', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  const firstCreatedToDo = await toDoPage.createToDoItem();
  const secondCreatedToDo = await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemsVisible(2);
  await secondCreatedToDo.activate();
  await secondCreatedToDo.checkIsActivated();
  await toDoPage.filterClearBtn()
  await toDoPage.checkToDoItemsVisible(1);
  await firstCreatedToDo.checkCardVisible()
});

test('Create two items, activate one, use filer completed test', async ({ page }) => {
  const cardText = 'test text';
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  await toDoPage.createToDoItem();
  const createdToDo = await toDoPage.createToDoItem(cardText);
  await toDoPage.checkToDoItemsVisible(2);
  await createdToDo.activate();
  await createdToDo.checkIsActivated();
  await toDoPage.filterCompletedBtn()
  await toDoPage.checkToDoItemsVisible(1);
  await toDoPage.getToDoItemsByText(cardText).checkCardVisible();
});

test('Active filter test', async ({ page }) => {
  const cardText = 'test text';
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  const firstCreatedToDo =await toDoPage.createToDoItem();
  const secondCreatedToDo = await toDoPage.createToDoItem(cardText);
  await toDoPage.checkToDoItemsVisible(2);
  await firstCreatedToDo.activate();
  await toDoPage.filterActiveBtn()
  await toDoPage.checkToDoItemsVisible(1);
  await toDoPage.getToDoItemsByText(cardText).checkCardVisible();
});

test('All filter test', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  await toDoPage.createToDoItem();
  const createdToDo = await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemsVisible(2);
  await createdToDo.activate();
  await toDoPage.filterActiveBtn()
  await toDoPage.checkToDoItemsVisible(1);
  await toDoPage.filterCompletedBtn()
  await toDoPage.checkToDoItemsVisible(1);
  await toDoPage.filterAllBtn()
  await toDoPage.checkToDoItemsVisible(2);
});

test('Items left test', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  await toDoPage.createToDoItem();
  const createdToDo = await toDoPage.createToDoItem();
  await toDoPage.checkItemsLeftAmount(await toDoPage.checkActiveItems());
  await createdToDo.activate();
  await toDoPage.checkItemsLeftAmount(await toDoPage.checkActiveItems());
  await toDoPage.filterActiveBtn();
  await toDoPage.checkItemsLeftAmount(await toDoPage.checkActiveItems());
  await toDoPage.filterAllBtn();
  await toDoPage.checkItemsLeftAmount(await toDoPage.checkActiveItems());
});