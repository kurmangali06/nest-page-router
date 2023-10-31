import styles from './ Sidebar.module.css';
import cn from 'classnames';
import { SidebarProps } from './Sidebar.props';

export const Sidebar = ({ ...props }: SidebarProps): JSX.Element => {
  return (
    <div {...props}>
      SIDEBAR
    </div>
  );
};