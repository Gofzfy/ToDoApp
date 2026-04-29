import {expect, Locator} from "@playwright/test";

export class ToDoItem {
    readonly container: Locator;
    readonly markDone: Locator;
    readonly itemText: Locator;
    readonly removeBtn: Locator;
    
    constructor(container: Locator) {
        this.container = container;
        this.markDone = container.getByTestId('todo-item-toggle');
        this.itemText = container.getByTestId('todo-item-label');
        this.removeBtn = container.getByTestId('todo-item-button');
    }

    async activate(): Promise<void> {
        await this.markDone.check();
    }

    async checkCardVisible(visible = true): Promise<void> {
        await expect(this.itemText).toBeVisible({ visible});
    }

    async checkIsActivated(active = true): Promise<void> {
        if (active) {
            await expect(this.container).toHaveClass('completed');
        } else {
            await expect(this.container).not.toHaveClass('completed');
        }
    }

    async deleteItem(): Promise<void> {
        await this.container.hover();
        await this.removeBtn.click();
    }
}