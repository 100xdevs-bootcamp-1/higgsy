import { useNavigate } from "react-router";
import { Button } from "./ui/button";

export function Appbar() {
    const navigate = useNavigate();

    return <div>
         <div className="bg-black text-white flex justify-between">
            <div className="p-4 text-xl">
                Higgsfield
            </div>
            <div className="flex">
                <div className="flex items-center p-2">
                    <Button variant={"outline"} onClick={() => {
                        navigate("/signup")
                    }}>Signup</Button>
                </div>
                <div className="flex items-center p-2">
                    <Button variant={"outline"} onClick={() => {
                        navigate("/signin")
                    }}>Signin</Button>
                </div>
            </div>
            </div>
    </div>
}