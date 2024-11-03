import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from '@mui/material';

const ProfileTable = () => {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        // Fetch profiles from the backend
        const fetchProfiles = async () => {
            try {
                const token = localStorage.getItem('token');  // Retrieve token from storage
                const response = await axios.get('http://127.0.0.1:8000/api/profile/profiles/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfiles(response.data);
            } catch (error) {
                console.error("Error fetching profiles:", error);
            }
        };
              

        fetchProfiles();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Profile Image</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell>Nationality</TableCell>
                        <TableCell>Region</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Informed By</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {profiles.map((profile) => (
                        <TableRow key={profile.id}>
                            <TableCell>
                                <Avatar src={profile.image} alt="Profile Image" />
                            </TableCell>
                           
                            <TableCell>{profile.phone_number || '-'}</TableCell>
                            <TableCell>{profile.nationality || '-'}</TableCell>
                            <TableCell>{profile.region || '-'}</TableCell>
                            <TableCell>{profile.age || '-'}</TableCell>
                            <TableCell>{profile.informed_by || '-'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProfileTable;
