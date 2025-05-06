import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Box,
  TextField,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Grid,
  Container,
} from "@mui/material";

const todoGrid = {
  margin: "20px 0",
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  padding: "15px 20px",
};

const mainGrid = {
  marginBottom: "20px",
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
};

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [addTodo, setAddTodo] = useState("");
  const fetchTodo = async () => {
    try {
      const res = await fetch("https://dummyjson.com/todos");
      const data = await res.json();
      setTodos(data.todos);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchTodo();
  }, []);
  const handleTodo = () => {
    if (addTodo.length > 0) {
      const newTodo = {
        id: Date.now(),
        todo: addTodo,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setAddTodo("");
    }
  };
  const handleDelete = (id) => {
    const filterDeleted = todos.filter((item) => id !== item.id);
    setTodos(filterDeleted);
  };
  const handleComplete = (id) => {
    const filterComplete = todos.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTodos(filterComplete);
  };
  return (
    <>
      <Container spacing={2}>
        <Grid size={12} sx={todoGrid}>
          <Box>
            <TextField
              type="text"
              label="Add Todo"
              variant="outlined"
              value={addTodo}
              onChange={(e) => setAddTodo(e.target.value)}
              size="small"
            />
            <Button variant="contained" color="primary" onClick={handleTodo}>
              Add
            </Button>
          </Box>
        </Grid>
      </Container>
      <Container spacing={2}>
        <Grid size={12} sx={mainGrid}>
          {todos.map((todoItem) => {
            const { id, todo, completed } = todoItem;
            return (
              <List key={id} sx={{ padding: 0 }}>
                <ListItem
                  sx={{ borderBottom: "1px solid", borderColor: "divider" }}
                >
                  <Checkbox
                    type="checkbox"
                    onClick={() => handleComplete(id)}
                    defaultChecked={completed}
                  />
                  <ListItemText primary={todo} />
                  <IconButton sx={{ borderRadius: "50%" }}>
                    <DeleteIcon
                      color="error"
                      onClick={() => handleDelete(id)}
                    />
                  </IconButton>
                </ListItem>
              </List>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default Todo;
