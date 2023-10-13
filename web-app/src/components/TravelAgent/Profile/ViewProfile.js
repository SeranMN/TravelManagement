import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import { Chip } from '@mui/material';

const Profile = () => {

  
  const [name, setName] = useState('');
  const [NIC, setNIC] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [status, setStatus] = useState();
  const [profileData, setProfileData] = useState();
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    const getData = async () => {
      axios.get(`http://localhost:5000/api/user/${"992511273v"}`)
        .then((res) => {
          console.log("res.data", res.data)
          setProfileData(res.data)
        })
        .catch((err) => console.log(err))
    }
    getData()
  }, [toggle])

  useEffect(() => {
    if (profileData) {
      setNIC(profileData.id)
      setName(profileData.name)
      setEmail(profileData.email)
      setPhone(profileData.phoneNumber)
      setStatus(profileData.status)
    }
  }, [profileData])

  useEffect(() => {
    setIsDataChanged(
      (profileData && (profileData.id !== NIC || profileData.name !== name || profileData.email !== email || profileData.phoneNumber !== phone || profileData.status !== status))
    );
  }, [ NIC, name, email, phone, status])

  const onSubmit = () => {
    const user = {
        id: NIC,
        name: name,
        email: email,
        phoneNumber: phone,
        role: "Travel Agent",
        status: true
    }

    axios.put(`http://localhost:5000/api/user/${NIC}`, user)
        .then(() => {
            alert("sucess")
            setToggle(!toggle)
        }).catch((err) => {
           console.log(err)
        })
}

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box
        component="span"
        sx={{
          transform: "scale(1.0)",
          backgroundColor: "white",
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          m: 3
        }}
      >
        <Card sx={{ width: 650 }}>
          <Box sx={{ textAlign: 'right', mr: 2 }}>
            {status ? <Chip color="success" label={"Active"} sx={{ ml: 2 }} /> : <Chip color="error" label={"Deactive"} sx={{ ml: 2 }} />}
          </Box>
          <CardContent
            component="img"
            src="/icons8-male-user-96.png"
            height={"150"}
            width={"150"}
          />

          <Typography sx={{ mb: 2 }} variant="h4" component="div">
              My Profile
          </Typography>
          <CardContent>
            <TextField
              id="filled-basic"
              label="Name"
              sx={{ width: 300, paddingRight: 2 }}
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="filled-basic"
              label="NIC No"
              disabled
              sx={{ width: 300 }}
              value={NIC}
              onChange={(e) => {
                setNIC(e.target.value)
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </CardContent>

          <CardContent>
            <TextField
              id="filled-basic"
              label="Email"
              sx={{ width: 600 }}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </CardContent>

          <CardContent>
            <TextField
              id="filled-basic"
              label="Contact No"
              sx={{ width: 600 }}
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </CardContent>

          {isDataChanged &&
            <CardContent sx={{}}>
              <Button onClick={onSubmit} variant="contained" sx={{ width: "100%", height: 40 }}>
                Edit
              </Button>
            </CardContent>
          }
        </Card>
      </Box>
    </div>
  )
}

export default Profile