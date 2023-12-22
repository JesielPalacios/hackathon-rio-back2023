import ClientSchema from '../models/client.model';

// export const checkRols = (rolesFromLoggedUser) => {
export const authJwt = (rolesFromLoggedUser) => {
  return async (req, res, next) => {
    // const { _id } = res.locals.jwtPayload
    const { id } = req.user;
    let user;

    try {
      user = await ClientSchema.findById({ _id: id });
      // user = await UserSchema.findById({ _id: id }).populate('roles')
      //Check
      const { role } = user;
      if (rolesFromLoggedUser.includes(role)) {
        // const { roles } = user
        // if (rolesFromLoggedUser.includes(roles[0].name)) {
        next();
      } else {
        //   res.status(401).json({ mensaje: 'Not authorized' })
        res
          .status(401)
          .json({ message: 'No tiene privilegios para ejecutar esta acción.' });
      }
    } catch (e) {
      return res.status(401).json({ message: 'Este usuario no existe.' });
    }
  };
};
