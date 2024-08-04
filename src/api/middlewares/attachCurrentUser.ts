/* #region IOC */
import { iocContainer } from '../../config/ioc.container';
import { IUserService } from '../../services/contracts/users';
import { TYPES } from '../../types/contract-types';
/* #endregion */

/**
 * Attach user to req.user
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = async (req, res, next) => {
  try {
    const userServiceInstance = iocContainer.get<IUserService>(TYPES.IUserService);
    const userRecord = await userServiceInstance.findOneById(req.auth.id);
    if (!userRecord) {
      return res.sendStatus(401);
    }
    const currentUser = userRecord;
    req.currentUser = currentUser;
    req.currentUser.os = req.auth.os;
    return next();
  } catch (e) {
    console.log(' Error attaching user to req');
    console.log(e);
    return next(e);
  }
};

export default attachCurrentUser;
