import * as React from 'react';
import clsx from 'clsx';
import { animated, useSpring } from '@react-spring/web';
import { TransitionProps } from '@mui/material/transitions';
import {Button} from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
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
  saving?: boolean;
}

function CustomLabel({ color, expandable, children, saving = false, ...other }: CustomLabelProps) {
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
        sx={{ color: 'text.primary' }}
      >
        {children}
      </Typography>
      {saving ? (<CircularProgress size={10} />) : null}
    </TreeItem2Label>
  );
}

interface CustomTreeItemProps
  extends Omit<UseTreeItem2Parameters, 'rootRef'>,
    Omit<React.HTMLAttributes<HTMLLIElement>, 'onFocus'> {
      slots:{saving: boolean}
    }

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props: CustomTreeItemProps,
  ref: React.Ref<HTMLLIElement>,
) {
  const { id, itemId, label, disabled, children, slots, ...other } = props;

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getLabelProps,
    getGroupTransitionProps,
    status,
    publicAPI,
  } = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref });

  const item = publicAPI.getItem(itemId);
  const color = item?.color;
  return (
    <TreeItem2Provider itemId={itemId}>
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
          
          <CustomLabel {...getLabelProps({ color })} saving={slots.saving} />
          
        </TreeItem2Content>
        {children && (
          <TransitionComponent
            {...getGroupTransitionProps({ className: 'groupTransition' })}
          />
        )}
      </TreeItem2Root>
    </TreeItem2Provider>
  );
});

export default function Menu({defaultValue, dataSource, name, onChange, onCreate, saving}: any) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function selectItem(_: any, itemId: string){
    onChange(itemId);
  }

  function doSaveStory(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const name = formJson.name;
    onCreate(name);
    handleClose();
  }

  return (
    <>
      <Typography component="h2" variant="subtitle2">
          {name}
        </Typography>
        <Button variant="outlined" onClick={handleClickOpen}>
          新建角色
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: doSaveStory,
          }}
        >
          <DialogTitle>新建章节</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ...
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              name="name"
              label="章节名"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>取消</Button>
            <Button type="submit">保存</Button>
          </DialogActions>
        </Dialog>
        {
          dataSource.length ? (
            <RichTreeView
              items={dataSource}
              defaultSelectedItems={defaultValue}
              onItemClick={selectItem}
              sx={{
                m: '0 -8px',
                pb: '8px',
                height: 'fit-content',
                flexGrow: 1,
                overflowY: 'auto',
              }}
              slots={{ item: CustomTreeItem } as any}
              slotProps={{ item: { slots: { saving } } } as any}
            />
          ) : null
        }
        
    </>
  );
}
