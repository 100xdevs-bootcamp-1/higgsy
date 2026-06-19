import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BACKEND_URL } from "@/config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

async function createAvatar({url, name}: {url: string, name: string}) {
    const response = await axios.post(`${BACKEND_URL}/api/v1/avatar`, {
        name, image: url
    })
    return response.data;
}

async function getAvatars() {
    const response = await axios.get(`${BACKEND_URL}/api/v1/avatars`)
    
    return response.data.avatars;
}

export function Dashboard() {
    const [avatarUrl, setAvatarUrl] = useState("")
    const [name, setName] = useState("")
    const [avatars, setAvatars] = useState([])
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: createAvatar,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['avatars'] })
        }   
    })

    const query = useQuery({
        queryFn: getAvatars,
        queryKey: ['avatars']
    })

    return <div>
        Dashboard page
        <div className="w-md border p-4">
            <Input placeholder="name" onChange={(e) => setName(e.target.value)}></Input>
            <Input placeholder="url" onChange={(e) => setAvatarUrl(e.target.value)}></Input>
            <Button onClick={async () => {
                await mutation.mutate({
                    name, url: avatarUrl
                });
            }}>Create avatar</Button>
        </div>
        
        <div>
            <b>Avatars</b>
            {query.data?.map(avatar => <div>
                {avatar.name}    
            </div>)}
        </div>
    </div>
}