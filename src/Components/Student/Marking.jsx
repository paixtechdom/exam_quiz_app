import { useContext } from "react"
import { AppContext } from "../../App"

export const Marking  = () =>{
    const { marking, setMarking } = useContext(AppContext)

    if(marking){

        return(
            <div className="score">
                <div className="">
                    <h3 className="marking">
                        Marking exam
                    </h3>
                </div>
            </div>
        )
    }
}