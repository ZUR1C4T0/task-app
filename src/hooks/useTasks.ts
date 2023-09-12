import { v4 as uuidv4 } from 'uuid';

export class Task {
    id: string;
    description: string;
    dueDate: string;
    done: boolean;

    constructor({ dueDate, description}: Omit<Task, 'id' | 'done'>) {
        this.id = uuidv4();
        this.dueDate = dueDate;
        this.description = description;
        this.done = false;
    }
}

export const TASKS_KEY = 'tasks';

export async function getTasks(): Promise<Task[]> {
    const items = globalThis.localStorage.getItem(TASKS_KEY);
    if (items) {
        return await JSON.parse(items);
    }
    return [];
}

export async function saveTask(task: Task): Promise<void> {
    const tasks = await getTasks();
    globalThis.localStorage.setItem(TASKS_KEY, JSON.stringify([...tasks, task]));
}

export async function markTaskAsDone(taskId: string): Promise<void> {
    const tasks = await getTasks();
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.done = true;
        globalThis.localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    }
}

export async function deleteTask(taskId: string): Promise<void> {
    const tasks = await getTasks();
    const newTasks = tasks.filter(task => task.id !== taskId);
    globalThis.localStorage.setItem(TASKS_KEY, JSON.stringify(newTasks));
}
