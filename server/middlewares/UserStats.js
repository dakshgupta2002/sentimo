import Stat from "../models/Stat.js";

export const UserStats = async (req, res, next) => {
    const user = req?.user?._id;

    const stats = await Stat.find({user});
    req.stats = stats;
    next();
}