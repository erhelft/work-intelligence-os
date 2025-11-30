"use client";

import { motion } from "framer-motion";
import { Calendar, CheckSquare, Settings, User, ChevronLeft, ChevronRight } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useCalendarStore } from "@/store/useCalendarStore";

export function Sidebar() {
    const { isSidebarOpen, toggleSidebar } = useUIStore();
    const { todos } = useCalendarStore();

    return (
        <motion.div
            initial={{ width: 240 }}
            animate={{ width: isSidebarOpen ? 240 : 60 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
                "h-screen bg-sidebar border-r border-border flex flex-col relative z-10",
                "transition-colors duration-300"
            )}
        >
            {/* Header / User Profile */}
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                    <div className="w-8 h-8 rounded-full bg-accent-red flex items-center justify-center text-white font-bold shrink-0">
                        A
                    </div>
                    {isSidebarOpen && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="font-medium whitespace-nowrap"
                        >
                            Amie User
                        </motion.span>
                    )}
                </div>
                <button
                    onClick={toggleSidebar}
                    className="p-1 hover:bg-muted/10 rounded-md text-muted-foreground transition-colors"
                >
                    {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-2 space-y-1">
                <NavItem icon={<Calendar size={20} />} label="Calendar" active />
                <NavItem icon={<CheckSquare size={20} />} label="Todos" />
                <NavItem icon={<User size={20} />} label="Team" />
                <NavItem icon={<Settings size={20} />} label="Settings" />
            </nav>

            {/* Todo Tray */}
            {isSidebarOpen && (
                <div className="p-4 border-t border-border">
                    <h3 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                        Unscheduled
                    </h3>
                    <div className="space-y-2">
                        {todos.map((todo) => (
                            <DraggableTodo key={todo.id} id={todo.id} title={todo.title} />
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
}

function DraggableTodo({ id, title }: { id: string; title: string }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `todo-${id}`,
        data: { type: 'todo', id, title },
    });

    const style = transform ? {
        transform: CSS.Translate.toString(transform),
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="bg-card p-2 rounded-md border border-border shadow-sm text-sm cursor-grab active:cursor-grabbing hover:border-accent-blue transition-colors"
        >
            {title}
        </div>
    );
}

function NavItem({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
    const { isSidebarOpen } = useUIStore();

    return (
        <div
            className={cn(
                "flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors",
                active ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:bg-muted/10 hover:text-foreground",
                !isSidebarOpen && "justify-center"
            )}
        >
            {icon}
            {isSidebarOpen && (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm font-medium"
                >
                    {label}
                </motion.span>
            )}
        </div>
    );
}
