'use client'; // This directive is MANDATORY for drag and drop

import React, { useState } from 'react';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// 1. Define what a "Widget" looks like
type Widget = {
  id: string;
  title: string;
};

// 2. This is the individual card that moves
function SortableItem(props: { id: string; title: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} 
         className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow h-40 flex items-center justify-center">
      <h3 className="font-bold text-gray-700">{props.title}</h3>
    </div>
  );
}

// 3. The Main Grid Component
export default function DashboardGrid() {
  // These are your initial widgets
  const [items, setItems] = useState<Widget[]>([
    { id: '1', title: 'Revenue Chart' },
    { id: '2', title: 'Active Users' },
    { id: '3', title: 'Churn Rate' },
    { id: '4', title: 'Recent Signups' },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCenter} 
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={items} 
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id} title={item.title} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}