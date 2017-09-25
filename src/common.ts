import {
  Collection,
  Role,
} from "discord.js";

import config from "./config";

export const isAllowed = (roles: Collection<string, Role>): boolean => {
  const { staff } = config;

  const memberRoles = Array.from(roles.values()).map((role: Role) => role.name.toLowerCase());

  return staff.some((staffRole) => memberRoles.includes(staffRole));
};

export const isInRoleCollection = (roles: Collection<string, Role>, roleToFind?: string, rolesToFind?: string[]): boolean => {
  let index = -1;

  if (roleToFind)
    index = Array.from(roles.values()).findIndex((r) => r.name.toLowerCase() === roleToFind.toLowerCase());

  if (rolesToFind) {
    const rolesLower = rolesToFind.map((r) => r.toLowerCase());
    index = Array.from(roles.values()).findIndex((r) => rolesLower.includes(r.name.toLowerCase()));
  }

  return index > -1;
};
