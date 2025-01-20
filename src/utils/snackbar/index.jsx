import { notifications } from '@mantine/notifications';
const position = 'top-center';


export const errorSnackbar = (message) => {

  notifications.show({
    title: 'Error',
    message: message || 'Something went wrong',
    position: position,
    color: '#d32f2f'
  });
};

export const successSnackbar = (message) => {
  notifications.show({
    title: 'Success',
    message: message,
    position: position,
    color: '#2e7d32'
  });
};

export const warningSnackbar = (message) => {
  notifications.show({
    title: 'Warning',
    message: message,
    position: position,
    color: '#ed6c02'
  });
};
