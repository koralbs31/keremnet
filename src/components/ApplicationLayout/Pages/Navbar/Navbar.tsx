import { Link } from 'react-router-dom';
import { User } from '../../../../App';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack
} from '@mui/material';
import colors from '../../../../colors'; 

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: colors.navbarBg }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          <Link to="/" style={{ color: colors.navbarText, textDecoration: 'none' }}>
            KeremNet
          </Link>
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button sx={{ color: colors.navbarText }} component={Link} to="/">Home</Button>
          <Button sx={{ color: colors.navbarText }} component={Link} to="/contact">Contact</Button>

          {user ? (
            <>
              <Button sx={{ color: colors.navbarText }} component={Link} to="/AddPost">Add Post</Button>
              <Button sx={{ color: colors.navbarText }} component={Link} to="/profile">Profile</Button>
              <Button
                variant="outlined"
                sx={{ color: colors.navbarText, borderColor: colors.navbarOutline }}
                onClick={onLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button sx={{ color: colors.navbarText }} component={Link} to="/login">Login</Button>
              <Button sx={{ color: colors.navbarText }} component={Link} to="/register">Register</Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
