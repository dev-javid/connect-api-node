const roleAreaMapping = {
  app: ['addTrialLicense', 'getLicense'],
  admin: ['manageUsers', 'manageLicenses'],
};

export const roles: string[] = Object.keys(roleAreaMapping);
export const allowedAresForRole: Map<string, string[]> = new Map(Object.entries(roleAreaMapping));
