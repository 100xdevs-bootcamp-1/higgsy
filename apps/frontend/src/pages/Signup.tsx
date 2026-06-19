import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { BACKEND_URL } from "@/config";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

async function signup({username, password}: {username: string, password: string}) {
    const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password
    });

    return response.data // {id: asdadasdasdasdas}
}

export function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: signup,
        onSuccess: () => {
         
        },
    })

    return <div className="min-h-screen min-w-screen flex">
        <div className="flex-1 min-h-screen bg-black">

        </div>
        <div className="flex-1 screen">
            <div className="h-full flex items-center justify-center">
                <Card className="p-8">
                    <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)}>
                    
                    </Input>
                    <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)}>
                    
                    </Input>
                    <Button onClick={async () => {
                        try {
                            await mutation.mutate({
                                username, password
                            });
                            navigate("/signin")
                        } catch(e) {
                            alert("Error while signing up")
                        }
                    }} variant={"outline"}>
                        Signup
                    </Button>
                </Card>
            </div>
        </div>
        
    </div>
}