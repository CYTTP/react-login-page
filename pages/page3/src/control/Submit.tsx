import { FC } from 'react';
import { Button, ButtonProps } from 'react-login-page';

export const Submit: FC<Omit<ButtonProps, 'name'>> = (props) => {
  const { ...elmProps } = props;
  if (!elmProps.children) {
    elmProps.children = 'Log in';
  }
  return <Button type="submit" {...elmProps} name="submit" />;
};
