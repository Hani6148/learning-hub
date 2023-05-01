// src/components/Dashboard.js
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
    Container
} from '@mui/material';

const tutorials = [
  // Mock data - replace with the tutorials fetched from your server
  {
    id: 1,
    title: 'Tutorial 1',
    description: 'Description for tutorial 1',
    imageUrl: 'https://via.placeholder.com/150',
    link: '#',
  },
  {
    id: 2,
    title: 'Tutorial 2',
    description: 'Description for tutorial 2',
    imageUrl: 'https://via.placeholder.com/150',
    link: '#',
  },
  {
    id: 3,
    title: 'Tutorial 3',
    description: 'Description for tutorial 3',
    imageUrl: 'https://via.placeholder.com/150',
    link: '#',
  }
  // ...
];

const tutorialRequests = [
  // Mock data - replace with the tutorial requests fetched from your server
  {
    id: 1,
    title: 'Tutorial Request 1',
    description: 'Description for tutorial request 1',
  },
  {
    id: 2,
    title: 'Tutorial Request 2',
    description: 'Description for tutorial request 2',
  },
  {
    id: 3,
    title: 'Tutorial Request 3',
    description: 'Description for tutorial request 3',
  },
  {
    id: 4,
    title: 'Tutorial Request 4',
    description: 'Description for tutorial request 4',
  },
  {
    id: 5,
    title: 'Tutorial Request 5',
    description: 'Description for tutorial request 5',
  },
  // ...
];

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

      }, []);
    

    const showTutorials = () => {
      setShowSection('tutorials');
    };
  
    const showTutorialRequests = () => {
      setShowSection('requests');
    };
  
    return (
      <Container>
        <Box mt={4} mb={4}>
          <Button onClick={showTutorials}>Show Tutorials</Button>
          <Button onClick={showTutorialRequests}>Show Tutorial Requests</Button>
        </Box>
  
        {showSection === 'tutorials' && (
          <Box mb={4}>
            <Typography variant="h5" gutterBottom>Tutorials</Typography>
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
          </Box>
        )}
  
        {showSection === 'requests' && (
          <Box mb={4}>
            <Typography variant="h5" gutterBottom>Tutorial Requests</Typography>
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
          </Box>
        )}
        <Box mb={4}>
        <Typography variant="h5" gutterBottom>Recommended Tutorials</Typography>
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
                      href={tutorial.link}
                    >
                      View
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box mt={2} textAlign="center">
          <Button variant="contained" color="primary">
            See More
          </Button>
        </Box>
      </Box>
      </Container>
    );
  };
  
  export default Dashboard;