import jsSHA from 'jssha';

export default function users(db) {
  // To perform authentication of login when login button is pressed
  const login = async (req, res) => {
    try {
      const selectedUser = await db.User.findOne({
        where: {
          email: req.body.email,
        },
        attributes: ['id', 'password'],
      });

      const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
      shaObj.update(req.body.password);
      const hashedPasswordSupplied = shaObj.getHash('HEX');

      // Perform check if password entered is the same as the password stored
      if (hashedPasswordSupplied === selectedUser.password) {
        res.cookie('loggedInUserId', selectedUser.id);
        res.send({ authenticated: true, loggedInUserId: selectedUser.id });
        return;
      }
      res.send({ authenticated: false });
    } catch (error) {
      console.log(error);
    }
  };

  // Get the user's loggedInUserId from cookies
  const show = async (req, res) => {
    if (req.cookies) {
      res.send({ loggedInUserId: Number(req.cookies.loggedInUserId) });
      return;
    }
    res.send('Not Logged In');
  };

  // Render a registration form for the user
  const newForm = async (req, res) => {

  };

  return { show, login, newForm };
}
