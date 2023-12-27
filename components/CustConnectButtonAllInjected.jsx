import {useMoralis} from "react-moralis"
//for metamask connection
import {useEffect} from "react"
//for re-rendering when page is reloaded

export default function Home(){
    const {enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading} = useMoralis()

    useEffect(() => {
        if(isWeb3Enabled) return
        if(typeof window != "undefined"){
            if(window.localStorage.getItem("connected")){
                enableWeb3()
            }}
        
    },[])
    useEffect(() => {
       Moralis.onAccountChanged((account)=>{

        if(account == null){
            window.localStorage.removeItem("connected")
            deactivateWeb3()
        }
       })
        
    },[])
async function disconnect(){
    window.localStorage.removeItem("connected")
deactivateWeb3()}

    return(<div>
        {account ? (<div onClick={disconnect} className="cursor-pointer bg-blue-100 py-2 px-4 text-blue-500 transition duration-300 ease-in-out hover:bg-blue-200 hover:text-blue-600 rounded-2xl font-medium"> {account.slice(0,5)}.....{account.slice(account.length -5)}</div>) : 
        (<button  disabled={isWeb3EnableLoading} className="bg-blue-100 py-2 px-4 text-blue-500 transition duration-300 ease-in-out hover:bg-blue-200 hover:text-blue-600 rounded-2xl font-medium " onClick={async () => {
            await enableWeb3()
            if(typeof window != "undefined"){
        window.localStorage.setItem("connected", "injected")}
        
        } 
            
            }
            //disabled={isWeb3EnableLoading} //yüklenirken basılamaz
            >Connect Wallet</button>)}
     
    </div>)
}