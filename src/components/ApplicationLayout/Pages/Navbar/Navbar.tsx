import { Link } from 'react-router-dom';
import { User } from '../../../../App';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack
} from '@mui/material';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#898AC4'}}>
        <Typography variant="h6" component="div">
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            KeremNet
          </Link>
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/contact">Contact</Button>

          {user ? (
            <>
              <Button color="inherit" component={Link} to="/AddPost">Add Post</Button>
              <Button variant="outlined" color="inherit" onClick={onLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
