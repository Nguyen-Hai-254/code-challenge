'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setAge, setSalary } from '@/redux/slices/filterSlice';
import { Box } from '@mui/system';

export function CustomersFilters(): React.JSX.Element {
  const dispatch = useDispatch();

  return (
    <Box sx={{ display: 'flex' }}>
      <Card sx={{ p: 2, display: 'flex', width: '100%' }}>
        <OutlinedInput
          defaultValue=""
          fullWidth
          placeholder="Search customer"
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
            </InputAdornment>
          }
          sx={{ maxWidth: '600px' }}
        />
        <FormControl fullWidth sx={{ ml: 5 }}>
          <InputLabel id="age-select-label">Age</InputLabel>
          <Select labelId="age-select-label" onChange={(e: SelectChangeEvent) => dispatch(setAge(e.target.value))} label="Age">
            <MenuItem value="20">&lt; 20</MenuItem>
            <MenuItem value="30">20 &le; Age &lt; 30</MenuItem>
            <MenuItem value="40">30 &le; Age &lt; 40</MenuItem>
            <MenuItem value="50">40 &le; Age &lt; 50</MenuItem>
            <MenuItem value="60">&le; 50 </MenuItem>
            <MenuItem value="">Age</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ ml: 2 }}>
          <InputLabel>Salary</InputLabel>
          <Select onChange={(e: SelectChangeEvent) => dispatch(setSalary(e.target.value))}>
            <MenuItem value="10000000">{"< 10,000,000 VNĐ"}</MenuItem>
            <MenuItem value="20000000">10,000,000 &le; Salary &lt; 20,000,000 VNĐ</MenuItem>
            <MenuItem value="30000000">20,000,000 &le; Salary &lt; 30,000,000 VNĐ</MenuItem>
            <MenuItem value="40000000">30,000,000 &le; Salary &lt; 40,000,000 VNĐ</MenuItem>
            <MenuItem value="50000000">40,000,000 &le; Salary &lt; 50,000,000 VNĐ</MenuItem>
            <MenuItem value="60000000">&ge; 50,000,000 VNĐ</MenuItem>
            <MenuItem value="">{"Salary"}</MenuItem>
          </Select>
        </FormControl>
      </Card>
    </Box>

  );
}
