import type {MouseEvent, ReactNode} from 'react';
import { useState} from 'react';
import { set, sub } from 'date-fns';
import { faker } from '@faker-js/faker';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import { fToNow } from '@components/utils/format-time';
import {Iconify} from '@components/iconify';
import {Scrollbar} from '@components/scrollbar';



interface Notification {
  avatar: string | null,
  createdAt: Date;
  description: string;
  id: string;
  isUnRead: boolean,
  title: string;
  type: string;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: faker.string.uuid(),
    title: 'Your order is placed',
    description: 'waiting for shipping',
    avatar: null,
    type: 'order_placed',
    createdAt: set(new Date(), { hours: 10, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.string.uuid(),
    title: faker.person.fullName(),
    description: 'answered to your comment on the Minimal',
    avatar: '/assets/images/avatars/avatar_2.jpg',
    type: 'friend_interactive',
    createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.string.uuid(),
    title: 'You have new message',
    description: '5 unread messages',
    avatar: null,
    type: 'chat_message',
    createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: faker.string.uuid(),
    title: 'You have new mail',
    description: 'sent from Guido Pad berg',
    avatar: null,
    type: 'mail',
    createdAt: sub(new Date(), { days: 2, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: faker.string.uuid(),
    title: 'Delivery processing',
    description: 'Your order is being shipped',
    avatar: null,
    type: 'order_shipped',
    createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
];

export function NotificationsPopover(): ReactNode {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const totalUnRead = notifications.filter((item) => item.isUnRead).length;

  const [isOpen, setIsOpen] = useState<EventTarget | null>(null);

  const handleIsOpen = (event: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLButtonElement>): void => {
    setIsOpen(!isOpen ? event.currentTarget : null)
  }

  const handleMarkAllAsRead = () : void=> {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  };

  return (
    <>
      <IconButton color={isOpen ? 'primary' : 'default'} onClick={handleIsOpen}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="solar:bell-bing-bold-duotone" width='24' />
        </Badge>
      </IconButton>

      <Popover
        anchorEl={isOpen as Element}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={handleIsOpen}
        open={Boolean(isOpen)}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Paper sx={{
          mt: 1.5,
          ml: 0.75,
          width: 360,
        }}>

        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography sx={{ color: 'text.secondary' }} variant="body2">
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                {/* <Iconify icon="eva:done-all-fill" /> */}
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {notifications.slice(0, 2).map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Before that
              </ListSubheader>
            }
          >
            {notifications.slice(2, 5).map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button disableRipple fullWidth>
            View All
          </Button>
        </Box>
        </Paper>
      </Popover>
    </>
  );
}




function NotificationItem({ notification }: {notification: Notification}): ReactNode {
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
            variant="caption"
          >
             <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(notification.createdAt)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}



function renderContent(notification: Notification): {avatar: ReactNode, title: ReactNode}{
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" sx={{ color: 'text.secondary' }} variant="body2">
        &nbsp; {notification.description}
      </Typography>
    </Typography>
  );

  if (notification.type === 'order_placed') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_package.svg" />,
      title,
    };
  }
  if (notification.type === 'order_shipped') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_shipping.svg" />,
      title,
    };
  }
  if (notification.type === 'mail') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_mail.svg" />,
      title,
    };
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_chat.svg" />,
      title,
    };
  }
  return {
    avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
    title,
  };
}
