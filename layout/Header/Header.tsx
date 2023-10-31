import styles from './ Header.module.css';
import cn from 'classnames';
import { HeaderProps } from './Header.props';

export const Header = ({ ...props }: HeaderProps): JSX.Element => {
  return (
    <div {...props}>
      header
    </div>
  );
};