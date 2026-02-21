import { DisplayCard } from "@/components/app/display-card";
import { UsersMonologues } from "@/components/app/view/users-monologues";
import { ViewLayout } from "@/components/layout/view";
import { useGetUsersMonologuesQuery } from "@/lib/services/apiSlice";

export default function Dashboard() {


  return (
   <UsersMonologues />
  );
}
