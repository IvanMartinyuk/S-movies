
export default function Logout(){
    sessionStorage.removeItem("isLogin")
    sessionStorage.setItem("isLogin",false)
    console.log(sessionStorage.getItem("isLogin"))
    return(<><a href="/">retreerrete</a></>)
}
