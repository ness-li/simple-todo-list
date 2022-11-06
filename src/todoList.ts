import { v4 as uuid } from 'uuid';

export interface Todo {
    id?: string,
    description?: string
}

export class TodoList extends Map<string, string> {
    constructor() {
        super();
    }

    list() {
        const todos: Array<Todo> = [];
        this.forEach((value, key) => {
            todos.push({
                id: key,
                description: value
            });
        });
        return todos;
    }

    add(description: string) {
        if (typeof description !== "string") {
            throw `"description" is missing in the body.`;
        }
        const id: string = uuid();
        this.set(id, description);
        return this.read(id);
    }

    read(id: string) {
        if (!this.has(id)) {
            throw `Todo with ID ${id} not found.`;
        }
        const todo: Todo = {
            id: id,
            description: this.get(id)
        };
        return todo;
    }

    update(id: string, description: string) {
        if (!this.has(id)) {
            throw `Todo with ID ${id} not found.`;
        }
        if (typeof description !== "string") {
            throw `"description" is missing in the body.`;
        }
        this.set(id, description);
        return this.read(id);
    }

    remove(id: string) {
        if (!this.has(id)) {
            throw `Todo with ID ${id} not found.`;
        }
        this.delete(id);
        return;
    }

}
