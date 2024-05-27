import React, { FC, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

interface RecordFormProps {
  initialData?: { id?: number, calories: number; fat: number };
  onSave: (data: { id?: number, calories: number; fat: number }) => void;
  onCancel: () => void;
}

const FormContainer = styled(Box)`
  margin-bottom: 16px;
  background-color: white;
  padding: 0 16px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 1200px;
  height: 300px;
`;

const ButtonContainer = styled(Box)`
  margin-top: 36px;
  display: flex;
  justify-content: space-between;
`;

const RecordForm: FC<RecordFormProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ calories: '', fat: '' });

  useEffect(() => {
    if (initialData) {
      setFormData({
        calories: initialData.calories.toString(),
        fat: initialData.fat.toString(),
      });
    }
  }, [initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave({
      id: initialData?.id,
      calories: formData.calories ? Number(formData.calories) : 0,
      fat: formData.fat ? Number(formData.fat) : 0,
    });
    setFormData({ calories: '', fat: '' });
  };

  return (
    <FormContainer component="form" onSubmit={handleSubmit}>
      <Typography variant="h2" gutterBottom>
        {initialData ? 'Редактировать запись' : 'Добавить новую запись'}
      </Typography>
      <TextField
        label="Аудиторія"
        name="calories"
        type="number"
        value={formData.calories}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        sx={{ backgroundColor: 'white' }}
      />
      <TextField
        label="Пара"
        name="fat"
        type="number"
        value={formData.fat}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        sx={{ backgroundColor: 'white' }}
      />
      <ButtonContainer>
        <Button type="submit" variant="contained" color="primary">
          Сохранить
        </Button>
        <Button type="button" variant="outlined" onClick={onCancel}>
          Отмена
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
};

export default RecordForm;
