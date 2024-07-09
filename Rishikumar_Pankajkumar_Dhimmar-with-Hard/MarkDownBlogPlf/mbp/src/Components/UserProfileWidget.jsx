import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

function UserProfileWidget({ userProfile }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 200 }}
        image={userProfile.profileImage || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"}
        title={userProfile.username}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" fontFamily={'Montserrat'}>
          {userProfile.fname + " " + userProfile?.lname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: {userProfile.email}
        </Typography>

      </CardContent>
    </Card>
  );
}

export default UserProfileWidget;
