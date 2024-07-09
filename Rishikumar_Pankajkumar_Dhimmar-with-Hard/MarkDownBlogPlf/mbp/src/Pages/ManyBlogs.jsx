import React, { useEffect, useState } from 'react';
import PostThumbnail from '../Components/PostThumbnail';
import { Container } from '@mui/material';
import SimmerManyBlog from './SimmerManyBlog';

function ManyBlogs() {
    const [blogs, setBlogs] = useState([]);
    // console.log("Hii")


    const getBlogs = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('https://backblog-yegi.onrender.com/api/blog', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            const resData = await response.json();
            setBlogs(resData?.blogs || []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getBlogs();
    }, []);

    return (
        <>
            {(blogs.length == 0) ? <SimmerManyBlog /> : (
                <Container sx={{ display: 'flex', flexDirection: 'row', gap: 5, flexWrap: 'wrap', my: 5, justifyContent: 'center' }}>
                    {blogs.length === 0 ? (
                        <>Loading</>
                    ) : (
                        blogs.map(blog => (
                            <PostThumbnail
                                key={blog._id}
                                id={blog._id}
                                image={blog.image}
                                title={blog.title}
                                subTitle={blog.subTitle}
                            />
                        ))
                    )}


                </Container>
            )}
        </>

    );
}

export default ManyBlogs;

