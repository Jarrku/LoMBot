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

// Timeframe shared code

const validStrings = [...config.weekStrings, ...config.dayStrings];
const timeframeParser = (val: string) => {
  const currDate = new Date().valueOf();

  const letr = val.match(/[a-zA-Z]+/g);
  const num = val.match(/\d+/g);

  if (letr && num) {
    const [weekOrDay] = letr;
    const [amountStr] = num;
    let amount = Number.parseInt(amountStr);

    if (config.weekStrings.includes(weekOrDay))
      amount *= 7;

    return currDate - (amount * 3600000 * 24);
  }

  return 0;
};

const timeframeValidator = (val: string) => {
  const letr = val.match(/[a-zA-Z]+/g);
  const num = val.match(/\d+/g);

  if (letr && num) {
    return validStrings.includes(letr[0]);
  }
  return false;
};

export const timeframeArg = {
  key: "timeframe",
  label: "How long ago",
  prompt: "Shouldnt show",
  default: 0,
  type: "string",
  parse: timeframeParser,
  validate: timeframeValidator,
};
