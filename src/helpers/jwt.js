require('dotenv').config
const jwt = require('jsonwebtoken')
const { User } = require('../../database/models').models

class Jwt {
  static generateToken(user) {
    const payload = {
      id: user.id,
      email: user.email
    }

    const options = {
      expiresIn: process.env.NODE_ENV === 'development' ? '53 weeks' : '1h'
    }

    return jwt.sign(payload, process.env.JWT_SECRET, options)
  }

  static getTokenPayload(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
      throw new Error('JWT Token error')
    }
  }

  static async verifyToken(token, target) {
    if (!token) throw new Error('No token provided')
    let user = null
    if (target === 'internal') {
      const decodedUser = this.getTokenPayload(token)
      user = await User.findByPk(decodedUser.id)
    } else {
      user = null // await ApiKey.findOne({ where: { key: token } })
    }

    if (user) return user

    throw new Error('User not found')
  }
}

module.exports = Jwt
