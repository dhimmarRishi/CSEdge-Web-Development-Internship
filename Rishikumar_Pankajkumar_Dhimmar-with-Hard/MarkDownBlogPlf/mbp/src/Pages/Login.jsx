import React, { useState } from "react";
import {
  Button,
  Container,
  Fade,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function App() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();



  const handleLogin = async (event) => {
    event.preventDefault();

    // console.log(formData);
    const { email, password } = formData;
    if (!email || !password) return;

    await fetch("https://backblog-yegi.onrender.com/api/account/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (res) => {
        const resData = await res.json();
        if (!resData.token) throw new Error("No token received");

        localStorage.setItem('token', resData.token)
        console.log(resData);
        navigate('/blogs')
      })
      .catch((e) => {
        console.log("Error : " + e);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name + "  : " + value);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <Container sx={{ mt: 5, textAlign: "center", pt: 5 }}>
      <Typography mb={5} variant="h5" fontFamily={'Anton SC'} fontSize={23} letterSpacing={8} >

        Login
      </Typography>
      <form onSubmit={handleLogin} id="registerform">
        <Stack gap={3}>

          <TextField
            size="small"
            name="email"
            type="email"
            label="Email"
            // placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            variant="outlined"
          />

          <TextField
            size="small"
            name="password"
            type="password"
            label="Password"
            // placeholder="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button variant="contained" type="submit" sx={{
            color: 'white', bgcolor: 'black',
            "&:hover": {
              bgcolor: "gray",
            }
          }}>
            Login
          </Button>
          <Typography variant="p" >
            Don't have an account ? <Link to='/account/register' >Register</Link>
          </Typography>
        </Stack>
      </form>
    </Container>
  );
}

export default App;
