import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task>({counter: 1, tasks: []});

  useEffect(() => {
    tasks.tasks.length > 0
      && setTasks({
        counter: tasks.tasks[tasks.tasks.length -1].id + 1,
        tasks: tasks.tasks
      });
  }, []);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle) {
      setTasks({
        counter: tasks.counter + 1,
        tasks: [
          ...tasks.tasks,
          {
            id: tasks.counter,
            title: newTaskTitle,
            done: false,
          },
        ],
      });
    }
  }

  function handleToggleTaskDone(id: number) {
    setTasks({
      counter: tasks.counter,
      tasks: tasks.tasks.map(task => {
        if (task.id === id) {
          return {
            ...task,
            done: !task.done,
          };
        }
        return task;
      }
      ),
    });
  }

  function handleRemoveTask(id: number) {
    setTasks({
      counter: tasks.counter,
      tasks: tasks.tasks.filter(task => task.id !== id)
    });
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks.tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})