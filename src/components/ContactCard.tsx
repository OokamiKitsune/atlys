    import React, { useState } from 'react';
    import Card from '@mui/material/Card';
    import { LocationOn, Edit, TitleOutlined, Phone, Email, Delete, Add, AddBusiness, AddBusinessSharp } from '@mui/icons-material';
    import { Box, Avatar, Stack, Typography, IconButton, Divider, Chip, Switch } from '@mui/material';
    import { grey } from '@mui/material/colors';

    interface ContactCardProps {
        vendorName: string;
        vendorAddress: string;
        vendorCity: string;
        vendorState: string;
        vendorZip: string;
        vendorPhone: string;
        vendorEmail: string;
    }

    const ContactCard: React.FC<ContactCardProps> = ({
        vendorName,
        vendorAddress,
        vendorCity,
        vendorState,
        vendorZip,
        vendorPhone,
        vendorEmail
    }) => {
        return (
        <Card>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <IconButton>
                <Add sx={{ fontSize: 100  }} /> Add Vendor
            </IconButton>
            </Box>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                

                <Stack spacing={0.5}>
                    <Typography fontWeight={700} fontSize={25}>
                    {vendorName}
                    Amazon Inc.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    <LocationOn sx={{color: grey[500]}} />
                    {vendorAddress}
                    {vendorCity} 
                    {vendorState} 
                    {vendorZip}
                    Scranton, PA 
                    <br></br>
                    <Phone sx={{color: grey[500]}} /> 
                    {vendorPhone}
                    800-555-0123
                    <br></br>
                    <Email sx={{color: grey[500]}} />
                    {vendorEmail}
                    jeff.bezos@amazon.com
                    </Typography>
                </Stack>
                <Box alignContent={'flex-end'} sx={{ p: 2, display: 'flex' }}>
                    <IconButton>
                        <Edit sx={{ fontSize: 25  }} />
                    </IconButton>
                    <IconButton>
                    <Delete sx={{ fontSize: 25  }} />
                    </IconButton>
            </Box>

            </Box>

        </Card>
        )
        };

    export default ContactCard;
