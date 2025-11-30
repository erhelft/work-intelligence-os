"use client";

import { format, addDays, startOfWeek, differenceInMinutes, startOfDay } from "date-fns";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import { useCalendarStore } from "@/store/useCalendarStore";

export function CalendarGrid() {
    const today = new Date();
    const startDate = startOfWeek(today, { weekStartsOn: 1 }); // Monday start
    const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));
    const hours = Array.from({ length: 24 }).map((_, i) => i);
    const { events } = useCalendarStore();

    return (
        <div className="flex-1 h-screen flex flex-col overflow-hidden bg-background">
            {/* Header: Days */}
            <div className="flex border-b border-border pl-16">
                {weekDays.map((day, i) => (
                    <div
                        key={i}
                        className="flex-1 py-3 text-center border-l border-border first:border-l-0"
                    >
                        <div className="text-xs text-muted-foreground font-medium uppercase">
                            {format(day, "EEE")}
                        </div>
                        <div
                            className={cn(
                                "text-xl font-semibold mt-1 w-8 h-8 flex items-center justify-center mx-auto rounded-full",
                                format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
                                    ? "bg-accent-red text-white"
                                    : "text-foreground"
                            )}
                        >
                            {format(day, "d")}
                        </div>
                    </div>
                ))}
            </div>

            {/* Grid: Hours */}
            <div className="flex-1 overflow-y-auto relative">
                <div className="flex relative min-h-[1440px]"> {/* 24h * 60px */}
                    {/* Time Labels */}
                    <div className="w-16 flex-shrink-0 border-r border-border bg-background z-10 sticky left-0">
                        {hours.map((hour) => (
                            <div
                                key={hour}
                                className="h-[60px] text-xs text-muted-foreground text-right pr-2 pt-1 relative"
                            >
                                <span className="-top-2 relative bg-background px-1">
                                    {hour === 0 ? "" : format(new Date().setHours(hour), "h a")}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Day Columns */}
                    {weekDays.map((day, i) => (
                        <div
                            key={i}
                            className="flex-1 border-l border-border first:border-l-0 relative group"
                        >
                            {/* Droppable Slots */}
                            {hours.map((hour) => (
                                <DroppableSlot key={hour} date={day} hour={hour} />
                            ))}

                            {/* Events */}
                            {events
                                .filter((event) => format(event.start, "yyyy-MM-dd") === format(day, "yyyy-MM-dd"))
                                .map((event) => {
                                    const startMinutes = differenceInMinutes(event.start, startOfDay(event.start));
                                    const duration = differenceInMinutes(event.end, event.start);
                                    return (
                                        <div
                                            key={event.id}
                                            className="absolute left-1 right-1 rounded-md bg-accent-blue/20 border-l-4 border-accent-blue p-1 text-xs overflow-hidden hover:brightness-95 transition-all cursor-pointer z-10"
                                            style={{
                                                top: `${startMinutes}px`,
                                                height: `${duration}px`,
                                            }}
                                        >
                                            <div className="font-semibold text-accent-blue truncate">{event.title}</div>
                                            <div className="text-accent-blue/80 truncate">
                                                {format(event.start, "h:mm a")} - {format(event.end, "h:mm a")}
                                            </div>
                                        </div>
                                    );
                                })}

                            {/* Current Time Indicator (if today) */}
                            {format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd") && (
                                <div
                                    className="absolute w-full h-[2px] bg-accent-red z-20 pointer-events-none flex items-center"
                                    style={{ top: `${(today.getHours() * 60) + today.getMinutes()}px` }}
                                >
                                    <div className="w-2 h-2 rounded-full bg-accent-red -ml-1"></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function DroppableSlot({ date, hour }: { date: Date; hour: number }) {
    const slotId = `slot-${format(date, "yyyy-MM-dd")}-${hour}`;
    const { isOver, setNodeRef } = useDroppable({
        id: slotId,
        data: { date, hour },
    });

    return (
        <div
            ref={setNodeRef}
            className={cn(
                "h-[60px] border-b border-border/50 transition-colors",
                isOver ? "bg-accent-blue/10" : "group-hover:bg-muted/5"
            )}
        ></div>
    );
}
