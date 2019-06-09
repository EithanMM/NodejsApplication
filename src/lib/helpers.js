const bcrypt = require('bcryptjs');
const helpers = {};


helpers.Encrypt = async (password) => {
    const hash = await bcrypt.genSalt(10); //genera un patron
    const passEncrypted = await bcrypt.hash(password, hash); //cifre el password brindado, con el patron generado.
    return passEncrypted;
};


helpers.MatchPassword = async (password, savedPassword) => {
    try {

    await bcrypt.compare(password, savedPassword);
    } catch(e){
        console.log(e);
    }
};

module.exports = helpers;
