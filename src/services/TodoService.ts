import { v4 as uuid } from 'uuid';

export interface Todo {
    id?: string,
    description?: string
}

export class TodoService extends Map<string, Todo> {
    constructor() {
        super();
    }

    async list() {
        return Array.from(this.values());
    }

    async create(description: string) {
        if (typeof description !== "string") {
            throw `"description" is missing in the body.`;
        }
        const id = uuid();
        this.set(id, {id, description});
        return this.get(id);
    }

    async read(id: string) {
        if (!this.has(id)) {
            throw `Todo with ID ${id} not found.`;
        }
        return this.get(id);
    }

    async update(id: string, description: string) {
        if (!this.has(id)) {
            throw `Todo with ID ${id} not found.`;
        }
        if (typeof description !== "string") {
            throw `"description" is missing in the body.`;
        }
        this.set(id, {id, description});
        return this.get(id);
    }

    async remove(id: string) {
        if (!this.has(id)) {
            throw `Todo with ID ${id} not found.`;
        }
        this.delete(id);
        return;
    }

}
