"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

import { useSelection } from "@/hooks/use-selection";
import { deleteUserApi, getAllUserApi } from "@/api/user";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { getUpdateUserPath } from "@/paths";
import { toast } from "react-toastify";
import Toastify from "@/components/toastify/toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

function noop(): void {
  // do nothing
}
export interface Customer {
  _id: string;
  avatar: string;
  name: string;
  email: string;
  age: number;
  salary: number;
  address: { city: string; state: string; country: string; street: string };
  phone: string;
  createdAt: Date;
}

interface CustomersTableProps {
  count?: number;
  page?: number;
  rowsPerPage?: number;
}

export function CustomersTable({
  count = 0,
  page = 0,
  rowsPerPage = 5,
}: CustomersTableProps): React.JSX.Element {
  const [rows, setRows] = React.useState<Customer[]>([]);

  const router = useRouter();
  const age = useSelector((state: RootState) => state.filter.age);
  const salary = useSelector((state: RootState) => state.filter.salary);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        age ?? 100;
        salary ?? 0;
        const res = await getAllUserApi(age, salary);
        setRows(res.data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchData();
  }, [age, salary]);

  const rowIds = React.useMemo(() => rows.map((customer) => customer._id), [rows]);
  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = selected.size > 0 && selected.size < rows.length;
  const selectedAll = rows.length > 0 && selected.size === rows.length;

  const editUser = (id: string) => {
    router.push(getUpdateUserPath(id));
  }

  const deleteUser = async (id: string) => {
    try {
      const deleteRes = await deleteUserApi(id);
      toast.success(deleteRes.message);
      const newRows = rows.filter(row => row._id !== id);
      setRows(newRows);
    } catch (e: any) {
      console.log(e);
      toast.error(e.response.data.message)
    }
  }

  return (
    <Card>
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: "800px" }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll();
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected.has(row._id);

              return (
                <TableRow hover key={row._id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(row._id);
                        } else {
                          deselectOne(row._id);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar src={row.avatar} />
                      <Typography variant="subtitle2">{row.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell> {row.phone ?? 'Chưa cập nhật'} </TableCell>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>{row.salary ? row.salary.toLocaleString("en-US") + ' VNĐ' : 'Chưa cập nhật'}</TableCell>
                  <TableCell>
                    <Button variant="contained" sx={{ width: '85px' }} onClick={() => editUser(row._id)}>Edit</Button>
                    <Button variant="outlined" color="error" sx={{ ml: 2, width: '85px' }} onClick={() => deleteUser(row._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      {/* <TablePagination
        component="div"
        count={count}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
      <Toastify />
    </Card >
  );
}
