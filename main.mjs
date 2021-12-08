import data from './data.json'
const users = data.users

users.forEach((user, index)=> {
    console.log(`user #${index}:`, user.firstName, user.lastName, `born at`, user.dateOfBirth, `and known as`, user.knowsAs)
})
