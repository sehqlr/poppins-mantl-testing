module.exports = function (poppins) {
  poppins.config = {
    // Github repo to watch
    // https://github.com/myname/myrepo
    target: {
      user: 'sehqlr',
      repo: 'https://github.com/sehqlr/mantl'
    },

    // Credentials for user who leaves comments, etc.
    // You may want to load these from a seperate file like `config-credentials.js`, and
    // add this file to your `.gitignore` list
    login: {
      username: 'mantlbot',
      password: ''
    },

    // port for poppins to listen on and URL for Github to ping
    hook: {
      url: 'http://some-floating-ip:3643',
      port: 3643
    }
  };

  // load plugins from the cwd
  poppins.theUsualPlease();
};
