import * as React from 'react';
import clsx from 'clsx';
import { animated, useSpring } from '@react-spring/web';
import * as dialog from '@tauri-apps/plugin-dialog';
import { TransitionProps } from '@mui/material/transitions';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import {
  unstable_useTreeItem2 as useTreeItem2,
  UseTreeItem2Parameters,
} from '@mui/x-tree-view/useTreeItem2';
import {
  TreeItem2Content,
  TreeItem2IconContainer,
  TreeItem2Label,
  TreeItem2Root,
} from '@mui/x-tree-view/TreeItem2';
import { TreeItem2Icon } from '@mui/x-tree-view/TreeItem2Icon';
import { TreeItem2Provider } from '@mui/x-tree-view/TreeItem2Provider';
import { useTheme } from '@mui/material/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import { useStoryStore } from '../store';

type Color = 'blue' | 'green';


function DotIcon({ color }: { color: string }) {
  return (
    <Box sx={{ marginRight: 1, display: 'flex', alignItems: 'center' }}>
      <svg width={6} height={6}>
        <circle cx={3} cy={3} r={3} fill={color} />
      </svg>
    </Box>
  );
}

const AnimatedCollapse = animated(Collapse);

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
    },
  });

  return <AnimatedCollapse style={style} {...props} />;
}

interface CustomLabelProps {
  children: React.ReactNode;
  color?: Color;
  expandable?: boolean;
  isExists?:boolean;
  showMore?:boolean;
}

function CustomLabel({ color, expandable, children, isExists=false,showMore=false,  ...other }: CustomLabelProps) {
  const theme = useTheme();
  const colors = {
    blue: theme.palette.primary.main,
    green: theme.palette.success.main,
  };

  const iconColor = color ? colors[color] : null;
  return (
    <TreeItem2Label {...other} sx={{ display: 'flex', alignItems: 'center' }}>
      {iconColor && <DotIcon color={iconColor} />}
      <Typography
        className="labelText"
        variant="body2"
        sx={{ color: isExists ? 'text.primary' : 'text.disabled' }}
      >
        {children}
      </Typography>
    </TreeItem2Label>
  );
}

interface CustomTreeItemProps
  extends Omit<UseTreeItem2Parameters, 'rootRef'>,
  Omit<React.HTMLAttributes<HTMLLIElement>, 'onFocus'> {
  url: string,
  slots: { saving: number, onMore: Function, needSave:boolean }
}

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props: CustomTreeItemProps,
  ref: React.Ref<HTMLLIElement>,
) {
  const { id, itemId, label, disabled, children,slots, ...other } = props;
  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getLabelProps,
    getGroupTransitionProps,
    status,
    publicAPI,
  } = useTreeItem2({ id, itemId, children, label,disabled, rootRef: ref });

  const item = publicAPI.getItem(itemId);
  console.log('status', status)
  const color = item?.color;
  return (
    <TreeItem2Provider itemId={(itemId).toString()}>
      <TreeItem2Root {...getRootProps(other)}>
        <TreeItem2Content
          {...getContentProps({
            className: clsx('content', {
              expanded: status.expanded,
              selected: status.selected,
              focused: status.focused,
              disabled: status.disabled,
            }),
          })}
        >
          {status.expandable && (
            <TreeItem2IconContainer {...getIconContainerProps()}>
              <TreeItem2Icon status={status} />
            </TreeItem2IconContainer>
          )}
          <Badge variant="dot" color="primary" invisible={!(status.selected && slots.needSave)}>
          <CustomLabel {...getLabelProps({ color })} isExists={item.isExists} showMore={!!slots.onMore} />
          
          </Badge>
          {
            status.focused ? (<ContentCopyIcon color="action" fontSize="small" />) : null
          }
          
        </TreeItem2Content>
       
        {children && (
          <TransitionComponent
            {...getGroupTransitionProps({ className: 'groupTransition' })}
          />
        )}
      </TreeItem2Root>
      {
        slots.onMore ? (
          <>
          {item.isExists ? null : (<Button onClick={() => slots.onMore?.(item)} loading={slots.saving === item.id}>下载</Button>)}
          </>
        ) : null
      }
      
    </TreeItem2Provider>
  );
});

export default function Chapter({ defaultValue, dataSource, onChange, onMore,saving, needSave }: any) {
  const [selectedItems, setSelectedItems] = React.useState<string[]>(defaultValue || []);
  async function selectItem(_: any, itemId: string) {
    if(needSave) {
      await dialog.message('章节还没有保存', { title: '提醒', kind: 'error' });
    } else {
      const chapter = dataSource.find((item: any) => item.id === itemId);
      await onChange(chapter);
      setSelectedItems([itemId]);
    }
    
  }

  return (
    <>
      
      {
        dataSource.length ? (
          <RichTreeView
            items={dataSource}
            selectedItems={selectedItems.join(',')}
            onItemClick={selectItem}
            sx={{
              m: '0 -8px',
              pb: '8px',
              height: 'calc(100vh - 100px)',
              flexGrow: 1,
              overflowY: 'auto',
            }}
            slots={{ item: CustomTreeItem } as any}
            slotProps={{ item: { slots: { saving, onMore, needSave, current: selectedItems } } } as any}
          />
        ) : null
      }

    </>
  );
}
