import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'


function PostThumbnail({ id, image, title, subTitle }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 345, cursor: 'pointer' }} onClick={() => navigate(`/blogs/${id}`)}>
      <CardMedia
        sx={{ height: 140 }}
        image={(image) ? image : "https://www.igel.com/wp-content/uploads/2021/07/IGEL-Blog-Banner.png"}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom fontFamily={'Montserrat'} fontWeight={'bold'} component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subTitle}
        </Typography>
      </CardContent>

    </Card>
  )
}

export default PostThumbnail