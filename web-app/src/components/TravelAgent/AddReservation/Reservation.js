import React, { useState } from 'react'
import { Box, Stack, FormLabel, FormControl, Select, MenuItem, Typography, InputLabel } from '@mui/material'
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios'
import AvalaibleTrainsTable from './AvalaibleTrainsTable';

const Reservation = () => {
  const stations = [
    "Ahungalle", "Akurala", "Aluthgama", "Ambalangoda", "Andadola", "Balapitiya", "Bambalapitiya", "Bentota", "Beruwala", "Boossa",
    "Dehiwala", "Dodanduwa", "Egodauyana", "Fort", "Galle", "Ginthota", "Habaraduwa", "Hettimulla", "Hikkaduwa", "Induruwa",
    "Kahawa", "Kaluthara South", "Kalutara North", "Kamburugamuwa", "Kandegoda", "Katugoda", "Katukurunda", "Kathaluwa", "Koggala", "Kompnnavidiya",
    "Kollupitiya", "Koralawella", "Kosgoda", "Kumarakanda", "Lunawa", "Madampagama", "Matara", "Mha Induruwa", "Mirissa", "Moratuwa", "Mount Laviniya",
    "Piliduwa", "Panadura", "Patagamgoda", "Payagala North", "Payagala South", "Piyadigama", "Piyagama", "Pinwatte", "Rathgama", "Rathmalana", "Richmond Hill",
    "Secretartat Halt", "Seenigama", "Taple", "Telwatte", "Thiranagama", "Train Halt 01", "Unawatuna", "Wadduwa", "Wellawatte", "Weligama"
  ];

  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [searchResults, setResults] = useState()

  const handleSubmit = () => {
    console.log(from, to)
    axios.get(`http://localhost:5000/api/schedule/tour/?from=${from}&to=${to}`)
      .then((res) => {
        setResults(res.data)
        console.log('ssca', res.data)
      })
      .catch((err) => console.log(err))
  }

  const handleReset = () => {
    console.log(from, to)
    setTo("")
    setFrom("")
  }

  return (
    <Box>
      <Box sx={{ pt: 2, pb: 4, boxShadow: 2, backgroundColor: '#e0e0e0' }}>
        <Typography mt={1} mb={2} align='center' variant='h5' color={"primary"} >
          Check Avalability of Trains
        </Typography>

        <Stack direction="row" spacing={6} justifyContent={"center"}>
          <Stack direction="row" spacing={2} alignItems='center'>
            <FormLabel sx={{ color: "black" }}>FROM</FormLabel>
            <FormControl fullWidth>
              <Select
                id="from"
                name='from'
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                style={{ width: 200, height: 50 }}
                defaultValue={""}
                displayEmpty
                MenuProps={{
                  sx: {
                    height: 300,
                  },
                }}

              >
                <MenuItem value="">
                  Choose a Station
                </MenuItem>
                {stations && stations?.map((st, index) => (
                  <MenuItem key={index} value={st}>
                    {st}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Stack direction="row" spacing={2} alignItems='center'>
            <FormLabel sx={{ color: "black" }}>To </FormLabel>
            <FormControl fullWidth>
              <Select
                id="to"
                name='to'
                value={to}
                onChange={(e) => setTo(e.target.value)}
                style={{ width: 200, height: 50 }}
                defaultValue={""}
                displayEmpty
                MenuProps={{
                  sx: {
                    height: 300,
                  },
                }}

              >
                <MenuItem value="">
                  Choose a Station
                </MenuItem>
                {stations && stations?.map((st, index) => (
                  <MenuItem key={index} value={st}>
                    {st}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Stack direction="row" spacing={2} alignItems='center'>
            <Button onClick={handleSubmit} disabled={!from || !to} sx={{ borderRadius: 5 }} variant="contained" startIcon={<SearchIcon />}>
              Search
            </Button>
          </Stack>
          <Stack direction="row" spacing={2} alignItems='center'>
            <Button color='error' onClick={handleReset} sx={{ borderRadius: 5 }} variant="contained" >
              Reset
            </Button>
          </Stack>
        </Stack>
      </Box>

      {searchResults &&
        <Box sx={{pt: 2, px: 2}}>
          <AvalaibleTrainsTable searchResults={searchResults} />
        </Box>
      }

    </Box>
  )
}

export default Reservation
