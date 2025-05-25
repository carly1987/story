import { useEffect, useState } from 'react';
import * as R from 'ramda';

const requiredTypes = ['主角', '正面', '反面', '中性'];

export default function useRole(dataSource: any) {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (dataSource?.nodes) {
      const list: any = R.pipe(
        R.groupBy((role: any) => role.data.type || '其他'),
        groups => requiredTypes.map(type => ({
          type,
          list: groups[type] || []
        }))
      )(dataSource.nodes);
      setRoles(list);
    }

  }, [dataSource]);

  return {
    roles
  }
}