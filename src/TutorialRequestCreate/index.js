import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Container,
    Grid,
    Paper,
} from '@mui/material';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
const TutorialRequestCreate = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
  
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    };
  
    const handleDescriptionChange = (e) => {
      setDescription(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const jwtToken = localStorage.getItem('jwtToken');
          const decodedToken = jwt_decode(jwtToken);
          const authorId = decodedToken.sub;
    
          const tutorialRequest = {
            title,
            description,
            authorId,
          };
    
          const config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwtToken}`,
            },
          };
    
          const url = 'http://localhost:53625/hub/tutorial/createRequest';
          await axios.post(url, tutorialRequest, config);
    
          setTitle('');
          setDescription('');
     
          alert('Tutorial request submitted successfully!');
          window.location.href = '/dashboard';
        } catch (error) {
          console.error('Error submitting tutorial request:', error);
          alert('Failed to submit tutorial request.');
        }
      };
      return (
        <Container>
          <Box mt={8} mb={4} textAlign="center">
            <Typography variant="h4" gutterBottom>Create Tutorial Request</Typography>
          </Box>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={8} lg={6}>
              <Paper elevation={3}>
                <Box p={4}>
                  <form onSubmit={handleSubmit}>
                    <Box mb={3}>
                      <TextField
                        fullWidth
                        required
                        id="title"
                        label="Title"
                        value={title}
                        onChange={handleTitleChange}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>
                    <Box mb={3}>
                      <TextField
                        fullWidth
                        required
                        id="description"
                        label="Description"
                        multiline
                        rows={4}
                        value={description}
                        onChange={handleDescriptionChange}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>
                    <Box textAlign="center">
                      <Button type="submit" variant="contained" color="primary">
                        Submit
                      </Button>
                    </Box>
                  </form>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <Box mb={8}></Box>
        </Container>
      );
    };
    export default TutorialRequestCreate;
          