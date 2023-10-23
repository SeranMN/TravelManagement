import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import axios from "axios";
import { Chip } from '@mui/material';
import DeactivateAccountModel from "./DeactivateAccountModel";

const Profile = () => {
  const id = sessionStorage.getItem('id')
  const sessionName = sessionStorage.getItem('name')
  const sesssionEmail = sessionStorage.getItem('email')
  const sessionPhoneNumber = sessionStorage.getItem('phoneNumber')
  const sessionstatus = sessionStorage.getItem('status')
  const [name, setName] = useState('');
  const [NIC, setNIC] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState();
  const [profileData, setProfileData] = useState();
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [toggle, setToggle] = useState(false)
  const [deactivate, setDeactivate] = useState(false)

  useEffect(() => {
      setNIC(id)
      setName(sessionName)
      setEmail(sesssionEmail)
      setPhone(sessionPhoneNumber)
      setStatus(sessionstatus)
  }, [id, sessionName, sesssionEmail, sessionPhoneNumber, sessionstatus])

  useEffect(() => {
    setIsDataChanged(
      (id !== NIC || sessionName !== name || sesssionEmail !== email || sessionPhoneNumber !== phone || sessionstatus !== status)
    )
  }, [ NIC, name, email, phone, status])

  const handleCloseDeActivate = () => {
    setDeactivate(false)
  }

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
        .then((res) => {
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
          <Stack sx={{mr: 4}} spacing={5} direction={"row"} alignItems={"center"} justifyContent={"flex-end"}>
            {status ? <Chip color="success" label={"Active"} sx={{ ml: 2 }} /> : <Chip color="error" label={"Deactive"} sx={{ ml: 2 }} />}
            <Button onClick={() => setDeactivate(true)} color="error" variant="contained" sx={{ textAlign: 'right' }}>
                Deactivate My Account
            </Button>
          </Stack>
          {deactivate && <DeactivateAccountModel deactivate={deactivate} handleCloseDeActivate={handleCloseDeActivate} userId ={id}/>}
       
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