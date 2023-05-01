import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
  TextField,
  Button,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.3);
  }
  margin: 16px;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
`;

const CustomCardMedia = styled(CardMedia)`
  height: 240px;
  object-fit: cover;
`;

const CardHeader = styled(Box)`
  background-color: #85b4d0;
  color: white;
  padding: 16px;
`;

const Metadata = styled(Typography)`
  color: #757575;
  font-size: 0.8rem;
`;

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [searchText, setSearchText] = useState('');

  async function fetchAllRequests() {
    try {
      const jwtToken = localStorage.getItem('jwtToken');

      const url = 'http://localhost:53625/hub/tutorial/requests'; // Update the URL to fetch tutorial requests
      const config = {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
      };

      const response = await axios.get(url, config);
      const allRequests = response.data;
      setRequests(allRequests);
    } catch (error) {
      console.error('Error fetching all tutorial requests:', error);
    }
  }

  useEffect(() => {
    fetchAllRequests();
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredRequests = requests.filter((request) =>
    request.description.toLowerCase().includes(searchText.toLowerCase()) || request.title.toLowerCase().includes(searchText.toLowerCase())
  );
  const handleCreateTutorial = () => {
    window.location.href = '/createrequest';
  };

  return (
    <Container>
     <Box mt={4} mb={4}>
        <TextField
          fullWidth
          variant="outlined"
          label="Search Requests"
          value={searchText}
          onChange={handleSearchInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton edge="start" color="inherit" aria-label="search">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '25px',
              height: '48px',
            },
            '& .MuiInputLabel-outlined': {
              transform: 'translate(14px, 18px) scale(1)',
            },
            '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
              transform: 'translate(14px, -6px) scale(0.75)',
            },
          }}
        />
      </Box>
      <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: '16px',
            marginBottom: '16px',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateTutorial}
          >
            Create a New Request
          </Button>
        </Box>

      <Grid container spacing={4}>
        {filteredRequests.map((request) => (
          <Grid key={request.id} item xs={12} sm={6}>
            <StyledCard>
              <CardHeader>
                <Typography variant="h6" gutterBottom>
                  {request.title}
                </Typography>
              </CardHeader>
              <CardContent>
                <Typography>{request.description}</Typography>
                <Box mt={1}>
                  <Metadata>
                    By: {request.authorId} | {new Date(request.createdAt).toLocaleDateString()}
                  </Metadata>
                </Box>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    href={`/readrequest/${request.id}`}
                  >
                    View
                  </Button>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Requests;
