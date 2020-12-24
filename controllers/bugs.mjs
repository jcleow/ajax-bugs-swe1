import axios from 'axios';

export default function bugs(db) {
  const show = async (req, res) => {
    res.render('home');
  };
  const create = async (req, res) => {
    const {
      problem, commit, errorText, selectedFeature,
    } = req.body;
    try {
    // First Create the new bug
      const newBug = await db.Bug.create({
        problem,
        commit,
        errorText,
      });

      // Next, use sequelize's association to set the relevant foreign key id
      const buggyFeature = await db.Feature.findOne({
        where: {
          name: selectedFeature,
        },
      });

      newBug.setFeature(buggyFeature);

      const creator = await db.User.findOne({
        where: {
          id: req.cookies.loggedInUserId,
        },
      });
      newBug.setUser(creator);

      res.send('Bug Submitted');
    } catch (error) {
      console.log(error);
    }
  };

  const index = async (req, res) => {
    const bugData = await db.Bug.findAll();
    console.log(bugData, 'bugData');
    res.send({ bugData });
  };

  return { show, create, index };
}
