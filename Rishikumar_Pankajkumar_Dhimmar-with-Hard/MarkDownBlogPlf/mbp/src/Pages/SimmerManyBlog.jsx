import { Box, Container } from '@mui/material'
import React from 'react'
import { ShimmerPostList } from 'react-shimmer-effects'

function SimmerManyBlog() {
    return (
        <Container sx={{mt : 5}}>   
            <ShimmerPostList postStyle="STYLE_THREE" col={3} row={2} gap={30} />
        </Container>


    )
}

export default SimmerManyBlog