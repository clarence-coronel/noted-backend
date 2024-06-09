export const createUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "Username must be at least 5-32 characters",
    },
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isString: {
      errorMessage: "Username must be a string",
    },
  },
  displayName: {
    optional: true,
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "Display name must be at least 5-32 characters",
    },
    isString: {
      errorMessage: "Display name must be a string",
    },
  },
  password: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "Password must be at least 5-32 characters",
    },
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
    isString: {
      errorMessage: "Password name must be a string",
    },
  },
};

export const loginUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "Username must be at least 5-32 characters",
    },
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isString: {
      errorMessage: "Username must be a string",
    },
  },
  password: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "Password must be at least 5-32 characters",
    },
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
    isString: {
      errorMessage: "Password name must be a string",
    },
  },
};

export const updateUserValidationSchema = {
  displayName: {
    optional: true,
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "Display name must be at least 5-32 characters",
    },
    isString: {
      errorMessage: "Display name must be a string",
    },
  },
  password: {
    optional: true,
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "Password must be at least 5-32 characters",
    },
    isString: {
      errorMessage: "Password must be a string",
    },
  },
  currentPassword: {
    notEmpty: {
      errorMessage: "Current password cannot be empty",
    },
    isString: {
      errorMessage: "Current password must be a string",
    },
  },
};

export const createProjectValidationSchema = {
  name: {
    notEmpty: {
      errorMessage: "Name must not be empty",
    },
    isString: {
      errorMessage: "Name must be a string",
    },
  },
  listType: {
    notEmpty: {
      errorMessage: "List type must not be empty",
    },
    isString: {
      errorMessage: "List type must be a string",
    },
    isIn: {
      options: [["UL", "OL"]],
      errorMessage: "List type must be either UL or OL",
    },
  },
  isActive: {},
};

export const updateProjectValidatitonSchema = {
  name: {
    optional: true,
    isString: {
      errorMessage: "Name must be a string",
    },
  },
  listType: {
    optional: true,
    isIn: {
      options: [["UL", "OL"]],
      errorMessage: "List type must be either UL or OL if provided",
    },
  },
};
