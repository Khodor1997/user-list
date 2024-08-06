import userList from '../../userList.json'

export function fetchUsers() {
  return Promise.resolve(userList);
}