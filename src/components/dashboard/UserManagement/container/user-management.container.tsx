"use client"

import { useState } from "react"


import { useUsers, useDeleteUser } from "../common/user-management.hooks"
import { UserManagementPresenter } from "./user-management.presenter"

export function UserManagementContainer() {
  const [page, setPage] = useState(1)
  const { data, isLoading, error } = useUsers()
  const deleteUserMutation = useDeleteUser()
  const handleDeleteUser = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUserMutation.mutate(id)
    }
  }

  const users = data?.data?.data?.users || []
  const paginationInfo = data?.data?.data?.paginationInfo
  const total = paginationInfo?.totalData || users.length
  const totalPages = Math.ceil(total / 10)

  return (
    <UserManagementPresenter
      users={users}
      isLoading={isLoading}
      error={error?.message || null}
      onDeleteUser={handleDeleteUser}
      onPageChange={setPage}
      currentPage={page}
      totalPages={totalPages}
    />
  )
}
