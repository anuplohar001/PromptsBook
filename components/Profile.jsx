"use client";

import React from "react";
import Card from "./Card";
import UpdateProf from "./UpdateProf";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Profile = ({ myPost }) => {
    const { data: session } = useSession();
    if (!Array.isArray(myPost) || myPost.length === 0) {
        return null;
    }

    const profile = myPost[0]?.padmin;

    if (!profile) {
        return null;
    }

    const isMyProfile = session?.user?.id === profile?._id;

    return (
        <div className="h-[70vh]">
            {/* Profile Header */}
            <div className="text-center">
                <div className="flex items-center justify-center gap-3 py-3">
                    {profile?.image && (
                        <Image
                            src={profile.image}
                            alt={`${profile.username || "User"} profile`}
                            width={80}
                            height={80}
                            className="h-20 w-20 rounded-full object-cover"
                        />
                    )}

                    <span className="text-xl font-semibold text-white">
                        {isMyProfile ? "My Profile" : profile?.username}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex">
                {/* Posts */}
                <div
                    className={`mt-3 flex h-[70vh] flex-wrap gap-4 overflow-y-auto ${isMyProfile ? "w-[53vw]" : "w-[80vw]"
                        }`}
                >
                    {myPost.map((item) => {
                        const postAdmin = item?.padmin;

                        return (
                            <Card
                                key={item?._id}
                                post={item}
                                modify={true}
                                prompt={item?.prompt}
                                tag={item?.tag}
                                postid={item?._id}
                                username={postAdmin?.username}
                                userid={postAdmin?._id}
                                img={postAdmin?.image || null}
                                email={postAdmin?.email}
                            />
                        );
                    })}
                </div>

                {/* Update Profile */}
                {isMyProfile && <UpdateProf />}
            </div>
        </div>
    );
};

export default Profile;