import { useEffect, useState } from 'react'
import Image from 'next/image'


export default function Profile() {
  const [profile, setProfile] = useState({})
  const [liff, setLiff] = useState({})

  useEffect(async () => {
    const liff = (await import('@line/liff')).default
    await liff.ready
    const profile = await liff.getProfile()
    setProfile(profile)
    setLiff({
      os: liff.getOS(),
      language: liff.getLanguage(),
      isInClient: liff.isInClient(),
    })
  })

  return (
    <section>
      <h1>Profile</h1>
      <div>
        {profile.pictureUrl && <Image
          src={profile.pictureUrl}
          alt={profile.displayName}
          width={500}
          height={500}
        />}
        <div>Name: {profile.displayName}</div>
        <div>OS: {liff.os}</div>
        <div>Language: {liff.language}</div>
        <div>isInClient: {liff.isInClient}</div>
      </div>
    </section>
  )
}