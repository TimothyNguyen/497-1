/**
 * TodoInterface is used to create types for 
 * "todo" information
 */
interface TodoInterface {
    completed: Number
    id: any
    last_updated: string
    todo: string
};

export type { TodoInterface };