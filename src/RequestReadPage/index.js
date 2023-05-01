import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid,CardContent } from '@mui/material';
import { StyledCard, CustomCardMedia, CardHeader, Metadata } from '../Tutorials';

const RequestReadPage = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [responses, setResponses] = useState([]);

  async function fetchRequest() {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      const url = `http://localhost:53625/hub/tutorial/requests/${id}`;
      const config = {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
      };

      const response = await axios.get(url, config);
      const requestData = response.data;
      console.log(requestData);
      setRequest(requestData);
    } catch (error) {
      console.error('Error fetching request:', error);
    }
  }

  async function fetchResponses(responseIds) {
    try {
      const fetchedResponses = await Promise.all(
        responseIds.map(async (responseId) => {
          const url = `http://localhost:53625/hub/tutorial/post/${responseId}`;
          const response = await axios.get(url);
          return response.data;
        }),
      );
      setResponses(fetchedResponses);
    } catch (error) {
      console.error('Error fetching responses:', error);
    }
  }

  useEffect(() => {
    fetchRequest();
  }, []);

  useEffect(() => {
    if (request && request.responses) {
      fetchResponses(request.responses);
    }
  }, [request]);
  

  const handleCreateTutorial = () => {
    window.location.href = `/createtutorial/${id}`;
  };

  if (!request) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4">{request.title}</Typography>
        <Typography variant="subtitle1">
          By: {request.authorId} | {new Date(request.createdAt).toLocaleDateString()}
        </Typography>
        <Box mt={2}>
          <Typography variant="body1">{request.description}</Typography>
        </Box>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleCreateTutorial}>
            Create a Tutorial in Response
          </Button>
        </Box>
      </Box>
      <Box mt={4}>
        <Typography variant="h5">Tutorial Responses</Typography>
        {responses.length === 0 ? (
          <Typography variant="body1">This request does not have any responses yet.</Typography>
        ) : (
          <Grid container spacing={4}>
            {responses.map((response) => (
              <Grid key={response.id} item xs={12} sm={6}>
                <StyledCard>
                  <CustomCardMedia
                    component="img"
                    image={response.descriptionImage}
                    alt={response.title}
                  />
                  <CardHeader>
                    <Typography variant="h6" gutterBottom>
                      {response.title}
                    </Typography>
                  </CardHeader>
                  <CardContent>
                    <Typography>{response.description}</Typography>
                    <Box mt={1}>
                      <Metadata>
                        By: {response.authorId} | {new Date(response.createdAt).toLocaleDateString()}
                      </Metadata>
                    </Box>
                    <Box mt={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        href={`/readtutorial/${response.id}`}
                      >
                        View
                      </Button>
                    </Box>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default RequestReadPage;
