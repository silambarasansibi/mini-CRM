import { useState, useEffect, useContext } from 'react';
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [leads, setLeads] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [viewTask, setViewTask] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    lead: '',
    dueDate: ''
  });

  const { user } = useContext(AuthContext);
  const currentUserId = user?._id || user?.id;

  useEffect(() => {
    fetchTasks();
    fetchLeads();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await api.get('/tasks');
      setTasks(data || []);
    } catch (error) {
      console.error(error);
      alert("Failed to load tasks");
    }
  };

  const fetchLeads = async () => {
    try {
      const { data } = await api.get('/leads?limit=100');
      setLeads(data.leads || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateTask = async () => {
    try {
      await api.post('/tasks', {
        ...formData,
        assignedTo: currentUserId
      });

      setOpenDialog(false);
      setFormData({ title: '', lead: '', dueDate: '' });
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to create task");
    }
  };

  const handleUpdateStatus = async (task) => {
    try {
      const newStatus =
        task.status === 'Pending' ? 'Completed' : 'Pending';

      await api.put(`/tasks/${task._id}/status`, {
        status: newStatus
      });

      fetchTasks();
    } catch (error) {
      console.error(error.response?.data || error.message);

      alert(
        error.response?.data?.message ||
        "You cannot update this task (not assigned to you)"
      );
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Tasks
        </Typography>

        <Button variant="contained" onClick={() => setOpenDialog(true)}>
          + Add Task
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: '#f5f5f5' }}>
              <TableCell>Title</TableCell>
              <TableCell>Lead</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks.map((task) => (
              <TableRow
                key={task._id}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => setViewTask(task)}
              >
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.lead?.name || '-'}</TableCell>
                <TableCell>{task.assignedTo?.name || '-'}</TableCell>
                <TableCell>
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : '-'}
                </TableCell>

                <TableCell>
                  <Chip
                    label={task.status}
                    color={task.status === 'Completed' ? 'success' : 'warning'}
                  />
                </TableCell>

                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    disabled={!task.assignedTo}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdateStatus(task);
                    }}
                  >
                    Toggle
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {tasks.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No tasks found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!viewTask} onClose={() => setViewTask(null)}>
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent>
          <Typography><b>Title:</b> {viewTask?.title}</Typography>
          <Typography><b>Lead:</b> {viewTask?.lead?.name}</Typography>
          <Typography><b>Status:</b> {viewTask?.status}</Typography>
          <Typography>
            <b>Due:</b> {viewTask?.dueDate && new Date(viewTask.dueDate).toLocaleDateString()}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewTask(null)}>Close</Button>
        </DialogActions>
      </Dialog>

     
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add Task</DialogTitle>

        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="dense"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <FormControl fullWidth margin="dense">
            <InputLabel>Lead</InputLabel>
            <Select
              value={formData.lead}
              onChange={(e) =>
                setFormData({ ...formData, lead: e.target.value })
              }
            >
              {leads.map((l) => (
                <MenuItem key={l._id} value={l._id}>
                  {l.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            type="date"
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
            value={formData.dueDate}
            onChange={(e) =>
              setFormData({ ...formData, dueDate: e.target.value })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreateTask}
            disabled={!formData.title || !formData.lead || !formData.dueDate}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Tasks;