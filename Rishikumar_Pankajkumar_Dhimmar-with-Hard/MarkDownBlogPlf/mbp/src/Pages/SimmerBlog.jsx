import { Container } from '@mui/material'
import React from 'react'
import { ShimmerText, ShimmerThumbnail, ShimmerTitle, ShimmerCategoryItem } from "react-shimmer-effects";

function SimmerBlog() {
  return (
    <Container sx={{ mt: 2, gap: 5 }}>
      <ShimmerThumbnail height={350} rounded />
      <ShimmerTitle line={2} variant={'primary'} />
      <br />
      <ShimmerTitle line={3} variant={'secondary'} />
      <br />
      <ShimmerCategoryItem
        hasImage
        imageType="circular"
        imageWidth={50}
        imageHeight={50}
        text
      />
      <ShimmerText line={20} gap={10} />
    </Container>
  )
}

export default SimmerBlog