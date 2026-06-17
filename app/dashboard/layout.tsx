import type { ReactNode } from "react";

import OperationsLayout from "./_components/OperationsLayout";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <OperationsLayout>{children}</OperationsLayout>;
}
