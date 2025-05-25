import {HHalfPaneBox} from "./style";

export default function HHalfPane({ children, ...props }: any) {
  return (
    <HHalfPaneBox
      sx={[
        {
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr',
          },
          minHeight: '100%',
        },
      ]}
    >
      {children}
    </HHalfPaneBox>
  );
}