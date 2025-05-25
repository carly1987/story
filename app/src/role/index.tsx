import { useParams } from 'react-router-dom';
import MenuPane from '../layout/MenuPane';
import RootPane from '../layout/RootPane';
import MainPane from '../layout/MainPane';
import Role from './Role';
import Menu from './Menu';

export default function RolePage() {
  const { name } = useParams();
  return (
    // @ts-ignore
    <RootPane>
      <MenuPane>
        <Menu name={name} dataSource={[]} />
      </MenuPane>
      <MainPane>
        <Role name={name} />
      </MainPane>
    </RootPane>
    
  );
}
