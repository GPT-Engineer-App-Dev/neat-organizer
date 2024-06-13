import { useState } from "react";
import { Container, VStack, HStack, Input, Button, List, ListItem, IconButton, Text } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: newTask }]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditing = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setNewTask(task.text);
  };

  const editTask = () => {
    setTasks(tasks.map((task) => (task.id === currentTask.id ? { ...task, text: newTask } : task)));
    setIsEditing(false);
    setNewTask("");
    setCurrentTask(null);
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} w="100%">
        <HStack w="100%">
          <Input
            placeholder="Enter a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button colorScheme="teal" onClick={isEditing ? editTask : addTask}>
            {isEditing ? "Edit Task" : "Add Task"}
          </Button>
        </HStack>
        <List w="100%" spacing={3}>
          {tasks.map((task) => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center" p={2} borderWidth={1} borderRadius="md">
              <Text>{task.text}</Text>
              <HStack spacing={1}>
                <IconButton
                  icon={<FaEdit />}
                  size="sm"
                  onClick={() => startEditing(task)}
                />
                <IconButton
                  icon={<FaTrash />}
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                />
              </HStack>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;