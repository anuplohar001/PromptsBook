import Stories from '@components/Stories'
import React from 'react'
import { serverUrl } from '@lib/actions'

const page = async({ params }) => {
    
    const response = await fetch(serverUrl().concat(`/oldStory/${params?.id}`), {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        next: {revalidate: 2}
    })
    const oldStory = await response.json()
    
    return (
        <Stories user={params?.id} oldStory={oldStory}/>
    )
}

export default page
