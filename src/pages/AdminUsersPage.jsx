import React, { useEffect, useState } from "react";
import UserManagementForm from "../components/UserManagement/UserManagementForm";
import CreateUserAdministratorForm from "../components/UserManagement/CreateUserAdministratorForm";
import {
  getUsers,
  toggleUserBlockStatus,
  createUserAdministrator,
} from "../components/UserManagement/UserManagement.operations";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersList = await getUsers();
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  const handleToggleBlockStatus = async (userId, currentStatus) => {
    const newStatus = !currentStatus;
    await toggleUserBlockStatus(userId, newStatus);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isBlocked: newStatus } : user
      )
    );
  };

  const handleCreateUser = async (email, password, userType) => {
    return await createUserAdministrator(email, password, userType);
  };

  return (
    <div>
      <CreateUserAdministratorForm onCreateUser={handleCreateUser} />
      <h1>Gerenciamento de Usuários</h1>
      <p>Aqui você pode bloquear e desbloquear colaboradores.</p>
      <UserManagementForm
        users={users}
        onToggleBlockStatus={handleToggleBlockStatus}
      />
    </div>
  );
};

export default AdminUsersPage;
