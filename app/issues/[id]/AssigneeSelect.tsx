"use client";

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AssigneeSelect = () => {
  const [assginees, setAssignees] = useState<User[]>([]);
  useEffect(() => {
    axios.get<User[]>("/api/users").then((users) => setAssignees(users.data));
  }, []);
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {assginees.map((assignee) => (
            <Select.Item key={assignee.id} value={assignee.id}>
              {assignee.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
