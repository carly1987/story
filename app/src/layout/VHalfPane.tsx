import { VHalfPaneBox } from "./style";

export default function VHalfPane({ children, ...props }: any) {
  return (
    <VHalfPaneBox>
      {children}
    </VHalfPaneBox>
  );
}