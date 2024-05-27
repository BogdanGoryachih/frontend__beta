import React, { FC, useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import RecordForm from './RecordForm';

interface DataRow {
  id: number;
  name: string;
  calories: number;
  fat: number;
}

const Home: FC = () => {
  const [rows, setRows] = useState<DataRow[]>([]);
  const [editingRow, setEditingRow] = useState<DataRow | null>(null);

  useEffect(() => {
    fetch('http://localhost:3002/rows')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);  // Debug log
        setRows(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3002/rows/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log(`Deleted row with id ${id}`);  // Debug log
      setRows(rows.filter(row => row.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleSave = async (data: { calories: number; fat: number }) => {
    if (editingRow) {
      try {
        const response = await fetch(`http://localhost:3002/rows/${editingRow.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...editingRow, ...data }), // Используйте обновленные данные
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const updatedRow = await response.json();
        console.log('Updated row:', updatedRow);  // Debug log
        setRows(rows.map(row => (row.id === editingRow.id ? updatedRow : row)));
        setEditingRow(null);
      } catch (error) {
        console.error('Error updating data:', error);
      }
    } else {
      try {
        const response = await fetch('http://localhost:3002/rows', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: rows.length + 1, ...data }),
        });

        const newRow = await response.json();
        console.log('Created new row:', newRow);  // Debug log
        setRows([...rows, newRow]);
      } catch (error) {
        console.error('Error creating data:', error);
      }
    }
  };

  const handleCancel = () => {
    setEditingRow(null);
  };

  return (
    <div className="container">
      <Box sx={{ mb: 2 }}>
        <RecordForm onSave={handleSave} initialData={editingRow || undefined} onCancel={handleCancel} />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell >Аудиторія</TableCell>
              <TableCell align="right">Пара</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" onClick={() => setEditingRow(row)} sx={{ mr: 1 }}>
                    Редактировать
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(row.id)}>
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
