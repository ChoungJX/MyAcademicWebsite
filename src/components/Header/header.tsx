import { Stack, Typography } from '@mui/joy';
import { AppBar, Badge, Button, Divider, IconButton, ListItemText, Menu, MenuItem, Toolbar } from '@mui/material';
import { default as React } from 'react';
import TranslateIcon from '@mui/icons-material/Translate';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GitHubIcon from '@mui/icons-material/GitHub';
import './header.css'

export default function Header(props: any) {


  const [languageEl, setLanguageEl] = React.useState<null | HTMLElement>(null);
  const [notificationEl, setNotificationEl] = React.useState<null | HTMLElement>(null);

  const [notificationsFlag, setnotificationsFlag] = React.useState<string | null>("new");


  const isLanguageMenuOpen = Boolean(languageEl);
  const isNotificationElOpen = Boolean(notificationEl);


  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setLanguageEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setnotificationsFlag(null)
    setNotificationEl(event.currentTarget);
  };

  const handleLanguageMenuSwitch = (language: string) => {
    props.switchLanguage(language);
    setLanguageEl(null);
  };

  const handleLanguageMenuClose = () => {
    setLanguageEl(null);
  };

  const handleNotificationMenuClose = () => {
    setNotificationEl(null);
  };

  const renderLanguageMenu = (
    <Menu
      anchorEl={languageEl}
      keepMounted
      open={isLanguageMenuOpen}
      onClose={handleLanguageMenuClose}
      disableScrollLock={true}
    >
      <MenuItem onClick={() => handleLanguageMenuSwitch("english")}>English</MenuItem>
      <MenuItem onClick={() => handleLanguageMenuSwitch("chinese")}>简体中文</MenuItem>
      <MenuItem disabled>日本語</MenuItem>
    </Menu>
  );

  const renderNotificationMenu = (
    <Menu
      anchorEl={notificationEl}
      keepMounted
      open={isNotificationElOpen}
      onClose={handleNotificationMenuClose}
      disableScrollLock={true}
    >
      {props.Notification ? props.Notification.map((row: any, index: number) => (
        index === props.Notification.length - 1 ?
          <div key={index}>
            <MenuItem>
              <ListItemText primary={row.news} secondary={row.date} />
            </MenuItem>
          </div>
          :
          <div key={index}>
            <MenuItem>
              <ListItemText primary={row.news} secondary={row.date} />
            </MenuItem>
            <Divider />
          </div>
      )): null}
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: '#EAF1FB' }}>
        <Toolbar>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            sx={{
              width: '100%'
            }}
          >
            <div className='header-text-full'>
              <Typography
                fontSize='24px'
                fontWeight={600}
                noWrap
                sx={{
                  color: '#444746'
                }}
              >
                {`${props.Name}`}
              </Typography>
            </div>
            <div className='header-text-short'>
              <Typography
                fontSize='24px'
                fontWeight={600}
                noWrap
                sx={{
                  color: '#444746'
                }}
              >
                {props.Name}
              </Typography>
            </div>
            <div />
            <div className='header-button-all'>
              <Button
                onClick={(event) => { handleLanguageMenuOpen(event) }}
                startIcon={<TranslateIcon style={{ fontSize: 25 }} />}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                  color: '#444746'
                }}
              >
                {props.Language?.Header?.Language}
              </Button>
              <IconButton
                onClick={(event) => { handleNotificationMenuOpen(event) }}
                sx={{
                  color: '#444746'
                }}
              >
                <Badge
                  badgeContent={notificationsFlag}
                  sx={{ '& .MuiBadge-badge': { backgroundColor: '#C2E7FF' } }}
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                onClick={() => { window.open(props.Github) }}
                sx={{
                  color: '#444746'
                }}
              >
                <Badge color="secondary">
                  <GitHubIcon />
                </Badge>
              </IconButton>
            </div>
            <div className='header-button-small'>
              <Button
                onClick={(event) => { handleLanguageMenuOpen(event) }}
                startIcon={<TranslateIcon style={{ fontSize: 25 }} />}
                endIcon={<KeyboardArrowDownIcon style={{ marginLeft: '-12px' }} />}
                sx={{
                  color: '#444746'
                }}
              />
              <IconButton
                onClick={(event) => { handleNotificationMenuOpen(event) }}
                sx={{
                  color: '#444746'
                }}
              >
                <Badge
                  badgeContent={notificationsFlag}
                  sx={{ '& .MuiBadge-badge': { backgroundColor: '#C2E7FF' } }}
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                onClick={() => { window.open(props.Github) }}
                sx={{
                  color: '#444746'
                }}
              >
                <Badge color="secondary">
                  <GitHubIcon />
                </Badge>
              </IconButton>
            </div>
          </Stack>
        </Toolbar>
      </AppBar>
      {renderNotificationMenu}
      {renderLanguageMenu}
    </>
  );
}
