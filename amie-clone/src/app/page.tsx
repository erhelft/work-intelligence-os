"use client";

import { useState } from "react";
import { DndContext, DragEndEvent, DragOverlay, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { Sidebar } from "@/components/Sidebar";
import { CalendarGrid } from "@/components/CalendarGrid";
import { useCalendarStore } from "@/store/useCalendarStore";
import { parse } from "date-fns";

export default function Home() {
  const { addEvent, removeTodo, todos } = useCalendarStore();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Check if dragging a todo
    if (active.data.current?.type === 'todo' && overId.startsWith('slot-')) {
      // Extract date and hour from slot id: slot-yyyy-MM-dd-H
      const parts = overId.split('-');
      // slot, yyyy, MM, dd, H
      if (parts.length >= 5) {
        const year = parts[1];
        const month = parts[2];
        const day = parts[3];
        const hour = parseInt(parts[4]);

        const dateString = `${year}-${month}-${day}`;
        const date = parse(dateString, 'yyyy-MM-dd', new Date());
        date.setHours(hour);
        date.setMinutes(0);
        date.setSeconds(0);

        const endDate = new Date(date);
        endDate.setMinutes(30); // Default 30 min duration

        const todoId = active.data.current.id;
        const todoTitle = active.data.current.title;

        // Create event
        addEvent({
          id: crypto.randomUUID(),
          title: todoTitle,
          start: date,
          end: endDate,
        });

        // Remove todo
        removeTodo(todoId);
      }
    }
  }

  const activeTodo = activeId ? todos.find(t => `todo-${t.id}` === activeId) : null;

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <main className="flex h-screen w-full overflow-hidden bg-background text-foreground">
        <Sidebar />
        <CalendarGrid />
      </main>
      <DragOverlay>
        {activeTodo ? (
          <div className="bg-card p-2 rounded-md border border-border shadow-lg text-sm w-[200px] opacity-80 cursor-grabbing">
            {activeTodo.title}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
