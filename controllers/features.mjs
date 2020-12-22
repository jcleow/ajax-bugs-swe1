export default function features(db) {
  const index = async (req, res) => {
    try {
      const allFeatures = await db.Feature.findAll();
      res.send(allFeatures);
    } catch (error) {
      console.log(error);
    }
  };
  return { index };
}
