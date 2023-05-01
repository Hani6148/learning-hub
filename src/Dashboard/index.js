import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
  Container,
  Paper,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.3);
  }
`;

const Dashboard = () => {
  const [showSection, setShowSection] = useState('tutorials');
  const [userTutorials, setUserTutorials] = useState([]);
  const [userTutorialRequests, setUserTutorialRequests] = useState([]);
  const [recommendedTutorials, setRecommendedTutorials] = useState([]);



  async function fetchTutorialsByAuthor() {
    console.log("request executing")
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      const decodedToken = jwt_decode(jwtToken);
      const userEmail = decodedToken.sub;

      const url = `http://localhost:53625/hub/tutorial/posts/author/${userEmail}`;
      const config = {
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      };

      const response = await axios.get(url, config);
      const tutorials = response.data;
      setUserTutorials(tutorials);
    } catch (error) {
      console.error('Error fetching tutorials by author:', error);
    }
  }
  async function fetchTutorialRequestsByAuthor() {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      const decodedToken = jwt_decode(jwtToken);
      const userEmail = decodedToken.sub;

      const url = `http://localhost:53625/hub/tutorial/requests/author/${userEmail}`;
      const config = {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
      };

      const response = await axios.get(url, config);
      const tutorialRequests = response.data;
      setUserTutorialRequests(tutorialRequests);
    } catch (error) {
      console.error('Error fetching tutorial requests by author:', error);
    }
  }
  async function fetchAllTutorials() {
    try {
      const jwtToken = localStorage.getItem('jwtToken');

      const url = 'http://localhost:53625/hub/tutorial/posts';
      const config = {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
      };

      const response = await axios.get(url, config);
      const tutorials = response.data;
      setRecommendedTutorials(tutorials);
    } catch (error) {
      console.error('Error fetching all tutorials:', error);
    }
  }


  useEffect(() => {
    fetchTutorialsByAuthor();
    fetchTutorialRequestsByAuthor();
    fetchAllTutorials();

    console.log('User Tutorials:', userTutorials);
    console.log('User Tutorial Requests:', userTutorialRequests);
    console.log('Recommended Tutorials:', recommendedTutorials);


  }, []);


  const showTutorials = () => {
    setShowSection('tutorials');
  };

  const showTutorialRequests = () => {
    setShowSection('requests');
  };


  return (
    <Container>
      <Box display="flex" justifyContent="space-between" mt={4} mb={4}>
        <Button onClick={showTutorials} variant="contained" color="primary">
          My Tutorials
        </Button>
        <Button
          onClick={showTutorialRequests}
          variant="contained"
          color="primary"
        >
          My Tutorial Requests
        </Button>
      </Box>

      {showSection === 'tutorials' && (
        <Paper sx={{ p: 4, mb: 4, borderRadius: '12px' }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              borderBottom: '2px solid',
              borderColor: 'primary.main',
              pb: 1,
              mb: 3,
            }}
          >
            Tutorials
          </Typography>
          <Grid container spacing={4}>
            {userTutorials.map((tutorial) => (
              <Grid key={tutorial.id} item xs={12} sm={6} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={tutorial.descriptionImage}
                    alt={tutorial.title}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{tutorial.title}</Typography>
                    <Typography>{tutorial.description}</Typography>
                    <Box mt={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        href={`/updatetutorial/${tutorial.id}`}
                      >
                        Edit
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      {showSection === 'requests' && (
        <Paper sx={{ p: 4, mb: 4, borderRadius: '12px' }}>
         <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              borderBottom: '2px solid',
              borderColor: 'primary.main',
              pb: 1,
              mb: 3,
            }}
          >
            Tutorial Requests
          </Typography>
          <Grid container spacing={4}>
            {userTutorialRequests.map((request) => (
              <Grid key={request.id} item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{request.title}</Typography>
                    <Typography>{request.description}</Typography>
                    <Box mt={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        href={`/updaterequest/${request.id}`}
                      >
                        Edit
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      <Paper sx={{ p: 4, mb: 4, borderRadius: '12px' }}>
      <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#626b74',
              borderBottom: '2px solid',
              borderColor: 'primary.main',
              pb: 1,
              mb: 3,
            }}
          >
            Recommended Tutorials
          </Typography>
        <Grid container spacing={4}>
          {recommendedTutorials.map((tutorial) => (
            <Grid key={tutorial.id} item xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={tutorial.descriptionImage}
                  alt={tutorial.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>{tutorial.title}</Typography>
                  <Typography>{tutorial.description}</Typography>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      href={`/readtutorial/${tutorial.id}`}
                    >
                      View
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Dashboard;
