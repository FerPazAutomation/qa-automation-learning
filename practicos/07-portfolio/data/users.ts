export const users = {
    valid: {
      username: "standard_user",
      password: "secret_sauce",
    },
    invalid: [
      {username: "wrong_user", password: "wrong_pass"},
      {username: "standard_user", password: "wrong_pass"},
      {username: "locked_out_user1", password: "secret_sauce1"},
      {username: "", password: ""},
    ]
  };