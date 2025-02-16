'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import { createUserApi, getDetailUser, updateUserApi } from '@/api/user';
import Toastify from '@/components/toastify/toastify';
import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';

const states = [
  { value: 18, label: '18' },
  { value: 19, label: '19' },
  { value: 20, label: '20' },
  { value: 21, label: '21' },
  { value: 22, label: '22' },
  { value: 23, label: '23' },
  { value: 24, label: '24' },
  { value: 25, label: '25' },
  { value: 26, label: '26' },
  { value: 27, label: '27' },
  { value: 28, label: '28' },
  { value: 29, label: '29' },
  { value: 30, label: '30' },
  { value: 31, label: '31' },
  { value: 32, label: '32' },
  { value: 33, label: '33' },
  { value: 34, label: '34' },
  { value: 35, label: '35' },
  { value: 36, label: '36' },
  { value: 37, label: '37' },
  { value: 38, label: '38' },
  { value: 39, label: '39' },
  { value: 40, label: '40' },
  { value: 41, label: '41' },
  { value: 42, label: '42' },
  { value: 43, label: '43' },
  { value: 44, label: '44' },
  { value: 45, label: '45' },
  { value: 46, label: '46' },
  { value: 47, label: '47' },
  { value: 48, label: '48' },
  { value: 49, label: '49' },
  { value: 50, label: '50' },
  { value: 51, label: '51' },
  { value: 52, label: '52' },
  { value: 53, label: '53' },
  { value: 54, label: '54' },
  { value: 55, label: '55' },
  { value: 56, label: '56' },
  { value: 57, label: '57' },
  { value: 58, label: '58' },
  { value: 59, label: '59' },
  { value: 60, label: '60' },
  { value: 61, label: '61' },
  { value: 62, label: '62' },
  { value: 63, label: '63' },
  { value: 64, label: '64' },
  { value: 65, label: '65' },
  { value: 66, label: '66' },
  { value: 67, label: '67' },
  { value: 68, label: '68' },
  { value: 69, label: '69' },
  { value: 70, label: '70' },
  { value: 71, label: '71' },
  { value: 72, label: '72' },
  { value: 73, label: '73' },
  { value: 74, label: '74' },
  { value: 75, label: '75' },
  { value: 76, label: '76' },
  { value: 77, label: '77' },
  { value: 78, label: '78' },
  { value: 79, label: '79' },
  { value: 80, label: '80' }
] as const;

const handleSubmit = async (event: any) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const values = Object.fromEntries(formData.entries());

  try {
    const callApi = await createUserApi(values);
    toast.success(callApi.data.message);
  } catch (e: any) {
    console.error(e);
    toast.error(e.response.data.message);
  }
}

export function UpdateUserForm(): React.JSX.Element {
  const { id } = useParams();
  const router = useRouter();

  const [user, setUser] = React.useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    salary: "",
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDetailUser(id);
        setUser(res.data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleUpdate = async () => {
    try {
      const updateUser = await updateUserApi(id, user);
      toast.success(updateUser.message);
      setTimeout(() => {
        router.push('/dashboard/customers');
      }, 1500);
    } catch (error: any) {
      console.error("Lỗi khi cập nhật user:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Name</InputLabel>
                <OutlinedInput placeholder="Enter name" label="Your name" name="name" value={user.name} onChange={handleChange} />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput type="email" defaultValue="hari@gmail.com" label="Email address" name="email" value={user.email} onChange={handleChange} />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Phone number</InputLabel>
                <OutlinedInput label="Phone number" name="phone" type="tel" value={user.phone} onChange={handleChange} />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Age</InputLabel>
                <Select defaultValue="" label="Age" name="age" variant="outlined" value={user.age} onChange={handleChange}>
                  {states.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Salary</InputLabel>
                <OutlinedInput label="Salary" name="salary" placeholder='(VNĐ)' value={user.salary} onChange={handleChange} />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleUpdate}>Update User</Button>
        </CardActions>
      </Card>
      <Toastify />

    </form>
  );
}
