import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import UserProfileWidget from '../Components/UserProfileWidget';
import PostThumbnail from '../Components/PostThumbnail';

function UserProfile() {
  //   const} = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`https://backblog-yegi.onrender.com/api/account/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const resData = await response.json();
        if (response.ok) {
          setUserProfile(resData.user);
        } else {
          console.error('Failed to fetch user profile:', resData.error);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    const fetchUserBlogs = async () => {
      try {
        const token = localStorage.getItem('token')

        const response = await fetch(`https://backblog-yegi.onrender.com/api/blog/user`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const resData = await response.json();
        if (response.ok) {
          setUserBlogs(resData.blogs);
          console.log(resData.blogs)
        } else {
          console.error('Failed to fetch user blogs:', resData.error);
        }
      } catch (error) {
        console.error('Error fetching user blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
    fetchUserBlogs();
  }, []);

  if (loading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container >
      <Typography variant="h5" mt={5} fontFamily={'Montserrat'} gutterBottom>
        User Profile
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          {userProfile && <UserProfileWidget userProfile={userProfile} />}
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" fontFamily={'Montserrat'} fontWeight={'bold'} gutterBottom>
            Posted Blogs
          </Typography>
          <Grid container spacing={3}>
            {userBlogs.map(blog => (
              <Grid item key={blog._id} xs={12} sm={6} md={4}>
                <PostThumbnail
                  id={blog._id}
                  title={blog.title}
                  // subTitle={blog}
                  image={blog.image}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserProfile;
