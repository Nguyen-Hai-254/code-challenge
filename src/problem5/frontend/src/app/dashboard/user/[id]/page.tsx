import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { config } from '@/config';
import { AccountInfo } from '@/components/dashboard/account/account-info';
import { UpdateUserForm } from '@/components/dashboard/update-user/update-user-form';

export const metadata = { title: `User | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
    return (
        <Stack spacing={3}>
            <div>
                <Typography variant="h4">Update User</Typography>
            </div>
            <Grid container spacing={3}>
                <Grid lg={4} md={6} xs={12}>
                    <AccountInfo />
                </Grid>
                <Grid lg={8} md={6} xs={12}>
                    <UpdateUserForm />
                </Grid>
            </Grid>
        </Stack>
    );
}

// { params }: { params: { id: string } }