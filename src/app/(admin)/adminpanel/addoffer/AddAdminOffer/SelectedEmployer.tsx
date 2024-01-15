"use client";

import React from "react";

const SelectedEmployer = ({ setSelectedUser, selectedUser }: any) => {
  return (
    <div>
      <h1 className="text-center mb-2">Wybierz pracodawcę wpisując jego ID</h1>
      <input
        className="w-full"
        type="text"
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      />
    </div>
  );
};

export default SelectedEmployer;
