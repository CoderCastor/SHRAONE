import { MainAppScreenLayout } from "@/components/layout/app";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// function DashboardLayout(props: DashboardLayoutProps) {
//   return (
//     <div className="h-full w-full"> 
//       {props.children}
//     </div>
//   );
// }
function DashboardLayout({children}:DashboardLayoutProps) {
  return (
    <MainAppScreenLayout >{children}</MainAppScreenLayout>
  );
}

export default DashboardLayout;
