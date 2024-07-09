import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';

function EditBlog() {
    const { id } = useParams(); // Get the blog ID from URL params
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [src, setSrc] = useState('');
    const [body, setBody] = useState('');

    const navigate = useNavigate()

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`https://backblog-yegi.onrender.com/api/blog/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                const resData = await response.json();
                if (response.ok) {
                    setBlog(resData.blog);
                    setTitle(resData.blog.title);
                    setSubTitle(resData.blog.subTitle);
                    setSrc(resData.blog.image);
                    setBody(resData.blog.body);

                    // navigate(`/blogs/${resData.blog._id}`)
                } else {
                    console.error('Failed to fetch blog:', resData.error);
                }
            } catch (error) {
                console.error('An error occurred while fetching the blog:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    const saveBlog = async () => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`https://backblog-yegi.onrender.com/api/blog/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, subTitle, image: src, body })
            }).then((res) => {
                
            });
            console.log('Blog updated successfully');
        } catch (error) {
            console.error('Error updating blog:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        saveBlog();
    };

    if (loading) {
        return <Container>Loading...</Container>;
    }

    return (
        <Container fluid sx={{ display: 'flex', gap: 2, p: 2 }} maxWidth='full'>
            <Stack sx={{ width: '50%', border: '1px solid black', p: 2 }}>
                <Typography variant='h4' sx={{ fontFamily: 'Wittgenstein', ml: 2, mt: 2 }}>
                    Edit Blog
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
                            value={src}
                            onChange={(e) => setSrc(e.target.value)}
                        />
                        <textarea
                            placeholder='Enter the Markdown data'
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            rows={12}
                            style={{ width: '100%', resize: 'vertical', fontFamily: 'inherit', padding: '10px', minHeight: '300px' }}
                        ></textarea>
                        <Button type='submit' variant='contained' sx={{ mt: 2, maxWidth: '150px' }}> Save Changes</Button>
                    </Stack>
                </form>
            </Stack>

            <Stack sx={{ maxWidth: '50vw', border: '1px solid black', p: 2, display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
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
                {/* <Button variant='contained'  color="success" >Save Changes</Button> */}
            </Stack>
        </Container>
    );
}

export default EditBlog;
