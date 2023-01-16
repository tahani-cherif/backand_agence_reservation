

 const auth=(req,res,next)=>{
    let i="4N!ryoU6TcUZB7/d8GBB1XbGv0vo-ufggptUk=Hp08vsDSjX013K=S0v?YOEzcHJ";
    if(i=="4N!ryoU6TcUZB7/d8GBB1XbGv0vo-ufggptUk=Hp08vsDSjX013K=S0v?YOEzcHJ")
    {
        console.log("success");
        next();
    }else {
        console.log("error");
    }
}
module.exports={
    auth,
 }