import jwt from 'jsonwebtoken'
const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn: '15d',
  })

  res.cookie("jwt", token, {
    httpOnly: true, // accessible only by web server
    sameSite: 'strict', // cross-site cookie
    maxAge: 15 * 24 * 60 * 60 * 1000 // 15 days
  })

  return token
}

export default generateTokenAndSetCookie