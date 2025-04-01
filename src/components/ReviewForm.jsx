import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import styled from '@emotion/styled';

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  background-color: #1a1a4f;
  padding: 20px;
  border-radius: 8px;
  color: #fff;
`;

const StarRating = styled(Box)`
  display: flex;
  margin: 10px 0;
  & > * {
    cursor: pointer;
  }
`;

const ReviewForm = () => {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ name, review, rating });
  };

  return (
    <FormContainer component="form" onSubmit={handleSubmit}>
      
      <div className='form-row'>
        <div className='form-group'>
        <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: '#fff' } }}
        inputProps={{ style: { color: '#fff' } }}
        sx={{ fieldset: { borderColor: '#fff' } }}
      />
        <StarRating>
        {[...Array(5)].map((_, index) => (
          <span key={index} onClick={() => handleStarClick(index)}>
            {index < rating ? <Star style={{ color: '#FFD700' }} /> : <StarBorder style={{ color: '#FFD700' }} />}
          </span>
        ))}
      </StarRating>
        </div>
      <div className='form-group'>
      <TextField
        label="Review"
        variant="outlined"
        multiline
        rows={4}
        value={review}
        onChange={(e) => setReview(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: '#fff' } }}
        inputProps={{ style: { color: '#fff' } }}
        sx={{ fieldset: { borderColor: '#fff' } }}
      />
      </div>
      
      </div>
      
      
      <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-end', backgroundColor: '#fff', color: '#1a1a4f' }}>
        Submit
      </Button>
    </FormContainer>
  );
};

export default ReviewForm;