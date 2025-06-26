import React from "react";
import { Card, Avatar, Typography, Box } from "@mui/material";

interface ProfileCardProps {
  avatarUrl: string;
  postsCount: number;
  username: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  avatarUrl,
  postsCount,
  username,
}) => {
  return (
    <Card
      sx={{
        maxWidth: 480,
        mx: "auto",
        borderRadius: 4,
        boxShadow: 6,
        textAlign: "center",
        p: 5,
      }}
    >
      <Avatar
        src={avatarUrl}
        alt="Profile picture"
        sx={{ width: 180, height: 180, mx: "auto", mb: 3 }}
      />
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {username}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Posts: {postsCount}
      </Typography>
    </Card>
  );
};

export default ProfileCard;
