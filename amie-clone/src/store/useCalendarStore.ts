import { create } from 'zustand';

export interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    color?: string;
}

export interface Todo {
    id: string;
    title: string;
}

interface CalendarState {
    events: CalendarEvent[];
    todos: Todo[];
    addEvent: (event: CalendarEvent) => void;
    removeTodo: (id: string) => void;
    moveEvent: (id: string, newStart: Date, newEnd: Date) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
    events: [],
    todos: [
        { id: '1', title: 'Review PRs' },
        { id: '2', title: 'Email team' },
        { id: '3', title: 'Design Sync' },
    ],
    addEvent: (event) =>
        set((state) => ({ events: [...state.events, event] })),
    removeTodo: (id) =>
        set((state) => ({ todos: state.todos.filter((t) => t.id !== id) })),
    moveEvent: (id, newStart, newEnd) =>
        set((state) => ({
            events: state.events.map((e) =>
                e.id === id ? { ...e, start: newStart, end: newEnd } : e
            ),
        })),
}));
