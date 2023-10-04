import AuthCallBack from "./process";



const authCallBackPage = async () => {

    // AuthCallBack();
    
    return(
        <div onLoad={AuthCallBack()}>

        </div>
    )
}
export default authCallBackPage;
