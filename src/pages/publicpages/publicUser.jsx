import { useParams } from "react-router-dom"

const PublicUser = () => {
  const { username } = useParams()

  return <div>Got user: {username}</div>
}

export default PublicUser
