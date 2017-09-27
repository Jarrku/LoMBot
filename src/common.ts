import { Collection, Role } from "discord.js";
import config from "./config";

export const isAllowed = (roles: Collection<string, Role>): boolean => {
  const { staff } = config;
  const memberRoles = Array.from(roles.values()).map((role: Role) => role.name.toLowerCase());
  return staff.some((staffRole) => memberRoles.includes(staffRole));
};

export const isInRoleCollection = (roles: Collection<string, Role>, ...rolesToFind: string[]): boolean => {
  const rolesLower = rolesToFind.map((r) => r.toLowerCase());
  const index = Array.from(roles.values()).findIndex((r) => rolesLower.includes(r.name.toLowerCase()));

  return index > -1;
};
