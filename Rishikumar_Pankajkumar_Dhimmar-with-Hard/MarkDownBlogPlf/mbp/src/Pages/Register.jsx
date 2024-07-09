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
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const registerUser = async (event) => {
    event.preventDefault();

    console.log(formData);
    const { fname, lname, email, password } = formData;
    if (!fname || !email || !password) return;

    await fetch("https://backblog-yegi.onrender.com/api/account/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (res) => {
        const resData = await res.json();
        console.log(resData);
        navigate('/account/login')
      })
      .catch((e) => {
        console.log("Error : " + e);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name + "  : " + value);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <Container sx={{ mt: 5, textAlign: "center", pt: 5 }}>
      <Typography mb={5} variant="h5" fontFamily={'Anton SC'} fontSize={23} letterSpacing={8} >
        Create  Account
      </Typography>
      <form onSubmit={registerUser} id="registerform">
        <Stack gap={3}>
          <TextField
            size="small"
            name="fname"
            // placeholder="First name"
            label="First Name"
            value={formData.fname}
            onChange={handleChange}
            required
          />
          <TextField
            size="small"
            name="lname"
            label="Last Name"
            // placeholder="First name"
            value={formData.lname}
            onChange={handleChange}
          />
          <TextField
            size="small"
            name="email"
            type="email"
            label="Email"
            // placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
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
            "&:hover":{
              bgcolor : "gray",
            }
          }}>
            Create Account
          </Button>
          <Typography variant="p">
            Already have an account ? <Link to='/account/login'>Login</Link>
          </Typography>
        </Stack>
      </form>
    </Container>
  );
}

export default App;
