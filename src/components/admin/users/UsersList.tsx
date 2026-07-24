import { IDashboardUser } from "@/features/user/types/user.types";
import UserCard from "./UserCard";

interface UsersListProps {
  users: IDashboardUser[]; 
}

export default function UsersList({ users }: UsersListProps) {
  return (
    <>
      <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-sm:grid-cols-2 max-[400px]:grid-cols-1!">
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </>
  );
}
