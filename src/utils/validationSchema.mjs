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
    optional: { options: { checkFalsy: true } }, // Allows empty values
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

export const createProjectValidationSchema = {
  name: {
    notEmpty: {
      errorMessage: "Name should not be empty",
    },
    isString: {
      errorMessage: "Name should be a string",
    },
  },
  listType: {
    notEmpty: {
      errorMessage: "List type should not be empty",
    },
    isString: {
      errorMessage: "List type should be a string",
    },
    isIn: {
      options: [["UL", "OL"]],
      errorMessage: "List type must be either UL or OL",
    },
  },
};

export const updateProjectValidatitonSchema = {
  name: {
    optional: true,
    isString: {
      errorMessage: "Name should be a string",
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
