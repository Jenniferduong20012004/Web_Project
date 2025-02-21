let getLoginPage = (request, response) => {
    return response.render ('login.ejs');
}
// cho phep goi ngoai 
module.exports ={
    getLoginPage: getLoginPage,

}