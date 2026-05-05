import {expect, Locator, Page} from "@playwright/test";
import {ToDoItem} from "../organisms/ToDoItem";
import {faker} from "@faker-js/faker/locale/en"

export class ToDoPage {
    readonly page: Page;
    private readonly url = 'https://todo-app.tallinn-learning.ee/'
    readonly header: Locator;
    readonly main: Locator;
    readonly footer: Locator;
    readonly todoItemInput: Locator;
    // readonly externalFooter;

    constructor(page: Page) {
        this.page = page;
        this.header = page.getByTestId('header');
        this.main = page.getByTestId('main');
        this.footer = page.getByTestId('footer');
        this.todoItemInput = this.header.getByTestId('text-input');
    }

    getToDoItemsByIndex(index: number): ToDoItem {
        return new ToDoItem(this.main.getByTestId('todo-item').nth(index));
    }

    getToDoItemsByText(text: string): ToDoItem {
        return new ToDoItem(this.main.locator('[data-testid="todo-item"]', {hasText: text}));
    }

    async goto(): Promise<void> {
        await this.page.goto(this.url);
    }

    async createToDoItem(text?: string): Promise<ToDoItem> {
        await this.todoItemInput.fill(text == undefined ? faker.word.words(2) : text);
        await this.todoItemInput.press('Enter');

        const todoItems = this.main.getByTestId('todo-item');
        const itemsCount = await todoItems.count();
        return this.getToDoItemsByIndex(itemsCount - 1);
    }

    async checkToDoItemsVisible(expectedCount: number, visible = true): Promise<void> {
        //const todoItems: TodoItem[] = this.main.getByTestId('todo-item');
        const itemCount = await this.main.getByTestId('todo-item').count();
        expect(itemCount).toBe(expectedCount);
    }


}