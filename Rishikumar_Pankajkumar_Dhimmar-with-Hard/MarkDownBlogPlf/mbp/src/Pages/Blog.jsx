import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField, Typography, Stack } from '@mui/material';
import Markdown from 'react-markdown';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SimmerBlog from './SimmerBlog';

function Blog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

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
        setComments(resData.blog.comments);
        // console.log(comments)
      } else {
        setError(resData.error);
      }
    } catch (error) {
      setError('An error occurred while fetching the blog');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://backblog-yegi.onrender.com/api/blog/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      const resData = await response.json();
      if (response.ok) {
        navigate('/blogs');
      } else {
        setError(resData.error);
      }
    } catch (error) {
      setError('An error occurred while deleting the blog');
    } finally {
      setShowDeleteDialog(false);
    }
  };

  const handleDeleteDialogOpen = () => {
    setShowDeleteDialog(true);
  };

  const handleEditBlog = () => {
    navigate(`/blogs/edit/${id}`);
  };

  const handleDeleteDialogClose = () => {
    setShowDeleteDialog(false);
  };

  const handleAddComment = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in local storage

    try {
      const response = await fetch(`https://backblog-yegi.onrender.com/api/blog/${id}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ text: commentText, author: userId }),
      });
      const resData = await response.json();
      if (response.ok) {
        setComments([...comments, resData.comments[resData.comments.length - 1]]);
        setCommentText('');
      } else {
        setError(resData.error);
      }
    } catch (error) {
      console.log(error)
      setError('An error occurred while adding the comment');
    }
  };

  if (loading) {
    return <SimmerBlog />;
  }

  if (error) {
    return <Container>{error}</Container>;
  }

  return (
    <>
      <Container>
        {blog && (
          <>
            <Container maxWidth='full' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', maxHeight: '400px', overflow: 'hidden', mt: 5 }}>
              <img src={blog.image} alt='' style={{ width: '100%' }} />
            </Container>
            <Typography variant='h2' sx={{ my: 5, fontFamily: 'Anton SC', width: '100%', fontSize: 36, mb: 2, wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              {blog.title}
            </Typography>
            <Typography variant='h3' sx={{ my: 3, fontFamily: 'Montserrat', fontSize: 20, mb: 2, wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              {blog.subTitle}
            </Typography>
            <Typography variant='h3' sx={{ my: 3, fontSize: 15, letterSpacing: 2, mb: 2, wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              <div style={{ display: 'flex' }}>
                <Avatar></Avatar>
                <div style={{ marginLeft: 10 }}>
                  <div>{blog.author.fname + " " + blog?.author?.lname}</div>
                  <div>{blog.author.email}</div>
                </div>
              </div>
            </Typography>
            <Divider />
            <Typography sx={{ fontFamily: 'Wittgenstein', fontSize: 16 }}>
              <Markdown>{blog.body}</Markdown>
            </Typography>

            <Divider sx={{ my: 3 }} />


            <Typography variant='subtitle2' sx={{ mt: 2 }}>
              Updated At: {new Date(blog.updatedAt).toLocaleString()}
            </Typography>


            {blog?.isAuthor && (
              <>
                <Button variant='contained' color='secondary' startIcon={<EditIcon />} sx={{ ml: 0 }} onClick={handleEditBlog}>
                  Edit
                </Button>
                <Button variant="outlined" color='error' startIcon={<DeleteIcon />} sx={{ m: 5 }} onClick={handleDeleteDialogOpen}>
                  Delete
                </Button>
                <Dialog open={showDeleteDialog} onClose={handleDeleteDialogClose}>
                  <DialogTitle>Confirm Delete</DialogTitle>
                  <DialogContent>
                    <Typography>Are you sure you want to delete this blog?</Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleDeleteDialogClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error" variant="outlined">
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            )}

            <Divider sx={{ my: 3 }} />

            <Typography variant='h4' sx={{ my: 3 }}>
              Comments
            </Typography>

            {comments && comments?.map((comment) => (
              <Container key={comment._id} sx={{ my: 2, display: 'flex', gap: 3 }}>
                <Avatar></Avatar>
                <Stack>
                  <Typography variant='subtitle2' fontFamily={'Wittgenstein'} fontSize={16}>{comment?.author?.fname} </Typography>
                  <Typography variant='body2' fontFamily={'Wittgenstein'} fontSize={16}>{comment.text}</Typography>
                  <Typography variant='caption'>{new Date(comment.createdAt).toLocaleString()}</Typography>
                </Stack>
              </Container>
            ))}

            <Divider sx={{ my: 3 }} />

            <TextField
              label="Add a comment"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <Button variant='contained' color='primary' sx={{ mt: 2 }} onClick={handleAddComment}>
              Submit Comment
            </Button>
          </>
        )}
      </Container>

    </>

  );
}

export default Blog;
