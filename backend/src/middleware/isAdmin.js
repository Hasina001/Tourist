const isAdmin = (req,res, next) => {
    if(req.role !== 'admin'){
        return res.status(403).send({success: false, message: 'You\'re not allowed to erform this action. Please, login asa an admin'})
    }
    next()
}
module.exports = isAdmin