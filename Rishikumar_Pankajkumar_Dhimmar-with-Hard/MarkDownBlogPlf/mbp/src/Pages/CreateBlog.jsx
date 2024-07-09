import { Button, Container, Hidden, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

function CreateBlog() {
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [src, setSrc] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate()

    const saveBlog = async () => {
        const token = localStorage.getItem('token')
        await fetch('https://backblog-yegi.onrender.com/api/blog/create', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify({ title: title, subTitle: subTitle, image: src, body: body })
        }).then( (res) => {
            const resData = res.json
            console.log(resData)
            navigate('/blogs');
        }).catch((e) => {
            console.log(e)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic to save the blog post here
        console.log('Title:', title);
        console.log('Sub Title:', subTitle);
        console.log('Image Source:', src);
        console.log('Body:', body);

        saveBlog()
    };

    return (
        <Container fluid sx={{ display: 'flex', gap: 2, p : { xs: 0 , md : 2}, flexWrap:'wrap' , ml : 0, width: '100vw' }} maxWidth='full'>
            <Stack sx={{ width: { xs: '100vw' , md : '45vw'}, border: '1px solid black', p : { xs: 0 , md : 2}, m : 0, minWidth:'300px' }}>
                <Typography variant='h4' sx={{ fontFamily: 'Wittgenstein', ml: 2, mt: 2 }}>
                    Create New Blog
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack sx={{ p: 2, gap: 2 }}>
                        <TextField
                            label='Title'
                            name='title'
                            variant='standard'
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            label='Description'
                            name='subTitle'
                            variant='standard'
                            required
                            value={subTitle}
                            onChange={(e) => setSubTitle(e.target.value)}
                        />
                        <TextField
                            name='imageSrc'
                            variant='standard'
                            placeholder='Paste the image URL ...'
                            onChange={(e) => setSrc(e.target.value)}
                        />
                        <textarea
                            placeholder='Enter the Markdown data'
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            rows={12}
                            style={{ width: '100%', resize: 'vertical', fontFamily: 'inherit', padding: '10px', minHeight: '300px' }}
                        ></textarea>
                        <Button type='submit' variant='contained' sx={{ mt: 2, maxWidth: '150px' }}> Save</Button>
                    </Stack>
                </form>
            </Stack>

            <Stack sx={{ maxWidth: { xs: '100vw' , md : '40vw'}, border: '1px solid black', p: 2, display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
                <Container
                    maxWidth='full'
                    sx={{
                        bgcolor: 'gray',
                        objectFit: 'cover',
                        width: '100%',
                        maxHeight: '300px',
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <img src={src} alt='' style={{ objectFit: 'cover', width: '100%' }} />
                </Container>
                <Typography variant='h2' sx={{ fontFamily: 'Anton SC', width: '100%', fontSize: 36, mb: 2, wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                    {title}
                </Typography>
                <Typography variant='h3' sx={{ fontFamily: 'Montserrat', fontSize: 20, mb: 2, wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                    {subTitle}
                </Typography>
                <Typography sx={{ fontFamily: 'Wittgenstein', fontSize: 16 }}>
                    <Markdown>{body}</Markdown>
                </Typography>
            </Stack>
        </Container>
    );
}

export default CreateBlog;
