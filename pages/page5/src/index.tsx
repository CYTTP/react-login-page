import { FC, PropsWithChildren, cloneElement, isValidElement } from 'react';
import { Render, Provider, Container, useStore } from 'react-login-page';
import { Username } from './control/Username';
import { Password } from './control/Password';
import { Submit } from './control/Submit';
import { Footer } from './control/Footer';
import { Logo } from './control/Logo';
import { Title } from './control/Title';

import './index.css';

export * from 'react-login-page';
export * from './control/Username';
export * from './control/Password';
export * from './control/Submit';
export * from './control/Title';
export * from './control/Logo';
export * from './control/Footer';

const RenderLogin = () => {
  const { blocks = {}, extra = {}, data } = useStore();
  const { fields, buttons } = data || { fields: [] };
  return (
    <Render>
      <header>
        {blocks.logo}
        {blocks.title}
      </header>
      <div className="login-page5-inner">
        {fields
          .sort((a, b) => a.index - b.index)
          .map((item, idx) => {
            const extraLabel = extra[item.name as keyof typeof extra];
            if (!item.children && !extraLabel) return null;
            if (!item.children && extraLabel) return <div key={idx}>{extraLabel}</div>;
            return (
              <label key={item.name + idx}>
                {item.children}
                {extraLabel}
              </label>
            );
          })}
        <section>
          {buttons
            .sort((a, b) => a.index - b.index)
            .map((item, idx) => {
              const child = item.children;
              if (!isValidElement(child)) return null;
              return cloneElement(child, {
                ...child.props,
                key: item.name + idx,
              });
            })}
        </section>
      </div>
      {blocks.footer}
    </Render>
  );
};

const LoginPage: FC<PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>> = ({
  children,
  className,
  ...divProps
}) => {
  return (
    <Provider>
      <Username />
      <Password />
      <Logo />
      <Title />
      <Submit />
      <Container {...divProps} className={`login-page5 ${className || ''}`}>
        <RenderLogin />
      </Container>
      {children}
    </Provider>
  );
};

type LoginComponent = FC<PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>> & {
  Username: typeof Username;
  Password: typeof Password;
  Submit: typeof Submit;
  Footer: typeof Footer;
  Logo: typeof Logo;
  Title: typeof Title;
};

const Login = LoginPage as LoginComponent;

Login.Username = Username;
Login.Password = Password;
Login.Submit = Submit;
Login.Footer = Footer;
Login.Logo = Logo;
Login.Title = Title;
Login.displayName = 'BaseLoginPage';

export default Login;
